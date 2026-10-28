<?php
// ─────────────────────────────────────────────────────────────────────────────
//  Paystack integration helpers  —  OMG Tech Hub
// ─────────────────────────────────────────────────────────────────────────────
//  Requires includes/config.php (for DATA_DIR / SITE_URL) and includes/db.php
//  to be loaded first.
// ─────────────────────────────────────────────────────────────────────────────

require_once __DIR__ . '/paystack_config.php';
require_once __DIR__ . '/catalog.php';

define('PAYSTACK_API_BASE', 'https://api.paystack.co');

// ── Keys ─────────────────────────────────────────────────────────────────────

/**
 * True once a real secret key has been pasted into paystack_config.php.
 * Every endpoint checks this so an unconfigured site fails with a clear
 * message instead of a confusing Paystack error.
 */
function paystack_configured(): bool {
    $key = PAYSTACK_SECRET_KEY;
    return is_string($key) && strncmp($key, 'sk_', 3) === 0 && strlen($key) > 20;
}

/**
 * 'test' or 'live' — shown in the admin panel so you always know which
 * account the money is going to.
 */
function paystack_mode(): string {
    return strncmp(PAYSTACK_SECRET_KEY, 'sk_live_', 8) === 0 ? 'live' : 'test';
}

// ── HTTP ─────────────────────────────────────────────────────────────────────

/**
 * Call the Paystack API.
 *
 * Returns ['ok' => bool, 'status' => int, 'body' => array, 'error' => string].
 * `ok` means the HTTP call succeeded AND Paystack reported status:true.
 */
function paystack_request(string $method, string $path, ?array $payload = null): array {
    $url     = PAYSTACK_API_BASE . $path;
    $headers = [
        'Authorization: Bearer ' . PAYSTACK_SECRET_KEY,
        'Content-Type: application/json',
        'Cache-Control: no-cache',
    ];
    $json = $payload !== null ? json_encode($payload) : null;

    $raw        = null;
    $httpStatus = 0;
    $transport  = null;

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST  => $method,
            CURLOPT_HTTPHEADER     => $headers,
            CURLOPT_TIMEOUT        => 45,
            CURLOPT_CONNECTTIMEOUT => 20,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_FOLLOWLOCATION => false,
        ]);
        if ($json !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, $json);

        $raw        = curl_exec($ch);
        $curlErr    = curl_error($ch);
        $httpStatus = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($raw === false) {
            $transport = 'cURL could not reach api.paystack.co' . ($curlErr ? ': ' . $curlErr : '.');
            $raw       = null;
        }
    }

    // Fallback for hosts without cURL — some shared hosts only allow streams.
    if ($raw === null) {
        $context = stream_context_create([
            'http' => [
                'method'        => $method,
                'header'        => implode("\r\n", $headers),
                'content'       => $json ?? '',
                'timeout'       => 45,
                'ignore_errors' => true,
            ],
            'ssl' => ['verify_peer' => true, 'verify_peer_name' => true],
        ]);
        $streamRaw = @file_get_contents($url, false, $context);
        if ($streamRaw !== false) {
            $raw       = $streamRaw;
            $transport = null;
            if (!empty($http_response_header)) {
                foreach ($http_response_header as $line) {
                    if (preg_match('#^HTTP/\S+\s+(\d{3})#', $line, $m)) {
                        $httpStatus = (int) $m[1];
                    }
                }
            }
        }
    }

    if ($raw === null) {
        return [
            'ok'     => false,
            'status' => 0,
            'body'   => [],
            'error'  => $transport
                ?: 'Could not reach Paystack. The server may be blocking outbound HTTPS connections.',
        ];
    }

    $body = json_decode($raw, true);
    if (!is_array($body)) {
        return [
            'ok'     => false,
            'status' => $httpStatus,
            'body'   => [],
            'error'  => 'Paystack returned an unreadable response (HTTP ' . $httpStatus . ').',
        ];
    }

    $ok = ($httpStatus >= 200 && $httpStatus < 300) && !empty($body['status']);

    return [
        'ok'     => $ok,
        'status' => $httpStatus,
        'body'   => $body,
        'error'  => $ok ? '' : ($body['message'] ?? 'Paystack rejected the request.'),
    ];
}

/**
 * Create a checkout session. $amountNaira is in naira; Paystack is given kobo.
 */
function paystack_initialize(array $args): array {
    $payload = [
        'email'        => $args['email'],
        'amount'       => (string) ((int) $args['amount_naira'] * 100),
        'currency'     => PAYSTACK_CURRENCY,
        'reference'    => $args['reference'],
        'callback_url' => $args['callback_url'],
        'channels'     => PAYSTACK_CHANNELS,
        'metadata'     => $args['metadata'] ?? [],
    ];
    return paystack_request('POST', '/transaction/initialize', $payload);
}

/**
 * Confirm a transaction's real status. Never trust the callback URL alone.
 */
function paystack_verify(string $reference): array {
    return paystack_request('GET', '/transaction/verify/' . rawurlencode($reference));
}

// ── References ───────────────────────────────────────────────────────────────

/**
 * Paystack allows only alphanumerics plus - . = in a reference.
 */
function omg_payment_reference(): string {
    return 'OMG-' . date('ymd') . '-' . strtoupper(bin2hex(random_bytes(4)));
}

// ── Order storage ────────────────────────────────────────────────────────────
//  Orders live in data/orders.json, which is blocked from the web by
//  data/.htaccess. The webhook and the verify endpoint can both land on the
//  same order at the same moment, so writes are serialised behind a lock.

function omg_orders_lock() {
    $path = DATA_DIR . '.orders.lock';
    if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0755, true);
    $fh = @fopen($path, 'c');
    if ($fh === false) return null;
    @flock($fh, LOCK_EX);
    return $fh;
}

function omg_orders_unlock($fh): void {
    if ($fh) { @flock($fh, LOCK_UN); @fclose($fh); }
}

function orders_all(): array {
    $data   = omg_read_json(ORDERS_FILE);
    $orders = $data['orders'] ?? [];
    usort($orders, fn($a, $b) => strcmp($b['created_at'] ?? '', $a['created_at'] ?? ''));
    return $orders;
}

function order_by_reference(string $reference): ?array {
    $data = omg_read_json(ORDERS_FILE);
    foreach (($data['orders'] ?? []) as $o) {
        if (($o['reference'] ?? '') === $reference) return $o;
    }
    return null;
}

/**
 * Insert or replace an order. Takes the lock itself.
 */
function order_save(array $order): bool {
    $lock = omg_orders_lock();
    try {
        $data   = omg_read_json(ORDERS_FILE);
        $orders = $data['orders'] ?? [];
        $found  = false;
        foreach ($orders as &$o) {
            if (($o['reference'] ?? '') === $order['reference']) {
                $o     = $order;
                $found = true;
                break;
            }
        }
        unset($o);
        if (!$found) $orders[] = $order;
        $data['orders'] = $orders;
        return omg_write_json(ORDERS_FILE, $data);
    } finally {
        omg_orders_unlock($lock);
    }
}

/**
 * Read-modify-write an order under a single lock, so the webhook and the
 * browser callback cannot clobber each other.
 *
 * $mutator receives the order and returns the updated order, or null to
 * abandon the change. Returns the final order, or null if it did not exist.
 */
function order_mutate(string $reference, callable $mutator): ?array {
    $lock = omg_orders_lock();
    try {
        $data   = omg_read_json(ORDERS_FILE);
        $orders = $data['orders'] ?? [];
        foreach ($orders as $i => $o) {
            if (($o['reference'] ?? '') !== $reference) continue;

            $updated = $mutator($o);
            if ($updated === null) return $o;

            $orders[$i]     = $updated;
            $data['orders'] = $orders;
            omg_write_json(ORDERS_FILE, $data);
            return $updated;
        }
        return null;
    } finally {
        omg_orders_unlock($lock);
    }
}

// ── Formatting ───────────────────────────────────────────────────────────────

function omg_naira(int $amount): string {
    return '₦' . number_format($amount);
}

/**
 * j***n@gmail.com — enough for a customer to recognise, not enough to leak.
 */
function omg_mask_email(string $email): string {
    $at = strpos($email, '@');
    if ($at === false || $at < 1) return '•••';
    $name   = substr($email, 0, $at);
    $domain = substr($email, $at);
    if (strlen($name) <= 2) return substr($name, 0, 1) . '•••' . $domain;
    return substr($name, 0, 1) . str_repeat('•', min(5, strlen($name) - 2)) . substr($name, -1) . $domain;
}

// ── Receipts ─────────────────────────────────────────────────────────────────

/**
 * Email the customer a receipt and notify the studio. Best-effort: a mail
 * failure must never fail the payment, because the money has already moved.
 *
 * Returns true if both messages were handed to the mailer.
 */
function omg_send_payment_emails(array $order): bool {
    $root = dirname(__DIR__);
    require_once $root . '/includes/mail_config.php';
    require_once $root . '/vendor/phpmailer/src/Exception.php';
    require_once $root . '/vendor/phpmailer/src/PHPMailer.php';
    require_once $root . '/vendor/phpmailer/src/SMTP.php';

    $ref     = $order['reference'];
    $paid    = omg_naira((int) $order['amount']);
    $label   = $order['item_label'];
    $name    = $order['customer']['name'];
    $email   = $order['customer']['email'];
    $phone   = $order['customer']['phone']   ?? '';
    $company = $order['customer']['company'] ?? '';
    $notes   = $order['customer']['notes']   ?? '';
    $channel = $order['channel'] ?? 'card';
    $when    = date('j M Y, g:ia', strtotime($order['paid_at'] ?? 'now'));

    $isDeposit = ($order['mode'] ?? '') === 'deposit';
    $full      = (int) ($order['full_price'] ?? 0);
    $balance   = max(0, $full - (int) $order['amount']);

    $balanceRow = $isDeposit && $balance > 0
        ? '<tr><td style="padding:10px 0;border-top:1px solid #eee;color:#666;font-size:14px;">Balance on completion</td>'
        . '<td style="padding:10px 0;border-top:1px solid #eee;text-align:right;font-weight:600;font-size:14px;">'
        . omg_naira($balance) . '</td></tr>'
        : '';

    $totalRow = $full > 0
        ? '<tr><td style="padding:10px 0;border-top:1px solid #eee;color:#666;font-size:14px;">Package total</td>'
        . '<td style="padding:10px 0;border-top:1px solid #eee;text-align:right;font-size:14px;">'
        . omg_naira($full) . '</td></tr>'
        : '';

    // ── Customer receipt ─────────────────────────────────────────────────
    $customerHtml = '
<div style="font-family:-apple-system,Segoe UI,Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111;">
  <div style="background:#e63322;color:#fff;font-weight:800;font-size:18px;padding:18px 24px;border-radius:12px 12px 0 0;">OMG Tech Hub</div>
  <div style="border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;padding:28px 24px;">
    <p style="font-size:15px;line-height:1.7;margin:0 0 20px;">Hi ' . htmlspecialchars($name) . ',</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 24px;">Your payment went through. Thank you — we have everything we need to get started, and a member of the team will reach out within one business day to kick things off.</p>
    <div style="background:#fafafa;border-radius:10px;padding:20px 22px;margin-bottom:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:0 0 10px;color:#666;font-size:14px;">Service</td><td style="padding:0 0 10px;text-align:right;font-weight:600;font-size:14px;">' . htmlspecialchars($label) . '</td></tr>
        ' . $totalRow . '
        <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#666;font-size:14px;">' . ($isDeposit ? 'Deposit paid' : 'Amount paid') . '</td><td style="padding:10px 0;border-top:1px solid #eee;text-align:right;font-weight:800;font-size:16px;color:#e63322;">' . $paid . '</td></tr>
        ' . $balanceRow . '
        <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#666;font-size:14px;">Reference</td><td style="padding:10px 0;border-top:1px solid #eee;text-align:right;font-family:monospace;font-size:13px;">' . htmlspecialchars($ref) . '</td></tr>
        <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#666;font-size:14px;">Date</td><td style="padding:10px 0;border-top:1px solid #eee;text-align:right;font-size:14px;">' . $when . '</td></tr>
        <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#666;font-size:14px;">Paid via</td><td style="padding:10px 0;border-top:1px solid #eee;text-align:right;font-size:14px;text-transform:capitalize;">' . htmlspecialchars(str_replace('_', ' ', $channel)) . '</td></tr>
      </table>
    </div>
    <p style="font-size:14px;line-height:1.7;color:#666;margin:0 0 8px;">Keep this reference for your records. Questions? Just reply to this email.</p>
    <p style="font-size:14px;line-height:1.7;margin:24px 0 0;">— The OMG Tech Hub Team</p>
  </div>
  <p style="text-align:center;color:#999;font-size:12px;margin-top:20px;">Processed securely by Paystack · ' . htmlspecialchars(SITE_URL) . '</p>
</div>';

    // ── Studio notification ──────────────────────────────────────────────
    $adminRows = '';
    foreach ([
        'Service'   => $label,
        'Amount'    => $paid . ($isDeposit ? ' (50% deposit)' : ' (full)'),
        'Total'     => $full > 0 ? omg_naira($full) : '—',
        'Balance'   => $isDeposit && $balance > 0 ? omg_naira($balance) : '—',
        'Reference' => $ref,
        'Name'      => $name,
        'Email'     => $email,
        'Phone'     => $phone ?: '—',
        'Company'   => $company ?: '—',
        'Paid via'  => str_replace('_', ' ', $channel),
        'Date'      => $when,
        'Notes'     => $notes ?: '—',
    ] as $k => $v) {
        $adminRows .= '<tr><td style="padding:9px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;width:120px;">'
            . $k . '</td><td style="padding:9px 0;border-bottom:1px solid #eee;font-size:13px;font-weight:500;">'
            . nl2br(htmlspecialchars((string) $v)) . '</td></tr>';
    }

    $adminHtml = '
<div style="font-family:-apple-system,Segoe UI,Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111;">
  <div style="background:#16a34a;color:#fff;font-weight:800;font-size:17px;padding:16px 22px;border-radius:12px 12px 0 0;">💰 Payment received — ' . $paid . '</div>
  <div style="border:1px solid #eee;border-top:none;border-radius:0 0 12px 12px;padding:24px 22px;">
    <table style="width:100%;border-collapse:collapse;">' . $adminRows . '</table>
  </div>
</div>';

    $sentCustomer = false;
    $sentAdmin    = false;

    foreach ([
        ['to' => $email,   'name' => $name,   'subject' => 'Payment received — ' . $label . ' (' . $ref . ')', 'html' => $customerHtml, 'reply' => MAIL_FROM,  'replyName' => MAIL_FROM_NAME],
        ['to' => MAIL_TO,  'name' => 'OMG Tech Hub', 'subject' => 'Payment received: ' . $paid . ' — ' . $label, 'html' => $adminHtml,    'reply' => $email,     'replyName' => $name],
    ] as $i => $m) {
        try {
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = MAIL_HOST;
            $mail->SMTPAuth   = true;
            $mail->Username   = MAIL_USERNAME;
            $mail->Password   = MAIL_PASSWORD;
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = MAIL_PORT;
            $mail->CharSet    = 'UTF-8';
            $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
            $mail->addAddress($m['to'], $m['name']);
            $mail->addReplyTo($m['reply'], $m['replyName']);
            $mail->isHTML(true);
            $mail->Subject = $m['subject'];
            $mail->Body    = $m['html'];
            $mail->AltBody = strip_tags(str_replace(['</tr>', '<br>'], "\n", $m['html']));
            $mail->send();
            if ($i === 0) $sentCustomer = true; else $sentAdmin = true;
        } catch (\Throwable $e) {
            error_log('[paystack] receipt email failed (' . $m['to'] . '): ' . $e->getMessage());
        }
    }

    return $sentCustomer && $sentAdmin;
}

/**
 * Mark an order paid exactly once, whichever arrives first — the webhook or
 * the browser callback. Returns the final order.
 *
 * $tx is the `data` object from a Paystack verify/webhook payload.
 */
function omg_mark_order_paid(string $reference, array $tx): ?array {
    $justPaid = false;

    $order = order_mutate($reference, function (array $o) use ($tx, &$justPaid) {
        if (($o['status'] ?? '') === 'paid') return null; // already settled

        $o['status']      = 'paid';
        $o['paid_at']     = $tx['paid_at'] ?? $tx['paidAt'] ?? gmdate('c');
        $o['channel']     = $tx['channel'] ?? 'card';
        $o['paystack_id'] = $tx['id'] ?? null;
        $o['amount_paid'] = isset($tx['amount']) ? (int) round($tx['amount'] / 100) : (int) $o['amount'];
        $o['updated_at']  = gmdate('c');
        $justPaid         = true;
        return $o;
    });

    if ($order && $justPaid) {
        $emailed = omg_send_payment_emails($order);
        order_mutate($reference, function (array $o) use ($emailed) {
            $o['receipt_sent'] = $emailed;
            return $o;
        });
        $order['receipt_sent'] = $emailed;
    }

    return $order;
}

/**
 * Record a failed or abandoned attempt, without ever downgrading a paid order.
 */
function omg_mark_order_failed(string $reference, string $status, array $tx = []): ?array {
    return order_mutate($reference, function (array $o) use ($status, $tx) {
        if (($o['status'] ?? '') === 'paid') return null;
        $o['status']     = $status;
        $o['channel']    = $tx['channel'] ?? ($o['channel'] ?? null);
        $o['gateway_msg'] = $tx['gateway_response'] ?? ($o['gateway_msg'] ?? null);
        $o['updated_at'] = gmdate('c');
        return $o;
    });
}
