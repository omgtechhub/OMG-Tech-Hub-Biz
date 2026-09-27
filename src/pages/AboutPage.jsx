import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import HeroBackground from '../components/HeroBackground';
import CountUp from '../components/CountUp';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';

const timeline = [
  { year: '2024', event: 'Founded in Benin City, Nigeria — launched as a creative design agency specialising in graphic design and brand identity' },
  { year: 'Late 2024', event: 'Expanded into a multifaceted tech agency — added professional video editing to our service offering' },
  { year: 'Late 2024', event: 'Introduced 3D animation and cartoon creation for business adverts, unlocking a new dimension of brand storytelling' },
  { year: '2025', event: 'Added full-stack web development services, enabling end-to-end digital product delivery for clients' },
  { year: 'Late 2025', event: 'Launched UI/UX design as a dedicated service — rounding out our complete digital experience offering' },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Full-Stack Developer',
    location: 'Toronto, Canada',
    avatar: '/images/team-sarah.png',
    bg: '#dbeafe',
    bio: 'Sarah brings deep full-stack expertise to every project, architecting seamless experiences from database to UI. With a background in computer science and 7+ years building production-grade applications, she turns complex requirements into elegant, scalable solutions.',
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Cloud Architecture', 'REST APIs'],
  },
  {
    name: 'Kaspar Võrk',
    role: 'Lead Developer & Graphic Designer',
    location: 'Tallinn, Estonia',
    avatar: '/images/team-kaspar.png',
    bg: '#ede9fe',
    bio: 'A rare blend of coding wizard and visual designer, Kaspar writes the kind of code other developers stop to admire — then opens Illustrator and produces equally stunning visuals. His dual mastery makes him indispensable on every cross-disciplinary project.',
    tags: ['Python', 'Rust', 'System Design', 'Brand Identity', 'Visual Design', 'Creative Coding'],
  },
  {
    name: 'Emeka Okafor',
    role: '3D Animator & Video Editor',
    location: 'Lagos, Nigeria',
    avatar: '/images/team-emeka.png',
    bg: '#ffedd5',
    bio: 'Emeka crafts immersive 3D worlds and cinematic videos that make audiences stop scrolling. From character animation to high-impact brand reels, his work consistently pushes the boundary between motion art and commercial storytelling.',
    tags: ['3D Animation', 'After Effects', 'Cinema 4D', 'Video Editing', 'Motion Graphics', 'Blender'],
  },
  {
    name: 'Tunde Adeyemi',
    role: 'Senior UI/UX Designer & Web Developer',
    location: 'Abuja, Nigeria',
    avatar: '/images/team-tunde.png',
    bg: '#dcfce7',
    bio: 'Tunde bridges the gap between beautiful design and functional code. As both a senior UX strategist and front-end developer, he designs with implementation in mind — producing interfaces that are not only stunning but ship exactly as envisioned.',
    tags: ['UI/UX Design', 'Figma', 'React', 'Web Development', 'Prototyping', 'Design Systems'],
  },
  {
    name: 'Amara Wanjiku',
    role: '3D Motion Animator & Graphic Designer',
    location: 'Nairobi, Kenya',
    avatar: '/images/team-amara.png',
    bg: '#fce7f3',
    bio: 'Amara merges the art of motion and graphic design into work that feels alive. Her 3D animations carry emotional weight while her brand graphics command instant attention — a creative force whose outputs consistently exceed client expectations.',
    tags: ['3D Motion', 'Blender', 'Graphic Design', 'Brand Identity', 'Motion Graphics', 'Visual Storytelling'],
  },
  {
    name: 'Chidi Nwosu',
    role: 'Full-Stack Developer & UI/UX Designer',
    location: 'Port Harcourt, Nigeria',
    avatar: '/images/team-chidi.png',
    bg: '#fef9c3',
    bio: 'Chidi is the rare engineer who designs as fluently as he codes. He architects robust back-end systems and then crafts the pixel-perfect interfaces users interact with — delivering full product experiences from a single, highly capable mind.',
    tags: ['Full-Stack', 'React', 'Node.js', 'UI/UX', 'PostgreSQL', 'Design Systems'],
  },
];

const values = [
  { name: 'Excellence Above All', desc: 'We settle for nothing less than extraordinary. Every pixel, every line of code, every strategy is crafted to the highest standard.' },
  { name: 'Bold Creativity', desc: 'We push boundaries, challenge conventions, and create work that stops people in their tracks. Safe is the enemy of great.' },
  { name: 'Continuous Growth', desc: 'We invest in our team\'s skills, tools, and processes continuously. Today\'s best is tomorrow\'s baseline.' },
  { name: 'Client-First Always', desc: 'Your success is our success. We treat every client\'s business as if it were our own — with genuine care and commitment.' },
  { name: 'Integrity & Transparency', desc: 'Honest timelines, clear pricing, open communication. No hidden fees, no empty promises.' },
  { name: 'Cultural Intelligence', desc: 'We understand Nigeria, Africa, and global markets — giving our clients the unique advantage of localised creativity with global polish.' },
];

const clients = ['BoldEstate Realty', 'TechFlow', 'Nomad Coffee', 'Kings Travels', 'SkyRise Realty', 'ICCF Missions', 'Nerrg\'s Boutique', 'Femo Homes'];

export default function AboutPage() {
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
          <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Home / About
          </p>
          <h1
            data-reveal
            data-delay="0.1"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: '20px' }}
          >
            About OMG Tech Hub
          </h1>
          <p
            data-reveal
            data-delay="0.2"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: '560px', lineHeight: 1.7 }}
          >
            Born in Benin City, Nigeria — obsessed with building brands that perform extraordinarily.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '100px 40px', background: 'var(--t-bg)' }}>
        <div className="r-gap-80" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <div>
            <h2
              data-reveal
              style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '24px' }}
            >
              To Empower Businesses With World-Class Digital Presence
            </h2>
            <p
              data-reveal
              data-delay="0.1"
              style={{ color: 'var(--t-text-2)', fontSize: '17px', lineHeight: 1.8, marginBottom: '32px' }}
            >
              We believe every brand — whether a startup in Benin City or a corporation in London — deserves design and technology that genuinely competes on the world stage. Our mission is to make that possible, with premium execution and relentless attention to detail.
            </p>
            <Link
              to="/contact"
              data-cursor="hover"
              data-reveal
              data-delay="0.2"
              style={{ display: 'inline-block', background: 'var(--t-accent)', color: 'var(--t-on-accent)', fontWeight: 700, fontSize: '15px', padding: '14px 36px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.2s, transform 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--t-accent-h)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--t-accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Work With Us
            </Link>
          </div>
          <div data-reveal data-delay="0.15" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {['/images/gra9.jpeg', '/images/gra1.jpeg', '/images/webp3.png', '/images/about4.jpeg'].map((src) => (
              <div key={src} style={{ aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden', border: '3px solid var(--t-founder-stroke)' }}>
                <img src={src} alt="OMG Tech Hub" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 40px', background: 'var(--t-surface)', borderTop: '1px solid var(--t-border-s)', borderBottom: '1px solid var(--t-border-s)' }}>
        <div className="r-stats-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {[
            { num: '100+', label: 'Projects Delivered' },
            { num: '2+',  label: 'Years in Business' },
            { num: '40+', label: 'Happy Clients' },
            { num: '12',   label: 'Industries Served' },
          ].map((stat, i) => (
            <div key={stat.label} data-reveal data-delay={i * 0.1}>
              <div style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, color: 'var(--t-accent)', letterSpacing: '-0.03em', lineHeight: 1 }}><CountUp value={stat.num} /></div>
              <div style={{ color: 'var(--t-text-2)', fontSize: '14px', marginTop: '8px', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '100px 40px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>Our Journey</p>
          <h2 data-reveal data-delay="0.1" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '60px' }}>
            How We Got Here
          </h2>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '80px', top: 0, bottom: 0, width: '1px', background: 'var(--t-border-m)' }} />
            {timeline.map((item, i) => (
              <div
                key={item.year}
                data-reveal
                data-delay={i * 0.1}
                style={{ display: 'flex', gap: '40px', marginBottom: '40px', alignItems: 'flex-start', position: 'relative' }}
              >
                <div style={{ minWidth: '80px', fontWeight: 900, fontSize: '20px', color: 'var(--t-accent)', letterSpacing: '-0.02em', paddingTop: '2px' }}>
                  {item.year}
                </div>
                <div style={{ position: 'absolute', left: '74px', top: '10px', width: '12px', height: '12px', background: 'var(--t-accent)', borderRadius: '50%', border: '3px solid var(--t-bg)' }} />
                <div
                  style={{
                    background: 'var(--t-surface)',
                    border: '1px solid var(--t-border)',
                    borderRadius: '14px',
                    padding: '20px 24px',
                    flex: 1,
                  }}
                >
                  <p style={{ color: 'var(--t-text)', fontSize: '16px', fontWeight: 500, lineHeight: 1.6 }}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section style={{ padding: '100px 40px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Section label + heading */}
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>The Founder</p>
            <h2 data-reveal data-delay="0.1" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Meet The Visioneer Behind This<br />Great Commission
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="r-founder-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '72px', alignItems: 'center' }}>

            {/* LEFT — photo with floating badges */}
            <AnimatedItem variant="slideLeft" delay={0.1}>
              <div style={{ borderRadius: '24px', overflow: 'hidden', border: '3px solid var(--t-founder-stroke)', lineHeight: 0 }}>
                <img
                  src="/images/david-founder.jpg"
                  alt="David Omigie — Founder & CEO, OMG Tech Hub"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </AnimatedItem>

            {/* RIGHT — info */}
            <AnimatedItem variant="slideRight" delay={0.2}>
              <div>
                <h3 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '6px' }}>
                  David Omigie
                </h3>
                <p style={{ color: 'var(--t-accent)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '24px' }}>
                  Founder & CEO — OMG Tech Hub
                </p>

                <p style={{ color: 'var(--t-text-2)', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>
                  David Omigie is the Founder and CEO of OMG Tech Hub, a technology and creative agency focused on building innovative digital solutions that help individuals, brands, and businesses establish a stronger online presence.
                </p>

                {/* Bullet points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  {[
                    'Expertise spanning web development, graphic design, UI/UX, motion design, and AI-powered solutions — combining creativity with technology to deliver functional, visually engaging, and results-driven work.',
                    'Goes beyond creating products — focused on building experiences that solve real problems and create lasting value for clients and their audiences.',
                    'Driven by a passion for innovation and continuous growth, committed to transforming ideas into impactful digital products while creating opportunities for collaboration and technological advancement.',
                    'Mission: to turn ideas into meaningful digital experiences and help businesses thrive in a rapidly evolving digital world.',
                  ].map((point, i) => (
                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--t-accent)', flexShrink: 0, marginTop: '7px' }} />
                      <p style={{ color: 'var(--t-text-2)', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>{point}</p>
                    </div>
                  ))}
                </div>

                {/* Skill tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
                  {['Web Development', 'Graphic Design', 'UI/UX Design', 'Motion Design', 'AI Solutions', 'Creative Direction'].map((tag) => (
                    <span key={tag} style={{ background: 'var(--t-a-bg-s)', color: 'var(--t-accent)', fontSize: '12px', fontWeight: 600, padding: '6px 14px', borderRadius: '999px', border: '1px solid var(--t-a-border-w)' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link
                    to="/contact"
                    data-cursor="hover"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'var(--t-accent)', color: 'var(--t-on-accent)',
                      fontWeight: 700, fontSize: '14px', padding: '14px 28px',
                      borderRadius: '10px', textDecoration: 'none',
                      transition: 'background 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--t-accent-h)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--t-accent)'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    Work With David
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                  <a
                    href="https://wa.me/2347084321204"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'transparent', color: 'var(--t-text)',
                      fontWeight: 600, fontSize: '14px', padding: '14px 28px',
                      borderRadius: '10px', textDecoration: 'none',
                      border: '1px solid var(--t-border-l)',
                      transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.background = 'rgba(37,211,102,0.08)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--t-border-l)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.528 5.852L0 24l6.338-1.501A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" fill="#25D366"/>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </AnimatedItem>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '100px 40px', background: 'var(--t-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>Meet the Team</p>
          <h2 data-reveal data-delay="0.1" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '60px' }}>
            The people behind the work.
          </h2>
          <AnimatedSection variantCycle={['tiltLeft', 'scaleIn', 'tiltRight', 'flipY', 'bounce', 'rotateIn']} className="r-team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {team.map((member) => (
              <AnimatedItem key={member.name} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                data-cursor="hover"
                style={{
                  background: 'var(--t-bg)',
                  border: '1px solid var(--t-border)',
                  borderRadius: '20px',
                  padding: '36px',
                  transition: 'border-color 0.3s, transform 0.3s',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--t-a-border)'; e.currentTarget.style.transform = 'translateY(-6px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--t-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid var(--t-accent)',
                  marginBottom: '20px',
                  flexShrink: 0,
                  background: member.bg,
                }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', objectPosition: 'center top' }}
                  />
                </div>
                <h3 style={{ color: 'var(--t-text)', fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ color: 'var(--t-accent)', fontSize: '13px', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.02em' }}>{member.role}</p>
                <p style={{ color: 'var(--t-text-4)', fontSize: '12px', fontWeight: 500, marginBottom: '14px' }}>📍 {member.location}</p>
                <p style={{ color: 'var(--t-text-2)', fontSize: '14px', lineHeight: 1.7, flex: 1 }}>{member.bio}</p>
                {member.tags && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '16px' }}>
                    {member.tags.map((tag) => (
                      <span key={tag} style={{ background: 'var(--t-a-bg-s)', color: 'var(--t-accent)', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '999px' }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 40px', background: 'var(--t-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p data-reveal style={{ color: 'var(--t-accent)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>What We Stand For</p>
          <h2 data-reveal data-delay="0.1" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '60px' }}>
            Our Values
          </h2>
          <AnimatedSection variantCycle={['flipX', 'slideLeft', 'flipY', 'bounce', 'slideRight', 'rotateIn']} className="r-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {values.map((v) => (
              <AnimatedItem key={v.name} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  background: 'var(--t-surface)',
                  border: '1px solid var(--t-border)',
                  borderRadius: '20px',
                  padding: '32px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ width: '40px', height: '40px', background: 'var(--t-accent)', borderRadius: '10px', marginBottom: '20px' }} />
                <h3 style={{ color: 'var(--t-text)', fontWeight: 800, fontSize: '20px', marginBottom: '12px' }}>{v.name}</h3>
                <p style={{ color: 'var(--t-text-2)', fontSize: '14px', lineHeight: 1.7, flex: 1 }}>{v.desc}</p>
              </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Clients */}
      <section style={{ padding: '80px 40px', background: 'var(--t-surface)', borderTop: '1px solid var(--t-border-s)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p data-reveal style={{ color: 'var(--t-text-2)', fontSize: '13px', fontWeight: 500, textAlign: 'center', marginBottom: '40px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Brands We've Worked With
          </p>
          <div data-reveal style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {clients.map((client) => (
              <span
                key={client}
                data-cursor="hover"
                style={{
                  background: 'var(--t-bg)',
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
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', background: 'var(--t-bg)', textAlign: 'center' }}>
        <h2 data-reveal style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--t-text)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Ready to work together?
        </h2>
        <p data-reveal data-delay="0.1" style={{ color: 'var(--t-text-2)', fontSize: '16px', marginBottom: '32px' }}>
          Let's build something great for your business.
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
          Get in Touch
        </Link>
      </section>
    </PageWrapper>
  );
}
