<?php
$pageTitle   = 'About Us | OMG Tech Hub — Premium Creative-Tech Agency';
$pageDesc    = 'Learn about OMG Tech Hub — our story, mission, vision, team, and core values. A premium creative-tech agency building bold digital brands in Nigeria and beyond.';
$pageCurrent = 'about';
include __DIR__ . '/includes/header.php';
include __DIR__ . '/includes/navbar.php';
?>

<main id="main-content">

  <!-- ══════════════════════ ABOUT HERO — Cinematic Video BG ═══ -->
  <section class="about-hero section" style="position:relative;overflow:hidden;min-height:82vh;display:flex;align-items:center;" aria-labelledby="about-hero-heading">

    <!-- Cinematic video BG -->
    <div class="about-video-bg" aria-hidden="true">
      <div class="about-video-placeholder has-bg"></div>
    </div>

    <!-- Floating orbs -->
    <div class="hero-orb orb-1" style="opacity:.18;z-index:2;" aria-hidden="true"></div>
    <div class="hero-orb orb-3" style="opacity:.12;z-index:2;" aria-hidden="true"></div>

    <!-- Content -->
    <div class="container" style="position:relative;z-index:3;">
      <div style="max-width:820px;">
        <span class="section-tag reveal" style="background:rgba(255,255,255,.08)!important;border-color:rgba(255,255,255,.15)!important;color:rgba(255,255,255,.9)!important;">Our Story</span>
        <h1 id="about-hero-heading" class="page-hero-title reveal" style="color:#F2F2F2;text-shadow:0 2px 40px rgba(0,0,0,.5);">
          We Are the Agency<br>
          <span class="line2" style="color:var(--accent);">Brands Dream Of</span>
        </h1>
        <p class="section-subtitle reveal" style="max-width:640px;font-size:1.15rem;line-height:1.8;color:rgba(255,255,255,.75);">
          Born in the heart of Benin City, Nigeria — OMG Tech Hub is a creative-tech agency
          obsessed with building brands that don't just look good, but perform extraordinarily.
          We combine bold creativity with technical precision to deliver digital experiences
          that drive real, measurable results.
        </p>
        <div class="hero-actions reveal" style="margin-top:40px;margin-bottom:0;">
          <a href="contact.php" class="btn-primary">
            <span>Work With Us</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="portfolio.php" class="btn-secondary">See Our Work</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════ MISSION & VISION ═══════════════ -->
  <section class="section" style="background: var(--surface);" aria-labelledby="mission-heading">
    <div class="container">
      <div class="mission-vision-grid">

        <div class="reveal-left">
          <span class="section-tag">Our Mission</span>
          <h2 id="mission-heading" class="section-title" style="font-size: clamp(1.8rem, 3vw, 2.5rem);">
            To Empower Businesses With <span class="highlight">World-Class</span> Digital Presence
          </h2>
          <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 24px;">
            We believe every brand — whether a startup in Benin City or a corporation in London —
            deserves design and technology that genuinely competes on the world stage.
            Our mission is to make that possible, with premium execution and relentless attention to detail.
          </p>
          <p style="color: var(--text-muted); line-height: 1.8;">
            We don't just build websites or logos. We build brand ecosystems — cohesive, powerful,
            and strategically designed to attract and convert your ideal customers.
          </p>
        </div>

        <div class="reveal-right">
          <span class="section-tag">Our Vision</span>
          <h2 class="section-title" style="font-size: clamp(1.8rem, 3vw, 2.5rem);">
            Africa's Most <span class="accent">Sought-After</span> Creative-Tech Agency
          </h2>
          <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 24px;">
            We envision a future where African creative talent is the gold standard globally.
            OMG Tech Hub is at the forefront of that revolution — proving that world-class design
            and technology can emerge from any part of the world.
          </p>
          <p style="color: var(--text-muted); line-height: 1.8;">
            Our vision is to be the go-to creative partner for ambitious brands across Africa,
            Europe, and North America — known for quality, creativity, and results.
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- ══════════════════════ WHY BRANDS TRUST OMG ══════════ -->
  <section class="section" aria-labelledby="trust-heading">
    <div class="container">
      <div class="text-center" style="margin-bottom: 64px;">
        <span class="section-tag reveal">Why OMG</span>
        <h2 id="trust-heading" class="section-title reveal">
          Why Benin Brands Trust <span class="highlight">OMG Tech Hub</span>
        </h2>
        <p class="section-subtitle reveal" style="margin: 0 auto;">
          We understand the local market deeply while delivering globally competitive work.
        </p>
      </div>

      <div class="why-omg-grid">
        <?php
        $reasons = [
          ['🏆', 'Proven Excellence', 'Over 150 successful projects across Nigeria and beyond. Every project is delivered to international standards.'],
          ['⚡', 'Speed Without Compromise', 'We move fast but never sacrifice quality. Our streamlined process ensures on-time delivery, always.'],
          ['🎯', 'Results-Driven', 'We measure success by your growth metrics — not just aesthetics. Design that converts is our specialty.'],
          ['🤝', 'True Partnership', 'We embed ourselves in your vision. Your goals become our goals. No cookie-cutter solutions here.'],
          ['🔒', 'Full Transparency', 'Clear pricing, open communication, and regular updates. You\'re always in the loop.'],
          ['🌍', 'Global Thinking, Local Roots', 'Benin City born and bred, but our work meets international creative standards. Best of both worlds.'],
        ];
        foreach ($reasons as $i => $r): ?>
        <div class="value-card reveal delay-<?php echo ($i % 3) + 1; ?>">
          <div class="value-icon" aria-hidden="true"><?php echo $r[0]; ?></div>
          <h3 class="value-name"><?php echo $r[1]; ?></h3>
          <p class="value-desc"><?php echo $r[2]; ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ══════════════════════ FOUNDER ═══════════════════════════ -->
<section class="section" style="background: var(--surface);" aria-labelledby="founder-heading">
  <div class="container">

    <div class="text-center" style="margin-bottom: 64px;">
      <span class="section-tag reveal">The Founder</span>
      <h2 id="founder-heading" class="section-title reveal">
        Meet the <span class="highlight">Creative</span> Behind the Magic
      </h2>
    </div>

    <div class="founder-layout reveal">

      <!-- Photo column -->
      <div class="founder-photo-col">
        <div class="founder-photo-wrap">
          <img src="images/david.jpeg" alt="David Omigie — Founder & CEO, OMG Tech Hub" class="founder-photo" />
          <div class="founder-badge founder-badge-top">
            <span class="fb-icon">🏆</span>
            <div>
              <div class="fb-title">Founder & CEO</div>
              <div class="fb-sub">OMG Tech Hub</div>
            </div>
          </div>
          <div class="founder-badge founder-badge-bottom">
            <span class="fb-icon">⚡</span>
            <div>
              <div class="fb-title">Full-Stack Creative</div>
              <div class="fb-sub">Dev · Design · Motion · AI</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info column -->
      <div class="founder-info-col">
        <h3 class="founder-name">David Omigie</h3>
        <p class="founder-role">Founder & CEO — OMG Tech Hub</p>

        <p class="founder-bio">
          David Omigie is the Founder and CEO of OMG Tech Hub, a technology and creative agency focused on building innovative digital solutions that help individuals, brands, and businesses establish a stronger online presence.
        </p>

        <ul class="founder-points">
          <li>
            <span class="fp-dot"></span>
            <span>Expertise spanning web development, graphic design, UI/UX, motion design, and AI-powered solutions — combining creativity with technology to deliver functional, visually engaging, and results-driven work.</span>
          </li>
          <li>
            <span class="fp-dot"></span>
            <span>Goes beyond creating products — focused on building experiences that solve real problems and create lasting value for clients and their audiences.</span>
          </li>
          <li>
            <span class="fp-dot"></span>
            <span>Driven by a passion for innovation and continuous growth, committed to transforming ideas into impactful digital products while creating opportunities for collaboration and technological advancement.</span>
          </li>
          <li>
            <span class="fp-dot"></span>
            <span>Mission: to turn ideas into meaningful digital experiences and help businesses thrive in a rapidly evolving digital world.</span>
          </li>
        </ul>

        <div class="founder-tags">
          <span class="founder-tag">Web Development</span>
          <span class="founder-tag">Graphic Design</span>
          <span class="founder-tag">UI/UX Design</span>
          <span class="founder-tag">Motion Design</span>
          <span class="founder-tag">AI Solutions</span>
          <span class="founder-tag">Creative Direction</span>
        </div>

        <div class="founder-actions">
          <a href="contact.php" class="btn-primary">
            <span>Work With David</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="https://wa.me/2347084321204" target="_blank" rel="noopener" class="btn-secondary">💬 WhatsApp</a>
        </div>
      </div>

    </div>
  </div>
</section>

  <!-- ══════════════════════ CORE VALUES ═══════════════════ -->
  <section class="section" aria-labelledby="values-heading">
    <div class="container">
      <div class="text-center" style="margin-bottom: 64px;">
        <span class="section-tag reveal">Core Values</span>
        <h2 id="values-heading" class="section-title reveal">
          The Principles We <span class="highlight">Live By</span>
        </h2>
      </div>

      <div class="values-grid">
        <?php
        $values = [
          ['✨', 'Excellence Above All',     'We settle for nothing less than extraordinary. Every pixel, every line of code, every strategy is crafted to the highest standard.'],
          ['💡', 'Bold Creativity',           'We push boundaries, challenge conventions, and create work that stops people in their tracks. Safe is the enemy of great.'],
          ['🔄', 'Continuous Growth',         'We invest in our team\'s skills, tools, and processes continuously. Today\'s best is tomorrow\'s baseline.'],
          ['❤️', 'Client-First Always',       'Your success is our success. We treat every client\'s business as if it were our own — with genuine care and commitment.'],
          ['🌱', 'Integrity & Transparency',  'Honest timelines, clear pricing, open communication. No hidden fees, no empty promises.'],
          ['🌍', 'Cultural Intelligence',     'We understand Nigeria, Africa, and global markets — giving our clients the unique advantage of localised creativity with global polish.'],
        ];
        foreach ($values as $i => $val): ?>
        <div class="value-card reveal delay-<?php echo ($i % 3) + 1; ?>">
          <div class="value-icon" aria-hidden="true"><?php echo $val[0]; ?></div>
          <h3 class="value-name"><?php echo $val[1]; ?></h3>
          <p class="value-desc"><?php echo $val[2]; ?></p>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ══════════════════════ CTA ════════════════════════════ -->
  <section class="section" style="text-align:center; background: var(--surface);" aria-labelledby="about-cta">
    <div class="container" style="max-width:620px;">
      <span class="section-tag reveal" style="display:inline-flex; justify-content:center;">Let's Connect</span>
      <h2 id="about-cta" class="section-title reveal">
        Ready to Build Your <span class="highlight">Dream Brand?</span>
      </h2>
      <p class="section-subtitle reveal" style="text-align:center; margin: 0 auto 40px;">
        Let's start with a free 30-minute discovery call. No pressure, just possibilities.
      </p>
      <div class="hero-actions reveal" style="justify-content:center;">
        <a href="contact.php" class="btn-primary" style="padding:16px 36px;">
          <span>Book a Discovery Call</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="portfolio.php" class="btn-secondary" style="padding:16px 36px;">View Portfolio</a>
      </div>
    </div>
  </section>

</main>



<!-- PAGE FOOTER CTA -->
<section class="page-footer-cta" aria-labelledby="page-cta-heading">
  <div class="container">
    <span class="section-tag" style="background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.85);display:inline-flex;justify-content:center;margin-bottom:20px;">Let's Build Together</span>
    <h2 id="page-cta-heading">Ready to Build Something<br>Extraordinary?</h2>
    <p>Let's create a digital experience that makes your brand impossible to ignore.</p>
    <a href="contact.php" class="btn-accent">
      Start Your Project
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  </div>
</section>

<script>
var founderLayout = document.querySelector('.founder-layout');
if (founderLayout) {
  var founderObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        founderObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  founderObserver.observe(founderLayout);
}
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
