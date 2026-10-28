import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import HeroBackground from '../components/HeroBackground';
import { Spinner, TransferNote } from '../components/CheckoutModal';
import {
  createCheckout,
  formatNaira,
  MIN_CUSTOM_AMOUNT,
  MAX_CUSTOM_AMOUNT,
} from '../lib/payments';

/**
 * /pay — pay an exact amount.
 *
 * For balance payments on a delivered project, agreed Enterprise figures and
 * retainer top-ups, where the amount comes from an invoice rather than the
 * pricing table.
 */
export default function PayPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    amount: '',
    description: '',
    notes: '',
  });
  const [errors, setErrors]   = useState({});
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const amountNumber = Number(String(form.amount).replace(/[^0-9.]/g, ''));
  const amountValid  = amountNumber >= MIN_CUSTOM_AMOUNT && amountNumber <= MAX_CUSTOM_AMOUNT;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!form.email.trim()) next.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = 'Please enter a valid email address.';
    if (form.phone.trim() && !/^[0-9+()\-\s]{7,40}$/.test(form.phone.trim()))
      next.phone = 'Please enter a valid phone number.';
    if (!form.amount.trim()) next.amount = 'Please enter the amount you want to pay.';
    else if (!Number.isFinite(amountNumber) || amountNumber <= 0)
      next.amount = 'Please enter a valid amount.';
    else if (amountNumber < MIN_CUSTOM_AMOUNT)
      next.amount = `The minimum online payment is ${formatNaira(MIN_CUSTOM_AMOUNT)}.`;
    else if (amountNumber > MAX_CUSTOM_AMOUNT)
      next.amount = `For amounts above ${formatNaira(MAX_CUSTOM_AMOUNT)}, please contact us to arrange a transfer.`;
    if (!form.description.trim()) next.description = 'Please tell us what this payment is for.';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setLoading(true);
    try {
      const data = await createCheckout({
        item:        'custom',
        amount:      amountNumber,
        description: form.description,
        name:        form.name,
        email:       form.email,
        phone:       form.phone,
        company:     form.company,
        notes:       form.notes,
      });
      window.location.href = data.checkout_url;
    } catch (err) {
      setError(err.message);
      if (err.fields) setErrors(err.fields);
      setLoading(false);
    }
  };

  const fieldStyle = (name) => ({
    width: '100%',
    background: 'var(--t-input-bg)',
    border: `1px solid ${
      errors[name] ? '#dc2626' : focused === name ? 'var(--t-accent)' : 'var(--t-border-m)'
    }`,
    borderRadius: '10px',
    padding: '14px 18px',
    color: 'var(--t-text)',
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === name ? '0 0 0 3px var(--t-a-bg-xs)' : 'none',
    boxSizing: 'border-box',
  });

  const ctx = { form, errors, fieldStyle, onChange: handleChange, onFocus: setFocused };

  return (
    <PageWrapper>
      {/* Hero */}
      {/* Deliberately NOT .r-page-hero — that class forces 82vh, which would
          push the amount field below the fold on a page whose whole job is
          the form. */}
      <section
        className="r-pay-hero"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          padding: '130px 40px 48px',
          background: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <HeroBackground image="/images/price.jpg" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <p
            data-reveal
            style={{
              color: 'var(--t-accent)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Home / Make a Payment
          </p>
          <h1
            data-reveal
            data-delay="0.1"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '18px',
            }}
          >
            Make a Payment
          </h1>
          <p
            data-reveal
            data-delay="0.2"
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'clamp(15px, 2vw, 19px)',
              maxWidth: '560px',
              lineHeight: 1.7,
            }}
          >
            Settling a project balance, an agreed Enterprise figure or a retainer? Enter the amount
            from your invoice and pay securely by card, bank transfer or USSD.
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: '56px 40px 100px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <form
            onSubmit={handleSubmit}
            noValidate
            data-reveal
            style={{
              background: 'var(--t-surface)',
              border: '1px solid var(--t-border)',
              borderRadius: '20px',
              padding: 'clamp(26px, 5vw, 44px)',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Amount — the hero field */}
              <div>
                <label htmlFor="pay-amount" style={labelStyle}>
                  Amount <span style={{ color: 'var(--t-accent)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '18px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--t-text-3)',
                      fontSize: '22px',
                      fontWeight: 800,
                      pointerEvents: 'none',
                    }}
                  >
                    ₦
                  </span>
                  <input
                    id="pay-amount"
                    name="amount"
                    type="text"
                    inputMode="numeric"
                    value={form.amount}
                    onChange={handleChange}
                    onFocus={() => setFocused('amount')}
                    onBlur={() => setFocused('')}
                    placeholder="250,000"
                    aria-invalid={!!errors.amount}
                    aria-describedby={errors.amount ? 'pay-amount-err' : 'pay-amount-hint'}
                    style={{
                      ...fieldStyle('amount'),
                      paddingLeft: '44px',
                      fontSize: '24px',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      padding: '18px 18px 18px 44px',
                    }}
                  />
                </div>
                {errors.amount ? (
                  <p id="pay-amount-err" style={errStyle}>
                    {errors.amount}
                  </p>
                ) : (
                  <p id="pay-amount-hint" style={hintStyle}>
                    {amountValid
                      ? `You will be charged ${formatNaira(amountNumber)}.`
                      : `Between ${formatNaira(MIN_CUSTOM_AMOUNT)} and ${formatNaira(MAX_CUSTOM_AMOUNT)}.`}
                  </p>
                )}
              </div>

              <PayField
                ctx={ctx}
                name="description"
                label="What is this payment for?"
                required
                placeholder="e.g. Balance — Growth Web Development (invoice #104)"
                hint="Include your invoice number or project name so we can match the payment."
              />

              <div style={{ height: '1px', background: 'var(--t-border)', margin: '4px 0' }} />

              <PayField ctx={ctx} name="name" label="Full name" required autoComplete="name" placeholder="Jane Okafor" />
              <PayField ctx={ctx} name="email" label="Email address" type="email" required autoComplete="email" placeholder="jane@company.com" hint="Your receipt goes here." />

              <div className="co-row2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <PayField ctx={ctx} name="phone" label="Phone" type="tel" autoComplete="tel" placeholder="080 1234 5678" />
                <PayField ctx={ctx} name="company" label="Company" autoComplete="organization" placeholder="Optional" />
              </div>

              <PayField ctx={ctx} name="notes" label="Notes" rows={3} placeholder="Anything else we should know? (optional)" />
            </div>

            {error && (
              <div
                role="alert"
                style={{
                  background: 'rgba(220,38,38,0.08)',
                  border: '1px solid rgba(220,38,38,0.3)',
                  borderRadius: '10px',
                  padding: '14px 18px',
                  color: '#dc2626',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  marginTop: '24px',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              data-cursor="hover"
              className="co-submit"
              style={{
                width: '100%',
                marginTop: '28px',
                background: 'var(--t-accent)',
                color: 'var(--t-on-accent)',
                border: 'none',
                borderRadius: '12px',
                padding: '17px',
                fontSize: '15px',
                fontWeight: 800,
                fontFamily: 'Inter, sans-serif',
                cursor: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                opacity: loading ? 0.7 : 1,
                transition: 'background 0.2s, transform 0.2s, opacity 0.2s',
              }}
            >
              {loading ? (
                <>
                  <Spinner />
                  Redirecting to Paystack…
                </>
              ) : (
                <>
                  {amountValid ? `Pay ${formatNaira(amountNumber)}` : 'Continue to Payment'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '16px',
                color: 'var(--t-text-3)',
                fontSize: '12px',
                textAlign: 'center',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }} aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span>
                Secured by <strong style={{ color: 'var(--t-text-2)', fontWeight: 700 }}>Paystack</strong> · We never see or store your card details
              </span>
            </div>

            <TransferNote />
          </form>

          <p
            data-reveal
            style={{
              textAlign: 'center',
              color: 'var(--t-text-3)',
              fontSize: '14px',
              lineHeight: 1.7,
              marginTop: '28px',
            }}
          >
            Looking to start a new project?{' '}
            <Link to="/pricing" data-cursor="hover" style={{ color: 'var(--t-accent)', fontWeight: 700, textDecoration: 'none' }}>
              Browse our packages
            </Link>{' '}
            or{' '}
            <Link to="/contact" data-cursor="hover" style={{ color: 'var(--t-accent)', fontWeight: 700, textDecoration: 'none' }}>
              request a quote
            </Link>
            .
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}

// ── Field ────────────────────────────────────────────────────────────────────

const labelStyle = {
  display: 'block',
  color: 'var(--t-text-2)',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: '9px',
};

const errStyle  = { color: '#dc2626', fontSize: '12.5px', marginTop: '7px', lineHeight: 1.5 };
const hintStyle = { color: 'var(--t-text-3)', fontSize: '12.5px', marginTop: '7px', lineHeight: 1.5 };

/** Module scope, so typing never remounts the input. */
function PayField({ ctx, name, label, type = 'text', placeholder, required, autoComplete, rows, hint }) {
  const { form, errors, fieldStyle, onChange, onFocus } = ctx;
  const err   = errors[name];
  const errId = `pay-${name}-err`;
  const hintId = `pay-${name}-hint`;

  const shared = {
    id: `pay-${name}`,
    name,
    value: form[name],
    onChange,
    onFocus: () => onFocus(name),
    onBlur: () => onFocus(''),
    placeholder,
    'aria-invalid': !!err,
    'aria-describedby': err ? errId : hint ? hintId : undefined,
  };

  return (
    <div>
      <label htmlFor={`pay-${name}`} style={labelStyle}>
        {label}
        {required && <span style={{ color: 'var(--t-accent)' }}> *</span>}
      </label>
      {rows ? (
        <textarea {...shared} rows={rows} style={{ ...fieldStyle(name), resize: 'vertical', lineHeight: 1.6 }} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} style={fieldStyle(name)} />
      )}
      {err ? (
        <p id={errId} style={errStyle}>
          {err}
        </p>
      ) : hint ? (
        <p id={hintId} style={hintStyle}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
