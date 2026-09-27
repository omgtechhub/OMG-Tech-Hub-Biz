import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { to: '/services',  label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about',     label: 'About Us' },
  { to: '/process',   label: 'Process' },
  { to: '/pricing',   label: 'Pricing' },
  { to: '/blog',      label: 'Blog' },
  { to: '/contact',   label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  const logoSrc = theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '14px 40px' : '22px 40px',
          background: scrolled ? 'var(--t-nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--t-border-m)' : '1px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'padding 0.3s ease, background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <Link
          to="/"
          data-cursor="hover"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src={logoSrc}
            alt="OMG"
            style={{
              height: scrolled ? '32px' : '38px',
              width: 'auto',
              transition: 'height 0.3s ease',
            }}
          />
          <span style={{
            fontSize: scrolled ? '15px' : '17px',
            fontWeight: 800,
            color: 'var(--t-text)',
            letterSpacing: '-0.02em',
            marginLeft: '8px',
            transition: 'font-size 0.3s ease',
          }}>Tech Hub</span>
        </Link>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '36px',
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-cursor="hover"
              style={{
                color: location.pathname === link.to ? 'var(--t-accent)' : 'var(--t-text-2)',
                fontWeight: 500,
                fontSize: '14px',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== link.to) e.target.style.color = 'var(--t-text)';
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== link.to) e.target.style.color = 'var(--t-text-2)';
              }}
            >
              {link.label}
              {location.pathname === link.to && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--t-accent)',
                    borderRadius: '1px',
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThemeToggle />

          <Link
            to="/contact"
            data-cursor="hover"
            className="hidden-mobile"
            style={{
              background: 'var(--t-accent)',
              color: 'var(--t-on-accent)',
              fontWeight: 700,
              fontSize: '13px',
              padding: '10px 22px',
              borderRadius: '8px',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'background 0.2s ease, transform 0.2s ease',
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
            Get a Quote
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile-only"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'none',
              padding: '8px',
              flexDirection: 'column',
              gap: '5px',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: i === 1 ? (menuOpen ? '24px' : '16px') : '24px',
                  height: '2px',
                  background: 'var(--t-text)',
                  borderRadius: '1px',
                  transition: 'all 0.3s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                    : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                    : 'scaleX(0)'
                    : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'var(--t-overlay)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.to}
            to={link.to}
            data-cursor="hover"
            style={{
              color: location.pathname === link.to ? 'var(--t-accent)' : 'var(--t-text)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 7vw, 52px)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
              transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s, color 0.2s ease`,
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== link.to) e.target.style.color = 'var(--t-accent)';
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== link.to) e.target.style.color = 'var(--t-text)';
            }}
          >
            {link.label}
          </Link>
        ))}

        <Link
          to="/contact"
          style={{
            marginTop: '32px',
            background: 'var(--t-accent)',
            color: 'var(--t-on-accent)',
            fontWeight: 700,
            fontSize: '15px',
            padding: '14px 36px',
            borderRadius: '10px',
            textDecoration: 'none',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${navLinks.length * 0.05}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${navLinks.length * 0.05}s`,
          }}
        >
          Get a Quote
        </Link>

        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            color: 'var(--t-text-4)',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          omgtechhub@gmail.com
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile-only { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile-only { display: flex !important; }
        }
      `}</style>
    </>
  );
}
