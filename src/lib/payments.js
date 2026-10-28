const API_BASE = import.meta.env.VITE_API_BASE || '';

/** Percentage of a package price taken as a deposit at checkout. */
export const DEPOSIT_PERCENT = 50;

export const MIN_CUSTOM_AMOUNT = 5000;
export const MAX_CUSTOM_AMOUNT = 20000000;

export function formatNaira(amount) {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return '—';
  return '₦' + Number(amount).toLocaleString('en-NG');
}

/** The deposit shown in the UI. The server recalculates it before charging. */
export function depositOf(fullPrice) {
  return Math.round((fullPrice * DEPOSIT_PERCENT) / 100);
}

/**
 * Build the catalog id the API expects for a pricing-page tier.
 * Must match the keys in includes/catalog.php.
 */
export function tierItemId(categoryId, tierName) {
  return `${categoryId}:${tierName.toLowerCase()}`;
}

/**
 * Start a checkout. Resolves with the Paystack URL to send the customer to.
 * Throws an Error whose message is safe to show in the UI, and carries
 * `.fields` when the server flagged specific inputs.
 */
export async function createCheckout(payload) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/paystack-init.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Network error. Please check your connection and try again.');
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('The payment service returned an unexpected response. Please try again.');
  }

  if (!data.ok || !data.checkout_url) {
    const err = new Error(data.error || 'We could not start the payment. Please try again.');
    err.fields = data.fields || null;
    throw err;
  }

  return data;
}

/** Confirm a payment by reference. Never trust the redirect alone. */
export async function verifyPayment(reference) {
  const res = await fetch(
    `${API_BASE}/api/paystack-verify.php?reference=${encodeURIComponent(reference)}`
  );
  return res.json();
}
