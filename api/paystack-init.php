<?php
// ─────────────────────────────────────────────────────────────────────────────
//  POST /api/paystack-init.php
//  Starts a Paystack checkout and returns the URL to send the customer to.
//
//  The browser sends an item id, never an amount. This endpoint looks the
//  price up in includes/catalog.php, applies the deposit split, and creates
//  the transaction. The one exception is a custom/invoice payment, where the
//  amount is supplied but clamped to the bounds in paystack_config.php.
// ─────────────────────────────────────────────────────────────────────────────

// Never render errors into the response: a notice or stack trace is a
// credible way for configuration values to leak. Log them instead.
@ini_set('display_errors', '0');
@ini_set('log_errors', '1');

ob_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

function out(int $code, array $body): void {
    ob_end_clean();
    http_response_code($code);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') out(204, []);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    out(405, ['ok' => false, 'error' => 'Method not allowed']);
}

require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';
require_once dirname(__DIR__) . '/includes/paystack.php';
require_once dirname(__DIR__) . '/includes/security.php';

// Each call writes an order and hits the Paystack API. Generous enough that a
// customer retrying a failed card never notices; tight enough to stop a script
// filling orders.json.
if (!omg_rate_limit('paystack_init', 12, 3600)) {
    out(429, ['ok' => false, 'error' => 'Too many checkout attempts. Please wait a few minutes and try again.']);
}

if (!paystack_configured()) {
    out(503, [
        'ok'    => false,
        'error' => 'Online payment is not set up yet. Please use the contact form and we will invoice you directly.',
    ]);
}

// ── Input ────────────────────────────────────────────────────────────────────
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) $input = $_POST;

function field($input, string $key, int $max = 500): string {
    $v = trim((string) ($input[$key] ?? ''));
    $v = str_replace(["\r", "\0"], '', $v);
    return mb_substr($v, 0, $max);
}

$itemId  = field($input, 'item', 80);
$billing = field($input, 'billing', 10) === 'annual' ? 'annual' : 'monthly';
$mode    = field($input, 'mode', 10) === 'full' ? 'full' : 'deposit';

$name    = field($input, 'name', 120);
$email   = strtolower(field($input, 'email', 160));
$phone   = field($input, 'phone', 40);
$company = field($input, 'company', 160);
$notes   = field($input, 'notes', 1200);

// ── Validate the customer ────────────────────────────────────────────────────
$errors = [];
if ($name === '' || mb_strlen($name) < 2)             $errors['name']  = 'Please enter your full name.';
if ($email === '')                                    $errors['email'] = 'Please enter your email address.';
elseif (!filter_var($email, FILTER_VALIDATE_EMAIL))   $errors['email'] = 'Please enter a valid email address.';
if ($phone !== '' && !preg_match('/^[0-9+()\-\s]{7,40}$/', $phone)) {
    $errors['phone'] = 'Please enter a valid phone number.';
}

if ($errors) {
    out(422, ['ok' => false, 'error' => reset($errors), 'fields' => $errors]);
}

// ── Resolve what we are charging ─────────────────────────────────────────────
$fullPrice   = 0;
$amount      = 0;
$label       = '';
$itemType    = '';
$customLabel = '';

if ($itemId === 'custom') {
    // "Pay an invoice" — a balance payment, Enterprise deal or retainer.
    $itemType    = 'custom';
    $rawAmount   = $input['amount'] ?? null;
    $customLabel = field($input, 'description', 160);

    if (!is_numeric($rawAmount)) {
        out(422, ['ok' => false, 'error' => 'Please enter the amount you want to pay.', 'fields' => ['amount' => 'Required']]);
    }
    $amount = (int) round((float) $rawAmount);

    if ($amount < PAYSTACK_MIN_CUSTOM_AMOUNT) {
        out(422, [
            'ok'     => false,
            'error'  => 'The minimum online payment is ' . omg_naira(PAYSTACK_MIN_CUSTOM_AMOUNT) . '.',
            'fields' => ['amount' => 'Too low'],
        ]);
    }
    if ($amount > PAYSTACK_MAX_CUSTOM_AMOUNT) {
        out(422, [
            'ok'     => false,
            'error'  => 'For payments above ' . omg_naira(PAYSTACK_MAX_CUSTOM_AMOUNT) . ', please contact us so we can arrange a bank transfer.',
            'fields' => ['amount' => 'Too high'],
        ]);
    }
    if ($customLabel === '') {
        out(422, [
            'ok'     => false,
            'error'  => 'Please tell us what this payment is for.',
            'fields' => ['description' => 'Required'],
        ]);
    }

    $mode      = 'full';
    $fullPrice = $amount;
    $label     = $customLabel;
} else {
    $item = omg_catalog_item($itemId);
    if (!$item) {
        out(422, ['ok' => false, 'error' => 'That package is not available for online payment.']);
    }

    $itemType  = $item['type'];
    $fullPrice = omg_catalog_price($item, $billing);
    if (!$fullPrice || $fullPrice < 1) {
        out(422, ['ok' => false, 'error' => 'That package is priced on request — please get in touch for a quote.']);
    }

    if ($mode === 'full' && !PAYSTACK_ALLOW_FULL_PAYMENT) {
        $mode = 'deposit';
    }

    $amount = $mode === 'deposit' ? omg_deposit_amount($fullPrice) : $fullPrice;
    $label  = omg_catalog_label($item, $billing);
}

if ($amount < 1) {
    out(422, ['ok' => false, 'error' => 'We could not work out the amount to charge. Please contact us.']);
}

// ── Create the order, then the Paystack session ──────────────────────────────
$reference = omg_payment_reference();

$order = [
    'reference'   => $reference,
    'status'      => 'pending',
    'item_id'     => $itemId,
    'item_type'   => $itemType,
    'item_label'  => $label,
    'billing'     => $itemType === 'package' ? $billing : null,
    'mode'        => $mode,
    'full_price'  => $fullPrice,
    'amount'      => $amount,
    'currency'    => PAYSTACK_CURRENCY,
    'paystack_env'=> paystack_mode(),
    'customer'    => [
        'name'    => $name,
        'email'   => $email,
        'phone'   => $phone,
        'company' => $company,
        'notes'   => $notes,
    ],
    'created_at'  => gmdate('c'),
    'updated_at'  => gmdate('c'),
    'ip'          => $_SERVER['REMOTE_ADDR'] ?? null,
];

order_save($order);

$balance = max(0, $fullPrice - $amount);

// custom_fields show up on the transaction in your Paystack dashboard.
$customFields = [
    ['display_name' => 'Service',  'variable_name' => 'service',  'value' => $label],
    ['display_name' => 'Customer', 'variable_name' => 'customer', 'value' => $name],
];
if ($mode === 'deposit') {
    $customFields[] = ['display_name' => 'Package total', 'variable_name' => 'package_total', 'value' => omg_naira($fullPrice)];
    $customFields[] = ['display_name' => 'Balance due',   'variable_name' => 'balance_due',   'value' => omg_naira($balance)];
}
if ($company !== '') {
    $customFields[] = ['display_name' => 'Company', 'variable_name' => 'company', 'value' => $company];
}
if ($phone !== '') {
    $customFields[] = ['display_name' => 'Phone', 'variable_name' => 'phone', 'value' => $phone];
}

$res = paystack_initialize([
    'email'        => $email,
    'amount_naira' => $amount,
    'reference'    => $reference,
    'callback_url' => rtrim(SITE_URL, '/') . PAYSTACK_CALLBACK_PATH,
    'metadata'     => [
        'order_reference' => $reference,
        'item_id'         => $itemId,
        'item_label'      => $label,
        'mode'            => $mode,
        'full_price'      => $fullPrice,
        'balance_due'     => $balance,
        'customer_name'   => $name,
        'customer_phone'  => $phone,
        'company'         => $company,
        'notes'           => $notes,
        'custom_fields'   => $customFields,
    ],
]);

if (!$res['ok'] || empty($res['body']['data']['authorization_url'])) {
    order_mutate($reference, function (array $o) use ($res) {
        $o['status']      = 'init_failed';
        $o['gateway_msg'] = $res['error'];
        $o['updated_at']  = gmdate('c');
        return $o;
    });
    error_log('[paystack] initialize failed for ' . $reference . ': ' . $res['error']);
    out(502, [
        'ok'    => false,
        'error' => 'We could not reach the payment gateway. Please try again in a moment, or contact us and we will invoice you directly.',
    ]);
}

out(200, [
    'ok'         => true,
    'reference'  => $reference,
    'amount'     => $amount,
    'full_price' => $fullPrice,
    'balance'    => $balance,
    'mode'       => $mode,
    'label'      => $label,
    'currency'   => PAYSTACK_CURRENCY,
    'checkout_url' => $res['body']['data']['authorization_url'],
]);
