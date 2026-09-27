import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import HeroBackground from '../components/HeroBackground';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: [
      'By accessing our website or engaging OMG Tech Hub for any creative, design, or development services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our website or services.',
      'These terms constitute a legally binding agreement between you (the "Client") and OMG Tech Hub (the "Company"). We reserve the right to update or modify these terms at any time, and your continued use of our services constitutes acceptance of any changes.',
    ],
  },
  {
    title: 'Services',
    content: [
      'OMG Tech Hub provides premium creative and technical services including, but not limited to: Brand Identity Design, Graphic Design, UI/UX Design, Web Development, Video Editing, Motion Graphics, Animation, Digital Product Design, and Creative Consulting.',
      'The specific scope, deliverables, timeline, and pricing for each project will be outlined in a separate project proposal or agreement provided before work begins. Any work outside the agreed scope will be treated as additional work and may incur extra charges.',
      'We reserve the right to decline any project at our discretion. All project timelines are estimates and may vary depending on client responsiveness, scope changes, and the complexity of deliverables.',
    ],
  },
  {
    title: 'Payments',
    content: [
      'All projects require a minimum deposit of 50% of the total project cost before work commences. The remaining balance is due upon project completion and before final deliverables are handed over to the client.',
      'We accept payments in Nigerian Naira (NGN), US Dollars (USD), and British Pounds (GBP). Payment methods and bank details will be provided in your project invoice. All fees are exclusive of applicable taxes unless otherwise stated.',
      'Late payments may result in project delays or suspension of work. If payment is not received within 14 days of the due date, we reserve the right to pause all project activities until the outstanding balance is settled.',
      'For larger projects, we may agree on milestone-based payment schedules. These will be outlined in your project proposal and must be adhered to for work to continue uninterrupted.',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'Upon receipt of final payment in full, all intellectual property rights for the completed deliverables will be transferred to the client. Until full payment is received, all work remains the property of OMG Tech Hub.',
      'We reserve the right to showcase completed work in our portfolio, case studies, social media, and marketing materials unless a separate non-disclosure agreement (NDA) has been executed.',
      'Any pre-existing intellectual property, templates, frameworks, or tools used in the creation of deliverables remain the property of OMG Tech Hub or their respective owners. The client receives a licence to use these elements as part of the final deliverables.',
      'Third-party assets (stock images, fonts, plugins) used in deliverables may be subject to their own licensing terms. We will inform the client of any such requirements.',
    ],
  },
  {
    title: 'Revisions',
    content: [
      'Each project includes a specified number of revision rounds as outlined in the project proposal (typically 2-3 rounds depending on the service package). Revisions refer to modifications within the original project scope.',
      'Additional revision rounds beyond the agreed number will incur extra charges, which will be communicated and approved by the client before proceeding.',
      'Revision requests must be submitted in writing (via email, project management tool, or other agreed communication channel) and should be clear, consolidated, and specific. We encourage clients to gather all feedback before submitting revision requests to ensure efficiency.',
      'Major changes to the project direction, scope, or creative brief after design has commenced may be treated as new work and quoted separately.',
    ],
  },
  {
    title: 'Confidentiality',
    content: [
      'Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the project. This includes business strategies, financial information, technical specifications, and any materials marked as confidential.',
      'We will not disclose your confidential information to any third party without your prior written consent, except where required by law or where disclosure is necessary to complete the project (e.g., sharing with subcontractors under similar confidentiality obligations).',
      'This confidentiality obligation survives the termination of our working relationship and remains in effect indefinitely.',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'OMG Tech Hub shall not be held liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our services, including but not limited to loss of profits, data, business opportunities, or goodwill.',
      'Our total liability for any claim arising from our services shall not exceed the total amount paid by the client for the specific project in question.',
      'We are not responsible for any delays, failures, or issues caused by third-party services, hosting providers, domain registrars, or other external factors beyond our reasonable control.',
      'The client is responsible for ensuring that all content, materials, and assets provided to us do not infringe on any third-party intellectual property rights, trademarks, or copyrights.',
    ],
  },
  {
    title: 'Termination',
    content: [
      'Either party may terminate a project by providing written notice. In the event of termination, the client shall pay for all work completed up to the date of termination.',
      'The initial deposit is non-refundable as it covers discovery, planning, and initial design work that commences immediately upon project kickoff.',
      'Upon termination, OMG Tech Hub will provide the client with all completed deliverables for which payment has been received. Any work-in-progress for which payment has not been received remains the property of OMG Tech Hub.',
      'We reserve the right to terminate a project if the client engages in abusive behaviour, repeatedly fails to provide required materials or feedback, or breaches any of these terms.',
    ],
  },
  {
    title: 'Governing Law',
    content: [
      'These Terms of Service shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.',
      'Any disputes arising from these terms or our services shall first be attempted to be resolved through good-faith negotiation. If a resolution cannot be reached, disputes shall be submitted to the appropriate courts in Benin City, Edo State, Nigeria.',
    ],
  },
  {
    title: 'Contact',
    content: [
      'If you have any questions or concerns about these Terms of Service, please contact us:',
      'OMG Tech Hub\nBenin City, Edo State, Nigeria\nEmail: omgtechhub@gmail.com\nPhone: +234 708 432 1204',
    ],
  },
];

export default function TermsPage() {
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
            / Terms of Service
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
            Terms of Service
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
            Please read these Terms of Service carefully before engaging OMG Tech Hub for any
            creative or technical services. These terms outline the rights, responsibilities,
            and obligations of both parties throughout the duration of our working relationship.
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
          Have questions about our terms?
        </h2>
        <p
          data-reveal
          data-delay="0.1"
          style={{ color: 'var(--t-text-2)', fontSize: '16px', marginBottom: '32px' }}
        >
          We believe in transparency. Reach out anytime for clarification.
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
