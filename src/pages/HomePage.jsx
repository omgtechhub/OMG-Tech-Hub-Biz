import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import CountUp from '../components/CountUp';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';

const EASE = [0.16, 1, 0.3, 1];
import TickerStrip from '../components/TickerStrip';
import { services } from '../data/services';
import { usePortfolio } from '../hooks/usePortfolio';

const API_BASE = import.meta.env.VITE_API_BASE || '';

// Service icon components
function ServiceIcon({ icon }) {
  const s = 24;
  const icons = {
    palette: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
    'pen-tool': <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
    layout: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    code: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    film: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>,
    zap: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    play: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
    smartphone: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
    lightbulb: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  };
  return icons[icon] || icons.code;
}

// Blog card component (Sanity-powered)
function BlogCard({ post }) {
  const coverSrc  = post.image || '/images/gra1.jpeg';
  const avatarSrc = post.author_avatar || '/images/david.jpeg';
  const dateStr   = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : (post.date || '');

  return (
    <Link
      to={`/blog/${post.slug}`}
      data-cursor="hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        background: 'var(--t-surface)',
        border: '1px solid var(--t-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--t-a-border)';
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 60px var(--t-a-shadow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--t-border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={coverSrc}
          alt={post.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onError={(e) => { e.target.src = '/images/gra1.jpeg'; }}
          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.06)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
        />
      </div>
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {post.platform && (
          <span style={{
            display: 'inline-block', background: 'var(--t-accent)', color: 'var(--t-on-accent)',
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '4px 12px', borderRadius: '999px',
          }}>
            {post.platform === 'twitter' ? 'X/Twitter' : post.platform.charAt(0).toUpperCase()+post.platform.slice(1)}
          </span>
        )}
        <h3 className="line-clamp-2" style={{ fontWeight: 700, fontSize: '18px', color: 'var(--t-text)', marginTop: '10px', lineHeight: 1.4, transition: 'color 0.2s' }}>
          {post.title}
        </h3>
        <p className="line-clamp-2" style={{ color: 'var(--t-text-2)', fontSize: '14px', lineHeight: 1.6, marginTop: '8px' }}>
          {post.excerpt}
        </p>
        <div style={{ borderTop: '1px solid var(--t-border)', marginTop: 'auto', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={avatarSrc} alt={post.author} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ color: 'var(--t-text-2)', fontSize: '13px', fontWeight: 500 }}>{post.author}</span>
          </div>
          <span style={{ color: 'var(--t-text-4)', fontSize: '12px' }}>
            {dateStr}{post.reading_time ? ` · ${post.reading_time} min read` : ''}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [recentPosts, setRecentPosts] = useState([]);
  const { projects } = usePortfolio();
  const categories = ['All', 'Graphic Design', 'Web Development', 'UI/UX Design', 'Motion Design'];
  const filtered = activeFilter === 'All'
    ? projects.slice(0, 4)
    : projects.filter(p => p.category === activeFilter).slice(0, 4);

  useEffect(() => {
    fetch(`${API_BASE}/api/posts.php`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.ok && data.posts?.length) {
          setRecentPosts(data.posts.slice(0, 4).map(p => {
            let img = null;
            if (p.image) {
              img = p.image.startsWith('http') ? p.image : (API_BASE + '/' + p.image).replace(/([^:])\/\//g,'$1/');
            }
            return { ...p, image: img };
          }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <PageWrapper>
      {/* HERO */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '140px 40px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(var(--t-a-grid) 1px, transparent 1px),
              linear-gradient(90deg, var(--t-a-grid) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />
        {/* Gradient orb */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '-5%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, var(--t-a-orb) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>

        {/* Content wrapper — pill sits above the two-column grid */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
          }}
        >
          {/* PILL — always at very top, above the grid */}
          <AnimatedItem variant="fadeUp" delay={0} className="r-hero-pill">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid var(--t-border-m)',
                borderRadius: '999px',
                padding: '8px 18px',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  background: 'var(--t-accent)',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                }}
              />
              <span className="r-badge-text" style={{ color: 'var(--t-text-2)', fontSize: '13px', fontWeight: 500 }}>
                Brand Identity · Web Dev · UI/UX · Motion · Video · Product Design
              </span>
            </div>
          </AnimatedItem>

          {/* Two-column grid — stacks on mobile */}
          <div
            className="r-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
              gap: '48px',
            }}
          >
            {/* LEFT — text content */}
            <AnimatedItem variant="slideLeft" delay={0.2} className="r-hero-text-col">
              <div>
                {/* H1 */}
                <h1
                  className="r-hero-h1"
                  style={{
                    fontSize: 'clamp(40px, 5.5vw, 88px)',
                    fontWeight: 900,
                    lineHeight: 1.0,
                    letterSpacing: '-0.03em',
                    marginBottom: '24px',
                  }}
                >
                  <span style={{ color: 'var(--t-text)', display: 'block' }}>We Design</span>
                  <span style={{ color: 'var(--t-accent)', display: 'block' }}>Digital Experiences.</span>
                </h1>

                {/* Subtext */}
                <p
                  style={{
                    color: 'var(--t-text-2)',
                    fontSize: 'clamp(15px, 1.6vw, 18px)',
                    lineHeight: 1.7,
                    marginBottom: '44px',
                  }}
                >
                  OMG Tech Hub helps businesses grow through premium branding, web development, UI/UX design, and motion-driven digital experiences that convert.
                </p>

                {/* CTAs */}
                <div className="r-hero-ctas" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Link
                    to="/portfolio"
                    data-cursor="hover"
                    style={{
                      background: 'var(--t-accent)',
                      color: 'var(--t-on-accent)',
                      fontWeight: 700,
                      fontSize: '15px',
                      padding: '16px 36px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'background 0.2s, transform 0.2s',
                      display: 'inline-block',
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
                    See Our Work
                  </Link>
                  <Link
                    to="/contact"
                    data-cursor="hover"
                    style={{
                      border: '1px solid var(--t-border-l)',
                      color: 'var(--t-text)',
                      fontWeight: 600,
                      fontSize: '15px',
                      padding: '16px 36px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s, background 0.2s',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--t-accent)';
                      e.currentTarget.style.background = 'var(--t-a-bg-s)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--t-border-l)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    Get a Quote
                  </Link>
                </div>

                {/* Stats row */}
                <div
                  className="r-hero-stats"
                  style={{
                    display: 'flex',
                    gap: '40px',
                    marginTop: '64px',
                    flexWrap: 'wrap',
                  }}
                >
                  {[
                    { num: '100+', label: 'Projects' },
                    { num: '2+',  label: 'Years' },
                    { num: '40+', label: 'Happy Clients' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div
                        style={{
                          fontSize: 'clamp(32px, 4vw, 52px)',
                          fontWeight: 900,
                          color: 'var(--t-accent)',
                          lineHeight: 1,
                          letterSpacing: '-0.03em',
                        }}
                      >
                        <CountUp value={stat.num} />
                      </div>
                      <div style={{ color: 'var(--t-text-2)', fontSize: '14px', marginTop: '4px', fontWeight: 500 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedItem>

            {/* RIGHT — hero banner image */}
            <AnimatedItem
              variant="flipY"
              delay={0.35}
              className="r-hero-img-col"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <div
                style={{
                  borderRadius: '32px',
                  overflow: 'hidden',
                  width: '100%',
                  maxWidth: '560px',
                  boxShadow: '0 0 80px rgba(255,140,0,0.15)',
                }}
              >
                <img
                  src="/images/omgbanner.png"
                  alt="OMG Tech Hub — Graphics, Website, UI/UX, Animation"
                  fetchpriority="high"
                  decoding="sync"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </AnimatedItem>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <TickerStrip />

      {/* SERVICES PREVIEW */}
      <section style={{ padding: '100px 40px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '60px',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <p
                data-reveal
                style={{
                  color: 'var(--t-accent)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                What We Do
              </p>
              <h2
                data-reveal
                data-delay="0.1"
                style={{
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  fontWeight: 900,
                  color: 'var(--t-text)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                }}
              >
                Our Services
              </h2>
            </div>
            <Link
              to="/services"
              data-cursor="hover"
              data-reveal
              data-delay="0.1"
              style={{
                color: 'var(--t-accent)',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'gap 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.gap = '12px'}
              onMouseLeave={(e) => e.currentTarget.style.gap = '6px'}
            >
              View all services →
            </Link>
          </div>

          <AnimatedSection
            variantCycle={['flipY', 'flipX', 'bounce', 'rotateIn', 'tiltLeft', 'tiltRight', 'scaleIn', 'popIn']}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {services.map((service, index) => (
              <AnimatedItem key={service.slug} style={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                to={`/services/${service.slug}`}
                data-cursor="hover"
                style={{
                  background: 'var(--t-surface)',
                  border: '1px solid var(--t-border)',
                  borderRadius: '20px',
                  padding: '36px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--t-a-border-s)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 24px 60px var(--t-a-shadow)';
                  const bg = e.currentTarget.querySelector('.svc-bg');
                  if (bg) bg.style.opacity = '0.26';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--t-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  const bg = e.currentTarget.querySelector('.svc-bg');
                  if (bg) bg.style.opacity = '0.16';
                }}
              >
                {/* Background image — Ken Burns scale, low opacity so text contrast is untouched */}
                <motion.img
                  className="svc-bg"
                  src={`/images/svc${index + 1}.jpg`}
                  alt=""
                  aria-hidden="true"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.16,
                    zIndex: 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                    willChange: 'transform',
                  }}
                />

                {/* Service number — sits above the image */}
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    fontSize: '64px',
                    fontWeight: 900,
                    color: 'var(--t-ghost)',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    userSelect: 'none',
                    zIndex: 1,
                  }}
                >
                  {service.number}
                </div>

                {/* Card content — all above the image */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'var(--t-a-bg)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--t-accent)',
                      marginBottom: '24px',
                    }}
                  >
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <h3
                    style={{
                      color: 'var(--t-text)',
                      fontWeight: 700,
                      fontSize: '20px',
                      marginBottom: '10px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p style={{ color: 'var(--t-text-2)', fontSize: '14px', lineHeight: 1.7, flex: 1 }}>
                    {service.subtitle}
                  </p>
                  <div
                    style={{
                      marginTop: '24px',
                      color: 'var(--t-accent)',
                      fontSize: '14px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    Learn more →
                  </div>
                </div>
              </Link>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section style={{ padding: '100px 40px', background: 'var(--t-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            className="r-gap-80"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '80px',
              alignItems: 'center',
            }}
          >
            <div>
              <p
                data-reveal
                style={{
                  color: 'var(--t-accent)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                About Us
              </p>
              <h2
                data-reveal
                data-delay="0.1"
                style={{
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  fontWeight: 900,
                  color: 'var(--t-text)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: '24px',
                }}
              >
                We believe great design changes businesses.
              </h2>
              <p
                data-reveal
                data-delay="0.2"
                style={{
                  color: 'var(--t-text-2)',
                  fontSize: '16px',
                  lineHeight: 1.8,
                  marginBottom: '32px',
                }}
              >
                Born in the heart of Benin City, Nigeria — OMG Tech Hub is a creative-tech agency obsessed with building brands that don't just look good, but perform extraordinarily.
              </p>
              <div
                data-reveal
                data-delay="0.3"
                style={{ display: 'flex', gap: '40px', marginBottom: '32px', flexWrap: 'wrap' }}
              >
                {[
                  { num: '100+', label: 'Projects' },
                  { num: '2+',  label: 'Years' },
                  { num: '40+', label: 'Happy Clients' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontSize: '36px', fontWeight: 900, color: 'var(--t-accent)', lineHeight: 1, letterSpacing: '-0.03em' }}>{stat.num}</div>
                    <div style={{ color: 'var(--t-text-2)', fontSize: '13px', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                data-cursor="hover"
                data-reveal
                data-delay="0.4"
                style={{
                  color: 'var(--t-accent)',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.gap = '12px'}
                onMouseLeave={(e) => e.currentTarget.style.gap = '6px'}
              >
                Learn more about us →
              </Link>
            </div>

            {/* Image grid */}
            <div
              data-reveal
              data-delay="0.2"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {['/images/gra9.jpeg', '/images/gra1.jpeg', '/images/webp3.png', '/images/about4.jpeg'].map((src, i) => (
                <div
                  key={src}
                  style={{
                    aspectRatio: '1/1',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '3px solid var(--t-founder-stroke)',
                  }}
                >
                  <img
                    src={src}
                    alt="Team"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section style={{ padding: '100px 40px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Our Work
              </p>
              <h2 data-reveal data-delay="0.1" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Portfolio
              </h2>
            </div>
            <Link
              to="/portfolio"
              data-cursor="hover"
              data-reveal
              data-delay="0.1"
              style={{ color: 'var(--t-accent)', fontSize: '15px', fontWeight: 600, textDecoration: 'none', transition: 'gap 0.2s', display: 'flex', gap: '6px' }}
              onMouseEnter={(e) => e.currentTarget.style.gap = '12px'}
              onMouseLeave={(e) => e.currentTarget.style.gap = '6px'}
            >
              View all work →
            </Link>
          </div>

          {/* Filter bar */}
          <div data-reveal style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                data-cursor="hover"
                style={{
                  background: activeFilter === cat ? 'var(--t-accent)' : 'transparent',
                  color: activeFilter === cat ? 'var(--t-on-accent)' : 'var(--t-text-2)',
                  border: `1px solid ${activeFilter === cat ? 'var(--t-accent)' : 'var(--t-border-l)'}`,
                  borderRadius: '999px',
                  padding: '8px 20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== cat) {
                    e.currentTarget.style.borderColor = 'var(--t-accent)';
                    e.currentTarget.style.color = 'var(--t-text)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== cat) {
                    e.currentTarget.style.borderColor = 'var(--t-border-l)';
                    e.currentTarget.style.color = 'var(--t-text-2)';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
          <AnimatedSection variantCycle={['rotateIn', 'tiltLeft', 'flipY', 'bounce', 'tiltRight', 'flipX', 'scaleIn', 'swingIn']} className="r-portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {filtered.map((project) => (
              <AnimatedItem key={project.slug} style={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                to={`/portfolio/${project.slug}`}
                data-cursor="hover"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  background: 'var(--t-surface)',
                  border: '1px solid var(--t-border)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--t-a-border)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px var(--t-a-shadow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--t-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ aspectRatio: project.category === 'Graphic Design' ? '4/3' : '16/10', overflow: 'hidden' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: 'var(--t-a-bg-xs)',
                          color: 'var(--t-accent)',
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '999px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 style={{ color: 'var(--t-text)', fontWeight: 700, fontSize: '18px', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--t-text-2)', fontSize: '13px', marginTop: 'auto' }}>
                    {project.client} · {project.year}
                  </p>
                </div>
              </Link>
              </AnimatedItem>
            ))}
          </AnimatedSection>
          </AnimatePresence>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '100px 40px', background: 'var(--t-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Testimonials
            </p>
            <h2 data-reveal data-delay="0.1" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              What Our Clients Say
            </h2>
          </div>
          <AnimatedSection variantCycle={['flipX', 'bounce', 'scaleIn', 'flipY']} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { text: '"OMG Tech Hub completely transformed our brand. The attention to detail, creativity, and speed of delivery were beyond anything we expected. Our conversion rate jumped 3x after the website redesign."', name: 'Adaeze Okonkwo', role: 'CEO, BoldEstate Realty · Lagos', initials: 'AO' },
              { text: '"The team at OMG Tech Hub delivered a world-class UI/UX design for our fintech app. They understood our users deeply and crafted flows that felt effortless. Truly premium work."', name: 'Kofi Asante', role: 'Founder, TechFlow · Accra, Ghana', initials: 'KA' },
              { text: '"Working with OMG Tech Hub was the best brand investment we made. They didn\'t just design a logo — they built an entire brand universe that perfectly reflects who we are."', name: 'Zainab Bello', role: 'Creative Director, Nomad Coffee · Abuja', initials: 'ZB' },
              { text: '"The motion graphics package OMG Tech Hub created for Afrobeat Fest was absolutely stunning. We\'ve worked with agencies in London and NYC — OMG matches world class."', name: 'Emmanuel Chukwu', role: 'Event Director, Afrobeat Fest · Benin City', initials: 'EC' },
            ].map((t, i) => (
              <AnimatedItem key={t.name} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  background: 'var(--t-bg)',
                  border: '1px solid var(--t-border)',
                  borderRadius: '20px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  gap: '20px',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--t-a-border)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--t-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ color: 'var(--t-accent)', fontSize: '24px', lineHeight: 1 }}>★★★★★</div>
                <p style={{ color: 'var(--t-text-3)', fontSize: '15px', lineHeight: 1.7, flex: 1 }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid var(--t-border)', paddingTop: '16px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--t-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t-on-accent)', fontWeight: 700, fontSize: '14px' }}>{t.initials}</div>
                  <div>
                    <div style={{ color: 'var(--t-text)', fontWeight: 600, fontSize: '14px' }}>{t.name}</div>
                    <div style={{ color: 'var(--t-text-2)', fontSize: '12px' }}>{t.role}</div>
                  </div>
                </div>
              </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section style={{ padding: '80px 40px', background: 'var(--t-bg)', borderTop: '1px solid var(--t-border-s)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Industries We Serve
            </p>
            <h2 data-reveal data-delay="0.1" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Built for Every Sector
            </h2>
          </div>
          <div data-reveal data-delay="0.2" className="r-industries-grid" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              'Fintech & Banking', 'Healthcare', 'E-Commerce', 'Education',
              'Hospitality', 'Music & Entertainment', 'Real Estate', 'Legal & Consulting',
              'Food & Beverage', 'Fashion', 'NGO & Non-Profit', 'Technology & SaaS',
            ].map((ind) => (
              <span
                key={ind}
                style={{
                  background: 'var(--t-surface)',
                  border: '1px solid var(--t-border)',
                  borderRadius: '999px',
                  padding: '10px 20px',
                  color: 'var(--t-text-2)',
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--t-accent)'; e.currentTarget.style.color = 'var(--t-text)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--t-border)'; e.currentTarget.style.color = 'var(--t-text-2)'; }}
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{ padding: '100px 40px', background: 'var(--t-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Blog
              </p>
              <h2 data-reveal data-delay="0.1" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Latest Insights
              </h2>
            </div>
            <Link
              to="/blog"
              data-cursor="hover"
              data-reveal
              data-delay="0.1"
              style={{ color: 'var(--t-accent)', fontSize: '15px', fontWeight: 600, textDecoration: 'none', display: 'flex', gap: '6px' }}
              onMouseEnter={(e) => e.currentTarget.style.gap = '12px'}
              onMouseLeave={(e) => e.currentTarget.style.gap = '6px'}
            >
              See all articles →
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <AnimatedSection variantCycle={['tiltLeft', 'flipY', 'tiltRight']} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
              {recentPosts.map((post) => (
                <AnimatedItem key={post._id || post.id || post.slug} style={{ display: 'flex', flexDirection: 'column' }}>
                  <BlogCard post={post} />
                </AnimatedItem>
              ))}
            </AnimatedSection>
          ) : (
            <p data-reveal style={{ color: 'var(--t-text-4)', fontSize: '16px', textAlign: 'center', padding: '40px 0' }}>
              Articles coming soon — check back shortly.
            </p>
          )}

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              to="/blog"
              data-cursor="hover"
              style={{
                display: 'inline-block',
                border: '1px solid var(--t-border-l)',
                color: 'var(--t-text-2)',
                fontSize: '14px',
                fontWeight: 600,
                padding: '14px 36px',
                borderRadius: '999px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--t-accent)';
                e.currentTarget.style.color = 'var(--t-text)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--t-border-l)';
                e.currentTarget.style.color = 'var(--t-text-2)';
              }}
            >
              Read all articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        style={{
          padding: '100px 40px',
          background: 'var(--t-bg)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, var(--t-a-bg-xs) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          <h2
            data-reveal
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 900,
              color: 'var(--t-text)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          >
            Ready to grow your brand?
          </h2>
          <p
            data-reveal
            data-delay="0.1"
            style={{ color: 'var(--t-text-2)', fontSize: '18px', marginBottom: '40px', lineHeight: 1.7 }}
          >
            Let's build something great together.
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
              fontSize: '16px',
              padding: '18px 48px',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--t-accent-h)';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--t-accent)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Start a Project
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
