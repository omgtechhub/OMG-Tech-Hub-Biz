import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import HeroBackground from '../components/HeroBackground';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';

const serviceCategories = [
  {
    id: 'graphic-design',
    icon: '🎨',
    title: 'Graphic Design',
    tiers: [
      {
        name: 'Starter',
        monthly: 80000,
        annual: 64000,
        desc: 'A clean, professional brand identity foundation for startups and small businesses.',
        features: [
          'Logo Design (2 Concepts)',
          'Brand Colour Palette',
          'Typography System',
          'Business Card Design',
          'Social Profile Graphics',
          '2 Revision Rounds',
          'Brand Style Guide',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Growth',
        monthly: 200000,
        annual: 160000,
        desc: 'A complete, consistent brand presence across all channels for growing businesses.',
        features: [
          'Everything in Starter',
          '3 Logo Concepts',
          'Full Brand Identity System',
          'Social Media Kit (12 Templates)',
          'Stationery Pack',
          '3 Revision Rounds',
          '1-Month Post-Delivery Support',
        ],
        featured: true,
        cta: 'Get Started',
      },
      {
        name: 'Premium',
        monthly: 450000,
        annual: 360000,
        desc: 'The full creative transformation with extended deliverables and priority execution.',
        features: [
          'Everything in Growth',
          'Packaging Design',
          'Presentation Deck Template',
          'Infographic Design',
          'Email Template Design',
          'Unlimited Revisions',
          'Brand Motion System',
          'Priority Response',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Enterprise',
        monthly: null,
        annual: null,
        desc: 'Bespoke creative strategy and full brand ecosystem for large organisations.',
        features: [
          'Full Creative Strategy',
          'Complete Brand Ecosystem',
          'Multi-Brand System',
          'Dedicated Creative Team',
          'Campaign Identity Design',
          'Monthly Retainer Options',
          'NDA & Priority SLA',
        ],
        cta: "Let's Talk",
      },
    ],
  },
  {
    id: 'web-development',
    icon: '💻',
    title: 'Web Development',
    tiers: [
      {
        name: 'Starter',
        monthly: 200000,
        annual: 160000,
        desc: 'A professional, mobile-first web presence to establish your brand online.',
        features: [
          '3-Page Responsive Website',
          'Mobile-First Design',
          'Basic SEO Setup',
          'Contact Form Integration',
          'Analytics Setup',
          '2 Revision Rounds',
          '1-Month Post-Launch Support',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Growth',
        monthly: 500000,
        annual: 400000,
        desc: 'A scalable, content-ready website built for growth and discoverability.',
        features: [
          'Everything in Starter',
          'Up to 7 Pages',
          'Custom CMS Integration',
          'Blog Setup & Configuration',
          'Advanced SEO & Sitemap',
          'Performance Tuning',
          '3 Revision Rounds',
          '2-Month Post-Launch Support',
        ],
        featured: true,
        cta: 'Get Started',
      },
      {
        name: 'Premium',
        monthly: 1200000,
        annual: 960000,
        desc: 'Full-featured web platform with e-commerce, integrations, and extended support.',
        features: [
          'Everything in Growth',
          'Up to 15 Pages',
          'E-Commerce Functionality',
          'Web App Features',
          'API Integration',
          'Core Web Vitals Optimisation',
          'Unlimited Revisions',
          '3-Month Support',
          'Priority Response',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Enterprise',
        monthly: null,
        annual: null,
        desc: 'Custom web applications and enterprise-grade platforms for complex requirements.',
        features: [
          'Custom Web Applications',
          'Multi-Site / Multi-Language',
          'Enterprise CMS',
          'Advanced API Architecture',
          'DevOps & CI/CD Pipeline',
          'Dedicated Dev Team',
          'Monthly Retainer Options',
          'NDA & Priority SLA',
        ],
        cta: "Let's Talk",
      },
    ],
  },
  {
    id: 'ui-ux-design',
    icon: '✨',
    title: 'UI/UX Design',
    tiers: [
      {
        name: 'Starter',
        monthly: 150000,
        annual: 120000,
        desc: 'Essential UX foundations for small apps and MVPs with clean, usable interfaces.',
        features: [
          'Up to 5 Screens',
          'Wireframes & User Flows',
          'Figma Prototype',
          'Mobile-First Design',
          '2 Revision Rounds',
          'Dev Handoff Notes',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Growth',
        monthly: 350000,
        annual: 280000,
        desc: 'Research-driven design with a scalable system for growing digital products.',
        features: [
          'Everything in Starter',
          'Up to 15 Screens',
          'UX Research & Personas',
          'Information Architecture',
          'Design System & Components',
          'Usability Testing',
          '3 Revision Rounds',
        ],
        featured: true,
        cta: 'Get Started',
      },
      {
        name: 'Premium',
        monthly: 700000,
        annual: 560000,
        desc: 'End-to-end UX strategy with comprehensive research and a production-ready design system.',
        features: [
          'Everything in Growth',
          'Up to 30 Screens',
          'Full UX Research Sprint',
          'End-to-End Design System',
          'Micro-Interaction Specs',
          'Accessibility Audit (WCAG)',
          'Unlimited Revisions',
          'Priority Response',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Enterprise',
        monthly: null,
        annual: null,
        desc: 'Full-scale design operations for multi-platform products and enterprise teams.',
        features: [
          'Multi-Platform Design',
          'Design System Governance',
          'User Research Ops',
          'Accessibility Compliance',
          'Design Ops Setup',
          'Dedicated UX Team',
          'Monthly Retainer Options',
          'NDA & Priority SLA',
        ],
        cta: "Let's Talk",
      },
    ],
  },
  {
    id: 'motion-design',
    icon: '🎬',
    title: 'Motion Design',
    tiers: [
      {
        name: 'Starter',
        monthly: 100000,
        annual: 80000,
        desc: 'Bring your brand to life with essential motion assets for social and web.',
        features: [
          'Logo Animation',
          '1 Animated Social Post',
          'Up to 15 Seconds',
          'HD Export (MP4 + GIF)',
          '2 Revision Rounds',
          'Source Files Included',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Growth',
        monthly: 280000,
        annual: 224000,
        desc: 'A complete motion toolkit with explainer content and social-ready templates.',
        features: [
          'Everything in Starter',
          '3 Motion Design Pieces',
          'Animated Story Templates',
          '5 Animated Social Posts',
          '60-Second Explainer Video',
          'Motion Style Guide',
          '3 Revision Rounds',
        ],
        featured: true,
        cta: 'Get Started',
      },
      {
        name: 'Premium',
        monthly: 600000,
        annual: 480000,
        desc: 'Full brand motion system with long-form content and UI animation specs.',
        features: [
          'Everything in Growth',
          'Full Brand Motion System',
          'Title Sequences',
          'Animated Infographics',
          'UI Micro-Animation Specs',
          '2-Minute Explainer Video',
          'Unlimited Revisions',
          'Priority Response',
        ],
        cta: 'Get Started',
      },
      {
        name: 'Enterprise',
        monthly: null,
        annual: null,
        desc: 'Broadcast-quality animation and multi-platform motion for large-scale campaigns.',
        features: [
          '2D/3D Character Animation',
          'Product Visualisation',
          'Broadcast-Quality Production',
          'Campaign Motion Identity',
          'Multi-Platform Delivery',
          'Dedicated Motion Team',
          'Monthly Retainer Options',
          'NDA & Priority SLA',
        ],
        cta: "Let's Talk",
      },
    ],
  },
];

const addOns = [
  { name: 'Logo Design Only', price: '₦80,000+' },
  { name: 'Landing Page Design & Dev', price: '₦150,000+' },
  { name: 'Social Media Kit (30 Posts)', price: '₦75,000' },
  { name: 'Explainer Video Animation', price: '₦200,000+' },
  { name: 'Packaging Design', price: '₦120,000+' },
  { name: 'Monthly Design Retainer', price: '₦120,000/m' },
  { name: 'SEO Audit & Optimisation', price: '₦80,000' },
  { name: 'Creative Consulting', price: '₦150,000' },
];

const faqs = [
  {
    q: 'Do you accept payment in installments?',
    a: 'Yes. We require a 50% deposit to begin, and the remaining balance is due upon completion. For Enterprise projects, custom payment schedules are available.',
  },
  {
    q: 'Are prices in Nigerian Naira?',
    a: 'Yes, all listed prices are in NGN. We also accept USD and GBP for international clients.',
  },
  {
    q: "What's included in post-launch support?",
    a: 'Bug fixes, minor content updates, performance monitoring, and email support. Larger feature requests are quoted separately.',
  },
  {
    q: 'Can I upgrade my package later?',
    a: "Absolutely. Start with Starter or Growth and upgrade anytime. We'll apply a pro-rata credit.",
  },
  {
    q: 'Do you offer non-profit discounts?',
    a: 'Yes, 20% discount for registered non-profit organisations and social enterprises.',
  },
];

function formatPrice(amount) {
  if (amount === null) return 'Custom';
  return '₦' + amount.toLocaleString('en-NG');
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

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
        <HeroBackground image="/images/price.jpg" />
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
            Home / Pricing
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
            Investment in Your Brand's Future
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
            Transparent, value-driven pricing for every stage of your brand's growth. No hidden fees, no surprises — just premium execution at every tier.
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <section style={{ padding: '60px 40px 0', background: 'var(--t-bg)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            data-reveal
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--t-surface)',
              border: '1px solid var(--t-border)',
              borderRadius: '999px',
              padding: '4px',
              gap: '0',
            }}
          >
            <button
              onClick={() => setIsAnnual(false)}
              data-cursor="hover"
              style={{
                padding: '12px 28px',
                borderRadius: '999px',
                border: 'none',
                background: !isAnnual ? 'var(--t-accent)' : 'transparent',
                color: !isAnnual ? 'var(--t-on-accent)' : 'var(--t-text-2)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'none',
                transition: 'all 0.25s ease',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              data-cursor="hover"
              style={{
                padding: '12px 28px',
                borderRadius: '999px',
                border: 'none',
                background: isAnnual ? 'var(--t-accent)' : 'transparent',
                color: isAnnual ? 'var(--t-on-accent)' : 'var(--t-text-2)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'none',
                transition: 'all 0.25s ease',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>
      </section>

      {/* Service Categories with Pricing Tiers */}
      {serviceCategories.map((category, catIdx) => (
        <section
          key={category.id}
          style={{
            padding: catIdx === 0 ? '60px 40px 100px' : '100px 40px',
            background: catIdx % 2 === 0 ? 'var(--t-bg)' : 'var(--t-surface)',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Category Header */}
            <div
              data-reveal
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '48px',
              }}
            >
              <span style={{ fontSize: '32px' }}>{category.icon}</span>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 900,
                  color: 'var(--t-text)',
                  letterSpacing: '-0.02em',
                }}
              >
                {category.title}
              </h2>
            </div>

            {/* Tier Cards */}
            <AnimatedSection
              variantCycle={['flipY', 'tiltLeft', 'bounce', 'tiltRight', 'scaleIn', 'popIn']}
              stagger={0.09}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                gap: '24px',
              }}
            >
              {category.tiers.map((tier, i) => {
                const price = tier.monthly === null
                  ? 'Custom'
                  : isAnnual
                    ? formatPrice(tier.annual)
                    : formatPrice(tier.monthly);
                const period = tier.monthly === null ? '' : isAnnual ? '/yr' : '/mo';
                const isFeatured = tier.featured;
                const isEnterprise = tier.monthly === null;

                return (
                  <AnimatedItem key={tier.name} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      background: isFeatured ? 'var(--t-accent)' : catIdx % 2 === 0 ? 'var(--t-surface)' : 'var(--t-bg)',
                      border: `1px solid ${isFeatured ? 'var(--t-accent)' : 'var(--t-border)'}`,
                      borderRadius: '20px',
                      padding: '40px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      boxSizing: 'border-box',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = isFeatured
                        ? '0 20px 60px var(--t-a-shadow-s)'
                        : '0 16px 50px var(--t-shadow-l)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Most Popular Badge */}
                    {isFeatured && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '-12px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'var(--t-pop-bg)',
                          color: 'var(--t-pop-text)',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '5px 16px',
                          borderRadius: '999px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Most Popular
                      </div>
                    )}

                    {/* Tier Name */}
                    <h3
                      style={{
                        color: isFeatured ? 'var(--t-feat-text)' : 'var(--t-text)',
                        fontWeight: 800,
                        fontSize: '20px',
                        marginBottom: '8px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {tier.name}
                    </h3>

                    {/* Price */}
                    <div style={{ marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: isEnterprise ? '32px' : '36px',
                          fontWeight: 900,
                          color: isFeatured ? 'var(--t-feat-text)' : 'var(--t-accent)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {price}
                      </span>
                      {period && (
                        <span
                          style={{
                            fontSize: '15px',
                            color: isFeatured ? 'var(--t-feat-desc)' : 'var(--t-text-5)',
                            fontWeight: 500,
                            marginLeft: '2px',
                          }}
                        >
                          {period}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        color: isFeatured ? 'var(--t-feat-desc)' : 'var(--t-text-2)',
                        fontSize: '14px',
                        lineHeight: 1.7,
                        marginBottom: '24px',
                      }}
                    >
                      {tier.desc}
                    </p>

                    {/* Divider */}
                    <div
                      style={{
                        height: '1px',
                        background: isFeatured ? 'var(--t-feat-div)' : 'var(--t-border)',
                        marginBottom: '24px',
                      }}
                    />

                    {/* Features */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginBottom: '32px',
                        flex: 1,
                      }}
                    >
                      {tier.features.map((f) => (
                        <div
                          key={f}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                          }}
                        >
                          <span
                            style={{
                              color: isFeatured ? 'var(--t-feat-text)' : 'var(--t-accent)',
                              fontSize: '14px',
                              fontWeight: 700,
                              lineHeight: '20px',
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </span>
                          <span
                            style={{
                              color: isFeatured ? 'var(--t-feat-feat)' : 'var(--t-text-2)',
                              fontSize: '14px',
                              lineHeight: '20px',
                            }}
                          >
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      to="/contact"
                      data-cursor="hover"
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        background: isFeatured
                          ? 'var(--t-on-accent)'
                          : isEnterprise
                            ? 'transparent'
                            : 'var(--t-accent)',
                        color: isFeatured
                          ? 'var(--t-accent)'
                          : isEnterprise
                            ? 'var(--t-accent)'
                            : 'var(--t-on-accent)',
                        border: isEnterprise && !isFeatured ? '1px solid var(--t-accent)' : '1px solid transparent',
                        fontWeight: 700,
                        fontSize: '14px',
                        padding: '14px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        transition: 'opacity 0.2s, transform 0.2s',
                        cursor: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.85';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {tier.cta} {isEnterprise ? '→' : '→'}
                    </Link>
                  </div>
                  </AnimatedItem>
                );
              })}
            </AnimatedSection>
          </div>
        </section>
      ))}

      {/* Add-ons */}
      <section style={{ padding: '100px 40px', background: 'var(--t-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
              Add-ons
            </p>
            <h2
              data-reveal
              data-delay="0.1"
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 900,
                color: 'var(--t-text)',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              Individual Services
            </h2>
            <p
              data-reveal
              data-delay="0.2"
              style={{ color: 'var(--t-text-2)', fontSize: '16px', maxWidth: '520px', margin: '0 auto' }}
            >
              Need something specific? These standalone services can be added to any package or purchased individually.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {addOns.map((item, i) => (
              <div
                key={item.name}
                data-reveal
                data-delay={i * 0.06}
                data-cursor="hover"
                style={{
                  background: 'var(--t-bg)',
                  border: '1px solid var(--t-border)',
                  borderRadius: '16px',
                  padding: '28px 32px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--t-a-border-s)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--t-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span
                  style={{
                    color: 'var(--t-text)',
                    fontSize: '15px',
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    color: 'var(--t-accent)',
                    fontSize: '15px',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section style={{ padding: '100px 40px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
            FAQ
          </p>
          <h2
            data-reveal
            data-delay="0.1"
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 900,
              color: 'var(--t-text)',
              letterSpacing: '-0.02em',
              marginBottom: '48px',
            }}
          >
            Pricing Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((item, i) => (
              <div
                key={i}
                data-reveal
                data-delay={i * 0.07}
                style={{
                  background: 'var(--t-surface)',
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
                    padding: '22px 28px',
                    background: 'none',
                    border: 'none',
                    cursor: 'none',
                    color: 'var(--t-text)',
                    fontSize: '16px',
                    fontWeight: 600,
                    textAlign: 'left',
                    gap: '16px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {item.q}
                  <span
                    style={{
                      color: 'var(--t-accent)',
                      fontSize: '22px',
                      fontWeight: 700,
                      flexShrink: 0,
                      transition: 'transform 0.25s',
                      transform: openFaq === i ? 'rotate(45deg)' : 'none',
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: openFaq === i ? '300px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                  }}
                >
                  <p
                    style={{
                      padding: '0 28px 22px',
                      color: 'var(--t-text-2)',
                      fontSize: '15px',
                      lineHeight: 1.8,
                    }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', background: 'var(--t-surface)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
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
            Ready to invest in your brand?
          </h2>
          <p
            data-reveal
            data-delay="0.1"
            style={{ color: 'var(--t-text-2)', fontSize: '16px', marginBottom: '32px' }}
          >
            Let's discuss your project and find the perfect package for your goals and budget.
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
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--t-accent-h)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--t-accent)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
