<?php
/**
 * OMG Tech Hub — Single Blog Post Reader
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';

$slug = trim($_GET['slug'] ?? '');
$post = $slug ? post_by_slug($slug) : null;

// 404 if post not found or not published
if (!$post || empty($post['published'])) {
    http_response_code(404);
    $pageTitle   = '404 — Post Not Found | OMG Tech Hub';
    $pageDesc    = 'This blog post could not be found.';
    $pageCurrent = 'blog';
    include __DIR__ . '/includes/header.php';
    include __DIR__ . '/includes/navbar.php';
    echo '<main id="main-content"><div class="container" style="text-align:center;padding:160px 0 80px;"><div style="font-size:4rem;margin-bottom:20px;">📄</div><h1 style="font-family:var(--font-head);font-size:2.5rem;font-weight:800;margin-bottom:16px;">Post Not Found</h1><p style="color:var(--text-muted);margin-bottom:32px;">This article may have been removed or the link may be broken.</p><a href="blog.php" class="btn-primary">← Back to Blog</a></div></main>';
    include __DIR__ . '/includes/footer.php';
    exit;
}

// Get related posts (same category, excluding current)
$allPosts    = posts_all(true);
$related     = array_filter($allPosts, fn($p) => $p['category'] === $post['category'] && $p['id'] !== $post['id']);
$related     = array_slice(array_values($related), 0, 3);

$pageTitle   = htmlspecialchars($post['title']) . ' | OMG Tech Hub Blog';
$pageDesc    = htmlspecialchars($post['excerpt']);
$pageCurrent = 'blog';

include __DIR__ . '/includes/header.php';
include __DIR__ . '/includes/navbar.php';
?>

<main id="main-content">

  <!-- ══════════════════════════════════════════════════════
       POST HERO
       ══════════════════════════════════════════════════════ -->
  <section style="padding:140px 0 0;position:relative;overflow:hidden;" aria-label="Post header">
    <div class="hero-orb orb-1" style="opacity:.1;" aria-hidden="true"></div>
    <div class="container" style="max-width:800px;">

      <!-- Breadcrumb -->
      <nav class="post-breadcrumb" aria-label="Breadcrumb">
        <a href="index.php">Home</a>
        <span aria-hidden="true">›</span>
        <a href="blog.php">Blog</a>
        <span aria-hidden="true">›</span>
        <span><?php echo htmlspecialchars($post['category'] ?? 'Article'); ?></span>
      </nav>

      <!-- Category + meta -->
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap;">
        <span class="blog-cat"><?php echo htmlspecialchars($post['category'] ?? ''); ?></span>
        <span style="color:var(--text-muted);font-size:.82rem;"><?php echo (int)($post['read_time'] ?? 5); ?> min read</span>
        <span style="color:var(--text-muted);font-size:.82rem;">·</span>
        <time datetime="<?php echo date('Y-m-d', strtotime($post['created_at'] ?? 'now')); ?>" style="color:var(--text-muted);font-size:.82rem;">
          <?php echo date('F j, Y', strtotime($post['created_at'] ?? 'now')); ?>
        </time>
      </div>

      <!-- Title -->
      <h1 style="font-family:var(--font-head);font-size:clamp(2rem,5vw,3.2rem);font-weight:800;letter-spacing:-.05em;line-height:1.1;color:var(--text);margin-bottom:20px;">
        <?php echo htmlspecialchars($post['title']); ?>
      </h1>

      <!-- Excerpt -->
      <p style="font-size:1.1rem;color:var(--text-muted);line-height:1.75;max-width:680px;margin-bottom:36px;">
        <?php echo htmlspecialchars($post['excerpt']); ?>
      </p>

      <!-- Author -->
      <div style="display:flex;align-items:center;gap:14px;padding:20px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
        <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:1rem;flex-shrink:0;" aria-hidden="true">
          <?php echo strtoupper(substr($post['author'] ?? 'OMG', 0, 2)); ?>
        </div>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:.95rem;color:var(--text);"><?php echo htmlspecialchars($post['author'] ?? 'OMG Tech Hub'); ?></div>
          <div style="font-size:.8rem;color:var(--text-muted);"><?php echo htmlspecialchars($post['author_role'] ?? ''); ?></div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="post-share-btn"
                  onclick="navigator.clipboard?.writeText(location.href);this.textContent='Copied!';setTimeout(()=>this.textContent='Share',2000);">
            Share
          </button>
          <a href="https://wa.me/?text=<?php echo urlencode($post['title'] . ' — ' . SITE_URL . '/blog-post.php?slug=' . $post['slug']); ?>"
             target="_blank" rel="noopener"
             style="padding:8px 16px;background:rgba(37,211,102,.1);border:1px solid rgba(37,211,102,.25);border-radius:50px;font-size:.8rem;font-weight:600;color:#25D366;display:inline-flex;align-items:center;gap:5px;">
            💬 Share
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════════════
       COVER IMAGE
       ══════════════════════════════════════════════════════ -->
  <div style="padding:48px 0 0;" aria-hidden="true">
    <div class="container" style="max-width:900px;">
      <div style="height:400px;border-radius:24px;background:<?php echo htmlspecialchars($post['cover_gradient'] ?? 'linear-gradient(135deg,#7A0D0D,#F5B301)'); ?>;position:relative;overflow:hidden;">
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
          <div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.2);"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════════════════════
       POST CONTENT
       ══════════════════════════════════════════════════════ -->
  <article style="padding:64px 0 80px;">
    <div class="container" style="max-width:740px;">
      <div class="post-content" style="
        font-size:1.05rem;
        line-height:1.9;
        color:var(--text);
      ">
        <?php
        // Sanitize the HTML content - allow safe tags
        $allowedTags = '<p><br><strong><em><u><s><h2><h3><h4><ul><ol><li><blockquote><code><pre><a><hr>';
        $clean = strip_tags($post['content'], $allowedTags);
        echo $clean;
        ?>
      </div>

      <!-- Post footer -->
      <div style="margin-top:64px;padding-top:40px;border-top:1px solid var(--border);">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;">
          <div>
            <div style="font-size:.8rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px;">Filed Under</div>
            <span class="blog-cat"><?php echo htmlspecialchars($post['category'] ?? ''); ?></span>
          </div>
          <div style="display:flex;gap:10px;">
            <a href="blog.php" class="btn-secondary" style="padding:11px 24px;font-size:.88rem;">← Back to Blog</a>
            <a href="contact.php" class="btn-primary" style="padding:11px 24px;font-size:.88rem;">
              <span>Work With Us</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>

  <!-- ══════════════════════════════════════════════════════
       RELATED POSTS
       ══════════════════════════════════════════════════════ -->
  <?php if (!empty($related)): ?>
  <section class="section" style="background:var(--surface);padding-top:72px;padding-bottom:80px;" aria-labelledby="related-heading">
    <div class="container">
      <h2 id="related-heading" style="font-family:var(--font-head);font-size:1.5rem;font-weight:800;letter-spacing:-.04em;margin-bottom:36px;">
        More in <span style="color:var(--primary);"><?php echo htmlspecialchars($post['category'] ?? 'Design'); ?></span>
      </h2>
      <div class="blog-grid">
        <?php foreach ($related as $i => $rp): ?>
        <article class="blog-card reveal delay-<?php echo $i+1; ?>">
          <a href="blog-post.php?slug=<?php echo urlencode($rp['slug']); ?>" class="blog-thumb-wrap" aria-label="<?php echo htmlspecialchars($rp['title']); ?>">
            <div class="blog-thumb-bg" style="background:<?php echo htmlspecialchars($rp['cover_gradient'] ?? 'linear-gradient(135deg,#7A0D0D,#F5B301)'); ?>;width:100%;height:100%;"></div>
            <span class="blog-cat-badge"><?php echo htmlspecialchars($rp['category'] ?? ''); ?></span>
          </a>
          <div class="blog-body">
            <div class="blog-meta">
              <time datetime="<?php echo date('Y-m-d', strtotime($rp['created_at'] ?? 'now')); ?>"><?php echo date('M j, Y', strtotime($rp['created_at'] ?? 'now')); ?></time>
              <span>·</span>
              <span><?php echo (int)($rp['read_time'] ?? 5); ?> min read</span>
            </div>
            <h3 class="blog-title"><a href="blog-post.php?slug=<?php echo urlencode($rp['slug']); ?>"><?php echo htmlspecialchars($rp['title']); ?></a></h3>
            <p class="blog-excerpt"><?php echo htmlspecialchars($rp['excerpt']); ?></p>
            <a href="blog-post.php?slug=<?php echo urlencode($rp['slug']); ?>" class="blog-cta">Read Article →</a>
          </div>
        </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
  <?php endif; ?>

  <!-- ══════════════════════════════════════════════════════
       CTA
       ══════════════════════════════════════════════════════ -->
  <section class="section" style="text-align:center;">
    <div class="container" style="max-width:640px;">
      <span class="section-tag reveal" style="display:inline-flex;justify-content:center;">Work With Us</span>
      <h2 class="section-title reveal">Ready to Build Something<br><span class="highlight">Extraordinary?</span></h2>
      <p class="section-subtitle reveal" style="text-align:center;margin:0 auto 36px;">
        Inspired by what you read? Let's apply these principles to your brand.
      </p>
      <div class="hero-actions reveal" style="justify-content:center;">
        <a href="contact.php" class="btn-primary" style="padding:15px 36px;">
          <span>Start Your Project</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="blog.php" class="btn-secondary" style="padding:15px 36px;">More Articles →</a>
      </div>
    </div>
  </section>

</main>

<!-- Post content styles in assets/css/style.css -->


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
