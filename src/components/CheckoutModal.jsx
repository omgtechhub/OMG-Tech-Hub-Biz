import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { getLenis } from '../lib/animations/lenis';
import { createCheckout, formatNaira, depositOf, DEPOSIT_PERCENT } from '../lib/payments';

/**
 * Deposit checkout dialog.
 *
 * Collects the details we need to start the project, shows an unambiguous
 * breakdown of what is charged now versus later, then hands the customer to
 * Paystack. Amounts here are display-only — includes/catalog.php decides what
 * is actually charged.
 *
 * Props:
 *   item     { id, label, fullPrice, billing, note }  — required
 *   onClose  () => void
 */
export default function CheckoutModal({ item, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });
  const [errors, setErrors]   = useState({});
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const dialogRef  = useRef(null);
  const firstField = useRef(null);
  const restoreRef = useRef(null);

  const deposit = depositOf(item.fullPrice);
  const balance = item.fullPrice - deposit;

  // ── Focus management, scroll lock, Esc ──────────────────────────────────
  const close = useCallback(() => {
    if (!loading) onClose();
  }, [loading, onClose]);

  useEffect(() => {
    restoreRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    // The site runs Lenis with smoothWheel, which swallows wheel events at the
    // window and scrolls the page itself. With the dialog open that means the
    // page behind moves while the dialog stays put, and only dragging the
    // scrollbar works. Pausing Lenis hands the wheel back to the browser; the
    // data-lenis-prevent attributes below are the belt to this braces.
    const lenis = getLenis();
    lenis?.stop();

    // preventScroll — focusing the first field must not scroll the dialog's
    // own header (and close button) out of view.
    const t = setTimeout(() => firstField.current?.focus({ preventScroll: true }), 60);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      // Keep Tab inside the dialog.
      const nodes = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), input, select, textarea, a[href]'
      );
      if (!nodes || !nodes.length) return;
      const first = nodes[0];
      const last  = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKeyDown, true);
      document.body.style.overflow = overflow;
      lenis?.start();
      restoreRef.current?.focus?.();
    };
  }, [close]);

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
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      const el = dialogRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`);
      el?.focus();
      return;
    }

    setLoading(true);
    try {
      const data = await createCheckout({
        item:    item.id,
        billing: item.billing || 'monthly',
        mode:    'deposit',
        ...form,
      });
      // Leaving the SPA for Paystack's hosted checkout.
      window.location.href = data.checkout_url;
    } catch (err) {
      setError(err.message);
      if (err.fields) setErrors(err.fields);
      setLoading(false);
    }
  };

  // ── Shared field styles ─────────────────────────────────────────────────
  const fieldStyle = (name) => ({
    width: '100%',
    background: 'var(--t-input-bg)',
    border: `1px solid ${
      errors[name] ? '#dc2626' : focused === name ? 'var(--t-accent)' : 'var(--t-border-m)'
    }`,
    borderRadius: '10px',
    padding: '13px 16px',
    color: 'var(--t-text)',
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === name ? '0 0 0 3px var(--t-a-bg-xs)' : 'none',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    display: 'block',
    color: 'var(--t-text-2)',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  };

  // Field is declared at module scope, not here — a component defined inside
  // the render body gets a new type on every keystroke and remounts the input,
  // which drops focus mid-typing. This object just carries the wiring to it.
  const ctx = {
    form,
    errors,
    labelStyle,
    fieldStyle,
    onChange: handleChange,
    onFocus: setFocused,
    firstField,
  };

  // Rendered into document.body on purpose. The page-transition wrapper applies
  // a transform, which creates a stacking context — inside it, no z-index can
  // lift the dialog above the fixed navbar or the floating chat buttons.
  return createPortal(
    <div
      className="co-backdrop"
      data-lenis-prevent
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(8,8,10,0.72)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="co-title"
        data-lenis-prevent
        className="co-dialog"
        style={{
          background: 'var(--t-bg)',
          border: '1px solid var(--t-border)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '520px',
          maxHeight: 'calc(100vh - 48px)',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          boxShadow: '0 32px 90px rgba(0,0,0,0.45)',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          disabled={loading}
          aria-label="Close checkout"
          data-cursor="hover"
          className="co-close"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: '1px solid var(--t-border)',
            background: 'var(--t-surface)',
            color: 'var(--t-text-2)',
            display: 'grid',
            placeItems: 'center',
            fontSize: '17px',
            lineHeight: 1,
            cursor: 'none',
            transition: 'background 0.2s, color 0.2s',
            opacity: loading ? 0.4 : 1,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="co-pad" style={{ padding: '32px 32px 24px' }}>
          <p
            style={{
              color: 'var(--t-accent)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            Secure Checkout
          </p>
          <h2
            id="co-title"
            style={{
              fontSize: 'clamp(21px, 4.5vw, 26px)',
              fontWeight: 900,
              color: 'var(--t-text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              paddingRight: '40px',
            }}
          >
            {item.label}
          </h2>
          {item.note && (
            <p style={{ color: 'var(--t-text-3)', fontSize: '13px', marginTop: '10px', lineHeight: 1.6 }}>
              {item.note}
            </p>
          )}
        </div>

        {/* Breakdown */}
        <div className="co-pad" style={{ padding: '0 32px 28px' }}>
          <div
            style={{
              background: 'var(--t-surface)',
              border: '1px solid var(--t-border)',
              borderRadius: '14px',
              padding: '20px 22px',
            }}
          >
            <Row label="Package total" value={formatNaira(item.fullPrice)} muted />
            <div style={{ height: '1px', background: 'var(--t-border)', margin: '14px 0' }} />
            <Row
              label={`Deposit due now (${DEPOSIT_PERCENT}%)`}
              value={formatNaira(deposit)}
              emphasis
            />
            <div style={{ height: '1px', background: 'var(--t-border)', margin: '14px 0' }} />
            <Row label="Balance on completion" value={formatNaira(balance)} muted />
          </div>
          <p
            style={{
              color: 'var(--t-text-3)',
              fontSize: '12.5px',
              lineHeight: 1.65,
              marginTop: '12px',
            }}
          >
            You pay the {DEPOSIT_PERCENT}% deposit today to begin. The balance is invoiced when the
            work is delivered.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div
            className="co-pad"
            style={{ padding: '0 32px', display: 'flex', flexDirection: 'column', gap: '18px' }}
          >
            <Field ctx={ctx} name="name" label="Full name" required autoComplete="name" placeholder="Jane Okafor" />
            <Field
              ctx={ctx}
              name="email"
              label="Email address"
              type="email"
              required
              autoComplete="email"
              placeholder="jane@company.com"
            />
            <div className="co-row2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <Field ctx={ctx} name="phone" label="Phone" type="tel" autoComplete="tel" placeholder="080 1234 5678" />
              <Field ctx={ctx} name="company" label="Company" autoComplete="organization" placeholder="Optional" />
            </div>
            <Field
              ctx={ctx}
              name="notes"
              label="Project notes"
              rows={3}
              placeholder="Anything we should know before we start? (optional)"
            />
          </div>

          {error && (
            <div className="co-pad" style={{ padding: '18px 32px 0' }}>
              <div
                role="alert"
                style={{
                  background: 'rgba(220,38,38,0.08)',
                  border: '1px solid rgba(220,38,38,0.3)',
                  borderRadius: '10px',
                  padding: '13px 16px',
                  color: '#dc2626',
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                }}
              >
                {error}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="co-pad" style={{ padding: '24px 32px 28px' }}>
            <button
              type="submit"
              disabled={loading}
              data-cursor="hover"
              className="co-submit"
              style={{
                width: '100%',
                background: 'var(--t-accent)',
                color: 'var(--t-on-accent)',
                border: 'none',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '15px',
                fontWeight: 800,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-0.01em',
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
                  Pay {formatNaira(deposit)} Deposit
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>

            {/* Trust row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '16px',
                color: 'var(--t-text-3)',
                fontSize: '12px',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span>
                Secured by <strong style={{ color: 'var(--t-text-2)', fontWeight: 700 }}>Paystack</strong> · Card, bank transfer, USSD
              </span>
            </div>

            <TransferNote />
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

/**
 * Module-scope so the input keeps its identity (and the caret) across renders.
 */
function Field({ ctx, name, label, type = 'text', placeholder, required, autoComplete, rows }) {
  const { form, errors, labelStyle, fieldStyle, onChange, onFocus, firstField } = ctx;
  const err    = errors[name];
  const errId  = `co-${name}-err`;
  const shared = {
    id: `co-${name}`,
    name,
    value: form[name],
    onChange,
    onFocus: () => onFocus(name),
    onBlur: () => onFocus(''),
    placeholder,
    'aria-invalid': !!err,
    'aria-describedby': err ? errId : undefined,
  };

  return (
    <div>
      <label htmlFor={`co-${name}`} style={labelStyle}>
        {label}
        {required && <span style={{ color: 'var(--t-accent)' }}> *</span>}
      </label>
      {rows ? (
        <textarea
          {...shared}
          rows={rows}
          style={{ ...fieldStyle(name), resize: 'vertical', lineHeight: 1.6 }}
        />
      ) : (
        <input
          {...shared}
          ref={name === 'name' ? firstField : undefined}
          type={type}
          autoComplete={autoComplete}
          style={fieldStyle(name)}
        />
      )}
      {err && (
        <p id={errId} style={{ color: '#dc2626', fontSize: '12.5px', marginTop: '6px' }}>
          {err}
        </p>
      )}
    </div>
  );
}

/**
 * Pay with Transfer hands the customer a TEMPORARY Paystack-managed account,
 * so it is named "PAYSTACK CHECKOUT" rather than OMG Tech Hub. That is normal,
 * but unexplained it reads as a wrong recipient and people abandon the payment.
 * Saying it up front turns the confusing part into a trust signal.
 */
export function TransferNote() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '9px',
        marginTop: '14px',
        padding: '12px 14px',
        background: 'var(--t-surface-2, var(--t-surface))',
        border: '1px solid var(--t-border)',
        borderRadius: '10px',
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        style={{ color: 'var(--t-text-3)', flexShrink: 0, marginTop: '2px' }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <p style={{ color: 'var(--t-text-3)', fontSize: '12.5px', lineHeight: 1.6, margin: 0 }}>
        Paying by bank transfer? The account will show as{' '}
        <strong style={{ color: 'var(--t-text-2)', fontWeight: 700 }}>PAYSTACK CHECKOUT</strong> —
        that is Paystack&rsquo;s secure account, not a third party. Your payment reaches OMG Tech Hub
        straight away.
      </p>
    </div>
  );
}

function Row({ label, value, muted, emphasis }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '14px' }}>
      <span
        style={{
          color: muted ? 'var(--t-text-3)' : 'var(--t-text-2)',
          fontSize: emphasis ? '14px' : '13.5px',
          fontWeight: emphasis ? 700 : 500,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: emphasis ? 'var(--t-accent)' : 'var(--t-text-2)',
          fontSize: emphasis ? '22px' : '14px',
          fontWeight: emphasis ? 900 : 600,
          letterSpacing: emphasis ? '-0.02em' : 0,
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function Spinner({ size = 15 }) {
  return (
    <span
      className="co-spin"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  );
}
