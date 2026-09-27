import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import HeroBackground from '../components/HeroBackground';

const API_BASE = import.meta.env.VITE_API_BASE || '';

const graphicBudgets = [
  { value: 'Starter Plan — ₦80,000',      label: 'Starter Plan — ₦80,000' },
  { value: 'Growth Plan — ₦200,000',      label: 'Growth Plan — ₦200,000' },
  { value: 'Premium Plan — ₦450,000',     label: 'Premium Plan — ₦450,000' },
  { value: 'Enterprise — Custom Quote',   label: 'Enterprise — Custom Quote' },
];

const webBudgets = [
  { value: 'Starter Plan — ₦200,000',     label: 'Starter Plan — ₦200,000' },
  { value: 'Growth Plan — ₦500,000',      label: 'Growth Plan — ₦500,000' },
  { value: 'Premium Plan — ₦1,200,000',   label: 'Premium Plan — ₦1,200,000' },
  { value: 'Enterprise — Custom Quote',   label: 'Enterprise — Custom Quote' },
];

const uiuxBudgets = [
  { value: 'Starter Plan — ₦150,000',     label: 'Starter Plan — ₦150,000' },
  { value: 'Growth Plan — ₦350,000',      label: 'Growth Plan — ₦350,000' },
  { value: 'Premium Plan — ₦700,000',     label: 'Premium Plan — ₦700,000' },
  { value: 'Enterprise — Custom Quote',   label: 'Enterprise — Custom Quote' },
];

const motionBudgets = [
  { value: 'Starter Plan — ₦100,000',     label: 'Starter Plan — ₦100,000' },
  { value: 'Growth Plan — ₦280,000',      label: 'Growth Plan — ₦280,000' },
  { value: 'Premium Plan — ₦600,000',     label: 'Premium Plan — ₦600,000' },
  { value: 'Enterprise — Custom Quote',   label: 'Enterprise — Custom Quote' },
];

const defaultBudgets = [
  { value: 'Under ₦100,000',              label: 'Under ₦100,000' },
  { value: '₦100,000 – ₦500,000',         label: '₦100,000 – ₦500,000' },
  { value: '₦500,000 – ₦1,000,000',       label: '₦500,000 – ₦1,000,000' },
  { value: 'Above ₦1,000,000',            label: 'Above ₦1,000,000' },
  { value: 'Prefer to Discuss',           label: 'Prefer to Discuss' },
];

const SERVICE_BUDGETS = {
  brand:      graphicBudgets,
  graphic:    graphicBudgets,
  uiux:       uiuxBudgets,
  product:    uiuxBudgets,
  web:        webBudgets,
  video:      motionBudgets,
  motion:     motionBudgets,
  animation:  motionBudgets,
  consulting: defaultBudgets,
  multiple:   defaultBudgets,
  other:      defaultBudgets,
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState('');

  const currentBudgets = SERVICE_BUDGETS[formData.service] || defaultBudgets;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'service') {
      setFormData((prev) => ({ ...prev, service: value, budget: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: 'var(--t-input-bg)',
    border: `1px solid ${focused === field ? 'var(--t-accent)' : 'var(--t-border-m)'}`,
    borderRadius: '10px',
    padding: '14px 20px',
    color: 'var(--t-text)',
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused === field ? '0 0 0 3px var(--t-a-bg-xs)' : 'none',
    boxSizing: 'border-box',
  });

  const selectStyle = (field) => ({
    ...inputStyle(field),
    cursor: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: '40px',
  });

  return (
    <PageWrapper>
      {/* Hero */}
      <section
        className="r-page-hero"
        style={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '140px 40px 60px',
          background: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <HeroBackground image="/images/contact-bg.jpg" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Home / Contact
          </p>
          <h1
            data-reveal
            data-delay="0.1"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '20px' }}
          >
            Let's build something together.
          </h1>
          <p
            data-reveal
            data-delay="0.2"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '560px', lineHeight: 1.7 }}
          >
            Got a project in mind? Drop us a message and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section style={{ padding: '80px 40px 100px', background: 'var(--t-bg)' }}>
        <div className="r-gap-80" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px' }}>

          {/* Form */}
          <div data-reveal>
            {submitted ? (
              <div
                className="r-success-box"
                style={{
                  background: 'var(--t-surface)',
                  border: '1px solid var(--t-a-border-m)',
                  borderRadius: '20px',
                  padding: '60px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>✓</div>
                <h3 style={{ color: 'var(--t-accent)', fontWeight: 700, fontSize: '24px', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>
                  Thanks! We'll be in touch within 24 hours.
                </h3>
                <p style={{ color: 'var(--t-text-2)', fontSize: '15px', marginBottom: '32px' }}>
                  We've received your message and will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  data-cursor="hover"
                  style={{
                    background: 'var(--t-accent)',
                    color: 'var(--t-on-accent)',
                    fontWeight: 700,
                    fontSize: '14px',
                    padding: '12px 28px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'none',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--t-accent-h)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--t-accent)'}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="r-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ color: 'var(--t-text-2)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.03em' }}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      required
                      placeholder="John Doe"
                      style={inputStyle('name')}
                    />
                  </div>
                  <div>
                    <label style={{ color: 'var(--t-text-2)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.03em' }}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      required
                      placeholder="john@company.com"
                      style={inputStyle('email')}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: 'var(--t-text-2)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.03em' }}>Company / Brand</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => setFocused('company')}
                    onBlur={() => setFocused('')}
                    placeholder="Your Company Ltd"
                    style={inputStyle('company')}
                  />
                </div>

                <div className="r-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ color: 'var(--t-text-2)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.03em' }}>Service Needed *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onFocus={() => setFocused('service')}
                      onBlur={() => setFocused('')}
                      required
                      style={selectStyle('service')}
                    >
                      <option value="" style={{ background: 'var(--t-input-bg)' }}>Select a service...</option>
                      <option value="brand" style={{ background: 'var(--t-input-bg)' }}>Brand Identity Design</option>
                      <option value="graphic" style={{ background: 'var(--t-input-bg)' }}>Graphic Design</option>
                      <option value="uiux" style={{ background: 'var(--t-input-bg)' }}>UI/UX Design</option>
                      <option value="web" style={{ background: 'var(--t-input-bg)' }}>Web Development</option>
                      <option value="video" style={{ background: 'var(--t-input-bg)' }}>Video Editing</option>
                      <option value="motion" style={{ background: 'var(--t-input-bg)' }}>Motion Graphics</option>
                      <option value="animation" style={{ background: 'var(--t-input-bg)' }}>Animation</option>
                      <option value="product" style={{ background: 'var(--t-input-bg)' }}>Digital Product Design</option>
                      <option value="consulting" style={{ background: 'var(--t-input-bg)' }}>Creative Consulting</option>
                      <option value="multiple" style={{ background: 'var(--t-input-bg)' }}>Multiple Services</option>
                      <option value="other" style={{ background: 'var(--t-input-bg)' }}>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ color: 'var(--t-text-2)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.03em' }}>Budget / Plan *</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      onFocus={() => setFocused('budget')}
                      onBlur={() => setFocused('')}
                      required
                      style={selectStyle('budget')}
                    >
                      <option value="" style={{ background: 'var(--t-input-bg)' }}>
                        {formData.service ? 'Select a plan...' : 'Select a service first...'}
                      </option>
                      {currentBudgets.map((opt) => (
                        <option key={opt.value} value={opt.value} style={{ background: 'var(--t-input-bg)' }}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ color: 'var(--t-text-2)', fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px', letterSpacing: '0.03em' }}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    required
                    rows={5}
                    placeholder="Tell us about your project, goals, and timeline..."
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '140px' }}
                  />
                </div>

                <label
                  data-cursor="hover"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    cursor: 'none',
                  }}
                >
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    style={{
                      width: '18px',
                      height: '18px',
                      marginTop: '2px',
                      accentColor: 'var(--t-accent)',
                      flexShrink: 0,
                      cursor: 'none',
                    }}
                  />
                  <span style={{ color: 'var(--t-text-2)', fontSize: '14px', lineHeight: 1.6 }}>
                    I'd like to receive tips, case studies, and updates from OMG Tech Hub
                  </span>
                </label>

                {error && (
                  <p style={{
                    color: '#e63322',
                    background: 'rgba(230,51,34,0.08)',
                    border: '1px solid rgba(230,51,34,0.25)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  data-cursor="hover"
                  style={{
                    background: loading ? 'var(--t-accent-h)' : 'var(--t-accent)',
                    color: 'var(--t-on-accent)',
                    fontWeight: 700,
                    fontSize: '16px',
                    padding: '16px 36px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: loading ? 'default' : 'none',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'background 0.2s, transform 0.2s',
                    marginTop: '8px',
                    opacity: loading ? 0.75 : 1,
                  }}
                  onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = 'var(--t-accent-h)'; e.currentTarget.style.transform = 'scale(1.02)'; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--t-accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  {loading ? 'Sending…' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>

          {/* Info Panel */}
          <div>
            <div
              data-reveal
              data-delay="0.1"
              style={{
                background: 'var(--t-surface)',
                border: '1px solid var(--t-border)',
                borderRadius: '20px',
                padding: '40px',
                marginBottom: '24px',
              }}
            >
              <h3 style={{ color: 'var(--t-text)', fontWeight: 700, fontSize: '20px', marginBottom: '28px' }}>Get In Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { label: 'Email', value: 'omgtechhub@gmail.com', href: 'mailto:omgtechhub@gmail.com' },
                  { label: 'WhatsApp', value: '+234 708 432 1204', href: 'https://wa.me/2347084321204' },
                  { label: 'Location', value: 'Benin City, Edo State, Nigeria', href: null },
                  { label: 'Office Hours', value: 'Mon–Fri: 9:00 AM – 6:00 PM WAT', href: null },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ color: 'var(--t-text-4)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        data-cursor="hover"
                        style={{ color: 'var(--t-text)', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--t-accent)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--t-text)'}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ color: 'var(--t-text)', fontSize: '15px', fontWeight: 500, lineHeight: 1.6 }}>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Response guarantee */}
            <div
              data-reveal
              data-delay="0.2"
              style={{
                background: 'var(--t-a-bg-s)',
                border: '1px solid var(--t-a-border-w)',
                borderRadius: '16px',
                padding: '28px 32px',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', flexShrink: 0 }}>⚡</span>
                <div>
                  <h4 style={{ color: 'var(--t-accent)', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>24-Hour Response Guarantee</h4>
                  <p style={{ color: 'var(--t-text-2)', fontSize: '14px', lineHeight: 1.6 }}>We respond to every enquiry within 24 hours, Monday to Friday.</p>
                </div>
              </div>
            </div>

            {/* Services quick links */}
            <div data-reveal data-delay="0.3">
              <p style={{ color: 'var(--t-text-4)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Our Services</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Brand Identity', 'Web Dev', 'UI/UX', 'Motion', 'Graphic Design', 'Product Design'].map((s) => (
                  <Link
                    key={s}
                    to="/services"
                    data-cursor="hover"
                    style={{
                      background: 'var(--t-surface)',
                      border: '1px solid var(--t-border)',
                      color: 'var(--t-text-2)',
                      fontSize: '13px',
                      fontWeight: 600,
                      padding: '8px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--t-accent)'; e.currentTarget.style.color = 'var(--t-text)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--t-border)'; e.currentTarget.style.color = 'var(--t-text-2)'; }}
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
