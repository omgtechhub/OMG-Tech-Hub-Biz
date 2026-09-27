import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import HeroBackground from '../components/HeroBackground';

const sections = [
  {
    title: 'What Are Cookies',
    content: [
      'Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. They are widely used to make websites work more efficiently, provide a better browsing experience, and give website owners useful information about how their site is being used.',
      'Cookies can be "persistent" (remaining on your device until they expire or are deleted) or "session" cookies (deleted when you close your browser). They can be set by the website you are visiting ("first-party cookies") or by other websites that serve content on the page you are viewing ("third-party cookies").',
    ],
  },
  {
    title: 'How We Use Cookies',
    content: [
      'We use cookies on our website for several important purposes. Below is a breakdown of the types of cookies we use and why:',
    ],
    subsections: [
      {
        subtitle: 'Essential Cookies',
        text: 'These cookies are necessary for the website to function properly. They enable core functionality such as page navigation, secure area access, and form submissions. The website cannot function correctly without these cookies, and they cannot be disabled.',
      },
      {
        subtitle: 'Analytics Cookies',
        text: 'We use analytics cookies to understand how visitors interact with our website. These cookies collect information about which pages are visited most often, how long visitors spend on each page, and any error messages encountered. This data helps us improve the website performance and user experience. All information collected is aggregated and anonymous.',
      },
      {
        subtitle: 'Preference Cookies',
        text: 'Preference cookies (also known as functionality cookies) allow our website to remember choices you have made, such as your preferred language, region, or display settings. These cookies provide a more personalised experience and mean you do not have to re-enter your preferences each time you visit.',
      },
    ],
  },
  {
    title: 'Third-Party Cookies',
    content: [
      'Some cookies on our website are set by third-party services that appear on our pages. We do not control these third-party cookies, and their use is governed by the privacy policies of the respective third parties.',
      'Third-party cookies on our site may include those from analytics providers (such as Google Analytics) that help us understand website traffic and usage patterns, and social media platforms that enable content sharing features.',
      'We carefully select our third-party partners and only work with reputable services that maintain strong privacy and data protection standards.',
    ],
  },
  {
    title: 'Managing Cookies',
    content: [
      'You have the right to control and manage cookies on your device. Most web browsers allow you to manage cookie preferences through their settings. You can typically set your browser to block or alert you about cookies, delete existing cookies, or browse in a private/incognito mode that does not store cookies.',
      'Please note that blocking or deleting certain cookies may impact your experience on our website. Essential cookies are required for the site to function properly, so disabling them may prevent you from using certain features.',
      'Here is how to manage cookies in popular browsers:',
      'Chrome: Settings > Privacy and Security > Cookies and other site data\nFirefox: Settings > Privacy & Security > Cookies and Site Data\nSafari: Preferences > Privacy > Manage Website Data\nEdge: Settings > Cookies and site permissions > Manage and delete cookies',
    ],
  },
  {
    title: 'Updates to This Policy',
    content: [
      'We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make changes, we will update the "Last updated" date at the top of this page.',
      'We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies.',
    ],
  },
  {
    title: 'Contact Us',
    content: [
      'If you have any questions about our use of cookies or this Cookie Policy, please contact us:',
      'OMG Tech Hub\nBenin City, Edo State, Nigeria\nEmail: omgtechhub@gmail.com\nPhone: +234 708 432 1204',
    ],
  },
];

export default function CookiePage() {
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
            / Cookie Policy
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
            Cookie Policy
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
            This Cookie Policy explains how OMG Tech Hub uses cookies and similar tracking
            technologies on our website. By continuing to browse our site, you consent to our
            use of cookies as described in this policy.
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
              {section.subsections &&
                section.subsections.map((sub) => (
                  <div
                    key={sub.subtitle}
                    style={{
                      background: 'var(--t-surface)',
                      border: '1px solid var(--t-border)',
                      borderRadius: '14px',
                      padding: '28px 32px',
                      marginBottom: '16px',
                    }}
                  >
                    <h3
                      style={{
                        color: 'var(--t-accent)',
                        fontSize: '16px',
                        fontWeight: 700,
                        marginBottom: '12px',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {sub.subtitle}
                    </h3>
                    <p
                      style={{
                        color: 'var(--t-text-2)',
                        fontSize: '16px',
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {sub.text}
                    </p>
                  </div>
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
          Questions about cookies?
        </h2>
        <p
          data-reveal
          data-delay="0.1"
          style={{ color: 'var(--t-text-2)', fontSize: '16px', marginBottom: '32px' }}
        >
          We are happy to explain our data practices in more detail.
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
