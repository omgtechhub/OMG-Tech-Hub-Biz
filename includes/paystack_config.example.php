<?php
// ─────────────────────────────────────────────────────────────────────────────
//  Paystack Credentials  —  OMG Tech Hub
// ─────────────────────────────────────────────────────────────────────────────
//  WHERE TO GET THESE KEYS
//    1. Log in at  https://dashboard.paystack.com
//    2. Go to  Settings → API Keys & Webhooks
//    3. Copy the Secret Key and Public Key and paste them below
//
//  TEST vs LIVE
//    Test keys start with  sk_test_  /  pk_test_   → no real money moves
//    Live keys start with  sk_live_  /  pk_live_   → real money, real payouts
//    Start with TEST keys, confirm a payment lands, then swap to LIVE.
//
//  SECURITY
//    The SECRET key must never leave the server. This folder is already
//    locked down by includes/.htaccess ("Deny from all"), and the key is
//    never sent to the browser. Do not paste the secret key into any
//    file inside src/, dist/ or public/.
// ─────────────────────────────────────────────────────────────────────────────

// ── API Keys ──────────────────────────────────────────────────────────────
define('PAYSTACK_SECRET_KEY', 'PASTE_YOUR_SECRET_KEY_HERE');
define('PAYSTACK_PUBLIC_KEY', 'PASTE_YOUR_PUBLIC_KEY_HERE');

// ── Webhook ───────────────────────────────────────────────────────────────
//  In the Paystack dashboard (Settings → API Keys & Webhooks) set the
//  Webhook URL to:   https://omgtechhub.great-site.net/api/paystack-webhook.php
//  Paystack signs every webhook with the secret key above, so there is
//  nothing extra to configure here.

// ── Currency ──────────────────────────────────────────────────────────────
//  Must be a currency enabled on your Paystack account.
define('PAYSTACK_CURRENCY', 'NGN');

// ── Deposit model ─────────────────────────────────────────────────────────
//  The pricing page promises "50% deposit to begin, balance on completion".
//  Packages and add-ons therefore charge this percentage at checkout.
define('PAYSTACK_DEPOSIT_PERCENT', 50);

//  Set to true if you later want to offer "Pay in full" at checkout as well.
//  The API rejects full-payment requests while this is false.
define('PAYSTACK_ALLOW_FULL_PAYMENT', false);

// ── Custom / invoice payments ─────────────────────────────────────────────
//  Bounds for the "Pay an invoice" page, in naira. These stop a typo (or a
//  tampered request) turning into a ₦1 or ₦900,000,000 transaction.
define('PAYSTACK_MIN_CUSTOM_AMOUNT', 5000);
define('PAYSTACK_MAX_CUSTOM_AMOUNT', 20000000);

// ── Checkout channels ─────────────────────────────────────────────────────
//  Which payment methods appear on the Paystack checkout page.
define('PAYSTACK_CHANNELS', ['card', 'bank', 'ussd', 'bank_transfer', 'qr']);

// ── Where Paystack returns the customer after payment ─────────────────────
//  A React route — handled by PaymentStatusPage, which verifies the payment.
define('PAYSTACK_CALLBACK_PATH', '/payment/callback');

// ── Order storage ─────────────────────────────────────────────────────────
define('ORDERS_FILE', DATA_DIR . 'orders.json');
