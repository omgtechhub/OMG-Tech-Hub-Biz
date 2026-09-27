import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { services } from '../data/services';
import HeroBackground from '../components/HeroBackground';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';

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

const SERVICE_PRICING = [
  {
    id: 'graphic-design',
    icon: '🎨',
    label: 'Graphic Design',
    tiers: [
      {
        name: 'Starter', price: '₦80,000', period: '/mo', featured: false,
        desc: 'A clean, professional brand identity foundation for startups and small businesses.',
        features: ['Logo Design (2 Concepts)', 'Brand Colour Palette', 'Typography System', 'Business Card Design', 'Social Profile Graphics', '2 Revision Rounds', 'Brand Style Guide'],
        cta: 'Get Started',
      },
      {
        name: 'Growth', price: '₦200,000', period: '/mo', featured: true,
        desc: 'A complete, consistent brand presence across all channels for growing businesses.',
        features: ['Everything in Starter', '3 Logo Concepts', 'Full Brand Identity System', 'Social Media Kit (12 Templates)', 'Stationery Pack', '3 Revision Rounds', '1-Month Post-Delivery Support'],
        cta: 'Get Started',
      },
      {
        name: 'Premium', price: '₦450,000', period: '/mo', featured: false,
        desc: 'The full creative transformation with extended deliverables and priority execution.',
        features: ['Everything in Growth', 'Packaging Design', 'Presentation Deck Template', 'Infographic Design', 'Email Template Design', 'Unlimited Revisions', 'Brand Motion System', 'Priority Response'],
        cta: 'Get Started',
      },
      {
        name: 'Enterprise', price: 'Custom', period: '', featured: false,
        desc: 'Bespoke creative strategy and full brand ecosystem for large organisations.',
        features: ['Full Creative Strategy', 'Complete Brand Ecosystem', 'Multi-Brand System', 'Dedicated Creative Team', 'Campaign Identity Design', 'Monthly Retainer Options', 'NDA & Priority SLA'],
        cta: "Let's Talk",
      },
    ],
  },
  {
    id: 'web-development',
    icon: '💻',
    label: 'Web Development',
    tiers: [
      {
        name: 'Starter', price: '₦200,000', period: '/mo', featured: false,
        desc: 'A professional, mobile-first web presence to establish your brand online.',
        features: ['3-Page Responsive Website', 'Mobile-First Design', 'Basic SEO Setup', 'Contact Form Integration', 'Analytics Setup', '2 Revision Rounds', '1-Month Post-Launch Support'],
        cta: 'Get Started',
      },
      {
        name: 'Growth', price: '₦500,000', period: '/mo', featured: true,
        desc: 'A scalable, content-ready website built for growth and discoverability.',
        features: ['Everything in Starter', 'Up to 7 Pages', 'Custom CMS Integration', 'Blog Setup & Configuration', 'Advanced SEO & Sitemap', 'Performance Tuning', '3 Revision Rounds', '2-Month Post-Launch Support'],
        cta: 'Get Started',
      },
      {
        name: 'Premium', price: '₦1,200,000', period: '/mo', featured: false,
        desc: 'Full-featured web platform with e-commerce, integrations, and extended support.',
        features: ['Everything in Growth', 'Up to 15 Pages', 'E-Commerce Functionality', 'Web App Features', 'API Integration', 'Core Web Vitals Optimisation', 'Unlimited Revisions', '3-Month Support', 'Priority Response'],
        cta: 'Get Started',
      },
      {
        name: 'Enterprise', price: 'Custom', period: '', featured: false,
        desc: 'Custom web applications and enterprise-grade platforms for complex requirements.',
        features: ['Custom Web Applications', 'Multi-Site / Multi-Language', 'Enterprise CMS', 'Advanced API Architecture', 'DevOps & CI/CD Pipeline', 'Dedicated Dev Team', 'Monthly Retainer Options', 'NDA & Priority SLA'],
        cta: "Let's Talk",
      },
    ],
  },
  {
    id: 'ui-ux-design',
    icon: '✨',
    label: 'UI/UX Design',
    tiers: [
      {
        name: 'Starter', price: '₦150,000', period: '/mo', featured: false,
        desc: 'Essential UX foundations for small apps and MVPs with clean, usable interfaces.',
        features: ['Up to 5 Screens', 'Wireframes & User Flows', 'Figma Prototype', 'Mobile-First Design', '2 Revision Rounds', 'Dev Handoff Notes'],
        cta: 'Get Started',
      },
      {
        name: 'Growth', price: '₦350,000', period: '/mo', featured: true,
        desc: 'Research-driven design with a scalable system for growing digital products.',
        features: ['Everything in Starter', 'Up to 15 Screens', 'UX Research & Personas', 'Information Architecture', 'Design System & Components', 'Usability Testing', '3 Revision Rounds'],
        cta: 'Get Started',
      },
      {
        name: 'Premium', price: '₦700,000', period: '/mo', featured: false,
        desc: 'End-to-end UX strategy with comprehensive research and a production-ready design system.',
        features: ['Everything in Growth', 'Up to 30 Screens', 'Full UX Research Sprint', 'End-to-End Design System', 'Micro-Interaction Specs', 'Accessibility Audit (WCAG)', 'Unlimited Revisions', 'Priority Response'],
        cta: 'Get Started',
      },
      {
        name: 'Enterprise', price: 'Custom', period: '', featured: false,
        desc: 'Full-scale design operations for multi-platform products and enterprise teams.',
        features: ['Multi-Platform Design', 'Design System Governance', 'User Research Ops', 'Accessibility Compliance', 'Design Ops Setup', 'Dedicated UX Team', 'Monthly Retainer Options', 'NDA & Priority SLA'],
        cta: "Let's Talk",
      },
    ],
  },
  {
    id: 'motion-design',
    icon: '🎬',
    label: 'Motion Design',
    tiers: [
      {
        name: 'Starter', price: '₦100,000', period: '/mo', featured: false,
        desc: 'Bring your brand to life with essential motion assets for social and web.',
        features: ['Logo Animation', '1 Animated Social Post', 'Up to 15 Seconds', 'HD Export (MP4 + GIF)', '2 Revision Rounds', 'Source Files Included'],
        cta: 'Get Started',
      },
      {
        name: 'Growth', price: '₦280,000', period: '/mo', featured: true,
        desc: 'A complete motion toolkit with explainer content and social-ready templates.',
        features: ['Everything in Starter', '3 Motion Design Pieces', 'Animated Story Templates', '5 Animated Social Posts', '60-Second Explainer Video', 'Motion Style Guide', '3 Revision Rounds'],
        cta: 'Get Started',
      },
      {
        name: 'Premium', price: '₦600,000', period: '/mo', featured: false,
        desc: 'Full brand motion system with long-form content and UI animation specs.',
        features: ['Everything in Growth', 'Full Brand Motion System', 'Title Sequences', 'Animated Infographics', 'UI Micro-Animation Specs', '2-Minute Explainer Video', 'Unlimited Revisions', 'Priority Response'],
        cta: 'Get Started',
      },
      {
        name: 'Enterprise', price: 'Custom', period: '', featured: false,
        desc: 'Broadcast-quality animation and multi-platform motion for large-scale campaigns.',
        features: ['2D/3D Character Animation', 'Product Visualisation', 'Broadcast-Quality Production', 'Campaign Motion Identity', 'Multi-Platform Delivery', 'Dedicated Motion Team', 'Monthly Retainer Options', 'NDA & Priority SLA'],
        cta: "Let's Talk",
      },
    ],
  },
];

export default function ServicesPage() {
  const [activeServiceId, setActiveServiceId] = useState('graphic-design');
  const activePricing = SERVICE_PRICING.find((s) => s.id === activeServiceId);

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
        <HeroBackground image="/images/ser-bg.jpg" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Home / Services
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
            What We Offer
          </h1>
          <p
            data-reveal
            data-delay="0.2"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '560px', lineHeight: 1.7 }}
          >
            Every service we offer is engineered to deliver measurable impact. From brand identity to full-stack development — premium execution on everything we touch.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section style={{ padding: '100px 40px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 data-reveal style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', marginBottom: '60px', letterSpacing: '-0.02em' }}>
            Our Services
          </h2>
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
                  {/* Background image — Ken Burns scale, low opacity */}
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

                  {/* Service number */}
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

                  {/* Card content */}
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

      {/* Pricing */}
      <section style={{ padding: '100px 40px', background: 'var(--t-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Pricing
            </p>
            <h2 data-reveal data-delay="0.1" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Investment Tiers
            </h2>
            <p data-reveal data-delay="0.2" style={{ color: 'var(--t-text-2)', fontSize: '16px', marginBottom: '40px' }}>
              Select a service to see its pricing plans.
            </p>

            {/* Service selector tabs */}
            <div data-reveal data-delay="0.3" className="r-service-tabs" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {SERVICE_PRICING.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveServiceId(s.id)}
                  data-cursor="hover"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 22px',
                    borderRadius: '999px',
                    border: `1px solid ${activeServiceId === s.id ? 'var(--t-accent)' : 'var(--t-border-m)'}`,
                    background: activeServiceId === s.id ? 'var(--t-accent)' : 'var(--t-bg)',
                    color: activeServiceId === s.id ? 'var(--t-on-accent)' : 'var(--t-text-2)',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'none',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing cards — key on activeServiceId re-triggers stagger animation */}
          <AnimatedSection key={activeServiceId} variantCycle={['tiltLeft', 'bounce', 'tiltRight', 'scaleIn']} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {activePricing.tiers.map((tier) => {
              const isEnterprise = tier.price === 'Custom';
              return (
                <AnimatedItem key={tier.name} style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    background: tier.featured ? 'var(--t-accent)' : 'var(--t-bg)',
                    border: `1px solid ${tier.featured ? 'var(--t-accent)' : 'var(--t-border)'}`,
                    borderRadius: '20px',
                    padding: '40px',
                    position: 'relative',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = tier.featured ? '0 20px 60px var(--t-a-shadow-s)' : '0 16px 50px var(--t-shadow-l)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {tier.featured && (
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--t-pop-bg)', color: 'var(--t-pop-text)', fontSize: '11px', fontWeight: 800, padding: '5px 16px', borderRadius: '999px', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      Most Popular
                    </div>
                  )}
                  <h3 style={{ color: tier.featured ? 'var(--t-feat-text)' : 'var(--t-text)', fontWeight: 800, fontSize: '20px', marginBottom: '8px' }}>
                    {tier.name}
                  </h3>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: isEnterprise ? '32px' : '36px', fontWeight: 900, color: tier.featured ? 'var(--t-feat-text)' : 'var(--t-accent)', letterSpacing: '-0.02em' }}>
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span style={{ fontSize: '15px', color: tier.featured ? 'var(--t-feat-desc)' : 'var(--t-text-5)', fontWeight: 500, marginLeft: '2px' }}>
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p style={{ color: tier.featured ? 'var(--t-feat-desc)' : 'var(--t-text-2)', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                    {tier.desc}
                  </p>
                  <div style={{ height: '1px', background: tier.featured ? 'var(--t-feat-div)' : 'var(--t-border)', marginBottom: '24px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px', flex: 1 }}>
                    {tier.features.map((f) => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: tier.featured ? 'var(--t-feat-text)' : 'var(--t-accent)', fontSize: '14px', fontWeight: 700, lineHeight: '20px', flexShrink: 0 }}>✓</span>
                        <span style={{ color: tier.featured ? 'var(--t-feat-feat)' : 'var(--t-text-2)', fontSize: '14px', lineHeight: '20px' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    data-cursor="hover"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      background: tier.featured ? 'var(--t-on-accent)' : isEnterprise ? 'transparent' : 'var(--t-accent)',
                      color: tier.featured ? 'var(--t-accent)' : isEnterprise ? 'var(--t-accent)' : 'var(--t-on-accent)',
                      border: isEnterprise && !tier.featured ? '1px solid var(--t-accent)' : '1px solid transparent',
                      fontWeight: 700,
                      fontSize: '14px',
                      padding: '14px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    {tier.cta} →
                  </Link>
                </div>
                </AnimatedItem>
              );
            })}
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', background: 'var(--t-bg)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 data-reveal style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Not sure which service you need?
          </h2>
          <p data-reveal data-delay="0.1" style={{ color: 'var(--t-text-2)', fontSize: '16px', marginBottom: '32px' }}>
            Let's have a free consultation call and figure it out together.
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
            Book a Free Call
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
