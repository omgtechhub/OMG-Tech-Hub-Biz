import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import PageWrapper from '../components/PageWrapper';
import { blogPosts } from '../data/blogPosts';

const API_BASE = import.meta.env.VITE_API_BASE || '';

// Post bodies are authored HTML, so they must be injected as HTML. They come
// from the admin panel — which is exactly what an attacker goes after — and a
// stored payload would otherwise execute for every reader of the blog.
// Sanitising here means a compromised post can never become script execution.
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

const sanitize = (html) =>
  DOMPurify.sanitize(html ?? '', {
    USE_PROFILES: { html: true },   // HTML only: no SVG/MathML attack surface
    ADD_ATTR: ['target'],           // existing posts link out with target=_blank
  });

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  if (isNaN(d)) return str;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Convert legacy block-based body to HTML for rendering
function legacyBodyToHtml(body) {
  if (!body || !Array.isArray(body)) return '';
  return body.map(block => {
    if (block.type === 'heading') return `<h2>${block.text}</h2>`;
    return `<p>${block.text}</p>`;
  }).join('\n');
}

function legacyToPost(p) {
  const platformMap = { 'Web Development':'general','UI/UX Design':'general','Graphic Design':'general','Video Animation':'youtube' };
  return {
    id:          p.slug,
    slug:        p.slug,
    title:       p.title,
    excerpt:     p.excerpt,
    content:     legacyBodyToHtml(p.body),
    platform:    platformMap[p.category] || 'general',
    image:       p.coverImage || null,
    tags:        p.tags || [],
    reading_time:parseInt(p.readTime) || null,
    featured:    false,
    author:      p.author || 'David Omigie',
    author_role: p.authorRole || 'Founder & CEO, OMG Tech Hub',
    author_avatar:p.authorAvatar || '/images/david.jpeg',
    created_at:  p.date || '',
    post_url:    '',
  };
}

function normalisePost(p) {
  return {
    ...p,
    image:       p.image ? (API_BASE + '/' + p.image).replace(/([^:])\/\//g,'$1/') : null,
    author_avatar: p.author_avatar || '/images/david.jpeg',
    reading_time:  p.reading_time || null,
  };
}

function normaliseRelated(p) {
  return {
    ...p,
    image: p.image ? (API_BASE + '/' + p.image).replace(/([^:])\/\//g,'$1/') : null,
  };
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function PostSkeleton() {
  return (
    <PageWrapper>
      <div style={{ minHeight:'50vh',background:'var(--t-ghost)',animation:'pulse 1.5s infinite' }} />
      <section style={{ padding:'80px 20px',background:'var(--t-bg)' }}>
        <div style={{ maxWidth:'740px',margin:'0 auto',display:'flex',flexDirection:'column',gap:'16px' }}>
          {[100,80,100,60,100,90].map((w,i) => (
            <div key={i} style={{ height:'18px',width:`${w}%`,background:'var(--t-ghost)',borderRadius:'8px',animation:'pulse 1.5s infinite' }} />
          ))}
        </div>
      </section>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </PageWrapper>
  );
}

// ── Related card ──────────────────────────────────────────────────────────────
function RelatedCard({ post }) {
  const cover = post.image || '/images/gra1.jpeg';
  const avatar= post.author_avatar || '/images/david.jpeg';
  return (
    <Link to={`/blog/${post.slug}`} data-cursor="hover"
      style={{ display:'block',background:'var(--t-surface)',border:'1px solid var(--t-border)',borderRadius:'16px',overflow:'hidden',textDecoration:'none',transition:'border-color 0.35s,transform 0.35s,box-shadow 0.35s' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor='var(--t-a-border)';e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 20px 60px var(--t-a-shadow)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor='var(--t-border)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'; }}
    >
      <div style={{ aspectRatio:'16/9',overflow:'hidden' }}>
        <img src={cover} alt={post.title} loading="lazy" style={{ width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.5s ease' }}
          onMouseEnter={(e) => e.target.style.transform='scale(1.06)'}
          onMouseLeave={(e) => e.target.style.transform='scale(1)'}
        />
      </div>
      <div style={{ padding:'24px' }}>
        <h3 style={{ fontWeight:700,fontSize:'18px',color:'var(--t-text)',lineHeight:1.4,marginBottom:'8px',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden' }}>{post.title}</h3>
        <p style={{ color:'var(--t-text-2)',fontSize:'14px',lineHeight:1.6,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden' }}>{post.excerpt}</p>
        <div style={{ borderTop:'1px solid var(--t-border)',marginTop:'16px',paddingTop:'16px',display:'flex',alignItems:'center',gap:'8px' }}>
          <img src={avatar} alt={post.author} style={{ width:'24px',height:'24px',borderRadius:'50%',objectFit:'cover' }} />
          <span style={{ color:'var(--t-text-2)',fontSize:'13px',fontWeight:500 }}>{post.author}</span>
          {post.reading_time && <span style={{ color:'var(--t-text-4)',fontSize:'12px',marginLeft:'auto' }}>{post.reading_time} min read</span>}
        </div>
      </div>
    </Link>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost]     = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setPost(null);
    setRelated([]);

    if (!API_BASE) {
      // Use local fallback
      const found = blogPosts.find(p => p.slug === slug);
      if (found) {
        setPost(legacyToPost(found));
        const others = blogPosts.filter(p => p.slug !== slug && p.category === found.category).slice(0, 3).map(legacyToPost);
        setRelated(others);
      } else {
        setNotFound(true);
      }
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/post.php?slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(data => {
        if (data?.ok && data.post) {
          setPost(normalisePost(data.post));
          setRelated((data.related || []).map(normaliseRelated));
        } else {
          // Try local fallback
          const found = blogPosts.find(p => p.slug === slug);
          if (found) {
            setPost(legacyToPost(found));
          } else {
            setNotFound(true);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        const found = blogPosts.find(p => p.slug === slug);
        if (found) {
          setPost(legacyToPost(found));
          const others = blogPosts.filter(p => p.slug !== slug && p.category === found.category).slice(0, 3).map(legacyToPost);
          setRelated(others);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      });
  }, [slug]);

  // SEO meta
  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — OMG Tech Hub`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name='description'; document.head.appendChild(meta); }
    meta.content = post.excerpt || post.title;
    return () => { document.title = 'OMG Tech Hub — Digital Agency Lagos'; };
  }, [post]);

  if (loading) return <PostSkeleton />;

  if (notFound || !post) {
    return (
      <PageWrapper>
        <div style={{ minHeight:'80vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'24px',padding:'40px',textAlign:'center' }}>
          <h1 style={{ color:'var(--t-text)',fontSize:'clamp(32px,5vw,56px)',fontWeight:900,letterSpacing:'-0.02em' }}>Post Not Found</h1>
          <p style={{ color:'var(--t-text-2)',fontSize:'16px' }}>The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog" style={{ display:'inline-block',background:'var(--t-accent)',color:'var(--t-on-accent)',fontWeight:700,fontSize:'15px',padding:'14px 36px',borderRadius:'10px',textDecoration:'none' }}>
            ← Back to Blog
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const cover  = post.image || '/images/gra1.jpeg';
  const avatar = post.author_avatar || '/images/david.jpeg';

  return (
    <PageWrapper>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}.prose h2{font-size:1.5rem;font-weight:700;color:var(--t-text);margin:2.5rem 0 1rem;letter-spacing:-.01em;line-height:1.3}.prose h3{font-size:1.2rem;font-weight:700;color:var(--t-text);margin:2rem 0 .75rem;line-height:1.35}.prose h4{font-size:1.05rem;font-weight:700;color:var(--t-text);margin:1.5rem 0 .6rem}.prose p{font-size:17px;color:var(--t-text-3);line-height:1.85;margin-bottom:1.5rem}.prose ul,.prose ol{padding-left:1.5rem;margin-bottom:1.5rem;color:var(--t-text-3);font-size:17px;line-height:1.85}.prose li{margin-bottom:.5rem}.prose blockquote{border-left:4px solid var(--t-accent);margin:2rem 0;padding-left:1.5rem;color:var(--t-text-2);font-size:1.1rem;font-style:italic;line-height:1.7}.prose strong{font-weight:700;color:var(--t-text)}.prose a{color:var(--t-accent);text-decoration:underline;text-underline-offset:3px}.prose code{background:var(--t-surface);border:1px solid var(--t-border);border-radius:4px;padding:2px 6px;font-size:14px;font-family:monospace;color:var(--t-accent)}`}</style>

      {/* Hero */}
      <section className="r-page-hero" style={{ minHeight:'50vh',position:'relative',display:'flex',alignItems:'flex-end',overflow:'hidden' }}>
        <img src={cover} alt={post.title}
          style={{ position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover' }} />
        <div style={{ position:'absolute',inset:0,background:'rgba(0,0,0,0.4)' }} />
        <div className="r-blog-hero-inner" style={{ position:'relative',padding:'120px 60px 60px',width:'100%' }}>
          {/* Breadcrumb */}
          <div style={{ display:'flex',alignItems:'center',gap:'6px',marginBottom:'16px',flexWrap:'wrap' }}>
            <Link to="/" style={{ color:'var(--t-text-2)',fontSize:'12px',textDecoration:'none' }} onMouseEnter={(e) => e.target.style.color='var(--t-text)'} onMouseLeave={(e) => e.target.style.color='var(--t-text-2)'}>Home</Link>
            <span style={{ color:'var(--t-text-4)',fontSize:'12px' }}>/</span>
            <Link to="/blog" style={{ color:'var(--t-text-2)',fontSize:'12px',textDecoration:'none' }} onMouseEnter={(e) => e.target.style.color='var(--t-text)'} onMouseLeave={(e) => e.target.style.color='var(--t-text-2)'}>Blog</Link>
            <span style={{ color:'var(--t-text-4)',fontSize:'12px' }}>/</span>
            <span style={{ color:'var(--t-text-2)',fontSize:'12px' }}>{post.title.substring(0,40)}{post.title.length>40?'…':''}</span>
          </div>

          {post.platform && (
            <span style={{ display:'inline-block',background:'var(--t-accent)',color:'var(--t-on-accent)',fontSize:'11px',fontWeight:800,padding:'5px 14px',borderRadius:'999px',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'16px' }}>
              {post.platform === 'twitter' ? 'X/Twitter' : post.platform.charAt(0).toUpperCase()+post.platform.slice(1)}
            </span>
          )}

          <h1 data-reveal style={{ fontSize:'clamp(28px,5vw,52px)',fontWeight:800,color:'var(--t-text)',letterSpacing:'-0.02em',lineHeight:1.15,maxWidth:'800px',marginBottom:'24px' }}>
            {post.title}
          </h1>

          <div style={{ display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap' }}>
            <img src={avatar} alt={post.author} style={{ width:'40px',height:'40px',borderRadius:'50%',objectFit:'cover',border:'2px solid var(--t-accent)' }} />
            <div>
              <div style={{ color:'var(--t-text)',fontSize:'14px',fontWeight:600 }}>{post.author}</div>
              <div style={{ color:'var(--t-text-2)',fontSize:'12px' }}>{post.author_role}</div>
            </div>
            <span style={{ color:'var(--t-text-4)',fontSize:'13px',marginLeft:'8px' }}>
              {formatDate(post.created_at)}{post.reading_time?` · ${post.reading_time} min read`:''}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding:'80px 20px',background:'var(--t-bg)' }}>
        <div className="prose" style={{ maxWidth:'740px',margin:'0 auto' }}
          dangerouslySetInnerHTML={{ __html: sanitize(post.content || `<p>${post.excerpt || ''}</p>`) }}
        />
      </section>

      {/* Share */}
      <section style={{ padding:'0 20px 40px',background:'var(--t-bg)' }}>
        <div style={{ maxWidth:'740px',margin:'0 auto',display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap' }}>
          <span style={{ color:'var(--t-text-2)',fontSize:'13px',fontWeight:600,letterSpacing:'0.04em' }}>Share:</span>
          {[
            { label:'Twitter / X', href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}` },
            { label:'LinkedIn',    href:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
            { label:'Facebook',    href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" data-cursor="hover"
              style={{ background:'var(--t-surface)',border:'1px solid var(--t-border)',borderRadius:'999px',padding:'7px 16px',color:'var(--t-text-2)',fontSize:'13px',fontWeight:500,textDecoration:'none',transition:'border-color 0.2s,color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor='var(--t-accent)';e.currentTarget.style.color='var(--t-text)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor='var(--t-border)';e.currentTarget.style.color='var(--t-text-2)'; }}
            >{s.label}</a>
          ))}
        </div>
      </section>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <section style={{ padding:'0 20px 60px',background:'var(--t-bg)' }}>
          <div style={{ maxWidth:'740px',margin:'0 auto',display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap' }}>
            <span style={{ color:'var(--t-text-2)',fontSize:'13px',fontWeight:600,letterSpacing:'0.04em' }}>Tags:</span>
            {post.tags.map(tag => (
              <span key={tag} style={{ background:'var(--t-surface)',border:'1px solid var(--t-border)',borderRadius:'999px',padding:'6px 14px',color:'var(--t-text-2)',fontSize:'13px',fontWeight:500 }}>
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Author card */}
      <section style={{ padding:'0 20px 60px',background:'var(--t-bg)' }}>
        <div data-reveal style={{ maxWidth:'740px',margin:'0 auto',background:'var(--t-surface)',border:'1px solid var(--t-border)',borderRadius:'16px',padding:'32px',display:'flex',gap:'20px',alignItems:'flex-start',flexWrap:'wrap' }}>
          <img src={avatar} alt={post.author}
            style={{ width:'64px',height:'64px',borderRadius:'50%',objectFit:'cover',flexShrink:0,border:'3px solid var(--t-accent)' }} />
          <div style={{ flex:1,minWidth:'200px' }}>
            <p style={{ color:'var(--t-text-2)',fontSize:'12px',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'4px' }}>Written by</p>
            <h4 style={{ color:'var(--t-text)',fontWeight:700,fontSize:'18px',marginBottom:'4px' }}>{post.author}</h4>
            <p style={{ color:'var(--t-text-2)',fontSize:'14px',fontWeight:500,marginBottom:'10px' }}>{post.author_role}</p>
            <p style={{ color:'var(--t-text-2)',fontSize:'14px',lineHeight:1.6 }}>
              Founder and CEO of OMG Tech Hub. Expertise spanning web development, graphic design, UI/UX, motion design, and AI-powered solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding:'60px 40px 80px',background:'var(--t-surface)' }}>
          <div style={{ maxWidth:'1200px',margin:'0 auto' }}>
            <h3 data-reveal style={{ fontWeight:700,fontSize:'24px',color:'var(--t-text)',marginBottom:'32px',letterSpacing:'-0.01em' }}>More Articles</h3>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'24px' }}>
              {related.map(p => <RelatedCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding:'80px 40px',background:'var(--t-bg)',textAlign:'center' }}>
        <div style={{ maxWidth:'600px',margin:'0 auto' }}>
          <h2 data-reveal style={{ fontSize:'clamp(28px,4vw,48px)',fontWeight:900,color:'var(--t-text)',letterSpacing:'-0.02em',marginBottom:'16px' }}>Got a project? Let's talk.</h2>
          <p data-reveal data-delay="0.1" style={{ color:'var(--t-text-2)',fontSize:'16px',marginBottom:'32px' }}>Ready to build something great for your brand? Get in touch today.</p>
          <Link to="/contact" data-cursor="hover" data-reveal data-delay="0.2"
            style={{ display:'inline-block',background:'var(--t-accent)',color:'var(--t-on-accent)',fontWeight:700,fontSize:'15px',padding:'16px 44px',borderRadius:'10px',textDecoration:'none',transition:'background 0.2s,transform 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background='var(--t-accent-h)';e.currentTarget.style.transform='scale(1.02)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background='var(--t-accent)';e.currentTarget.style.transform='scale(1)'; }}
          >
            Start a Project
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
