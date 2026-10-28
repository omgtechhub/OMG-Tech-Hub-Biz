# Paystack Setup — OMG Tech Hub

Payments are collected through Paystack and land in the Paystack account whose
keys are in `includes/paystack_config.php`.

---

## 1. Paste your keys

Open **`includes/paystack_config.php`** (lines 23–24) and replace the placeholders:

```php
define('PAYSTACK_SECRET_KEY', 'sk_test_xxxxxxxxxxxxxxxxxxxx');
define('PAYSTACK_PUBLIC_KEY', 'pk_test_xxxxxxxxxxxxxxxxxxxx');
```

Keys come from **dashboard.paystack.com → Settings → API Keys & Webhooks**.

Start with the `sk_test_` / `pk_test_` pair. Admin → Payments shows an orange
**"Test mode"** banner so you always know which account money is going to.
Swap in the `sk_live_` / `pk_live_` pair when you are ready to take real money.

Until a real key is pasted, checkout is switched off cleanly: customers are told
to use the contact form instead. Nothing breaks.

**The secret key must never go in `src/`, `dist/` or `public/`** — those are shipped
to browsers. `includes/` is blocked from the web by `includes/.htaccess`.

## 2. Set the webhook

In the same Paystack settings screen, set the **Webhook URL** to:

```
https://omgtechhub.great-site.net/api/paystack-webhook.php
```

This is what marks an order paid when a customer closes the tab before being
redirected back. Paystack signs every call with your secret key; unsigned or
wrongly-signed requests are rejected.

## 3. Test it

1. Open `/pricing`, pick any package, fill the form, click **Pay … Deposit**.
2. On Paystack's checkout use the test card `4084 0840 8408 4081`,
   any future expiry, CVV `408`, PIN `0000`, OTP `123456`.
3. You should land on `/payment/callback` with a receipt panel, get an email,
   and see the row appear in **Admin → Payments**.

---

## How it works

| File | Role |
|---|---|
| `includes/paystack_config.php` | Your keys and the deposit/amount settings |
| `includes/catalog.php` | **Server-side prices.** The browser sends an item id, never an amount |
| `includes/paystack.php` | API calls, order storage, receipt emails |
| `api/paystack-init.php` | Starts a checkout, returns the Paystack URL |
| `api/paystack-verify.php` | Confirms a payment after the redirect |
| `api/paystack-webhook.php` | Paystack's server-to-server notification |
| `admin/payments.php` | Transactions, totals, outstanding balances |
| `src/components/CheckoutModal.jsx` | The deposit checkout dialog |
| `src/pages/PayPage.jsx` | `/pay` — pay an exact invoice amount |
| `src/pages/PaymentStatusPage.jsx` | `/payment/callback` — the result screen |

**Prices live in two places and must be kept in step:** `includes/catalog.php`
(what is charged) and `src/pages/PricingPage.jsx` (what is displayed). The
catalog is the one that decides the customer's bill — a tampered request cannot
buy the Premium package for ₦1.

**Packages and add-ons charge a 50% deposit.** To offer full payment as well,
set `PAYSTACK_ALLOW_FULL_PAYMENT` to `true` in `includes/paystack_config.php`
and send `mode: 'full'` from the checkout.

**`/pay` charges the exact amount entered**, bounded by
`PAYSTACK_MIN_CUSTOM_AMOUNT` / `PAYSTACK_MAX_CUSTOM_AMOUNT`. Use it for balance
payments, Enterprise deals and retainers.

---

## Deploying

Upload to InfinityFree: `includes/`, `api/`, `admin/`, the rebuilt `dist/`
contents, and the updated `data/.htaccess`.

`data/orders.json` is created on the server on the first checkout — **do not
upload a local copy over it**, or you will wipe real orders.

> **Check outbound connections work.** Paystack is called server-to-server from
> PHP. Some free hosting tiers block outbound HTTPS. If checkout returns
> *"We could not reach the payment gateway"* on the live site but works locally,
> that is the cause — ask InfinityFree to allow outbound HTTPS to
> `api.paystack.co`, or move to a host that permits it.
