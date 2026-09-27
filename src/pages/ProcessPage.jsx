import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import HeroBackground from '../components/HeroBackground';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';

const steps = [
  {
    number: '01',
    title: 'Deep Brand Discovery',
    desc: 'We start by truly understanding your business — your goals, audience, competition, and current challenges. Through structured discovery sessions, questionnaires, and market analysis, we uncover insights that form the foundation of everything we create.',
    bullets: ['Brand questionnaire & briefing', 'Stakeholder interviews', 'Market & competitor research', 'Audience persona development'],
    icon: '🔍',
    duration: '2–3 Days',
  },
  {
    number: '02',
    title: 'Creative Strategy Development',
    desc: 'With discovery insights in hand, we craft a strategic roadmap. This includes positioning strategy, creative direction, moodboards, and a detailed project plan that aligns your business objectives with creative execution.',
    bullets: ['Creative direction & moodboards', 'Brand positioning statement', 'Project roadmap & milestones', 'Content strategy outline'],
    icon: '🧠',
    duration: '3–5 Days',
  },
  {
    number: '03',
    title: 'Premium Design Execution',
    desc: 'This is where the magic happens. Our designers translate strategy into stunning visuals — crafting each element with intention, hierarchy, and brand alignment. We present multiple concepts and refine based on structured feedback.',
    bullets: ['Initial design concepts (2–3 directions)', 'Client feedback & refinement', 'Final design system creation', 'Asset preparation & organisation'],
    icon: '🎨',
    duration: '5–14 Days',
  },
  {
    number: '04',
    title: 'Technical Development & Build',
    desc: 'Our development team brings the design to life with clean, optimised code. We build for performance, accessibility, SEO, and scalability — ensuring your digital product works flawlessly across all devices.',
    bullets: ['Responsive front-end development', 'Back-end & CMS integration', 'Performance optimisation', 'SEO foundation & meta setup'],
    icon: '⚙️',
    duration: '7–21 Days',
  },
  {
    number: '05',
    title: 'Quality Assurance & Testing',
    desc: 'We rigorously test every element before launch. Cross-browser compatibility, mobile responsiveness, load speed, form functionality, and accessibility — nothing ships until it meets our premium quality standard.',
    bullets: ['Cross-browser & device testing', 'Performance & Core Web Vitals audit', 'Accessibility checks (WCAG)', 'Content & functionality review'],
    icon: '🧪',
    duration: '2–4 Days',
  },
  {
    number: '06',
    title: 'Strategic Launch & Handover',
    desc: 'Launch day is a celebration — and a careful process. We manage deployment, configure domains, set up analytics, and provide comprehensive training so you can manage your new brand or platform with confidence.',
    bullets: ['Managed deployment & go-live', 'DNS configuration & SSL setup', 'Analytics & tracking setup', 'Training & handover documentation'],
    icon: '🚀',
    duration: '1–2 Days',
  },
  {
    number: '07',
    title: 'Ongoing Support & Growth',
    desc: 'Our relationship doesn\'t end at launch. We provide post-launch support, monitor performance, and are always available for updates, new features, and strategic guidance as your business grows.',
    bullets: ['3 months free post-launch support', 'Monthly performance reporting', 'Priority update requests', 'Retainer options for ongoing work'],
    icon: '🤝',
    duration: 'Ongoing',
  },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Project timelines vary by scope. A brand identity typically takes 2–4 weeks. A full website takes 4–8 weeks. We provide a detailed timeline during the discovery phase.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'To kick off, we need a completed brief/questionnaire, an initial deposit, and access to any existing brand assets. We guide you through every step.',
  },
  {
    q: 'How many revisions are included?',
    a: 'Every project includes structured revision rounds (typically 2–3 rounds depending on the package). We work with you until you\'re 100% satisfied.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Absolutely. We\'ve worked with clients in Nigeria, Ghana, Kenya, UK, USA, and Canada. All collaboration is remote-friendly via Slack, Zoom, and Notion.',
  },
  {
    q: 'What happens if I want changes after launch?',
    a: 'All projects include 3 months of post-launch support. After that, we offer affordable monthly retainer plans for ongoing maintenance and updates.',
  },
  {
    q: 'Can I see work-in-progress before the final delivery?',
    a: 'Yes. We share staged updates throughout the project via shared Figma boards or staging environments, so you\'re always aligned.',
  },
];

export default function ProcessPage() {
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
        <HeroBackground image="/images/pro.jpg" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Home / Process
          </p>
          <h1
            data-reveal
            data-delay="0.1"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '20px' }}
          >
            Our Process
          </h1>
          <p
            data-reveal
            data-delay="0.2"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '560px', lineHeight: 1.7 }}
          >
            Our refined, 7-step creative process eliminates guesswork and delivers extraordinary results — for every client, every project.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: '100px 40px', background: 'var(--t-bg)' }}>
        <AnimatedSection
          variantCycle={['slideLeft', 'flipX', 'slideRight', 'tiltLeft', 'bounce', 'tiltRight', 'rotateIn']}
          stagger={0.08}
          style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          {steps.map((step) => (
            <AnimatedItem key={step.number}>
            <div
              className="r-step-card"
              style={{
                background: 'var(--t-surface)',
                border: '1px solid var(--t-border)',
                borderRadius: '24px',
                padding: '48px',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '40px',
                alignItems: 'center',
                flexWrap: 'wrap',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--t-a-border)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--t-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Number */}
              <div className="r-step-num" style={{ fontSize: '80px', fontWeight: 900, color: 'var(--t-ghost)', lineHeight: 1, letterSpacing: '-0.04em', userSelect: 'none', minWidth: '100px' }}>
                {step.number}
              </div>

              {/* Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{step.icon}</span>
                  <h3 style={{ color: 'var(--t-text)', fontWeight: 800, fontSize: 'clamp(20px, 3vw, 28px)', letterSpacing: '-0.01em' }}>{step.title}</h3>
                </div>
                <p style={{ color: 'var(--t-text-2)', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px', maxWidth: '600px' }}>{step.desc}</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {step.bullets.map((b) => (
                    <span
                      key={b}
                      style={{
                        background: 'var(--t-a-bg-s)',
                        color: 'var(--t-accent)',
                        fontSize: '12px',
                        fontWeight: 600,
                        padding: '6px 14px',
                        borderRadius: '999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span style={{ color: 'var(--t-accent)' }}>✓</span> {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step accent */}
              <div
                className="r-step-icon"
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--t-a-bg)',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>
            </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </section>

      {/* FAQ */}
      <section style={{ padding: '100px 40px', background: 'var(--t-surface)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>FAQ</p>
          <h2 data-reveal data-delay="0.1" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '48px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((item, i) => (
              <div
                key={i}
                data-reveal
                data-delay={i * 0.07}
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
                  <p style={{ padding: '0 28px 22px', color: 'var(--t-text-2)', fontSize: '15px', lineHeight: 1.8 }}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', background: 'var(--t-bg)', textAlign: 'center' }}>
        <h2 data-reveal style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Ready to start your project?
        </h2>
        <p data-reveal data-delay="0.1" style={{ color: 'var(--t-text-2)', fontSize: '16px', marginBottom: '32px' }}>
          Let's walk through the process together — starting with a free consultation.
        </p>
        <Link
          to="/contact"
          data-cursor="hover"
          data-reveal
          data-delay="0.2"
          style={{ display: 'inline-block', background: 'var(--t-accent)', color: 'var(--t-on-accent)', fontWeight: 700, fontSize: '15px', padding: '16px 44px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--t-accent-h)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--t-accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Book a Free Consultation
        </Link>
      </section>
    </PageWrapper>
  );
}
