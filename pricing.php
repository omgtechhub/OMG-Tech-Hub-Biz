<?php
$pageTitle   = 'Pricing | OMG Tech Hub — Transparent Packages & Investment';
$pageDesc    = 'Explore OMG Tech Hub\'s transparent pricing packages: Starter, Growth, Premium, and Enterprise. Find the perfect plan for your brand and budget.';
$pageCurrent = 'pricing';
include __DIR__ . '/includes/header.php';
include __DIR__ . '/includes/navbar.php';
?>

<main id="main-content">

  <!-- ══════════════════════ PAGE HERO ════════════════════ -->
  <section class="about-hero section content-page-hero pricing-hero" aria-labelledby="pricing-hero-heading">
    <div class="about-video-bg">
      <div class="about-video-placeholder has-bg"></div>
    </div>
    <div class="hero-orb orb-1" style="opacity:0.14;" aria-hidden="true"></div>
    <div class="hero-grid" style="opacity:0.3;" aria-hidden="true"></div>
    <div class="container">
      <div style="max-width: 760px;">
        <span class="section-tag reveal">Transparent Pricing</span>
        <h1 id="pricing-hero-heading" class="page-hero-title reveal">
          Investment in<br>
          <span class="line2">Your Brand's Future</span>
        </h1>
        <p class="section-subtitle reveal" style="font-size:1.1rem;">
          Clear, transparent pricing with no hidden fees. Every package is designed to
          deliver maximum value and measurable ROI for your business.
        </p>

      </div>
    </div>
  </section>

  <!-- ══════════════════════ PRICING CARDS ════════════════ -->
  <section class="section" aria-labelledby="pricing-cards-heading">
    <div class="container">
      <h2 id="pricing-cards-heading" class="sr-only">Pricing Packages</h2>

      <!-- Billing Toggle -->
      <div style="display:flex; align-items:center; gap:14px; margin-bottom:48px; margin-top:40px;" class="reveal">
        <span style="font-size:0.9rem; color:var(--text-muted); font-weight:500;">Monthly</span>
        <label style="position:relative; width:52px; height:28px; cursor:pointer;" aria-label="Toggle annual billing">
          <input type="checkbox" id="pricing-toggle" style="opacity:0; width:0; height:0;" aria-label="Annual billing toggle" />
          <span style="position:absolute; inset:0; background:var(--border); border-radius:50px; transition:0.3s;" id="toggle-track"></span>
          <span style="position:absolute; left:3px; top:3px; width:22px; height:22px; background:#fff; border-radius:50%; transition:0.3s; box-shadow:0 2px 6px rgba(0,0,0,0.2);" id="toggle-thumb"></span>
        </label>
        <span style="font-size:0.9rem; color:var(--text-muted); font-weight:500;">
          Annual <span style="background:rgba(245,179,1,0.15); color:var(--accent); padding:2px 8px; border-radius:50px; font-size:0.75rem; font-weight:700; margin-left:4px;">Save 20%</span>
        </span>
      </div>

      <?php
      $pricingServices = [
        [
          'icon'  => '🎨',
          'title' => 'Graphic Design',
          'id'    => 'graphic-design',
          'plans' => [
            ['name'=>'Starter','price_m'=>'₦80,000','price_a'=>'₦64,000','desc'=>'Perfect for startups needing a clean, professional visual identity to get noticed.','features'=>['Logo Design (2 Concepts)','Brand Colour Palette','Typography System','Business Card Design','Social Media Profile Graphics','2 Revision Rounds','Brand Style Guide (PDF)'],'cta'=>'btn-secondary','link'=>'contact.php?package=Graphic+Starter'],
            ['name'=>'Growth','price_m'=>'₦200,000','price_a'=>'₦160,000','desc'=>'For growing brands that need a complete, consistent design system across all channels.','features'=>['Everything in Starter','3 Logo Concepts','Full Brand Identity System','Social Media Kit (12 templates)','Stationery Design Pack','3 Revision Rounds','1-Month Design Support'],'cta'=>'btn-secondary','link'=>'contact.php?package=Graphic+Growth'],
            ['name'=>'Premium','price_m'=>'₦450,000','price_a'=>'₦360,000','desc'=>'The complete graphic design transformation — from brand identity to packaging and beyond.','features'=>['Everything in Growth','Packaging & Label Design','Presentation Deck Design','Infographics & Data Visualisation','Email Template Design','Unlimited Revisions','Brand Motion System (basic)','Priority Response'],'featured'=>true,'cta'=>'btn-accent','link'=>'contact.php?package=Graphic+Premium'],
            ['name'=>'Enterprise','price_m'=>'Custom','price_a'=>'Custom','desc'=>'Bespoke, large-scale graphic design for agencies, corporations, and multi-brand organisations.','features'=>['Full Creative Strategy','Complete Brand Ecosystem','Multi-Brand Design System','Dedicated Design Team','Campaign Visual Identity','Monthly Retainer Options','NDA & Priority SLA'],'cta'=>'btn-primary','link'=>'contact.php?package=Graphic+Enterprise'],
          ],
        ],
        [
          'icon'  => '💻',
          'title' => 'Web Development',
          'id'    => 'web-development',
          'plans' => [
            ['name'=>'Starter','price_m'=>'₦200,000','price_a'=>'₦160,000','desc'=>'A clean, fast 3-page website to get your business online professionally.','features'=>['3-Page Custom Website','Mobile-First Responsive','Basic SEO Setup','Contact Form Integration','Google Analytics Setup','2 Revision Rounds','1-Month Post-Launch Support'],'cta'=>'btn-secondary','link'=>'contact.php?package=Web+Starter'],
            ['name'=>'Growth','price_m'=>'₦500,000','price_a'=>'₦400,000','desc'=>'A fully-featured website with CMS, SEO, and the integrations growing businesses need.','features'=>['Everything in Starter','Up to 7 Pages','Custom CMS Integration','Blog Setup & Configuration','Advanced SEO Optimisation','Performance Tuning','3 Revision Rounds','2-Month Support'],'cta'=>'btn-secondary','link'=>'contact.php?package=Web+Growth'],
            ['name'=>'Premium','price_m'=>'₦1,200,000','price_a'=>'₦960,000','desc'=>'A complete web presence — full design, development, e-commerce, and extended support.','features'=>['Everything in Growth','Up to 15 Pages','E-Commerce Development','Web App Features','API Development & Integration','Core Web Vitals Optimised','Unlimited Revisions','3-Month Support','Priority Response'],'featured'=>true,'cta'=>'btn-accent','link'=>'contact.php?package=Web+Premium'],
            ['name'=>'Enterprise','price_m'=>'Custom','price_a'=>'Custom','desc'=>'Custom web applications and platforms built for scale, security, and enterprise performance.','features'=>['Custom Web Applications','Multi-Site / Multi-Language','Enterprise CMS','Advanced API Integrations','DevOps & Hosting Setup','Dedicated Dev Team','Monthly Retainer Options','NDA & Priority SLA'],'cta'=>'btn-primary','link'=>'contact.php?package=Web+Enterprise'],
          ],
        ],
        [
          'icon'  => '🖥️',
          'title' => 'UI/UX Design',
          'id'    => 'uiux-design',
          'plans' => [
            ['name'=>'Starter','price_m'=>'₦150,000','price_a'=>'₦120,000','desc'=>'Get your product designed right with wireframes, user flows, and a clean prototype.','features'=>['Up to 5 Screens','Wireframes & User Flows','Interactive Prototype (Figma)','Mobile-First Design','2 Revision Rounds','Developer Handoff Notes'],'cta'=>'btn-secondary','link'=>'contact.php?package=UIUX+Starter'],
            ['name'=>'Growth','price_m'=>'₦350,000','price_a'=>'₦280,000','desc'=>'A thorough UX process with research, design system, and high-fidelity screens.','features'=>['Everything in Starter','Up to 15 Screens','UX Research & User Personas','Information Architecture','Design System (Components)','Usability Testing Report','3 Revision Rounds'],'cta'=>'btn-secondary','link'=>'contact.php?package=UIUX+Growth'],
            ['name'=>'Premium','price_m'=>'₦700,000','price_a'=>'₦560,000','desc'=>'Full product design from strategy to handoff — research, design, testing, and iteration.','features'=>['Everything in Growth','Up to 30 Screens','Full UX Research Sprint','End-to-End Design System','Micro-Interactions Design','Accessibility Audit','Unlimited Revisions','Priority Response'],'featured'=>true,'cta'=>'btn-accent','link'=>'contact.php?package=UIUX+Premium'],
            ['name'=>'Enterprise','price_m'=>'Custom','price_a'=>'Custom','desc'=>'Enterprise-scale product design for SaaS platforms, fintech apps, and complex digital products.','features'=>['Multi-Platform Design','Design System Governance','User Research Ops','Accessibility Compliance','Design Ops Integration','Dedicated UX Team','Monthly Retainer Options','NDA & Priority SLA'],'cta'=>'btn-primary','link'=>'contact.php?package=UIUX+Enterprise'],
          ],
        ],
        [
          'icon'  => '🎬',
          'title' => 'Motion Design',
          'id'    => 'motion-design',
          'plans' => [
            ['name'=>'Starter','price_m'=>'₦100,000','price_a'=>'₦80,000','desc'=>'Bring your brand to life with a logo animation and one motion deliverable.','features'=>['Logo Animation','1 Animated Social Post','Up to 15 Seconds Duration','HD Export (MP4 + GIF)','2 Revision Rounds','Source File Delivery'],'cta'=>'btn-secondary','link'=>'contact.php?package=Motion+Starter'],
            ['name'=>'Growth','price_m'=>'₦280,000','price_a'=>'₦224,000','desc'=>'A full motion package for brands ready to dominate social and digital platforms.','features'=>['Everything in Starter','3 Motion Design Pieces','Animated Story Templates','Social Media Animated Posts (5)','60-Second Explainer Video','Brand Motion Style Guide','3 Revision Rounds'],'cta'=>'btn-secondary','link'=>'contact.php?package=Motion+Growth'],
            ['name'=>'Premium','price_m'=>'₦600,000','price_a'=>'₦480,000','desc'=>'The complete motion design suite — brand animation, explainer videos, and full social content.','features'=>['Everything in Growth','Full Brand Motion System','Title Sequences & Intros','Animated Infographics','UI/UX Micro-Animations','2-Minute Explainer Video','Unlimited Revisions','Priority Response'],'featured'=>true,'cta'=>'btn-accent','link'=>'contact.php?package=Motion+Premium'],
            ['name'=>'Enterprise','price_m'=>'Custom','price_a'=>'Custom','desc'=>'Large-scale motion production for broadcast, OOH, and enterprise brand campaigns.','features'=>['2D/3D Character Animation','Product Visualisation','Broadcast-Quality Production','Campaign Motion Content','Multi-Platform Delivery','Dedicated Motion Team','Monthly Retainer Options','NDA & Priority SLA'],'cta'=>'btn-primary','link'=>'contact.php?package=Motion+Enterprise'],
          ],
        ],
      ];
      foreach ($pricingServices as $svcIdx => $svc): ?>

      <!-- ══ <?php echo htmlspecialchars($svc['title']); ?> Pricing ══ -->
      <div class="pricing-service-block" id="<?php echo $svc['id']; ?>" style="margin-bottom: 80px;">
        <div class="pricing-service-header reveal" style="display:flex; align-items:center; gap:16px; margin-bottom:40px; padding-bottom:24px; border-bottom:1px solid var(--border);">
          <span style="font-size:2.2rem;" aria-hidden="true"><?php echo $svc['icon']; ?></span>
          <div>
            <h2 style="font-family:var(--font-head); font-size:clamp(1.6rem,3vw,2.2rem); font-weight:800; letter-spacing:-.04em; color:var(--text); margin-bottom:4px;">
              <?php echo htmlspecialchars($svc['title']); ?>
            </h2>
            <p style="color:var(--text-muted); font-size:.9rem;">Choose the plan that fits your project</p>
          </div>
        </div>

        <div class="pricing-grid">
          <?php foreach ($svc['plans'] as $pi => $plan):
            $isFeatured = !empty($plan['featured']);
            $isCustom   = ($plan['price_m'] === 'Custom');
          ?>
          <div class="pricing-card <?php echo $isFeatured ? 'featured' : ''; ?> reveal delay-<?php echo $pi + 1; ?>">
            <?php if ($isFeatured): ?>
            <div class="pricing-badge" aria-label="Most popular">MOST POPULAR</div>
            <?php endif; ?>
            <div class="pricing-name"><?php echo htmlspecialchars($plan['name']); ?></div>
            <div class="pricing-price">
              <?php if ($isCustom): ?>
                <span style="font-size:2rem;">Custom</span>
              <?php else: ?>
                <span data-monthly="<?php echo $plan['price_m']; ?>" data-annual="<?php echo $plan['price_a']; ?>"><?php echo $plan['price_m']; ?></span>
              <?php endif; ?>
            </div>
            <p class="pricing-desc"><?php echo htmlspecialchars($plan['desc']); ?></p>
            <hr class="pricing-divider" />
            <ul class="pricing-features">
              <?php foreach ($plan['features'] as $feat): ?>
              <li class="pricing-feature"><span class="check" aria-hidden="true">✓</span> <?php echo htmlspecialchars($feat); ?></li>
              <?php endforeach; ?>
            </ul>
            <a href="<?php echo $plan['link']; ?>" class="<?php echo $plan['cta']; ?>" style="width:100%; text-align:center; justify-content:center; margin-top:auto;">
              <?php echo $isCustom ? "Let's Talk →" : ($isFeatured ? 'Start Now →' : 'Get Started →'); ?>
            </a>
          </div>
          <?php endforeach; ?>
        </div>
      </div><!-- /.pricing-service-block -->

      <?php endforeach; ?>

    </div>
  </section>

  <!-- ══════════════════════ ADD-ONS ═══════════════════════ -->
  <section class="section" style="background: var(--surface);" aria-labelledby="addons-heading">
    <div class="container">
      <div class="text-center" style="margin-bottom: 56px;">
        <span class="section-tag reveal">À La Carte</span>
        <h2 id="addons-heading" class="section-title reveal">
          Need Something <span class="highlight">Specific?</span>
        </h2>
        <p class="section-subtitle reveal" style="margin: 0 auto;">
          Add individual services to any package or use them as standalone solutions.
        </p>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:20px;">
        <?php
        $addons = [
          ['Logo Design Only',            '₦80,000+',  '🎨'],
          ['Landing Page Design & Dev',   '₦150,000+', '💻'],
          ['Social Media Kit (30 posts)', '₦75,000',   '📱'],
          ['Explainer Video Animation',   '₦200,000+', '🎬'],
          ['Brand Strategy Session',      '₦50,000',   '🧠'],
          ['Monthly Design Retainer',     '₦120,000/m','🔄'],
          ['SEO Audit & Optimisation',    '₦80,000',   '🔍'],
          ['Packaging Design',            '₦120,000+', '📦'],
        ];
        foreach ($addons as $i => $addon): ?>
        <div class="pricing-addon-card reveal delay-<?php echo ($i % 4) + 1; ?>">
          <span style="font-size:1.8rem; flex-shrink:0;" aria-hidden="true"><?php echo $addon[2]; ?></span>
          <div>
            <div style="font-family:var(--font-head); font-weight:700; color:var(--text); margin-bottom:4px;"><?php echo htmlspecialchars($addon[0]); ?></div>
            <div style="font-size:0.95rem; font-weight:700; color:var(--primary);"><?php echo $addon[1]; ?></div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- ══════════════════════ FAQ ════════════════════════════ -->
  <section class="section" aria-labelledby="pricing-faq">
    <div class="container" style="max-width: 780px;">
      <div class="text-center" style="margin-bottom: 56px;">
        <span class="section-tag reveal">Pricing FAQs</span>
        <h2 id="pricing-faq" class="section-title reveal">
          Questions About <span class="highlight">Pricing</span>
        </h2>
      </div>

      <?php
      $faqs = [
        ['Do you accept payment in installments?', 'Yes. We require a 50% deposit to begin, and the remaining balance is due upon completion. For Enterprise projects, custom payment schedules are available.'],
        ['Are prices in Nigerian Naira?', 'Yes, all listed prices are in NGN (Nigerian Naira). We also accept USD and GBP payments for international clients. Contact us for current exchange rates.'],
        ['What\'s included in the 3-month support?', 'Bug fixes, minor content updates, plugin/software updates, performance monitoring, and unlimited email support. Larger feature requests are quoted separately.'],
        ['Can I upgrade my package later?', 'Absolutely. You can start with a Starter or Growth package and upgrade at any time. We\'ll apply a pro-rata credit toward your upgrade.'],
        ['Do you offer non-profit discounts?', 'Yes, we offer a 20% discount for registered non-profit organisations and social enterprises. Contact us with your NGO registration details.'],
      ];
      foreach ($faqs as $i => $faq): ?>
      <div class="faq-item reveal">
        <div class="faq-question" role="button" tabindex="0" aria-expanded="false">
          <?php echo htmlspecialchars($faq[0]); ?>
          <span class="faq-icon" aria-hidden="true">+</span>
        </div>
        <div class="faq-answer" role="region"><p><?php echo htmlspecialchars($faq[1]); ?></p></div>
      </div>
      <?php endforeach; ?>

    </div>
  </section>

  <!-- CTA -->
  <section class="section" style="background:var(--surface); text-align:center;" aria-labelledby="pricing-cta">
    <div class="container" style="max-width:640px;">
      <span class="section-tag reveal" style="display:inline-flex; justify-content:center;">Not Sure?</span>
      <h2 id="pricing-cta" class="section-title reveal">Let's Build a Custom<br><span class="highlight">Package for You</span></h2>
      <p class="section-subtitle reveal" style="text-align:center; margin:0 auto 40px;">
        Every business is unique. Book a free call and we'll create a bespoke proposal tailored to your exact needs and budget.
      </p>
      <div class="hero-actions reveal" style="justify-content:center;">
        <a href="contact.php" class="btn-primary" style="padding:16px 36px;">Get Custom Quote</a>
        <a href="https://wa.me/2347084321204" target="_blank" rel="noopener" class="btn-secondary" style="padding:16px 36px;">💬 WhatsApp Us</a>
      </div>
    </div>
  </section>

</main>

<script>
// Pricing toggle visual feedback
document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.getElementById('pricing-toggle');
  var track  = document.getElementById('toggle-track');
  var thumb  = document.getElementById('toggle-thumb');
  if(!toggle) return;
  toggle.addEventListener('change', function(){
    if(toggle.checked){
      track.style.background = 'var(--primary)';
      thumb.style.transform  = 'translateX(24px)';
    } else {
      track.style.background = 'var(--border)';
      thumb.style.transform  = 'translateX(0)';
    }
  });
});
</script>



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
