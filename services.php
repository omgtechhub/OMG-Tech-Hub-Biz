<?php
$pageTitle   = 'Services | OMG Tech Hub — Branding, Web, UI/UX, Motion & More';
$pageDesc    = 'Explore our full range of creative-tech services: Brand Identity, Web Development, UI/UX Design, Motion Graphics, Video Editing, Animation, Graphic Design & Creative Consulting.';
$pageCurrent = 'services';
include __DIR__ . '/includes/header.php';
include __DIR__ . '/includes/navbar.php';
?>

<main id="main-content">

  <!-- ══════════════════════ PAGE HERO ════════════════════ -->
  <section class="about-hero section content-page-hero services-hero" aria-labelledby="services-page-heading">
    <div class="about-video-bg">
      <div class="about-video-placeholder has-bg"></div>
    </div>
    <div class="hero-orb orb-1" style="opacity:0.15;" aria-hidden="true"></div>
    <div class="hero-grid" style="opacity:0.3;" aria-hidden="true"></div>
    <div class="container">
      <div style="max-width: 760px;">
        <span class="section-tag reveal">What We Offer</span>
        <h1 id="services-page-heading" class="page-hero-title reveal">
          Services Built for<br>
          <span class="line2">Extraordinary Results</span>
        </h1>
        <p class="section-subtitle reveal" style="font-size:1.1rem;">
          Every service we offer is engineered to deliver measurable impact.
          From brand identity to full-stack development — we bring premium execution to everything we touch.
        </p>
      </div>
    </div>
  </section>

  <!-- ══════════════════════ SERVICES DETAIL ════════════════ -->
  <section class="section" aria-label="Detailed services">
    <div class="container">

      <?php
      $services = [
        [
          'icon'  => '🎨',
          'name'  => 'Brand Identity Design',
          'desc'  => 'A powerful brand identity is your most valuable business asset. We craft complete visual identities that communicate your values, attract your ideal clients, and make your business truly unforgettable.',
          'benefits' => ['Instant recognition and recall', 'Premium market positioning', 'Consistency across all touchpoints', 'Emotional connection with your audience'],
          'deliverables' => ['Logo Design (Primary + Variations)', 'Typography System', 'Colour Palette & Brand Guidelines', 'Brand Voice & Messaging', 'Stationery Design (Business Cards, Letterhead)', 'Social Media Brand Kit', 'Brand Usage Guide'],
          'bg' => 'linear-gradient(135deg, #7A0D0D 0%, #F5B301 100%)',
        ],
        [
          'icon'  => '✏️',
          'name'  => 'Graphic Design',
          'desc'  => 'Striking visual communication that tells your story and drives action. Whether it\'s social media, print, or packaging — our graphic design work is always crafted with purpose and precision.',
          'benefits' => ['Consistent, high-quality visual assets', 'Increased social media engagement', 'Professional brand perception', 'Faster content production at scale'],
          'deliverables' => ['Social Media Graphics & Templates', 'Print Marketing Materials', 'Packaging & Label Design', 'Presentation Decks', 'Infographics & Data Visualisation', 'Email Design Templates'],
          'bg' => 'linear-gradient(135deg, #0A66FF 0%, #111 100%)',
        ],
        [
          'icon'  => '🖥️',
          'name'  => 'UI/UX Design',
          'desc'  => 'We design digital experiences that feel effortless. Through deep user research, intuitive information architecture, and visually stunning interfaces, we create products people love to use.',
          'benefits' => ['Higher user retention and satisfaction', 'Increased conversion rates', 'Reduced development costs via validated prototypes', 'Competitive differentiation'],
          'deliverables' => ['UX Research & User Personas', 'Information Architecture', 'Wireframes & User Flows', 'Interactive Prototypes', 'High-Fidelity UI Design', 'Design System / Component Library', 'Usability Testing Reports'],
          'bg' => 'linear-gradient(135deg, #111 0%, #7A0D0D 100%)',
        ],
        [
          'icon'  => '💻',
          'name'  => 'Web Development',
          'desc'  => 'We build websites and web applications that are fast, beautiful, and conversion-optimised. From marketing sites to complex web platforms — our code is as refined as our design.',
          'benefits' => ['Lightning-fast load times (Core Web Vitals optimised)', 'Mobile-first, fully responsive', 'SEO-ready from the ground up', 'Secure, scalable, and maintainable'],
          'deliverables' => ['Custom Website Design & Development', 'E-Commerce Development', 'Web Application Development', 'CMS Integration (WordPress, Custom)', 'API Development & Integration', 'Website Performance Optimisation', '3 Months Post-Launch Support'],
          'bg' => 'linear-gradient(135deg, #F5B301 0%, #e84393 100%)',
        ],
        [
          'icon'  => '🎬',
          'name'  => 'Video Editing',
          'desc'  => 'Compelling video content that tells your brand story, captures attention, and drives engagement. From raw footage to cinematic masterpiece — we handle the full post-production process.',
          'benefits' => ['Professional, broadcast-quality output', 'Consistent brand tone across videos', 'Optimised for social media platforms', 'Faster turnaround on content production'],
          'deliverables' => ['Brand Video Editing', 'Social Media Video Content', 'Product Demo Videos', 'Corporate & Event Videos', 'YouTube Channel Content', 'Colour Grading & Sound Design', 'Subtitles & Captions'],
          'bg' => 'linear-gradient(135deg, #0f3460 0%, #4D8CFF 100%)',
        ],
        [
          'icon'  => '🌀',
          'name'  => 'Motion Graphics',
          'desc'  => 'Dynamic motion design that breathes life into your brand. From logo animations to full title sequences — our motion work creates lasting impressions and keeps audiences glued to your content.',
          'benefits' => ['Premium, cinematic brand presence', '300% higher engagement vs static content', 'Versatile across all platforms', 'Memorable brand recall'],
          'deliverables' => ['Logo Animation', 'Explainer Video Animation', 'Social Media Animated Posts', 'Title Sequences & Intros', 'Animated Infographics', 'UI/UX Micro-Animations', 'Brand Motion System'],
          'bg' => 'linear-gradient(135deg, #1a1a2e 0%, #B31919 50%, #F5B301 100%)',
        ],
        [
          'icon'  => '🤖',
          'name'  => 'Animation',
          'desc'  => 'From character animation to 2D/3D product visualisation — our animation studio creates captivating moving imagery that makes complex ideas simple and your brand unforgettable.',
          'benefits' => ['Unique, ownable visual style', 'Improved message retention', 'Higher ad performance', 'Content that stands out in crowded feeds'],
          'deliverables' => ['2D Character Animation', '3D Product Visualisation', 'Animated Explainer Videos', 'Frame-by-Frame Animation', 'Interactive Web Animations', 'CSS/SVG Micro-Animations'],
          'bg' => 'linear-gradient(135deg, #7A0D0D 0%, #0A66FF 100%)',
        ],
        [
          'icon'  => '📱',
          'name'  => 'Digital Product Design',
          'desc'  => 'We design and prototype digital products from the ground up — mobile apps, SaaS dashboards, and digital platforms. Strategy, design, and technical feasibility, all in one team.',
          'benefits' => ['Validated product concepts before development', 'Investor-ready prototypes', 'User-tested for real-world viability', 'Seamless handoff to development'],
          'deliverables' => ['Product Strategy & Roadmap', 'Mobile App Design (iOS & Android)', 'SaaS Dashboard Design', 'Design System & Component Library', 'Interactive Figma Prototype', 'Developer Handoff Specs'],
          'bg' => 'linear-gradient(135deg, #111 0%, #7A0D0D 60%, #F5B301 100%)',
        ],
        [
          'icon'  => '🧠',
          'name'  => 'Creative Consulting',
          'desc'  => 'Not sure where to start? Our creative consulting service gives you expert strategic direction — brand positioning, content strategy, digital marketing direction, and creative roadmapping.',
          'benefits' => ['Clarity on brand direction', 'Aligned creative and business strategy', 'Save money by getting it right from the start', 'Expert third-party perspective'],
          'deliverables' => ['Brand Audit & Review', 'Creative Strategy Document', 'Content Marketing Plan', 'Competitor Analysis', 'Digital Presence Assessment', 'Growth Recommendations'],
          'bg' => 'linear-gradient(135deg, #0A66FF 0%, #7A0D0D 100%)',
        ],
      ];

      foreach ($services as $idx => $svc): ?>

      <article class="service-detail" id="service-<?php echo $idx + 1; ?>" aria-label="<?php echo htmlspecialchars($svc['name']); ?>">
        <span class="section-tag" style="margin-bottom:20px;display:inline-flex;">Service <?php echo str_pad($idx + 1, 2, '0', STR_PAD_LEFT); ?></span>
        <div class="service-detail-grid">

          <!-- Visual -->
          <div class="service-visual svc-visual-bg svc-visual-<?php echo $idx + 1; ?> reveal-<?php echo $idx % 2 === 0 ? 'left' : 'right'; ?>">
          </div>

          <!-- Text -->
          <div class="service-detail-text reveal-<?php echo $idx % 2 === 0 ? 'right' : 'left'; ?>">
            <h2 class="section-title" style="font-size: clamp(1.8rem, 3vw, 2.5rem);">
              <?php echo htmlspecialchars($svc['name']); ?>
            </h2>
            <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 28px;">
              <?php echo htmlspecialchars($svc['desc']); ?>
            </p>

            <!-- Benefits -->
            <h3 style="font-family: var(--font-head); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;">Benefits</h3>
            <ul style="margin-bottom: 28px;">
              <?php foreach ($svc['benefits'] as $b): ?>
              <li class="deliverable-item">
                <span class="check" aria-hidden="true">✓</span>
                <?php echo htmlspecialchars($b); ?>
              </li>
              <?php endforeach; ?>
            </ul>

            <!-- Deliverables -->
            <h3 style="font-family: var(--font-head); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;">Deliverables</h3>
            <div class="deliverables-list" style="margin-bottom: 32px;">
              <?php foreach ($svc['deliverables'] as $d): ?>
              <div class="deliverable-item">
                <span class="check" aria-hidden="true">→</span>
                <?php echo htmlspecialchars($d); ?>
              </div>
              <?php endforeach; ?>
            </div>

            <a href="contact.php?service=<?php echo urlencode($svc['name']); ?>" class="btn-primary">
              <span>Get a Quote</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

        </div>
      </article>

      <?php endforeach; ?>

    </div>
  </section>

  <!-- ══════════════════════ CTA ════════════════════════════ -->
  <section class="section" style="background: var(--surface); text-align: center;" aria-labelledby="services-cta">
    <div class="container" style="max-width: 680px;">
      <span class="section-tag reveal" style="display:inline-flex; justify-content:center;">Let's Get Started</span>
      <h2 id="services-cta" class="section-title reveal">Not Sure Which Service<br>You <span class="highlight">Need?</span></h2>
      <p class="section-subtitle reveal" style="text-align:center; margin: 0 auto 40px;">
        Let's talk. A free 30-minute discovery call helps us understand your business and recommend exactly what will make the biggest impact.
      </p>
      <div class="hero-actions reveal" style="justify-content:center;">
        <a href="contact.php" class="btn-primary" style="padding:16px 36px;">Book Free Consultation</a>
        <a href="pricing.php" class="btn-secondary" style="padding:16px 36px;">View Pricing</a>
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

<?php include __DIR__ . '/includes/footer.php'; ?>
