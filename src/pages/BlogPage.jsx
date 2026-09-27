import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import HeroBackground from '../components/HeroBackground';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';

const API_BASE = import.meta.env.VITE_API_BASE || '';

// ── Platform icons ────────────────────────────────────────────────────────────
const PLATFORM_ICONS = {
  linkedin: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  instagram: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  twitter: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  youtube: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  facebook: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  general: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function normalisePost(p) {
  if (p._legacy) return p;
  return {
    _id:         p.id || p.slug,
    slug:        p.slug,
    title:       p.title,
    excerpt:     p.excerpt,
    platform:    p.platform || 'general',
    image:       p.image ? (p.image.startsWith('http') ? p.image : (API_BASE + '/' + p.image).replace(/([^:])\/\//g,'$1/')) : null,
    tags:        p.tags || [],
    readingTime: p.reading_time || p.readTime || null,
    featured:    !!p.featured,
    publishedAt: p.created_at || p.date || '',
    author: {
      name:   p.author || 'David Omigie',
      role:   p.author_role || 'Founder & CEO, OMG Tech Hub',
      photo:  p.author_avatar || '/images/david.jpeg',
    },
  };
}

// Convert legacy blogPosts.js format for fallback
function legacyToPost(p) {
  const platformMap = {
    'Web Development': 'general',
    'UI/UX Design':    'general',
    'Graphic Design':  'general',
    'Video Animation': 'youtube',
  };
  return {
    _legacy:     true,
    _id:         p.slug,
    slug:        p.slug,
    title:       p.title,
    excerpt:     p.excerpt,
    platform:    platformMap[p.category] || 'general',
    image:       p.coverImage || null,
    tags:        p.tags || [],
    readingTime: parseInt(p.readTime) || null,
    featured:    false,
    publishedAt: p.date || '',
    author: {
      name:  p.author || 'David Omigie',
      role:  p.authorRole || 'Founder & CEO, OMG Tech Hub',
      photo: p.authorAvatar || '/images/david.jpeg',
    },
  };
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ background:'var(--t-surface)',border:'1px solid var(--t-border)',borderRadius:'16px',overflow:'hidden' }}>
      <div style={{ aspectRatio:'16/9',background:'var(--t-ghost)',animation:'pulse 1.5s infinite' }} />
      <div style={{ padding:'24px',display:'flex',flexDirection:'column',gap:'12px' }}>
        <div style={{ height:'20px',width:'60px',background:'var(--t-ghost)',borderRadius:'999px',animation:'pulse 1.5s infinite' }} />
        <div style={{ height:'16px',background:'var(--t-ghost)',borderRadius:'8px',animation:'pulse 1.5s infinite' }} />
        <div style={{ height:'16px',width:'80%',background:'var(--t-ghost)',borderRadius:'8px',animation:'pulse 1.5s infinite' }} />
      </div>
    </div>
  );
}

// ── BlogCard ──────────────────────────────────────────────────────────────────
function BlogCard({ post }) {
  const platform = post.platform;
  const cover    = post.image || '/images/gra1.jpeg';
  const avatar   = post.author?.photo || '/images/david.jpeg';

  return (
    <Link
      to={`/blog/${post.slug}`}
      data-cursor="hover"
      style={{
        display:'flex',flexDirection:'column',flex:1,
        background:'var(--t-surface)',border:'1px solid var(--t-border)',
        borderRadius:'16px',overflow:'hidden',textDecoration:'none',
        transition:'border-color 0.35s ease,transform 0.35s ease,box-shadow 0.35s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor='var(--t-a-border)';e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 20px 60px var(--t-a-shadow)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor='var(--t-border)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'; }}
    >
      <div style={{ aspectRatio:'16/9',overflow:'hidden',flexShrink:0 }}>
        <img src={cover} alt={post.title} loading="lazy"
          style={{ width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.5s ease' }}
          onError={(e) => { e.target.src = '/images/gra1.jpeg'; }}
          onMouseEnter={(e) => e.target.style.transform='scale(1.06)'}
          onMouseLeave={(e) => e.target.style.transform='scale(1)'}
        />
      </div>
      <div style={{ padding:'24px',flex:1,display:'flex',flexDirection:'column' }}>
        <span style={{
          display:'inline-flex',alignItems:'center',gap:'5px',
          background:'var(--t-accent)',color:'var(--t-on-accent)',
          fontSize:'11px',fontWeight:700,letterSpacing:'0.1em',
          textTransform:'uppercase',padding:'4px 12px',borderRadius:'999px',
        }}>
          {PLATFORM_ICONS[platform]}
          {platform === 'twitter' ? 'X/Twitter' : platform ? platform.charAt(0).toUpperCase()+platform.slice(1) : 'General'}
        </span>
        <h3 className="line-clamp-2" style={{ fontWeight:700,fontSize:'18px',color:'var(--t-text)',marginTop:'10px',lineHeight:1.4 }}>
          {post.title}
        </h3>
        <p className="line-clamp-2" style={{ color:'var(--t-text-2)',fontSize:'14px',lineHeight:1.6,marginTop:'8px' }}>
          {post.excerpt}
        </p>
        <div style={{ borderTop:'1px solid var(--t-border)',marginTop:'auto',paddingTop:'16px',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'8px' }}>
            <img src={avatar} alt={post.author?.name} loading="lazy"
              style={{ width:'24px',height:'24px',borderRadius:'50%',objectFit:'cover' }} />
            <span style={{ color:'var(--t-text-2)',fontSize:'13px',fontWeight:500 }}>{post.author?.name}</span>
          </div>
          <span style={{ color:'var(--t-text-4)',fontSize:'12px' }}>
            {formatDate(post.publishedAt)}{post.readingTime ? ` · ${post.readingTime} min read` : ''}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
const PLATFORM_FILTERS = ['All','LinkedIn','Instagram','Twitter','YouTube','Facebook','General'];

export default function BlogPage() {
  const [posts, setPosts]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch]         = useState('');
  const [email, setEmail]           = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [subError, setSubError]     = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/posts.php`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.ok && data.posts?.length) {
          setPosts(data.posts.map(normalisePost));
        }
        setLoading(false);
      })
      .catch(() => { setLoading(false); });
  }, []);

  const filtered = posts.filter((p) => {
    const matchCat =
      activeFilter === 'All' ||
      (p.platform || 'general').toLowerCase() === activeFilter.toLowerCase();
    const matchSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });


  const handleSubscribe = useCallback(async (e) => {
    e.preventDefault();
    setSubError('');
    setSubLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/newsletter.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubscribed(true);
      } else {
        setSubError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubError('Could not connect. Please check your connection and try again.');
    } finally {
      setSubLoading(false);
    }
  }, [email]);

  return (
    <PageWrapper>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}.line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}`}</style>

      {/* Hero */}
      <section className="r-page-hero" style={{ minHeight:'50vh',display:'flex',alignItems:'flex-end',padding:'140px 40px 60px',background:'#0a0a0a',position:'relative',overflow:'hidden' }}>
        <HeroBackground image="/images/blog.jpg" />
        <div style={{ maxWidth:'1200px',margin:'0 auto',width:'100%',position:'relative',zIndex:2 }}>
          <p data-reveal style={{ color:'var(--t-accent)',fontSize:'12px',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:'16px' }}>Home / Blog</p>
          <h1 data-reveal data-delay="0.1" style={{ fontSize:'clamp(40px,7vw,88px)',fontWeight:900,color:'#fff',letterSpacing:'-0.03em',lineHeight:1.0,marginBottom:'20px' }}>Blog & Insights</h1>
          <p data-reveal data-delay="0.2" style={{ color:'rgba(255,255,255,0.75)',fontSize:'clamp(16px,2vw,20px)',maxWidth:'560px',lineHeight:1.7 }}>Tips, case studies, and perspective from the OMG Tech Hub team.</p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding:'40px 40px 0',background:'var(--t-bg)' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto',display:'flex',gap:'20px',flexWrap:'wrap',alignItems:'center' }}>
          <div data-reveal style={{ display:'flex',gap:'8px',flexWrap:'wrap',flex:1 }}>
            {PLATFORM_FILTERS.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} data-cursor="hover"
                style={{
                  display:'inline-flex',alignItems:'center',gap:'5px',
                  background:activeFilter===cat?'var(--t-accent)':'transparent',
                  color:activeFilter===cat?'var(--t-on-accent)':'var(--t-text-2)',
                  border:`1px solid ${activeFilter===cat?'var(--t-accent)':'var(--t-border-l)'}`,
                  borderRadius:'999px',padding:'8px 18px',fontSize:'13px',
                  fontWeight:600,cursor:'none',transition:'all 0.25s ease',fontFamily:'Inter,sans-serif',
                }}
                onMouseEnter={(e) => { if(activeFilter!==cat){e.currentTarget.style.borderColor='var(--t-accent)';e.currentTarget.style.color='var(--t-text)';} }}
                onMouseLeave={(e) => { if(activeFilter!==cat){e.currentTarget.style.borderColor='var(--t-border-l)';e.currentTarget.style.color='var(--t-text-2)';} }}
              >
                {cat!=='All'&&PLATFORM_ICONS[cat.toLowerCase()]}
                {cat}
              </button>
            ))}
          </div>
          <div data-reveal style={{ position:'relative',minWidth:'240px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{ position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'var(--t-text-4)',pointerEvents:'none' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              style={{ width:'100%',background:'var(--t-surface)',border:'1px solid var(--t-border)',borderRadius:'10px',padding:'10px 16px 10px 40px',color:'var(--t-text)',fontSize:'14px',fontFamily:'Inter,sans-serif',outline:'none',transition:'border-color 0.2s,box-shadow 0.2s' }}
              onFocus={(e) => { e.target.style.borderColor='var(--t-accent)';e.target.style.boxShadow='0 0 0 3px var(--t-a-bg-xs)'; }}
              onBlur={(e) => { e.target.style.borderColor='var(--t-border)';e.target.style.boxShadow='none'; }}
            />
          </div>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <section style={{ padding:'48px 40px 80px',background:'var(--t-bg)' }}>
          <div style={{ maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'28px' }}>
            {[1,2,3].map(i => <SkeletonCard key={i} />)}
          </div>
        </section>
      )}

      {/* Grid — all posts vertical, matching home page style */}
      {!loading && filtered.length > 0 && (
        <section style={{ padding:'48px 40px 80px',background:'var(--t-bg)' }}>
          <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
            <AnimatedSection variantCycle={['flipY', 'flipX', 'bounce', 'rotateIn', 'tiltLeft', 'tiltRight', 'scaleIn', 'popIn']} style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'28px' }}>
              {filtered.map((post) => (
                <AnimatedItem key={post._id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <BlogCard post={post} />
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <section style={{ padding:'80px 40px',background:'var(--t-bg)',textAlign:'center' }}>
          <p style={{ color:'var(--t-text-2)',fontSize:'18px',fontWeight:500 }}>
            {posts.length === 0
              ? 'No articles published yet. Check back soon!'
              : `No articles found${search ? ` for "${search}"` : ''}`}
          </p>
          {posts.length > 0 && (activeFilter!=='All'||search) && (
            <button onClick={() => { setActiveFilter('All'); setSearch(''); }} data-cursor="hover"
              style={{ marginTop:'16px',background:'none',border:'1px solid var(--t-border-l)',borderRadius:'999px',padding:'10px 24px',color:'var(--t-text-2)',fontSize:'14px',fontWeight:600,cursor:'none',fontFamily:'Inter,sans-serif',transition:'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor='var(--t-accent)';e.currentTarget.style.color='var(--t-text)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor='var(--t-border-l)';e.currentTarget.style.color='var(--t-text-2)'; }}
            >
              Clear filters
            </button>
          )}
        </section>
      )}

      {/* Newsletter */}
      <section style={{ padding:'60px 40px 100px',background:'var(--t-bg)' }}>
        <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
          <div data-reveal style={{ background:'var(--t-surface)',border:'1px solid var(--t-border)',borderRadius:'20px',padding:'60px',textAlign:'center' }}>
            <h3 style={{ fontWeight:800,fontSize:'clamp(24px,4vw,32px)',color:'var(--t-text)',marginBottom:'12px',letterSpacing:'-0.02em' }}>Stay in the loop.</h3>
            <p style={{ color:'var(--t-text-2)',fontSize:'16px',marginBottom:'36px',lineHeight:1.6 }}>
              Get our latest articles, case studies, and agency news — straight to your inbox.
            </p>
            {subscribed ? (
              <div style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:'8px' }}>
                <p style={{ color:'var(--t-accent)',fontWeight:700,fontSize:'18px',margin:0 }}>✓ You're subscribed!</p>
                <p style={{ color:'var(--t-text-2)',fontSize:'14px',margin:0 }}>Check your inbox — a confirmation email is on its way.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display:'flex',flexDirection:'column',alignItems:'center',gap:'12px',maxWidth:'520px',margin:'0 auto' }}>
                <div style={{ display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',width:'100%' }}>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" disabled={subLoading}
                    style={{ flex:1,minWidth:'200px',maxWidth:'400px',background:'var(--t-bg)',border:'1px solid var(--t-border)',borderRadius:'10px',padding:'14px 20px',color:'var(--t-text)',fontSize:'15px',fontFamily:'Inter,sans-serif',outline:'none',transition:'border-color 0.2s,box-shadow 0.2s',opacity:subLoading?0.6:1 }}
                    onFocus={(e) => { e.target.style.borderColor='var(--t-accent)';e.target.style.boxShadow='0 0 0 3px var(--t-a-bg-xs)'; }}
                    onBlur={(e) => { e.target.style.borderColor='var(--t-border)';e.target.style.boxShadow='none'; }}
                  />
                  <button type="submit" data-cursor="hover" disabled={subLoading}
                    style={{ background:'var(--t-accent)',color:'var(--t-on-accent)',fontWeight:700,fontSize:'14px',padding:'14px 28px',borderRadius:'10px',border:'none',cursor:subLoading?'default':'none',fontFamily:'Inter,sans-serif',transition:'background 0.2s,transform 0.2s',opacity:subLoading?0.7:1,minWidth:'120px' }}
                    onMouseEnter={(e) => { if(!subLoading){e.currentTarget.style.background='var(--t-accent-h)';e.currentTarget.style.transform='scale(1.02)';} }}
                    onMouseLeave={(e) => { e.currentTarget.style.background='var(--t-accent)';e.currentTarget.style.transform='scale(1)'; }}
                  >
                    {subLoading ? 'Subscribing…' : 'Subscribe'}
                  </button>
                </div>
                {subError && (
                  <p style={{ color:'#e63322',fontSize:'13px',margin:0,fontWeight:500 }}>{subError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
