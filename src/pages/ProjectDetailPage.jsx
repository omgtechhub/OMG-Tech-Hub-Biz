import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { usePortfolio } from '../hooks/usePortfolio';

const navBtnStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.2)',
  background: 'rgba(0,0,0,0.55)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backdropFilter: 'blur(6px)',
  transition: 'background 0.2s, border-color 0.2s',
  zIndex: 2,
};

function ProjectGallery({ images, title, index, onChange }) {
  const [fading, setFading] = useState(false);
  const [shown, setShown] = useState(index);
  const touchX = useRef(null);
  const multi = images.length > 1;

  useEffect(() => {
    if (index === shown) return;
    setFading(true);
    const t = setTimeout(() => { setShown(index); setFading(false); }, 150);
    return () => clearTimeout(t);
  }, [index, shown]);

  const go = (dir) => onChange((index + dir + images.length) % images.length);

  const onKeyDown = (e) => {
    if (!multi) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  };

  return (
    <div
      role={multi ? 'region' : undefined}
      aria-roledescription={multi ? 'carousel' : undefined}
      aria-label={multi ? `${title} images` : undefined}
      tabIndex={multi ? 0 : undefined}
      onKeyDown={onKeyDown}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (!multi || touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      style={{ position: 'relative', background: 'var(--t-surface)', lineHeight: 0, outline: 'none' }}
    >
      <img
        src={images[shown]}
        alt={multi ? `${title} — image ${shown + 1} of ${images.length}` : title}
        style={{ width: '100%', maxHeight: '80vh', display: 'block', objectFit: 'contain', opacity: fading ? 0 : 1, transition: 'opacity 0.15s ease' }}
      />

      {multi && (
        <>
          <button type="button" aria-label="Previous image" onClick={() => go(-1)} className="r-gallery-nav" style={{ ...navBtnStyle, left: '14px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button type="button" aria-label="Next image" onClick={() => go(1)} className="r-gallery-nav" style={{ ...navBtnStyle, right: '14px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '12px', fontWeight: 600, lineHeight: 1, padding: '7px 11px', borderRadius: '999px', backdropFilter: 'blur(6px)' }} aria-live="polite">
            {index + 1} / {images.length}
          </div>

          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', padding: '8px 12px', borderRadius: '999px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}>
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => onChange(i)}
                style={{
                  width: i === index ? '22px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: i === index ? '#fff' : 'rgba(255,255,255,0.45)',
                  transition: 'width 0.25s ease, background 0.2s',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  let m = url.match(/youtu\.be\/([^?&]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  m = url.match(/youtube\.com\/shorts\/([^?&]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  m = url.match(/[?&]v=([^&]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  return null;
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { projects, loading } = usePortfolio();
  const project = projects.find((p) => p.slug === slug);
  const related = projects.filter((p) => p.category === project?.category && p.slug !== slug).slice(0, 3);
  const images = project ? (project.images?.length ? project.images : [project.image]).filter(Boolean) : [];
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => { setImgIndex(0); }, [slug]);
  const currentImage = images[imgIndex] || project?.image;
  const imgExt = (currentImage?.match(/\.(jpe?g|png|webp|gif)(?:$|\?)/i)?.[1] || 'jpg').toLowerCase();

  const handleShare = async () => {
    const data = { title: project?.title, url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch (_) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!project && loading) {
    return (
      <PageWrapper>
        <div style={{ minHeight: '80vh' }} />
      </PageWrapper>
    );
  }

  if (!project) {
    return (
      <PageWrapper>
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
          <h1 style={{ color: 'var(--t-text)', fontSize: '48px', fontWeight: 900 }}>Project Not Found</h1>
          <Link to="/portfolio" style={{ color: 'var(--t-accent)', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>← Back to Portfolio</Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero */}
      <section
        className="r-page-hero"
        style={{
          minHeight: '55vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '140px 40px 60px',
          overflow: 'hidden',
        }}
      >
        <img src={project.image} alt={project.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--t-hero-grad-s)' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative' }}>
          <Link to="/portfolio" style={{ color: 'var(--t-text-2)', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--t-accent)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--t-text-2)'}
          >
            ← Back to Portfolio
          </Link>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{ background: 'var(--t-a-bg-xxs)', color: 'var(--t-accent)', fontSize: '12px', fontWeight: 600, padding: '5px 14px', borderRadius: '999px' }}>{tag}</span>
            ))}
          </div>
          <h1 data-reveal style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '16px' }}>
            {project.title}
          </h1>
          <p data-reveal data-delay="0.1" style={{ color: 'var(--t-text-2)', fontSize: '16px' }}>
            {project.client} · {project.year}
          </p>
        </div>
      </section>

      {/* Results */}
      {project.results.length > 0 && (
      <section style={{ padding: '60px 40px', background: 'var(--t-surface)', borderBottom: '1px solid var(--t-border-s)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {project.results.map((r, i) => (
            <div key={r} data-reveal data-delay={i * 0.1} style={{ textAlign: 'center', padding: '24px 40px' }}>
              <div style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, color: 'var(--t-accent)', letterSpacing: '-0.02em', lineHeight: 1 }}>{r}</div>
              <div style={{ color: 'var(--t-text-4)', fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>Result</div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Media & Actions */}
      <section style={{ padding: '60px 40px 80px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Project images */}
          {images.length > 0 && (
            <div data-reveal style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid var(--t-border)',
              marginBottom: '24px',
            }}>
              <ProjectGallery images={images} title={project.title} index={imgIndex} onChange={setImgIndex} />
            </div>
          )}

          {/* YouTube embed for Motion Design */}
          {project.category === 'Motion Design' && getYouTubeEmbedUrl(project.url) && (
            <div data-reveal data-delay="0.1" style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid var(--t-border)',
              aspectRatio: '16/9',
              marginBottom: '24px',
            }}>
              <iframe
                src={getYouTubeEmbedUrl(project.url)}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>
          )}

          {/* Action buttons */}
          <div data-reveal data-delay="0.15" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>

            {/* Visit Website — Web Development */}
            {project.category === 'Web Development' && project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--t-accent)',
                  color: 'var(--t-on-accent)',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '13px 28px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--t-accent-h)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--t-accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Visit Website
              </a>
            )}

            {/* Watch on YouTube — Motion Design */}
            {project.category === 'Motion Design' && project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FF0000',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '14px',
                  padding: '13px 28px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg>
                Watch on YouTube
              </a>
            )}

            {/* Download current image */}
            <a
              href={currentImage}
              download={images.length > 1 ? `${project.slug}-${imgIndex + 1}.${imgExt}` : `${project.slug}.${imgExt}`}
              data-cursor="hover"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--t-surface)',
                border: '1px solid var(--t-border-l)',
                color: 'var(--t-text)',
                fontWeight: 600,
                fontSize: '14px',
                padding: '13px 28px',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--t-accent)'; e.currentTarget.style.background = 'var(--t-a-bg-s)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--t-border-l)'; e.currentTarget.style.background = 'var(--t-surface)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              {images.length > 1 ? `Download ${imgIndex + 1} of ${images.length}` : 'Download'}
            </a>

            {/* Share */}
            <button
              onClick={handleShare}
              data-cursor="hover"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--t-surface)',
                border: '1px solid var(--t-border-l)',
                color: 'var(--t-text)',
                fontWeight: 600,
                fontSize: '14px',
                padding: '13px 28px',
                borderRadius: '10px',
                cursor: 'none',
                fontFamily: 'Inter, sans-serif',
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--t-accent)'; e.currentTarget.style.background = 'var(--t-a-bg-s)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--t-border-l)'; e.currentTarget.style.background = 'var(--t-surface)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      {(project.challenge || project.solution) && (
      <section style={{ padding: '80px 40px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px' }}>
          {project.challenge && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ width: '32px', height: '32px', background: 'var(--t-accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: 'var(--t-on-accent)' }}>!</span>
              <h2 style={{ color: 'var(--t-text)', fontWeight: 800, fontSize: '22px' }}>The Challenge</h2>
            </div>
            <p data-reveal style={{ color: 'var(--t-text-2)', fontSize: '16px', lineHeight: 1.8 }}>{project.challenge}</p>
          </div>
          )}
          {project.solution && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ width: '32px', height: '32px', background: 'var(--t-accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, color: 'var(--t-on-accent)' }}>✓</span>
              <h2 style={{ color: 'var(--t-text)', fontWeight: 800, fontSize: '22px' }}>Our Solution</h2>
            </div>
            <p data-reveal data-delay="0.1" style={{ color: 'var(--t-text-2)', fontSize: '16px', lineHeight: 1.8 }}>{project.solution}</p>
          </div>
          )}
        </div>
      </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: '80px 40px', background: 'var(--t-surface)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h3 data-reveal style={{ fontSize: '28px', fontWeight: 800, color: 'var(--t-text)', marginBottom: '32px' }}>More {project.category} Projects</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {related.map((p, i) => (
                <Link
                  key={p.slug}
                  to={`/portfolio/${p.slug}`}
                  data-cursor="hover"
                  data-reveal
                  data-delay={i * 0.1}
                  style={{
                    display: 'block',
                    background: 'var(--t-bg)',
                    border: '1px solid var(--t-border)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    transition: 'border-color 0.3s, transform 0.3s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--t-a-border)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--t-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ color: 'var(--t-text)', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>{p.title}</h4>
                    <p style={{ color: 'var(--t-text-2)', fontSize: '13px' }}>{p.client}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: '80px 40px', background: 'var(--t-bg)', textAlign: 'center' }}>
        <h2 data-reveal style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Like what you see?
        </h2>
        <p data-reveal data-delay="0.1" style={{ color: 'var(--t-text-2)', fontSize: '16px', marginBottom: '32px' }}>Let's create something like this for your brand.</p>
        <Link
          to="/contact"
          data-cursor="hover"
          data-reveal
          data-delay="0.2"
          style={{ display: 'inline-block', background: 'var(--t-accent)', color: 'var(--t-on-accent)', fontWeight: 700, fontSize: '15px', padding: '16px 44px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--t-accent-h)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--t-accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Start a Project
        </Link>
      </section>
    </PageWrapper>
  );
}
