<?php
// ─────────────────────────────────────────────────────────────────────────────
//  GET /api/paystack-verify.php?reference=OMG-...
//
//  Called by the React callback page after Paystack redirects the customer
//  back. Landing on the callback URL does NOT mean the payment succeeded, so
//  this always asks Paystack directly before reporting success.
//
//  The response is deliberately thin — amount, label, masked email. Anyone
//  holding the reference should not learn the customer's full details.
// ─────────────────────────────────────────────────────────────────────────────

// Never render errors into the response: a notice or stack trace is a
// credible way for configuration values to leak. Log them instead.
@ini_set('display_errors', '0');
@ini_set('log_errors', '1');

ob_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Cache-Control: no-store');

function out(int $code, array $body): void {
    ob_end_clean();
    http_response_code($code);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') out(204, []);
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    out(405, ['ok' => false, 'error' => 'Method not allowed']);
}

require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';
require_once dirname(__DIR__) . '/includes/paystack.php';

if (!paystack_configured()) {
    out(503, ['ok' => false, 'error' => 'Payment is not configured on this site.']);
}

$reference = trim((string) ($_GET['reference'] ?? ''));

// Paystack references are alphanumerics plus - . = — reject anything else
// before it ever reaches a file lookup or an outbound URL.
if ($reference === '' || !preg_match('/^[A-Za-z0-9\-\.=]{6,100}$/', $reference)) {
    out(422, ['ok' => false, 'error' => 'Missing or invalid payment reference.']);
}

$order = order_by_reference($reference);
if (!$order) {
    out(404, ['ok' => false, 'error' => 'We could not find that payment. Please contact us with your reference.']);
}

// Already settled (the webhook usually gets here first) — report and stop.
if (($order['status'] ?? '') === 'paid') {
    out(200, ['ok' => true, 'status' => 'success', 'payment' => omg_public_payment($order)]);
}

$res = paystack_verify($reference);

if (!$res['ok']) {
    error_log('[paystack] verify failed for ' . $reference . ': ' . $res['error']);
    out(502, [
        'ok'     => false,
        'status' => 'unknown',
        'error'  => 'We could not confirm this payment with the gateway yet. If you were debited, your payment is safe — email us the reference below and we will confirm it manually.',
        'reference' => $reference,
    ]);
}

$tx         = $res['body']['data'] ?? [];
$txStatus   = $tx['status'] ?? 'failed';
$txAmount   = isset($tx['amount']) ? (int) round($tx['amount'] / 100) : 0;
$txCurrency = $tx['currency'] ?? '';

if ($txStatus === 'success') {
    // Guard against a transaction that succeeded for the wrong amount or
    // currency — treat it as needing a human, not as a completed order.
    if ($txAmount < (int) $order['amount'] || $txCurrency !== $order['currency']) {
        error_log(sprintf(
            '[paystack] amount/currency mismatch on %s: expected %d %s, got %d %s',
            $reference, $order['amount'], $order['currency'], $txAmount, $txCurrency
        ));
        order_mutate($reference, function (array $o) use ($txAmount, $txCurrency) {
            if (($o['status'] ?? '') === 'paid') return null;
            $o['status']       = 'review';
            $o['gateway_msg']  = 'Amount or currency mismatch: received ' . $txAmount . ' ' . $txCurrency;
            $o['updated_at']   = gmdate('c');
            return $o;
        });
        out(409, [
            'ok'        => false,
            'status'    => 'review',
            'error'     => 'This payment needs to be checked by our team. Please email us the reference below.',
            'reference' => $reference,
        ]);
    }

    $paid = omg_mark_order_paid($reference, $tx);
    out(200, ['ok' => true, 'status' => 'success', 'payment' => omg_public_payment($paid ?? $order)]);
}

// Not successful — record it and tell the customer plainly.
$mapped = in_array($txStatus, ['abandoned', 'ongoing', 'pending'], true) ? 'pending' : 'failed';
omg_mark_order_failed($reference, $mapped, $tx);

out(200, [
    'ok'        => false,
    'status'    => $mapped,
    'reference' => $reference,
    'message'   => $tx['gateway_response'] ?? null,
    'error'     => $mapped === 'pending'
        ? 'This payment has not completed yet. If you left the checkout, you can start again.'
        : 'The payment did not go through. No money has left your account — please try again.',
]);

// ─────────────────────────────────────────────────────────────────────────────

/**
 * What the success screen is allowed to see.
 */
function omg_public_payment(array $order): array {
    $full    = (int) ($order['full_price'] ?? 0);
    $amount  = (int) ($order['amount_paid'] ?? $order['amount']);
    $balance = ($order['mode'] ?? '') === 'deposit' ? max(0, $full - $amount) : 0;

    return [
        'reference'  => $order['reference'],
        'label'      => $order['item_label'],
        'amount'     => $amount,
        'full_price' => $full,
        'balance'    => $balance,
        'mode'       => $order['mode'] ?? 'full',
        'currency'   => $order['currency'] ?? 'NGN',
        'channel'    => $order['channel'] ?? 'card',
        'paid_at'    => $order['paid_at'] ?? null,
        'name'       => $order['customer']['name'] ?? '',
        'email'      => omg_mask_email($order['customer']['email'] ?? ''),
    ];
}
