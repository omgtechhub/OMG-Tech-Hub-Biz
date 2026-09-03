<?php
/**
 * OMG Tech Hub — Blog / Content Hub
 */
require_once 'includes/icons.php';
require_once 'includes/config.php';
require_once 'includes/db.php';

$pageTitle   = 'Blog — Social Posts & Brand Insights | OMG Tech Hub';
$pageDesc    = 'Explore OMG Tech Hub\'s social media content on graphic design, web development, UI/UX, and motion design — all in one place.';
$pageCurrent = 'blog';
require_once 'includes/header.php';
include __DIR__ . '/includes/navbar.php';

$platforms = [
  'all'       => ['label' => 'All',       'color' => null,      'bg' => null],
  'linkedin'  => ['label' => 'LinkedIn',  'color' => '#0A66C2', 'bg' => 'rgba(10,102,194,0.12)'],
  'instagram' => ['label' => 'Instagram', 'color' => '#E1306C', 'bg' => 'rgba(225,48,108,0.12)'],
  'twitter'   => ['label' => 'Twitter', 'color' => '#111111', 'bg' => 'rgba(0,0,0,0.07)'],
  'youtube'   => ['label' => 'YouTube',   'color' => '#FF0000', 'bg' => 'rgba(255,0,0,0.09)'],
  'facebook'  => ['label' => 'Facebook',  'color' => '#1877F2', 'bg' => 'rgba(24,119,242,0.1)'],
];

$platform_icons = [
  'linkedin'  => icon_linkedin('14px'),
  'instagram' => icon_instagram('14px'),
  'twitter'   => icon_twitter('14px'),
  'youtube'   => icon_youtube('14px'),
  'facebook'  => icon_facebook('14px'),
];

$posts = [];
$db_ok = false;
try {
  $pdo   = db_connect();
  $stmt  = $pdo->query("SELECT * FROM content_hub WHERE status='published' ORDER BY created_at DESC");
  $posts = $stmt->fetchAll();
  $db_ok = true;
} catch (\Throwable $e) { /* DB not ready yet */ }
?>

<main id="main-content">

<!-- ══════════════════════ PAGE HERO ════════════════════ -->
<section class="about-hero section content-page-hero blog-hero" aria-labelledby="blog-hero-heading">
  <div class="about-video-bg">
    <div class="about-video-placeholder has-bg"></div>
  </div>
  <div class="hero-orb orb-1" style="opacity:0.14;" aria-hidden="true"></div>
  <div class="hero-grid" style="opacity:0.3;" aria-hidden="true"></div>
  <div class="container">
    <div>
      <span class="section-tag reveal">Content Hub</span>
      <h1 id="blog-hero-heading" class="page-hero-title reveal">
        Social Posts &amp;<br><span class="line2">Creative Insights</span>
      </h1>
      <p class="section-subtitle reveal">
        Brand design, creative education, and entrepreneurship insights — straight from our social platforms.
      </p>
    </div>
  </div>
</section>

<!-- ══════════════════════ POSTS GRID ════════════════════ -->
<section class="section" aria-label="Content Hub">
  <div class="container">

    <!-- Search -->
    <div style="position:relative;max-width:420px;margin-bottom:24px;">
      <input type="search" id="hub-search" placeholder="Search posts..."
             aria-label="Search posts"
             class="blog-search"
             style="width:100%;padding-right:44px;">
      <span class="blog-search-icon" aria-hidden="true">🔍</span>
    </div>

    <!-- Platform filter tabs -->
    <div class="filter-tabs" id="platform-filters" role="tablist" aria-label="Filter by platform" style="margin-bottom:32px;">
      <?php foreach ($platforms as $key => $p): ?>
      <button class="filter-tab <?php echo $key==='all'?'active':''; ?>"
              data-platform="<?php echo $key; ?>"
              role="tab"
              aria-selected="<?php echo $key==='all'?'true':'false'; ?>">
        <?php if ($key !== 'all') echo $platform_icons[$key] ?? ''; ?>
        <?php echo $p['label']; ?>
      </button>
      <?php endforeach; ?>
    </div>

    <?php if (!$db_ok): ?>
    <!-- DB not connected -->
    <div style="text-align:center;padding:80px 20px;color:var(--text-muted);">
      <div style="font-size:3rem;margin-bottom:16px;">📡</div>
      <h3 style="font-family:var(--font-head);font-size:1.3rem;color:var(--text);margin-bottom:8px;">Content coming soon</h3>
      <p style="font-size:0.9rem;">Posts will appear here once the database is connected.</p>
    </div>

    <?php elseif (empty($posts)): ?>
    <!-- Empty state -->
    <div style="text-align:center;padding:80px 20px;color:var(--text-muted);">
      <div style="font-size:3rem;margin-bottom:16px;">✨</div>
      <h3 style="font-family:var(--font-head);font-size:1.3rem;color:var(--text);margin-bottom:8px;">No posts yet</h3>
      <p style="font-size:0.9rem;margin-bottom:24px;">Add your first post from the admin dashboard.</p>
      <a href="admin/dashboard.php" class="btn-primary">Go to Admin →</a>
    </div>

    <?php else: ?>

    <!-- Count -->
    <p id="posts-count" style="font-size:0.82rem;color:var(--text-muted);margin-bottom:32px;">
      Showing <strong id="count-num"><?php echo count($posts); ?></strong> post<?php echo count($posts) !== 1 ? 's' : ''; ?>
    </p>

    <!-- Grid -->
    <div class="blog-grid" id="hub-grid">
      <?php foreach ($posts as $i => $post):
        $plt  = $platforms[$post['platform']] ?? $platforms['all'];
        $icon = $platform_icons[$post['platform']] ?? '';
        $img  = !empty($post['image']) ? htmlspecialchars($post['image']) : '';
      ?>
      <article class="blog-card hub-card reveal delay-<?php echo ($i % 3) + 1; ?>"
               data-platform="<?php echo htmlspecialchars($post['platform']); ?>"
               onclick="window.open('<?php echo htmlspecialchars($post['post_url']); ?>','_blank')"
               style="cursor:pointer;">

        <!-- Thumbnail -->
        <div class="blog-thumb-wrap" style="height:210px;">
          <?php if ($img): ?>
            <img src="<?php echo $img; ?>"
                 alt="<?php echo htmlspecialchars($post['title']); ?>"
                 loading="lazy"
                 style="width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s var(--ease);">
          <?php else: ?>
            <div class="blog-thumb-bg"
                 style="background:<?php echo $plt['bg'] ?? 'var(--primary-light)'; ?>;
                        width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
              <span style="color:<?php echo $plt['color'] ?? 'var(--primary)'; ?>;opacity:0.45;width:44px;height:44px;">
                <?php echo $icon ? str_replace('14px','44px',$icon) : '📝'; ?>
              </span>
            </div>
          <?php endif; ?>
          <!-- Platform badge (uses existing blog-cat-badge class) -->
          <span class="blog-cat-badge"
                style="background:<?php echo $plt['bg'] ?? 'rgba(122,13,13,0.85)'; ?>;
                       color:<?php echo $plt['color'] ?? '#fff'; ?>;
                       display:inline-flex;align-items:center;gap:5px;">
            <?php echo $icon; ?>
            <?php echo htmlspecialchars($plt['label']); ?>
          </span>
        </div>

        <!-- Body -->
        <div class="blog-body">
          <div class="blog-meta">
            <time datetime="<?php echo date('Y-m-d', strtotime($post['created_at'])); ?>">
              <?php echo date('M d, Y', strtotime($post['created_at'])); ?>
            </time>
          </div>

          <h3 class="blog-title">
            <a href="<?php echo htmlspecialchars($post['post_url']); ?>"
               target="_blank" rel="noopener"
               onclick="event.stopPropagation()">
              <?php echo htmlspecialchars($post['title']); ?>
            </a>
          </h3>

          <?php if (!empty($post['excerpt'])): ?>
          <p class="blog-excerpt"><?php echo htmlspecialchars($post['excerpt']); ?></p>
          <?php endif; ?>

          <a href="<?php echo htmlspecialchars($post['post_url']); ?>"
             target="_blank" rel="noopener"
             class="blog-cta"
             onclick="event.stopPropagation()">
            View Post →
          </a>
        </div>
      </article>
      <?php endforeach; ?>
    </div>

    <!-- No results -->
    <div id="no-results" style="display:none;text-align:center;padding:60px 20px;color:var(--text-muted);">
      <div style="font-size:2.5rem;margin-bottom:12px;">🔍</div>
      <p>No posts match your search.</p>
    </div>

    <?php endif; ?>
  </div>
</section>

<!-- ══════════════════════ NEWSLETTER ════════════════════ -->
<section class="section" style="background:var(--surface);" aria-labelledby="newsletter-heading">
  <div class="container" style="max-width:640px;text-align:center;">
    <span class="section-tag reveal" style="display:inline-flex;justify-content:center;">Newsletter</span>
    <h2 id="newsletter-heading" class="section-title reveal">
      Get the Best Content<br><span class="highlight">Straight to Your Inbox</span>
    </h2>
    <p class="section-subtitle reveal" style="text-align:center;margin:0 auto 36px;">
      Join 5,000+ creative professionals who get weekly brand design tips, business strategies,
      and behind-the-scenes insights every Friday.
    </p>
    <form id="blog-newsletter-form" class="newsletter-form reveal"
          style="max-width:440px;margin:0 auto;"
          action="newsletter-handler.php" method="post"
          aria-label="Newsletter signup">
      <input type="email" name="email" class="newsletter-input"
             placeholder="your@email.com" required
             aria-label="Email address"
             style="flex:1;font-size:0.95rem;" />
      <input type="hidden" name="source" value="blog" />
      <button type="submit" class="newsletter-btn" id="blog-nl-btn">Subscribe →</button>
    </form>
    <div id="blog-nl-msg" style="display:none;margin-top:12px;font-size:0.88rem;"></div>
    <p style="font-size:0.78rem;color:var(--text-muted);margin-top:16px;" class="reveal">
      ✓ No spam, ever. Unsubscribe anytime.
    </p>
  </div>
</section>

<!-- ══════════════════════ FOOTER CTA ════════════════════ -->
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
document.addEventListener('DOMContentLoaded', function () {
  var cards   = document.querySelectorAll('.hub-card');
  var noRes   = document.getElementById('no-results');
  var countEl = document.getElementById('count-num');

  function applyFilters() {
    var q   = (document.getElementById('hub-search')?.value || '').toLowerCase().trim();
    var plt = document.querySelector('#platform-filters .filter-tab.active')?.dataset.platform || 'all';
    var vis = 0;
    cards.forEach(function (c) {
      var titleMatch   = c.querySelector('.blog-title')?.textContent.toLowerCase().includes(q);
      var excerptMatch = c.querySelector('.blog-excerpt')?.textContent.toLowerCase().includes(q);
      var platMatch    = plt === 'all' || c.dataset.platform === plt;
      var show = (!q || titleMatch || excerptMatch) && platMatch;
      c.style.display = show ? '' : 'none';
      if (show) vis++;
    });
    if (countEl) countEl.textContent = vis;
    if (noRes)   noRes.style.display = vis === 0 ? 'block' : 'none';
  }

  // Platform filter
  document.querySelectorAll('#platform-filters .filter-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#platform-filters .filter-tab').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      applyFilters();
    });
  });

  // Search
  var si = document.getElementById('hub-search');
  if (si) si.addEventListener('input', applyFilters);

  // Newsletter AJAX
  var nlForm = document.getElementById('blog-newsletter-form');
  var nlMsg  = document.getElementById('blog-nl-msg');
  var nlBtn  = document.getElementById('blog-nl-btn');
  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = nlForm.querySelector('input[name="email"]').value;
      nlBtn.disabled = true; nlBtn.textContent = 'Subscribing…';
      fetch('newsletter-handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest' },
        body: 'email=' + encodeURIComponent(email) + '&source=blog'
      }).then(function (r) { return r.json(); }).then(function (d) {
        nlMsg.style.display = 'block';
        nlMsg.style.color   = d.success ? '#25D366' : '#dc2626';
        nlMsg.textContent   = d.message;
        if (d.success) nlForm.reset();
      }).catch(function () {
        nlMsg.style.display = 'block';
        nlMsg.style.color   = '#dc2626';
        nlMsg.textContent   = 'Something went wrong.';
      }).finally(function () {
        nlBtn.disabled = false;
        nlBtn.textContent = 'Subscribe →';
      });
    });
  }
});
</script>

</main>

<?php require_once 'includes/footer.php'; ?>
