import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { usePortfolio } from '../hooks/usePortfolio';
import HeroBackground from '../components/HeroBackground';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';

const categories = ['All', 'Graphic Design', 'Web Development', 'UI/UX Design', 'Motion Design'];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { projects } = usePortfolio();

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

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
        <HeroBackground image="/images/port.jpg" />
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Home / Portfolio
          </p>
          <h1
            data-reveal
            data-delay="0.1"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '20px' }}
          >
            Our Work
          </h1>
          <p
            data-reveal
            data-delay="0.2"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '560px', lineHeight: 1.7 }}
          >
            100+ projects delivered across branding, web, UX, motion, and design.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section style={{ padding: '60px 40px 100px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Filter */}
          <div data-reveal style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
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
                  padding: '9px 22px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'none',
                  transition: 'all 0.25s ease',
                  fontFamily: 'Inter, sans-serif',
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

          {/* Grouped grid — one category section per group */}
          {(() => {
            const ORDER = ['Graphic Design', 'Web Development', 'UI/UX Design', 'Motion Design'];
            const VARIANTS = ['flipY', 'rotateIn', 'flipX', 'tiltLeft', 'bounce', 'tiltRight', 'scaleIn', 'popIn', 'swingIn', 'slideLeft', 'slideRight', 'springUp'];
            const grouped = ORDER
              .map((cat) => ({ label: cat, items: filtered.filter((p) => p.category === cat) }))
              .filter((g) => g.items.length > 0);

            return grouped.map((group, gi) => (
              <div key={group.label} style={{ marginBottom: gi < grouped.length - 1 ? '56px' : 0 }}>
                {/* Category divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                  <span style={{
                    color: 'var(--t-accent)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    whiteSpace: 'nowrap',
                  }}>
                    {group.label}
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--t-border)' }} />
                </div>

                {/* Cards */}
                <AnimatedSection
                  variantCycle={VARIANTS}
                  className="r-portfolio-grid"
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}
                >
                  {group.items.map((project) => (
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
                        transition: 'border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--t-a-border)';
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 24px 60px var(--t-a-shadow)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--t-border)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ aspectRatio: project.category === 'Graphic Design' ? '4/3' : '16/10', overflow: 'hidden', position: 'relative' }}>
                        <img
                          src={project.image}
                          alt={project.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        />
                        {project.images?.length > 1 && (
                          <span
                            aria-label={`${project.images.length} images`}
                            style={{ position: 'absolute', top: '12px', right: '12px', display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '5px 9px', borderRadius: '999px', backdropFilter: 'blur(6px)' }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7" y="7" width="14" height="14" rx="2"/><path d="M3 17V5a2 2 0 0 1 2-2h12"/></svg>
                            {project.images.length}
                          </span>
                        )}
                      </div>
                      <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                          {project.tags.map((tag) => (
                            <span key={tag} style={{ background: 'var(--t-a-bg-s)', color: 'var(--t-accent)', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '999px' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 style={{ color: 'var(--t-text)', fontWeight: 700, fontSize: '20px', marginBottom: '8px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                          {project.title}
                        </h3>
                        <p style={{ color: 'var(--t-text-2)', fontSize: '13px', marginBottom: '16px' }}>
                          {project.client} · {project.year}
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
                          {project.results.map((r) => (
                            <span key={r} style={{ background: 'var(--t-surface-2)', border: '1px solid var(--t-border)', color: 'var(--t-text-2)', fontSize: '12px', fontWeight: 500, padding: '4px 10px', borderRadius: '6px' }}>
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                    </AnimatedItem>
                  ))}
                </AnimatedSection>
              </div>
            ));
          })()}
        </div>
      </section>
    </PageWrapper>
  );
}
