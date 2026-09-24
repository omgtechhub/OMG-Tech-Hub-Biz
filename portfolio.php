<?php
$pageTitle   = 'Portfolio | OMG Tech Hub — Premium Creative Work';
$pageDesc    = 'Explore our portfolio of premium creative work — brand identity, web development, UI/UX design, and motion graphics projects that drive real results.';
$pageCurrent = 'portfolio';
include __DIR__ . '/includes/header.php';
include __DIR__ . '/includes/navbar.php';

// Load shared portfolio data
require_once __DIR__ . '/includes/portfolio-data.php';
if (!isset($omgProjects) || !is_array($omgProjects)) {
  $omgProjects = [];
}
?>

<main id="main-content">

  <!-- ══════════════════════════════════════════════════════
       PAGE HERO
       ══════════════════════════════════════════════════════ -->
  <section class="page-hero-section portfolio-hero" style="padding:160px 0 80px;position:relative;overflow:hidden;" aria-labelledby="portfolio-page-heading">
    <div class="about-video-bg">
      <div class="about-video-placeholder has-bg"></div>
    </div>
    <div class="hero-orb orb-1" style="opacity:.12;" aria-hidden="true"></div>
    <div class="hero-orb orb-2" style="opacity:.08;" aria-hidden="true"></div>
    <div class="container" style="position:relative;z-index:2;">
      <span class="section-tag reveal">Our Work</span>
      <h1 id="portfolio-page-heading" class="page-hero-title reveal" style="max-width:700px;">
        Projects That <span class="highlight">Define</span> Standards
      </h1>
      <p class="section-subtitle reveal" style="max-width:560px;margin-bottom:36px;">
        32 premium projects delivered across branding, web, UI/UX, and motion — each one crafted to perform.
      </p>
      <!-- Stats -->
      <div class="portfolio-hero-stats reveal">
        <div>
          <div class="portfolio-hero-stat-num">32</div>
          <div class="portfolio-hero-stat-label">Projects</div>
        </div>
        <div>
          <div class="portfolio-hero-stat-num">4</div>
          <div class="portfolio-hero-stat-label">Disciplines</div>
        </div>
        <div>
          <div class="portfolio-hero-stat-num">150+</div>
          <div class="portfolio-hero-stat-label">Happy Clients</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════════════
       PORTFOLIO GRID
       ══════════════════════════════════════════════════════ -->
  <section class="section" aria-label="Portfolio Gallery">
    <div class="container">

      <!-- Filter Buttons -->
      <div class="omg-portfolio-filters reveal" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:48px;">
        <button class="omg-filter-btn active" data-filter="all">
          All Work <span class="omg-filter-count">32</span>
        </button>
        <button class="omg-filter-btn" data-filter="graphic">
          Graphic Design <span class="omg-filter-count">8</span>
        </button>
        <button class="omg-filter-btn" data-filter="web">
          Web Dev <span class="omg-filter-count">4</span>
        </button>
        <button class="omg-filter-btn" data-filter="uiux">
          UI/UX Design <span class="omg-filter-count">8</span>
        </button>
        <button class="omg-filter-btn" data-filter="motion">
          Motion Design <span class="omg-filter-count">12</span>
        </button>
      </div>

      <!-- Grid -->
      <div class="omg-portfolio-grid" id="omg-portfolio-grid">
        <?php
        $grouped = [];
        foreach ($omgProjects as $i => $p) {
          $grouped[$p['cat']][] = array_merge($p, ['_idx' => $i]);
        }
        $catLabels = [
          'graphic' => 'Graphic Design',
          'web'     => 'Web Development',
          'uiux'    => 'UI / UX Design',
          'motion'  => 'Motion & Video',
        ];
        foreach ($grouped as $cat => $catProjects):
        ?>
          <div class="omg-cat-divider" data-cat="<?php echo $cat; ?>">
            <span><?php echo htmlspecialchars($catLabels[$cat] ?? $cat); ?></span>
          </div>
          <?php foreach ($catProjects as $p):
            $delay = ['','reveal-delay-1','reveal-delay-2','reveal-delay-3'][$p['_idx'] % 4] ?? '';
          ?>
          <article class="omg-portfolio-item reveal <?php echo $delay; ?>"
                   data-category="<?php echo $p['cat']; ?>"
                   data-id="<?php echo $p['id']; ?>"
                   aria-label="View <?php echo htmlspecialchars($p['title']); ?>"
                   tabindex="0">
            <?php if (!empty($p['image'])): ?>
  <img src="<?php echo htmlspecialchars($p['image']); ?>"
       alt="<?php echo htmlspecialchars($p['title']); ?>"
       class="omg-portfolio-img" loading="lazy" />
<?php elseif ($p['cat'] === 'web' && !empty($p['url'])): ?>
  <img src="https://image.thum.io/get/width/800/crop/600/<?php echo urlencode($p['url']); ?>"
       alt="<?php echo htmlspecialchars($p['title']); ?>"
       class="omg-portfolio-img" loading="lazy" />
<?php else: ?>
  <div class="omg-portfolio-img" style="background:<?php echo $p['bg']; ?>;"></div>
<?php endif; ?>
            <div class="omg-portfolio-overlay">
              <div class="omg-portfolio-info">
                <div class="omg-p-cat"><?php echo htmlspecialchars($p['cat_label']); ?></div>
                <div class="omg-p-title"><?php echo htmlspecialchars($p['title']); ?></div>
                <div style="margin-top:10px;font-size:0.76rem;color:rgba(255,255,255,0.7);">Click to view case study →</div>
              </div>
            </div>
          </article>
          <?php endforeach; ?>
        <?php endforeach; ?>
      </div>

      <!-- Empty state -->
      <div id="omg-portfolio-empty" style="display:none;text-align:center;padding:60px 20px;color:var(--text-muted);">
        <div style="font-size:2.5rem;margin-bottom:12px;">🔍</div>
        <p>No projects in this category yet.</p>
      </div>

    </div>
  </section>

  <!-- CTA -->
  <section class="section" style="text-align:center;" aria-labelledby="port-cta-heading">
    <div class="container" style="max-width:700px;">
      <span class="section-tag reveal" style="display:inline-flex;justify-content:center;">Start Your Project</span>
      <h2 id="port-cta-heading" class="section-title reveal">Your Brand Could Be <span class="highlight">Next</span></h2>
      <p class="section-subtitle reveal" style="margin:0 auto 40px;text-align:center;">Ready to create something extraordinary? Let's build a project you'll be proud to show the world.</p>
      <div class="hero-actions reveal" style="justify-content:center;">
        <a href="contact.php" class="btn-primary" style="padding:16px 40px;font-size:1rem;">
          <span>Start Your Project</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="https://wa.me/2347084321204" target="_blank" rel="noopener" class="btn-secondary" style="padding:16px 40px;font-size:1rem;">💬 WhatsApp Us</a>
      </div>
    </div>
  </section>

</main>

<!-- ══════════════════════════════════════════════════════
     CASE STUDY MODAL
     ══════════════════════════════════════════════════════ -->
<div id="omg-case-modal" role="dialog" aria-modal="true" aria-labelledby="omg-modal-title">
  <div class="omg-modal-backdrop" id="omg-modal-backdrop"></div>

  <button class="omg-modal-arrow prev" id="omg-modal-prev" aria-label="Previous project">&#8592;</button>
  <button class="omg-modal-arrow next" id="omg-modal-next" aria-label="Next project">&#8594;</button>

  <div class="omg-modal-panel" id="omg-modal-panel">

    <!-- Image / Iframe -->
    <div class="omg-modal-image-wrap" id="omg-modal-image-wrap">
      <div class="omg-modal-topbar">
        <div class="omg-modal-topbar-left">
          <button class="omg-modal-close" id="omg-modal-close" aria-label="Close">&#x2715;</button>
          <span class="omg-modal-counter" id="omg-modal-counter"></span>
        </div>
        <div class="omg-modal-topbar-right">
          <a class="omg-modal-download" id="omg-modal-download" download aria-label="Download image" title="Download image">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </a>
          <button class="omg-modal-expand" id="omg-modal-expand" aria-label="View full image" title="View full image">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          </button>
        </div>
      </div>
      <div id="omg-modal-img-bg" style="width:100%;height:100%;"></div>
      <div id="omg-modal-video-wrap" style="display:none;position:absolute;inset:0;z-index:2;background:#000;">
        <iframe id="omg-modal-video-iframe" src="" style="width:100%;height:100%;border:none;" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div id="omg-modal-iframe-wrap" style="display:none;position:absolute;inset:0;z-index:1;background:#fff;">
        <iframe id="omg-modal-iframe" src="" style="width:100%;height:100%;border:none;" loading="lazy"></iframe>
        <div id="omg-iframe-blocker" style="position:absolute;inset:0;z-index:2;cursor:pointer;" title="Click to open site in new tab"></div>
      </div>
      <div class="omg-modal-img-overlay">
        <span id="omg-modal-cat-badge" class="omg-modal-cat-badge"></span>
      </div>
    </div>

    <!-- Body -->
    <div class="omg-modal-body">
      <div class="omg-modal-header">
        <h2 id="omg-modal-title" class="omg-modal-title"></h2>
        <p id="omg-modal-tagline" class="omg-modal-tagline"></p>
      </div>

      <div class="omg-case-sections">
        <div class="omg-case-section">
          <div class="omg-case-label">&#128203; The Brief</div>
          <p id="omg-modal-brief"></p>
        </div>
        <div class="omg-case-section">
          <div class="omg-case-label">&#9888; The Problem</div>
          <p id="omg-modal-problem"></p>
        </div>
        <div class="omg-case-section">
          <div class="omg-case-label">&#128296; The Process</div>
          <p id="omg-modal-process"></p>
        </div>
        <div class="omg-case-section">
          <div class="omg-case-label">&#10003; The Solution</div>
          <p id="omg-modal-solution"></p>
        </div>
        <div class="omg-case-section">
          <div class="omg-case-label">&#128230; The Output</div>
          <p id="omg-modal-output"></p>
        </div>
      </div>

      <div class="omg-modal-actions">
        <a href="contact.php" class="btn-primary">
          <span>Start a Similar Project</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a id="omg-modal-live-link" href="#" target="_blank" rel="noopener" class="btn-secondary" style="display:none;">
          🌐 Visit Live Site
        </a>
        <button id="omg-modal-share" class="btn-secondary">&#128279; Share</button>
      </div>
      <div id="omg-share-toast"></div>

      <!-- Mobile prev/next -->
      <div class="omg-modal-mobile-nav">
        <button id="omg-modal-mobile-prev">&#8592; Previous</button>
        <button id="omg-modal-mobile-next">Next &#8594;</button>
      </div>
    </div>
  </div>
</div>

<!-- Fullscreen image viewer -->
<div id="omg-img-fullscreen">
  <button id="omg-img-fullscreen-close" aria-label="Close fullscreen">&#x2715;</button>
  <img id="omg-img-fullscreen-img" src="" alt="" />
</div>

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

<!-- Portfolio styles moved to assets/css/style.css -->

<script>
(function(){
  var projects = <?php echo json_encode(array_values($omgProjects)); ?>;
  var current  = 0;
  var currentImgSrc = '';
  var subImages = []; // images belonging to the currently-open project
  var subIndex  = 0;  // which of those is on screen

  var modal    = document.getElementById('omg-case-modal');
  var backdrop = document.getElementById('omg-modal-backdrop');
  var closeBtn = document.getElementById('omg-modal-close');
  var panel    = document.getElementById('omg-modal-panel');
  var prevBtn  = document.getElementById('omg-modal-prev');
  var nextBtn  = document.getElementById('omg-modal-next');
  var savedScroll = 0;

  // ── Filter ────────────────────────────────────────────
  var filterBtns = document.querySelectorAll('.omg-filter-btn');
  var items      = document.querySelectorAll('.omg-portfolio-item');
  var empty      = document.getElementById('omg-portfolio-empty');

  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      var vis = 0;
      items.forEach(function(item){
        var show = f === 'all' || item.dataset.category === f;
        item.style.display = show ? '' : 'none';
        if (show) vis++;
      });
      document.querySelectorAll('.omg-cat-divider').forEach(function(div){
        div.classList.toggle('hidden', !(f === 'all' || div.dataset.cat === f));
      });
      if (empty) empty.style.display = vis === 0 ? 'block' : 'none';
    });
  });

  // ── Open modal ────────────────────────────────────────
  function openModal(idx){
    savedScroll = window.scrollY || window.pageYOffset;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    current = idx;
    var p = projects[idx];
    currentImgSrc = p.image || '';

    var wrap        = document.getElementById('omg-modal-image-wrap');
    var imgBg       = document.getElementById('omg-modal-img-bg');
    var iframeWrap  = document.getElementById('omg-modal-iframe-wrap');
    var iframe      = document.getElementById('omg-modal-iframe');
    var videoWrap   = document.getElementById('omg-modal-video-wrap');
    var videoIframe = document.getElementById('omg-modal-video-iframe');
    var liveLink    = document.getElementById('omg-modal-live-link');

    // Reset all media panels
    imgBg.style.display      = 'block';
    if (iframeWrap)  iframeWrap.style.display  = 'none';
    if (iframe)      iframe.src                = '';
    if (videoWrap)   videoWrap.style.display   = 'none';
    if (videoIframe) videoIframe.src           = '';
    if (liveLink)    liveLink.style.display    = 'none';
    // A real design image gets no fixed ratio — the card just hugs it
    // (set in renderSubImage once it's loaded). Only embeds/placeholders
    // that have no natural size of their own need one forced here.
    if (wrap) wrap.classList.remove('is-embed');

    if (p.cat === 'motion' && p.url) {
      var videoSrc = p.url;
      var ytMatch  = p.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      var vmMatch  = p.url.match(/vimeo\.com\/(\d+)/);
      if (ytMatch)      videoSrc = 'https://www.youtube.com/embed/' + ytMatch[1] + '?autoplay=1&rel=0';
      else if (vmMatch) videoSrc = 'https://player.vimeo.com/video/' + vmMatch[1] + '?autoplay=1';
      if (videoIframe) videoIframe.src        = videoSrc;
      if (videoWrap)   videoWrap.style.display = 'block';
      imgBg.style.display = 'none';
      if (wrap) wrap.classList.add('is-embed');

    } else if (p.cat === 'web' && p.url) {
      if (iframeWrap) iframeWrap.style.display = 'block';
      if (iframe)     iframe.src               = p.url;
      imgBg.style.display = 'none';
      if (liveLink) { liveLink.href = p.url; liveLink.style.display = 'flex'; }
      if (wrap) wrap.classList.add('is-embed');

    } else {
      // A project can carry several images (`images`); fall back to the
      // single `image` field for anything saved before that existed.
      subImages = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : []);
      subIndex  = 0;
      if (subImages.length) {
        imgBg.style.background = 'none';
        renderSubImage(p.title);
      } else {
        imgBg.style.background = p.bg;
        imgBg.innerHTML = '';
        if (wrap) wrap.classList.add('is-embed');
      }
    }

    var dl = document.getElementById('omg-modal-download');
    if (dl) dl.style.display = (subImages.length && p.cat !== 'web') ? 'flex' : 'none';
    var exp = document.getElementById('omg-modal-expand');
    if (exp) exp.style.display = (subImages.length && p.cat !== 'web') ? 'flex' : 'none';
    var ctr = document.getElementById('omg-modal-counter');
    if (ctr) ctr.textContent = (idx + 1) + ' / ' + projects.length;

    document.getElementById('omg-modal-cat-badge').textContent = p.cat_label;
    document.getElementById('omg-modal-title').textContent     = p.title;
    document.getElementById('omg-modal-tagline').textContent   = p.tagline;
    document.getElementById('omg-share-toast').style.display   = 'none';

    var caseSections = document.querySelector('.omg-case-sections');
    if (p.cat === 'motion') {
      if (caseSections) caseSections.style.display = 'none';
    } else {
      if (caseSections) caseSections.style.display = '';
      document.getElementById('omg-modal-brief').textContent    = p.brief    || '';
      document.getElementById('omg-modal-problem').textContent  = p.problem  || '';
      document.getElementById('omg-modal-process').textContent  = p.process  || '';
      document.getElementById('omg-modal-solution').textContent = p.solution || '';
      document.getElementById('omg-modal-output').textContent   = p.output   || '';
    }

    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === projects.length - 1;
    var mPrev = document.getElementById('omg-modal-mobile-prev');
    var mNext = document.getElementById('omg-modal-mobile-next');
    if (mPrev) mPrev.disabled = idx === 0;
    if (mNext) mNext.disabled = idx === projects.length - 1;

    modal.style.display = 'block';
    panel.scrollTop = 0;
  }

  // ── Sub-carousel: cycles a single project's own images, only on click ──
  // Builds the frame from scratch on open; navigation afterward re-uses
  // the same <img> and just fades its src, like the sibling site does.
  function renderSubImage(title){
    var imgBg = document.getElementById('omg-modal-img-bg');
    var src   = subImages[subIndex];
    currentImgSrc = src;

    imgBg.innerHTML = '';
    var img = document.createElement('img');
    img.id  = 'omg-modal-sub-img';
    img.alt = title;
    img.src = src;
    imgBg.appendChild(img);

    if (subImages.length > 1) {
      var navHtml =
        '<button type="button" class="omg-modal-sub-nav omg-modal-sub-prev" onclick="event.stopPropagation();omgModalSubNav(-1)" aria-label="Previous image">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>' +
        '<button type="button" class="omg-modal-sub-nav omg-modal-sub-next" onclick="event.stopPropagation();omgModalSubNav(1)" aria-label="Next image">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg></button>';
      var dotsHtml = '<div class="omg-modal-carousel-dots">' + subImages.map(function(_, i){
        return '<button type="button" class="omg-modal-carousel-dot' + (i === subIndex ? ' active' : '') +
          '" onclick="event.stopPropagation();omgModalSubGo(' + i + ')" aria-label="Go to image ' + (i + 1) + '"></button>';
      }).join('') + '</div>';
      imgBg.insertAdjacentHTML('beforeend', navHtml + dotsHtml);
    }

    var dl = document.getElementById('omg-modal-download');
    if (dl) dl.href = src;
  }

  // Fade-swap to a different image in the same project — click-triggered
  // only, never automatic.
  function updateSubImage(){
    var src = subImages[subIndex];
    currentImgSrc = src;
    var img = document.getElementById('omg-modal-sub-img');
    if (img) {
      img.classList.add('fading');
      setTimeout(function(){
        img.src = src;
        img.classList.remove('fading');
      }, 150);
    }
    document.querySelectorAll('#omg-modal-img-bg .omg-modal-carousel-dot').forEach(function(d, i){
      d.classList.toggle('active', i === subIndex);
    });
    var dl = document.getElementById('omg-modal-download');
    if (dl) dl.href = src;
  }

  window.omgModalSubGo = function(i){
    subIndex = i;
    updateSubImage();
  };
  window.omgModalSubNav = function(dir){
    subIndex = (subIndex + dir + subImages.length) % subImages.length;
    updateSubImage();
  };

  function closeModal(){
    var iframe = document.getElementById('omg-modal-iframe');
    if (iframe) iframe.src = '';
    modal.style.display = 'none';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    window.scrollTo(0, savedScroll);
  }

  // ── Card clicks ───────────────────────────────────────
  items.forEach(function(item){
    item.addEventListener('click', function(){
      var id  = parseInt(item.dataset.id);
      var idx = projects.findIndex(function(p){ return p.id === id; });
      if (idx >= 0) openModal(idx);
    });
    item.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); item.click(); }
    });
  });

  // ── Close ─────────────────────────────────────────────
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e){
    if (modal.style.display !== 'block') return;
    if (e.key === 'Escape')      closeModal();
    if (e.key === 'ArrowLeft'  && current > 0)                   openModal(current - 1);
    if (e.key === 'ArrowRight' && current < projects.length - 1) openModal(current + 1);
  });

  // ── Desktop prev / next ───────────────────────────────
  if (prevBtn) prevBtn.addEventListener('click', function(){ if (current > 0)                   openModal(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function(){ if (current < projects.length - 1) openModal(current + 1); });

  // ── Mobile prev / next ────────────────────────────────
  var mPrev = document.getElementById('omg-modal-mobile-prev');
  var mNext = document.getElementById('omg-modal-mobile-next');
  if (mPrev) mPrev.addEventListener('click', function(){ if (current > 0)                   openModal(current - 1); });
  if (mNext) mNext.addEventListener('click', function(){ if (current < projects.length - 1) openModal(current + 1); });

  // ── Fullscreen ────────────────────────────────────────
  var fs        = document.getElementById('omg-img-fullscreen');
  var fsImg     = document.getElementById('omg-img-fullscreen-img');
  var fsClose   = document.getElementById('omg-img-fullscreen-close');
  var expandBtn = document.getElementById('omg-modal-expand');
  var imgWrap   = document.getElementById('omg-modal-image-wrap');

  if (expandBtn) expandBtn.addEventListener('click', function(){
    if (!currentImgSrc) return;
    fsImg.src = currentImgSrc; fs.classList.add('open');
  });
  if (imgWrap) imgWrap.addEventListener('click', function(e){
    if (e.target.closest('.omg-modal-topbar')) return;
    if (e.target.closest('#omg-modal-iframe-wrap')) return;
    if (!currentImgSrc) return;
    fsImg.src = currentImgSrc; fs.classList.add('open');
  });
  if (fsClose) fsClose.addEventListener('click', function(){ fs.classList.remove('open'); fsImg.src = ''; });
  if (fs)      fs.addEventListener('click', function(e){ if (e.target === fs){ fs.classList.remove('open'); fsImg.src = ''; } });

  // ── Iframe blocker ────────────────────────────────────
  var iframeBlocker = document.getElementById('omg-iframe-blocker');
  if (iframeBlocker) {
    iframeBlocker.addEventListener('click', function(){
      var p = projects[current];
      if (p.url) window.open(p.url, '_blank');
    });
  }

  // ── Share ─────────────────────────────────────────────
  var shareBtn = document.getElementById('omg-modal-share');
  if (shareBtn) shareBtn.addEventListener('click', function(){
    var p     = projects[current];
    var url   = window.location.origin + window.location.pathname + '?project=' + p.id;
    var toast = document.getElementById('omg-share-toast');
    if (navigator.share) {
      navigator.share({ title: p.title + ' — OMG Tech Hub', text: 'Check out this project by OMG Tech Hub: ' + p.title, url: url }).catch(function(){});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function(){
        toast.textContent = '✓ Link copied to clipboard!';
        toast.style.display = 'block';
        setTimeout(function(){ toast.style.display = 'none'; }, 2500);
      });
    }
  });

})();
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>