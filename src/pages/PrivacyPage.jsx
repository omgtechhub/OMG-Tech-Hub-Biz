import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import HeroBackground from '../components/HeroBackground';

const sections = [
  {
    title: 'Information We Collect',
    content: [
      'We collect information you provide directly to us when you use our services, fill out forms, or communicate with us. This may include your name, email address, phone number, business name, and project details.',
      'We may also automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This data helps us understand how visitors interact with our website and improve the user experience.',
      'If you engage our services, we may collect additional information necessary to complete your project, such as brand assets, content materials, login credentials for third-party platforms (provided securely), and payment information.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'We use the information we collect to provide, maintain, and improve our creative and technical services. This includes communicating with you about your project, processing payments, delivering design and development work, and providing post-launch support.',
      'We may use your email address to send you updates about your project, respond to your inquiries, or share relevant information about our services. We will never send unsolicited marketing emails without your explicit consent.',
      'We use technical data collected from website visits to analyse trends, administer the site, track user navigation patterns, and gather demographic information for aggregate use. This data is used solely to improve our website and services.',
    ],
  },
  {
    title: 'Information Sharing & Disclosure',
    content: [
      'We do not sell, trade, or rent your personal information to third parties. Your data is treated with the utmost confidentiality and is only shared in the following limited circumstances:',
      'With trusted third-party service providers who assist us in operating our website, conducting our business, or delivering services to you — provided they agree to keep your information confidential. These may include hosting providers, payment processors, and analytics services.',
      'When required by law, regulation, or legal process, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.',
    ],
  },
  {
    title: 'Data Security',
    content: [
      'We implement appropriate technical and organisational security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include encrypted data transmission, secure server infrastructure, and restricted access controls.',
      'While we strive to protect your personal information, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security, but we are committed to maintaining industry-standard protections and continuously improving our security practices.',
    ],
  },
  {
    title: 'Cookies & Tracking Technologies',
    content: [
      'Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyse site traffic, and understand where our visitors are coming from. Cookies are small data files stored on your device that help us remember your preferences and improve site functionality.',
      'We use essential cookies required for the website to function properly, analytics cookies to understand how visitors interact with our site, and preference cookies to remember your settings and choices. You can control cookie preferences through your browser settings.',
      'For more detailed information about how we use cookies, please refer to our Cookie Policy page.',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'You have the right to access, correct, update, or request deletion of your personal information at any time. You may also object to the processing of your personal data, request portability of your data, or withdraw consent where we rely on your consent to process your information.',
      'If you wish to exercise any of these rights, please contact us using the details provided below. We will respond to your request within a reasonable timeframe and in accordance with applicable data protection laws.',
      'You have the right to lodge a complaint with a data protection authority if you believe your rights have been violated. We encourage you to contact us first so we can address your concerns directly.',
    ],
  },
  {
    title: 'Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make material changes, we will update the "Last updated" date at the top of this page.',
      'We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our website and services after any changes constitutes your acceptance of the updated policy.',
    ],
  },
  {
    title: 'Contact Us',
    content: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:',
      'OMG Tech Hub\nBenin City, Edo State, Nigeria\nEmail: omgtechhub@gmail.com\nPhone: +234 708 432 1204',
      'We are committed to resolving any concerns you may have about our collection and use of your personal information. We aim to respond to all enquiries within 48 hours.',
    ],
  },
];

export default function PrivacyPage() {
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
        <HeroBackground image="/images/about-bg.jpg" />
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
            <Link
              to="/"
              data-cursor="hover"
              style={{ color: 'var(--t-accent)', textDecoration: 'none', cursor: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Home
            </Link>{' '}
            / Privacy Policy
          </p>
          <h1
            data-reveal
            data-delay="0.1"
            style={{
              fontSize: 'clamp(40px, 7vw, 88px)',
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              marginBottom: '20px',
            }}
          >
            Privacy Policy
          </h1>
          <p
            data-reveal
            data-delay="0.2"
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'clamp(16px, 2vw, 20px)',
              maxWidth: '560px',
              lineHeight: 1.7,
            }}
          >
            Last updated: June 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 40px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p
            data-reveal
            style={{
              color: 'var(--t-text-2)',
              fontSize: '16px',
              lineHeight: 1.8,
              marginBottom: '48px',
            }}
          >
            At OMG Tech Hub, we are committed to protecting your privacy and ensuring the
            security of your personal information. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website or engage
            our services.
          </p>

          {sections.map((section, i) => (
            <div
              key={section.title}
              data-reveal
              data-delay={i * 0.05}
              style={{ marginBottom: '56px' }}
            >
              <h2
                style={{
                  color: 'var(--t-text)',
                  fontSize: '24px',
                  fontWeight: 700,
                  marginBottom: '24px',
                  letterSpacing: '-0.01em',
                }}
              >
                {section.title}
              </h2>
              {section.content.map((paragraph, j) => (
                <p
                  key={j}
                  style={{
                    color: 'var(--t-text-2)',
                    fontSize: '16px',
                    lineHeight: 1.8,
                    marginBottom: '24px',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', background: 'var(--t-surface)', textAlign: 'center' }}>
        <h2
          data-reveal
          style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 900,
            color: 'var(--t-text)',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}
        >
          Questions about your data?
        </h2>
        <p
          data-reveal
          data-delay="0.1"
          style={{ color: 'var(--t-text-2)', fontSize: '16px', marginBottom: '32px' }}
        >
          We take your privacy seriously. Reach out if you have any concerns.
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
            cursor: 'none',
            transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--t-accent-h)';
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--t-accent)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Contact Us
        </Link>
      </section>
    </PageWrapper>
  );
}
