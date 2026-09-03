<?php
$pageTitle   = 'Our Process | OMG Tech Hub — Discovery to Launch Workflow';
$pageDesc    = 'See how OMG Tech Hub works: a 7-step creative process from Discovery through Strategy, Design, Development, Testing, Launch, and ongoing Support.';
$pageCurrent = 'process';
include __DIR__ . '/includes/header.php';
include __DIR__ . '/includes/navbar.php';
?>

<main id="main-content">

  <!-- ══════════════════════ PAGE HERO ════════════════════ -->
  <section class="about-hero section content-page-hero process-hero" aria-labelledby="process-hero-heading">
    <div class="about-video-bg">
      <div class="about-video-placeholder has-bg"></div>
    </div>
    <div class="hero-orb orb-1" style="opacity:0.14;" aria-hidden="true"></div>
    <div class="hero-grid" style="opacity:0.3;" aria-hidden="true"></div>
    <div class="container">
      <div style="max-width: 760px;">
        <span class="section-tag reveal">How We Work</span>
        <h1 id="process-hero-heading" class="page-hero-title reveal">
          A Process<br>
          <span class="line2">Built for Perfection</span>
        </h1>
        <p class="section-subtitle reveal" style="font-size:1.1rem;">
          Our refined, 7-step creative process eliminates guesswork and delivers
          extraordinary results consistently — for every client, every project.
        </p>
      </div>
    </div>
  </section>

  <!-- ══════════════════════ PROCESS TIMELINE ══════════════ -->
  <section class="section" aria-labelledby="timeline-heading">
    <div class="container">
      <div class="text-center" style="margin-bottom: 80px;">
        <span class="section-tag reveal">The Journey</span>
        <h2 id="timeline-heading" class="section-title reveal">
          From Idea to <span class="highlight">Impact</span> —<br>
          Every Step, Perfected
        </h2>
        <p class="section-subtitle reveal" style="margin: 0 auto;">
          Seven purposeful steps that transform your vision into a market-dominating reality.
        </p>
      </div>

      <div class="process-timeline" role="list" aria-label="Process steps">

        <?php
        $steps = [
          [
            'num'   => '01',
            'icon'  => '🔍',
            'phase' => 'Discovery',
            'title' => 'Deep Brand Discovery',
            'desc'  => 'We start by truly understanding your business — your goals, audience, competition, and current challenges. Through structured discovery sessions, questionnaires, and market analysis, we uncover insights that form the foundation of everything we create.',
            'dur'   => '2–3 Days',
            'items' => ['Brand questionnaire & briefing', 'Stakeholder interviews', 'Market & competitor research', 'Audience persona development'],
          ],
          [
            'num'   => '02',
            'icon'  => '🧠',
            'phase' => 'Strategy',
            'title' => 'Creative Strategy Development',
            'desc'  => 'With discovery insights in hand, we craft a strategic roadmap. This includes positioning strategy, creative direction, moodboards, and a detailed project plan that aligns your business objectives with creative execution.',
            'dur'   => '3–5 Days',
            'items' => ['Creative direction & moodboards', 'Brand positioning statement', 'Project roadmap & milestones', 'Content strategy outline'],
          ],
          [
            'num'   => '03',
            'icon'  => '🎨',
            'phase' => 'Design',
            'title' => 'Premium Design Execution',
            'desc'  => 'This is where the magic happens. Our designers translate strategy into stunning visuals — crafting each element with intention, hierarchy, and brand alignment. We present multiple concepts and refine based on structured feedback.',
            'dur'   => '5–14 Days',
            'items' => ['Initial design concepts (2–3 directions)', 'Client feedback & refinement rounds', 'Final design system creation', 'Asset preparation & organisation'],
          ],
          [
            'num'   => '04',
            'icon'  => '⚙️',
            'phase' => 'Development',
            'title' => 'Technical Development & Build',
            'desc'  => 'Our development team brings the design to life with clean, optimised code. We build for performance, accessibility, SEO, and scalability — ensuring your digital product works flawlessly across all devices and browsers.',
            'dur'   => '7–21 Days',
            'items' => ['Responsive front-end development', 'Back-end & CMS integration', 'Performance optimisation', 'SEO foundation & meta setup'],
          ],
          [
            'num'   => '05',
            'icon'  => '🧪',
            'phase' => 'Testing',
            'title' => 'Quality Assurance & Testing',
            'desc'  => 'We rigorously test every element before launch. Cross-browser compatibility, mobile responsiveness, load speed, form functionality, and accessibility — nothing ships until it meets our premium quality standard.',
            'dur'   => '2–4 Days',
            'items' => ['Cross-browser & device testing', 'Performance & Core Web Vitals audit', 'Accessibility checks (WCAG)', 'Content & functionality review'],
          ],
          [
            'num'   => '06',
            'icon'  => '🚀',
            'phase' => 'Launch',
            'title' => 'Strategic Launch & Handover',
            'desc'  => 'Launch day is a celebration — and a careful process. We manage deployment, configure domains, set up analytics, and provide comprehensive training so you can manage your new brand or platform with confidence.',
            'dur'   => '1–2 Days',
            'items' => ['Managed deployment & go-live', 'DNS configuration & SSL setup', 'Analytics & tracking setup', 'Training & handover documentation'],
          ],
          [
            'num'   => '07',
            'icon'  => '🤝',
            'phase' => 'Support',
            'title' => 'Ongoing Support & Growth',
            'desc'  => 'Our relationship doesn\'t end at launch. We provide post-launch support, monitor performance, and are always available for updates, new features, and strategic guidance as your business grows.',
            'dur'   => 'Ongoing',
            'items' => ['3 months free post-launch support', 'Monthly performance reporting', 'Priority update requests', 'Retainer options for ongoing work'],
          ],
        ];

        foreach ($steps as $i => $step): ?>

        <div class="process-step reveal" role="listitem" aria-label="Step <?php echo $step['num']; ?>: <?php echo htmlspecialchars($step['title']); ?>">

          <!-- Connector Number -->
          <div class="process-step-num" aria-hidden="true"><?php echo $step['num']; ?></div>

          <!-- Content -->
          <div class="process-step-content">
            <div class="process-step-label"><?php echo htmlspecialchars($step['icon']); ?> <?php echo htmlspecialchars($step['phase']); ?> · <?php echo $step['dur']; ?></div>
            <h3 class="process-step-title"><?php echo htmlspecialchars($step['title']); ?></h3>
            <p class="process-step-desc" style="margin-bottom: 20px;"><?php echo htmlspecialchars($step['desc']); ?></p>
            <ul>
              <?php foreach ($step['items'] as $item): ?>
              <li class="deliverable-item">
                <span class="check" aria-hidden="true">✓</span>
                <?php echo htmlspecialchars($item); ?>
              </li>
              <?php endforeach; ?>
            </ul>
          </div>

          <!-- Empty space for alternating layout -->
          <div class="process-step-empty" aria-hidden="true"></div>

        </div>

        <?php endforeach; ?>

      </div><!-- /.process-timeline -->
    </div>
  </section>

  <!-- ══════════════════════ GUARANTEES ════════════════════ -->
  <section class="section" style="background: var(--surface);" aria-labelledby="guarantees-heading">
    <div class="container">
      <div class="text-center" style="margin-bottom: 56px;">
        <span class="section-tag reveal">Our Guarantees</span>
        <h2 id="guarantees-heading" class="section-title reveal">
          We Stand Behind <span class="highlight">Our Work</span>
        </h2>
      </div>

      <div class="process-guarantee-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
        <?php
        $guarantees = [
          ['⏰', 'On-Time Delivery', 'We have a 97% on-time delivery record. If we miss a deadline, you get a discount — no questions asked.'],
          ['🔄', 'Unlimited Revisions (Within Scope)', 'We iterate until you\'re genuinely thrilled with the result. Your satisfaction is our benchmark, not just sign-off.'],
          ['📞', '24-Hour Response', 'We respond to every client communication within 24 hours — usually much faster. You\'re never left hanging.'],
          ['🛡️', '3-Month Post-Launch Support', 'Every project includes 3 months of post-launch support. We\'re with you beyond the finish line.'],
        ];
        foreach ($guarantees as $i => $g): ?>
        <div class="guarantee-card process-guarantee-card reveal delay-<?php echo $i + 1; ?> has-bg">
          <div class="guarantee-body" style="padding:32px;text-align:center;">
            <div style="font-size:2.5rem; margin-bottom:16px;" aria-hidden="true"><?php echo $g[0]; ?></div>
            <h3 class="guarantee-name"><?php echo htmlspecialchars($g[1]); ?></h3>
            <p class="guarantee-desc process-guarantee-desc"><?php echo htmlspecialchars($g[2]); ?></p>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ══════════════════════ FAQ ════════════════════════════ -->
  <section class="section" aria-labelledby="process-faq">
    <div class="container" style="max-width: 780px;">
      <div class="text-center" style="margin-bottom: 56px;">
        <span class="section-tag reveal">Common Questions</span>
        <h2 id="process-faq" class="section-title reveal">
          Process <span class="highlight">FAQs</span>
        </h2>
      </div>

      <?php
      $faqs = [
        ['How long does a typical project take?', 'Project timelines vary by scope. A brand identity typically takes 2–4 weeks. A full website takes 4–8 weeks. We provide a detailed timeline during the discovery phase.'],
        ['What do you need from me to get started?', 'To kick off, we need a completed brief/questionnaire, an initial deposit, and access to any existing brand assets. We guide you through every step.'],
        ['How many revisions are included?', 'Every project includes structured revision rounds (typically 2–3 rounds depending on the package). We work with you until you\'re 100% satisfied.'],
        ['Do you work with international clients?', 'Absolutely. We\'ve worked with clients in Nigeria, Ghana, Kenya, UK, USA, and Canada. All collaboration is remote-friendly via Slack, Zoom, and Notion.'],
        ['What happens if I want changes after launch?', 'All projects include 3 months of post-launch support. After that, we offer affordable monthly retainer plans for ongoing maintenance and updates.'],
        ['Can I see work-in-progress before the final delivery?', 'Yes. We share staged updates throughout the project via shared Figma boards or staging environments, so you\'re always aligned.'],
      ];
      foreach ($faqs as $i => $faq): ?>
      <div class="faq-item reveal" data-index="<?php echo $i; ?>">
        <div class="faq-question" role="button" tabindex="0" aria-expanded="false">
          <?php echo htmlspecialchars($faq[0]); ?>
          <span class="faq-icon" aria-hidden="true">+</span>
        </div>
        <div class="faq-answer" role="region">
          <?php echo htmlspecialchars($faq[1]); ?>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- CTA -->
  <section class="section" style="text-align:center; background: var(--surface);" aria-labelledby="process-cta">
    <div class="container" style="max-width:640px;">
      <span class="section-tag reveal" style="display:inline-flex; justify-content:center;">Ready to Begin?</span>
      <h2 id="process-cta" class="section-title reveal">Let's Start Your <span class="highlight">Journey</span></h2>
      <p class="section-subtitle reveal" style="text-align:center; margin:0 auto 40px;">
        Every great brand started with a single conversation. Book your free discovery call today.
      </p>
      <div class="hero-actions reveal" style="justify-content:center;">
        <a href="contact.php" class="btn-primary" style="padding:16px 36px;">Book Discovery Call</a>
        <a href="pricing.php" class="btn-secondary" style="padding:16px 36px;">View Packages</a>
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
