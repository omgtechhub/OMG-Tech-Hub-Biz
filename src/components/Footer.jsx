import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const companyLinks = [
  { to: '/about',     label: 'About Us' },
  { to: '/services',  label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing',   label: 'Pricing' },
  { to: '/blog',      label: 'Blog' },
  { to: '/contact',   label: 'Contact' },
];

const serviceLinks = [
  { to: '/services/brand-identity',       label: 'Brand Identity' },
  { to: '/services/web-development',      label: 'Web Development' },
  { to: '/services/ui-ux-design',         label: 'UI/UX Design' },
  { to: '/services/motion-graphics',      label: 'Motion Graphics' },
  { to: '/services/graphic-design',       label: 'Graphic Design' },
  { to: '/services/digital-product-design', label: 'Product Design' },
];

export default function Footer() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png';

  return (
    <footer
      style={{
        background: 'var(--t-bg)',
        borderTop: '1px solid var(--t-border-s)',
        padding: '80px 40px 40px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          <div style={{ gridColumn: 'span 1' }}>
            <Link
              to="/"
              data-cursor="hover"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                marginBottom: '20px',
              }}
            >
              <img
                src={logoSrc}
                alt="OMG"
                style={{ height: '36px', width: 'auto' }}
              />
              <span style={{
                fontSize: '17px',
                fontWeight: 800,
                color: 'var(--t-text)',
                letterSpacing: '-0.02em',
              }}>Tech Hub</span>
            </Link>
            <p
              style={{
                color: 'var(--t-text-2)',
                fontSize: '14px',
                lineHeight: 1.7,
                maxWidth: '240px',
                marginBottom: '24px',
              }}
            >
              Premium creative-tech agency based in Benin City, Nigeria. We design brands, build digital products, and craft visual experiences that drive real results.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/omigiedavid?igsh=Njk3b3N4ZjFmM3J0',
                  hoverColor: '#E1306C',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
                {
                  label: 'X (Twitter)',
                  href: 'https://x.com/OMGTechHub',
                  hoverColor: '#14171A',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.636L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/david-omigie-2b0644353',
                  hoverColor: '#0A66C2',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  href: 'https://www.facebook.com/omigie.aisosa',
                  hoverColor: '#1877F2',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ),
                },
                {
                  label: 'TikTok',
                  href: 'https://vm.tiktok.com/ZS9Y444c8CVX7-aQ87R/',
                  hoverColor: '#010101',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  aria-label={s.label}
                  style={{
                    width: '38px',
                    height: '38px',
                    border: '1px solid var(--t-border-m)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--t-text-2)',
                    background: 'transparent',
                    textDecoration: 'none',
                    transition: 'border-color 0.22s ease, color 0.22s ease, background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = s.hoverColor;
                    e.currentTarget.style.borderColor = s.hoverColor;
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1.2) translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${s.hoverColor}55`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--t-border-m)';
                    e.currentTarget.style.color = 'var(--t-text-2)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                color: 'var(--t-text)',
                fontWeight: 700,
                fontSize: '14px',
                marginBottom: '20px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Company
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {companyLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-cursor="hover"
                  className="footer-nav-link"
                  style={{
                    color: 'var(--t-text-2)',
                    fontSize: '14px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--t-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--t-text-2)'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                color: 'var(--t-text)',
                fontWeight: 700,
                fontSize: '14px',
                marginBottom: '20px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-cursor="hover"
                  className="footer-nav-link"
                  style={{
                    color: 'var(--t-text-2)',
                    fontSize: '14px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--t-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--t-text-2)'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                color: 'var(--t-text)',
                fontWeight: 700,
                fontSize: '14px',
                marginBottom: '20px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href="mailto:omgtechhub@gmail.com"
                data-cursor="hover"
                className="footer-nav-link"
                style={{
                  color: 'var(--t-text-2)',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--t-accent)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--t-text-2)'}
              >
                omgtechhub@gmail.com
              </a>
              <a
                href="tel:+2347084321204"
                data-cursor="hover"
                className="footer-nav-link"
                style={{
                  color: 'var(--t-text-2)',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--t-accent)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--t-text-2)'}
              >
                +234 708 432 1204
              </a>
              <p style={{ color: 'var(--t-text-2)', fontSize: '14px', lineHeight: 1.6 }}>
                Benin City,<br />
                Edo State, Nigeria
              </p>
            </div>
          </div>
        </div>

        <div className="r-footer-bar" style={{ borderTop: '1px solid var(--t-border-s)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ color: 'var(--t-text-4)', fontSize: '13px' }}>
            © {new Date().getFullYear()} OMG Tech Hub. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { to: '/privacy', label: 'Privacy Policy' },
              { to: '/terms', label: 'Terms of Service' },
              { to: '/cookies', label: 'Cookie Policy' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-cursor="hover"
                style={{ color: 'var(--t-text-4)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--t-text-2)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--t-text-4)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p style={{ color: 'var(--t-text-4)', fontSize: '13px' }}>
            Built with ❤ in Benin City, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
