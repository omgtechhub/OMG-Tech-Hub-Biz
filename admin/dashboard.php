<?php
if (session_status() === PHP_SESSION_NONE) session_start();
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';

$all    = posts_all(false);
$pub    = array_filter($all, fn($p) => ($p['status'] ?? '') === 'published');
$draft  = array_filter($all, fn($p) => ($p['status'] ?? '') === 'draft');
$platforms = array_count_values(array_column($all, 'platform'));

$allProjects   = portfolio_all(false);
$pubProjects   = array_filter($allProjects, fn($p) => ($p['status'] ?? '') === 'published');
$draftProjects = array_filter($allProjects, fn($p) => ($p['status'] ?? '') === 'draft');

$msg = $_SESSION['flash']     ?? ''; unset($_SESSION['flash']);
$err = $_SESSION['flash_err'] ?? ''; unset($_SESSION['flash_err']);

$platform_labels = [
  'linkedin'  => 'LinkedIn',
  'instagram' => 'Instagram',
  'twitter'   => 'X/Twitter',
  'youtube'   => 'YouTube',
  'facebook'  => 'Facebook',
  'general'   => 'General',
];

$category_badges = [
  'Graphic Design'   => 'graphic-design',
  'Web Development'  => 'web-development',
  'UI/UX Design'     => 'ui-ux-design',
  'Motion Design'    => 'motion-design',
];

layout_head('Dashboard');
layout_sidebar('dashboard');
?>
<div class="admin-topbar">
  <div class="topbar-title">Dashboard</div>
  <div class="topbar-actions">
    <a href="create-post.php" class="btn btn-ghost btn-sm">
      <?php echo svg_plus(); ?> New Post
    </a>
    <a href="upload_portfolio.php" class="btn btn-primary btn-sm">
      <?php echo svg_plus(); ?> Upload Portfolio
    </a>
  </div>
</div>

<div class="admin-content">
  <?php if($msg): ?><div class="alert alert-success"><?php echo htmlspecialchars($msg); ?></div><?php endif; ?>
  <?php if($err): ?><div class="alert alert-error"><?php echo htmlspecialchars($err); ?></div><?php endif; ?>

  <!-- Stats -->
  <div class="stat-grid">
    <div class="stat-card">
      <div class="stat-card-icon">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
      </div>
      <div class="stat-card-num"><?php echo count($all); ?></div>
      <div class="stat-card-label">Total Posts</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <div class="stat-card-num" style="color:#16a34a;"><?php echo count($pub); ?></div>
      <div class="stat-card-label">Published</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="stat-card-num" style="color:var(--text-3);"><?php echo count($draft); ?></div>
      <div class="stat-card-label">Drafts</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-icon">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
      </div>
      <div class="stat-card-num"><?php echo count($platforms); ?></div>
      <div class="stat-card-label">Platforms</div>
    </div>
  </div>

  <!-- Posts table -->
  <div class="admin-card" style="padding:0;overflow:hidden;">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border);">
      <div class="admin-card-title" style="margin:0;border:none;padding:0;">All Posts</div>
      <a href="create-post.php" class="btn btn-ghost btn-sm"><?php echo svg_plus(); ?> Add</a>
    </div>

    <?php if (empty($all)): ?>
    <div style="padding:60px 24px;text-align:center;">
      <svg width="40" height="40" fill="none" stroke="var(--text-4)" stroke-width="1.5" viewBox="0 0 24 24" style="margin:0 auto 14px;"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      <p style="color:var(--text-3);font-size:.9rem;margin-bottom:16px;">No posts yet.</p>
      <a href="create-post.php" class="btn btn-primary btn-sm">Create your first post →</a>
    </div>
    <?php else: ?>
    <div style="overflow-x:auto;">
    <table class="admin-table">
      <thead>
        <tr><th>Post</th><th>Platform</th><th>Status</th><th>Date</th><th>Actions</th></tr>
      </thead>
      <tbody>
      <?php foreach ($all as $p): ?>
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:12px;">
            <?php if (!empty($p['image'])): ?>
              <img class="post-thumb" src="../<?php echo htmlspecialchars($p['image']); ?>" alt="">
            <?php else: ?>
              <div class="post-thumb-placeholder">📝</div>
            <?php endif; ?>
            <div>
              <div style="font-weight:600;font-size:.875rem;max-width:300px;line-height:1.35;"><?php echo htmlspecialchars($p['title']); ?></div>
              <?php if (!empty($p['excerpt'])): ?>
              <div style="font-size:.76rem;color:var(--text-3);margin-top:2px;max-width:300px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"><?php echo htmlspecialchars($p['excerpt']); ?></div>
              <?php endif; ?>
            </div>
          </div>
        </td>
        <td><span class="badge badge-<?php echo htmlspecialchars($p['platform'] ?? 'general'); ?>"><?php echo htmlspecialchars($platform_labels[$p['platform']] ?? ucfirst($p['platform'] ?? '')); ?></span></td>
        <td><span class="badge badge-<?php echo htmlspecialchars($p['status'] ?? 'draft'); ?>"><?php echo ucfirst($p['status'] ?? 'draft'); ?></span></td>
        <td style="color:var(--text-3);font-size:.8rem;white-space:nowrap;"><?php echo !empty($p['created_at']) ? date('M d, Y', strtotime($p['created_at'])) : '—'; ?></td>
        <td>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <a href="edit-post.php?id=<?php echo urlencode($p['id']); ?>" class="btn btn-ghost btn-sm"><?php echo svg_edit(); ?> Edit</a>
            <?php if (($p['status'] ?? '') === 'published'): ?>
            <a href="<?php echo SITE_URL; ?>/dist/#/blog/<?php echo urlencode($p['slug']); ?>" target="_blank" class="btn btn-ghost btn-sm"><?php echo svg_view(); ?> View</a>
            <?php endif; ?>
            <form method="post" action="process.php" onsubmit="return confirm('Delete this post permanently?');" style="display:inline;">
              <input type="hidden" name="action" value="delete">
              <input type="hidden" name="id" value="<?php echo htmlspecialchars($p['id']); ?>">
              <button type="submit" class="btn btn-danger btn-sm"><?php echo svg_trash(); ?></button>
            </form>
          </div>
        </td>
      </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    </div>
    <?php endif; ?>
  </div>

  <!-- Portfolio section -->
  <div id="portfolio" style="scroll-margin-top:24px;">
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-card-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </div>
        <div class="stat-card-num"><?php echo count($allProjects); ?></div>
        <div class="stat-card-label">Total Projects</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <div class="stat-card-num" style="color:#16a34a;"><?php echo count($pubProjects); ?></div>
        <div class="stat-card-label">Published</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <div class="stat-card-num" style="color:var(--text-3);"><?php echo count($draftProjects); ?></div>
        <div class="stat-card-label">Drafts</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
        </div>
        <div class="stat-card-num"><?php echo count(PORTFOLIO_CATEGORIES); ?></div>
        <div class="stat-card-label">Categories</div>
      </div>
    </div>

    <div class="admin-card" style="padding:0;overflow:hidden;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border);">
        <div class="admin-card-title" style="margin:0;border:none;padding:0;">Portfolio Projects <span style="color:var(--text-3);font-weight:500;">— uploaded via admin</span></div>
        <a href="upload_portfolio.php" class="btn btn-ghost btn-sm"><?php echo svg_plus(); ?> Add</a>
      </div>

      <?php if (empty($allProjects)): ?>
      <div style="padding:60px 24px;text-align:center;">
        <svg width="40" height="40" fill="none" stroke="var(--text-4)" stroke-width="1.5" viewBox="0 0 24 24" style="margin:0 auto 14px;"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <p style="color:var(--text-3);font-size:.9rem;margin-bottom:16px;">No projects uploaded yet.<br>Existing portfolio cards on the site come from the codebase — this table only shows projects added through the admin panel.</p>
        <a href="upload_portfolio.php" class="btn btn-primary btn-sm">Upload your first project →</a>
      </div>
      <?php else: ?>
      <div style="overflow-x:auto;">
      <table class="admin-table">
        <thead>
          <tr><th>Project</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
        <?php foreach ($allProjects as $p): ?>
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:12px;">
              <?php if (!empty($p['image'])): ?>
                <img class="post-thumb" src="../<?php echo htmlspecialchars($p['image']); ?>" alt="">
              <?php else: ?>
                <div class="post-thumb-placeholder">🖼️</div>
              <?php endif; ?>
              <div>
                <div style="font-weight:600;font-size:.875rem;max-width:300px;line-height:1.35;"><?php echo htmlspecialchars($p['title']); ?></div>
                <div style="font-size:.76rem;color:var(--text-3);margin-top:2px;"><?php echo htmlspecialchars($p['client'] ?? ''); ?><?php echo !empty($p['year']) ? ' · ' . htmlspecialchars((string)$p['year']) : ''; ?></div>
              </div>
            </div>
          </td>
          <td><span class="badge badge-<?php echo htmlspecialchars($category_badges[$p['category']] ?? 'general'); ?>"><?php echo htmlspecialchars($p['category'] ?? ''); ?></span></td>
          <td><span class="badge badge-<?php echo htmlspecialchars($p['status'] ?? 'draft'); ?>"><?php echo ucfirst($p['status'] ?? 'draft'); ?></span></td>
          <td style="color:var(--text-3);font-size:.8rem;white-space:nowrap;"><?php echo !empty($p['created_at']) ? date('M d, Y', strtotime($p['created_at'])) : '—'; ?></td>
          <td>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              <a href="edit_portfolio.php?id=<?php echo urlencode($p['id']); ?>" class="btn btn-ghost btn-sm"><?php echo svg_edit(); ?> Edit</a>
              <?php if (($p['status'] ?? '') === 'published'): ?>
              <a href="<?php echo SITE_URL; ?>/dist/#/portfolio/<?php echo urlencode($p['slug']); ?>" target="_blank" class="btn btn-ghost btn-sm"><?php echo svg_view(); ?> View</a>
              <?php endif; ?>
              <form method="post" action="process.php" onsubmit="return confirm('Delete this project permanently?');" style="display:inline;">
                <input type="hidden" name="action" value="delete_project">
                <input type="hidden" name="id" value="<?php echo htmlspecialchars($p['id']); ?>">
                <button type="submit" class="btn btn-danger btn-sm"><?php echo svg_trash(); ?></button>
              </form>
            </div>
          </td>
        </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
      </div>
      <?php endif; ?>
    </div>
  </div>
</div>
<?php layout_foot(); ?>
