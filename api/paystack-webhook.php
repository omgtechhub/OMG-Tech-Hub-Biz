<?php
// ─────────────────────────────────────────────────────────────────────────────
//  POST /api/paystack-webhook.php
//
//  Paystack's server-to-server notification. This is the reliable path: it
//  fires even when the customer closes the tab before being redirected back,
//  so an order still gets marked paid and the receipt still goes out.
//
//  SETUP — Paystack dashboard → Settings → API Keys & Webhooks → Webhook URL:
//      https://omgtechhub.great-site.net/api/paystack-webhook.php
//
//  Every event is signed with your secret key (HMAC SHA512 in the
//  x-paystack-signature header). The signature is checked before the payload
//  is parsed, so an unsigned request never reaches any logic.
//
//  Always replies 200 once the signature is valid — a non-2xx makes Paystack
//  retry, and a retry cannot fix a problem on our side.
// ─────────────────────────────────────────────────────────────────────────────

// Never render errors into the response: a notice or stack trace is a
// credible way for configuration values to leak. Log them instead.
@ini_set('display_errors', '0');
@ini_set('log_errors', '1');

$raw = file_get_contents('php://input');

require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';
require_once dirname(__DIR__) . '/includes/paystack.php';

if (!paystack_configured()) {
    http_response_code(503);
    exit;
}

// ── 1. Verify the signature ──────────────────────────────────────────────────
$signature = $_SERVER['HTTP_X_PAYSTACK_SIGNATURE'] ?? '';
if ($signature === '' || $raw === '' || $raw === false) {
    http_response_code(400);
    exit;
}

$expected = hash_hmac('sha512', $raw, PAYSTACK_SECRET_KEY);
if (!hash_equals($expected, $signature)) {
    error_log('[paystack] webhook rejected: bad signature from ' . ($_SERVER['REMOTE_ADDR'] ?? '?'));
    http_response_code(401);
    exit;
}

// ── 2. Parse ─────────────────────────────────────────────────────────────────
$event = json_decode($raw, true);
if (!is_array($event)) {
    http_response_code(400);
    exit;
}

// Signature is valid from here on, so acknowledge no matter what follows.
http_response_code(200);
header('Content-Type: text/plain');
echo 'ok';

if (function_exists('fastcgi_finish_request')) {
    fastcgi_finish_request();
} else {
    @ob_end_flush();
    @flush();
}

// ── 3. Handle ────────────────────────────────────────────────────────────────
$type = $event['event'] ?? '';
$tx   = $event['data']  ?? [];
$ref  = $tx['reference'] ?? '';

if ($ref === '' || !preg_match('/^[A-Za-z0-9\-\.=]{6,100}$/', $ref)) exit;

$order = order_by_reference($ref);
if (!$order) {
    // A transaction created outside this site (a Paystack payment link, say).
    error_log('[paystack] webhook for unknown reference ' . $ref . ' (' . $type . ')');
    exit;
}

switch ($type) {
    case 'charge.success':
        $amount   = isset($tx['amount']) ? (int) round($tx['amount'] / 100) : 0;
        $currency = $tx['currency'] ?? '';

        // Same guard as the verify endpoint: a success for the wrong amount
        // is a human problem, not a completed order.
        if ($amount < (int) $order['amount'] || $currency !== $order['currency']) {
            error_log(sprintf(
                '[paystack] webhook amount/currency mismatch on %s: expected %d %s, got %d %s',
                $ref, $order['amount'], $order['currency'], $amount, $currency
            ));
            order_mutate($ref, function (array $o) use ($amount, $currency) {
                if (($o['status'] ?? '') === 'paid') return null;
                $o['status']      = 'review';
                $o['gateway_msg'] = 'Webhook amount/currency mismatch: ' . $amount . ' ' . $currency;
                $o['updated_at']  = gmdate('c');
                return $o;
            });
            exit;
        }

        // Idempotent — if the browser callback already settled this order,
        // omg_mark_order_paid does nothing and no second receipt is sent.
        omg_mark_order_paid($ref, $tx);
        break;

    case 'charge.failed':
        omg_mark_order_failed($ref, 'failed', $tx);
        break;

    case 'charge.dispute.create':
    case 'refund.processed':
    case 'refund.failed':
        order_mutate($ref, function (array $o) use ($type, $tx) {
            $o['flags'][]    = [
                'event'   => $type,
                'at'      => gmdate('c'),
                'message' => $tx['gateway_response'] ?? ($tx['status'] ?? null),
            ];
            $o['updated_at'] = gmdate('c');
            return $o;
        });
        break;
}

exit;
