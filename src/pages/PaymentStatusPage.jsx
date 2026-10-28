import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { verifyPayment, formatNaira } from '../lib/payments';
import { Spinner } from '../components/CheckoutModal';

/**
 * Where Paystack returns the customer after checkout (/payment/callback).
 *
 * Reaching this page proves nothing about the payment, so the first thing it
 * does is ask our server to verify the reference against Paystack.
 */
export default function PaymentStatusPage() {
  const [params]  = useSearchParams();
  const reference = params.get('reference') || params.get('trxref') || '';

  const [state, setState] = useState({ phase: 'loading' });

  useEffect(() => {
    if (!reference) {
      setState({
        phase: 'error',
        error: 'No payment reference was supplied, so there is nothing to confirm.',
      });
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const data = await verifyPayment(reference);
        if (cancelled) return;

        if (data.ok && data.status === 'success') {
          setState({ phase: 'success', payment: data.payment });
        } else if (data.status === 'pending') {
          setState({ phase: 'pending', error: data.error, reference });
        } else if (data.status === 'review' || data.status === 'unknown') {
          setState({ phase: 'review', error: data.error, reference });
        } else {
          setState({ phase: 'failed', error: data.error, reference });
        }
      } catch {
        if (!cancelled) {
          setState({
            phase: 'review',
            error:
              'We could not reach our server to confirm this payment. If you were debited, your payment is safe — email us the reference below.',
            reference,
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <PageWrapper>
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '140px 24px 100px',
          background: 'var(--t-bg)',
        }}
      >
        <div style={{ width: '100%', maxWidth: '560px' }}>
          {state.phase === 'loading' && <LoadingCard />}
          {state.phase === 'success' && <SuccessCard payment={state.payment} />}
          {state.phase === 'pending' && (
            <OutcomeCard
              tone="warn"
              title="Payment not completed"
              body={state.error}
              reference={state.reference}
              primary={{ to: '/pricing', label: 'Back to pricing' }}
            />
          )}
          {state.phase === 'failed' && (
            <OutcomeCard
              tone="error"
              title="Payment unsuccessful"
              body={state.error}
              reference={state.reference}
              primary={{ to: '/pricing', label: 'Try again' }}
            />
          )}
          {state.phase === 'review' && (
            <OutcomeCard
              tone="warn"
              title="We're confirming your payment"
              body={state.error}
              reference={state.reference}
              primary={{ to: '/contact', label: 'Contact support' }}
            />
          )}
          {state.phase === 'error' && (
            <OutcomeCard
              tone="error"
              title="Nothing to confirm"
              body={state.error}
              primary={{ to: '/pricing', label: 'View pricing' }}
            />
          )}
        </div>
      </section>
    </PageWrapper>
  );
}

// ── Cards ────────────────────────────────────────────────────────────────────

const cardStyle = {
  background: 'var(--t-surface)',
  border: '1px solid var(--t-border)',
  borderRadius: '20px',
  padding: 'clamp(28px, 5vw, 44px)',
  textAlign: 'center',
  boxSizing: 'border-box',
};

function LoadingCard() {
  return (
    <div style={cardStyle} aria-live="polite" aria-busy="true">
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--t-a-bg-xs)',
          display: 'grid',
          placeItems: 'center',
          margin: '0 auto 24px',
          color: 'var(--t-accent)',
        }}
      >
        <Spinner size={22} />
      </div>
      <h1 style={{ fontSize: '22px', fontWeight: 900, color: 'var(--t-text)', marginBottom: '10px', letterSpacing: '-0.02em' }}>
        Confirming your payment
      </h1>
      <p style={{ color: 'var(--t-text-2)', fontSize: '15px', lineHeight: 1.7 }}>
        One moment — we're checking this with Paystack. Please don't close this page.
      </p>
    </div>
  );
}

function SuccessCard({ payment }) {
  const isDeposit = payment.mode === 'deposit' && payment.balance > 0;

  return (
    <div style={cardStyle}>
      {/* Tick */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(22,163,74,0.12)',
          border: '1px solid rgba(22,163,74,0.3)',
          display: 'grid',
          placeItems: 'center',
          margin: '0 auto 26px',
          color: '#16a34a',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <p
        style={{
          color: '#16a34a',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        Payment received
      </p>
      <h1
        style={{
          fontSize: 'clamp(24px, 5vw, 32px)',
          fontWeight: 900,
          color: 'var(--t-text)',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          marginBottom: '14px',
        }}
      >
        Thank you, {payment.name.split(' ')[0]}.
      </h1>
      <p style={{ color: 'var(--t-text-2)', fontSize: '15px', lineHeight: 1.75, marginBottom: '32px' }}>
        {isDeposit
          ? 'Your deposit is in and your project is officially booked. A receipt is on its way to your inbox, and a member of the team will reach out within one business day.'
          : 'Your payment is in and a receipt is on its way to your inbox. A member of the team will reach out within one business day.'}
      </p>

      {/* Receipt */}
      <div
        style={{
          background: 'var(--t-bg)',
          border: '1px solid var(--t-border)',
          borderRadius: '14px',
          padding: '22px 24px',
          textAlign: 'left',
          marginBottom: '28px',
        }}
      >
        <ReceiptRow label="Service" value={payment.label} />
        {payment.full_price > 0 && payment.full_price !== payment.amount && (
          <ReceiptRow label="Package total" value={formatNaira(payment.full_price)} />
        )}
        <ReceiptRow label={isDeposit ? 'Deposit paid' : 'Amount paid'} value={formatNaira(payment.amount)} emphasis />
        {isDeposit && <ReceiptRow label="Balance on completion" value={formatNaira(payment.balance)} />}
        <ReceiptRow label="Reference" value={payment.reference} mono />
        <ReceiptRow label="Paid via" value={String(payment.channel).replace(/_/g, ' ')} capitalize />
        <ReceiptRow label="Receipt sent to" value={payment.email} last />
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" data-cursor="hover" style={primaryBtn}>
          Back to home
        </Link>
        <Link to="/portfolio" data-cursor="hover" style={ghostBtn}>
          See our work
        </Link>
      </div>
    </div>
  );
}

function OutcomeCard({ tone, title, body, reference, primary }) {
  const color = tone === 'error' ? '#dc2626' : '#d97706';
  const tint  = tone === 'error' ? 'rgba(220,38,38,0.1)' : 'rgba(217,119,6,0.1)';
  const edge  = tone === 'error' ? 'rgba(220,38,38,0.3)' : 'rgba(217,119,6,0.3)';

  return (
    <div style={cardStyle}>
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: tint,
          border: `1px solid ${edge}`,
          display: 'grid',
          placeItems: 'center',
          margin: '0 auto 26px',
          color,
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="13" />
          <line x1="12" y1="16.5" x2="12.01" y2="16.5" />
        </svg>
      </div>

      <h1
        style={{
          fontSize: 'clamp(22px, 4.5vw, 28px)',
          fontWeight: 900,
          color: 'var(--t-text)',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          marginBottom: '14px',
        }}
      >
        {title}
      </h1>
      <p style={{ color: 'var(--t-text-2)', fontSize: '15px', lineHeight: 1.75, marginBottom: reference ? '24px' : '32px' }}>
        {body}
      </p>

      {reference && (
        <div
          style={{
            background: 'var(--t-bg)',
            border: '1px solid var(--t-border)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '28px',
          }}
        >
          <p style={{ color: 'var(--t-text-3)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
            Your reference
          </p>
          <p style={{ color: 'var(--t-text)', fontSize: '15px', fontWeight: 700, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', wordBreak: 'break-all' }}>
            {reference}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to={primary.to} data-cursor="hover" style={primaryBtn}>
          {primary.label}
        </Link>
        <Link to="/contact" data-cursor="hover" style={ghostBtn}>
          Get in touch
        </Link>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value, emphasis, mono, capitalize, last }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: '16px',
        padding: '11px 0',
        borderBottom: last ? 'none' : '1px solid var(--t-border)',
      }}
    >
      <span style={{ color: 'var(--t-text-3)', fontSize: '13px', flexShrink: 0 }}>{label}</span>
      <span
        style={{
          color: emphasis ? 'var(--t-accent)' : 'var(--t-text)',
          fontSize: emphasis ? '19px' : '13.5px',
          fontWeight: emphasis ? 900 : 600,
          textAlign: 'right',
          fontFamily: mono ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit',
          textTransform: capitalize ? 'capitalize' : 'none',
          letterSpacing: emphasis ? '-0.02em' : 0,
          wordBreak: mono ? 'break-all' : 'normal',
        }}
      >
        {value}
      </span>
    </div>
  );
}

const primaryBtn = {
  display: 'inline-block',
  background: 'var(--t-accent)',
  color: 'var(--t-on-accent)',
  fontWeight: 700,
  fontSize: '14px',
  padding: '14px 30px',
  borderRadius: '10px',
  textDecoration: 'none',
  cursor: 'none',
};

const ghostBtn = {
  display: 'inline-block',
  background: 'transparent',
  color: 'var(--t-text-2)',
  fontWeight: 700,
  fontSize: '14px',
  padding: '14px 30px',
  borderRadius: '10px',
  border: '1px solid var(--t-border-m)',
  textDecoration: 'none',
  cursor: 'none',
};
