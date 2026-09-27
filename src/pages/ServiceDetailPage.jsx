import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { services } from '../data/services';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!service) {
    return (
      <PageWrapper>
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
          <h1 style={{ color: 'var(--t-text)', fontSize: '48px', fontWeight: 900 }}>Service Not Found</h1>
          <Link to="/services" style={{ color: 'var(--t-accent)', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>← Back to Services</Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <section
        className="r-page-hero"
        style={{
          minHeight: '50vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '140px 40px 60px',
          overflow: 'hidden',
        }}
      >
        <img
          src={service.heroImage}
          alt={service.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.75,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--t-hero-grad)' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative' }}>
          <Link to="/services" style={{ color: 'var(--t-text-2)', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--t-accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--t-text-2)'}
          >
            ← Back to Services
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <span style={{ background: 'var(--t-accent)', color: 'var(--t-on-accent)', fontSize: '11px', fontWeight: 800, padding: '6px 16px', borderRadius: '999px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {service.number}
            </span>
          </div>
          <h1 data-reveal style={{ fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '16px' }}>
            {service.title}
          </h1>
          <p data-reveal data-delay="0.1" style={{ color: 'var(--t-text-2)', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '560px' }}>
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* Description + Features */}
      <section style={{ padding: '80px 40px', background: 'var(--t-bg)' }}>
        <div className="r-gap-80" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px' }}>
          <div>
            <h2 data-reveal style={{ fontSize: '28px', fontWeight: 800, color: 'var(--t-text)', marginBottom: '20px' }}>Overview</h2>
            <p data-reveal data-delay="0.1" style={{ color: 'var(--t-text-2)', fontSize: '16px', lineHeight: 1.8 }}>{service.description}</p>
          </div>
          <div>
            <h2 data-reveal style={{ fontSize: '28px', fontWeight: 800, color: 'var(--t-text)', marginBottom: '20px' }}>What's Included</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.features.map((f, i) => (
                <div
                  key={f}
                  data-reveal
                  data-delay={i * 0.06}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'var(--t-surface)',
                    border: '1px solid var(--t-border)',
                    borderRadius: '10px',
                    padding: '14px 18px',
                  }}
                >
                  <span style={{ color: 'var(--t-accent)', fontSize: '16px', fontWeight: 700 }}>✓</span>
                  <span style={{ color: 'var(--t-text)', fontSize: '15px', fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '80px 40px', background: 'var(--t-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 data-reveal style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '48px' }}>
            Our Process
          </h2>
          <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}>
            {service.process.map((step, i) => (
              <div
                key={step}
                data-reveal
                data-delay={i * 0.08}
                style={{
                  flex: '1',
                  minWidth: '140px',
                  padding: '28px 24px',
                  borderLeft: i === 0 ? 'none' : '1px solid var(--t-border)',
                  position: 'relative',
                }}
              >
                <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--t-ghost)', lineHeight: 1, marginBottom: '12px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ color: 'var(--t-text)', fontWeight: 600, fontSize: '15px' }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ padding: '80px 40px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 data-reveal style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '40px' }}>
            Sample Work
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {service.gallery.map((img, i) => (
              <div
                key={i}
                data-reveal
                data-delay={i * 0.1}
                data-cursor="hover"
                style={{
                  aspectRatio: '16/10',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--t-border)',
                }}
              >
                <img src={img} alt={`${service.title} sample ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 40px', background: 'var(--t-surface)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 data-reveal style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '40px' }}>
            FAQ
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {service.faq.map((item, i) => (
              <div
                key={i}
                data-reveal
                data-delay={i * 0.08}
                style={{
                  background: 'var(--t-bg)',
                  border: `1px solid ${openFaq === i ? 'var(--t-accent)' : 'var(--t-border)'}`,
                  borderRadius: '14px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-cursor="hover"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'none',
                    color: 'var(--t-text)',
                    fontSize: '16px',
                    fontWeight: 600,
                    textAlign: 'left',
                    gap: '16px',
                  }}
                >
                  {item.q}
                  <span style={{ color: 'var(--t-accent)', fontSize: '20px', fontWeight: 700, flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', color: 'var(--t-text-2)', fontSize: '15px', lineHeight: 1.7 }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', background: 'var(--t-bg)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 data-reveal style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Ready to get started?
          </h2>
          <p data-reveal data-delay="0.1" style={{ color: 'var(--t-text-2)', fontSize: '16px', marginBottom: '32px' }}>
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
          <Link
            to="/contact"
            data-cursor="hover"
            data-reveal
            data-delay="0.2"
            style={{
              display: 'inline-block',
              background: 'var(--t-accent)',
              color: 'var(--t-on-accent)',
              fontWeight: 700,
              fontSize: '15px',
              padding: '16px 44px',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--t-accent-h)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--t-accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
