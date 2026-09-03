<?php
/**
 * OMG Tech Hub — Navbar Include
 * Requires $pageCurrent to be set before include.
 */
$pageCurrent = isset($pageCurrent) ? $pageCurrent : '';
$navLinks = [
  'home'      => ['label' => 'Home',      'href' => 'index.php'],
  'about'     => ['label' => 'About',     'href' => 'about.php'],
  'services'  => ['label' => 'Services',  'href' => 'services.php'],
  'portfolio' => ['label' => 'Portfolio', 'href' => 'portfolio.php'],
  'process'   => ['label' => 'Process',   'href' => 'process.php'],
  'pricing'   => ['label' => 'Pricing',   'href' => 'pricing.php'],
  'blog'      => ['label' => 'Blog',      'href' => 'blog.php'],
];
?>

<nav class="navbar" role="navigation" aria-label="Main navigation">
  <!-- Logo -->
  <a href="index.php" class="nav-logo">
  <img src="images/logo-dark.png"  class="logo-dark"  alt="OMG Tech Hub" height="40">
<img src="images/logo-light.png" class="logo-light" alt="OMG Tech Hub" height="40">
</a>

  <!-- Desktop Menu -->
  <ul class="nav-menu" role="list">
    <?php foreach ($navLinks as $key => $link): ?>
      <li>
        <a href="<?php echo htmlspecialchars($link['href']); ?>"
           class="<?php echo ($pageCurrent === $key) ? 'active' : ''; ?>"
           <?php echo ($pageCurrent === $key) ? 'aria-current="page"' : ''; ?>>
          <?php echo htmlspecialchars($link['label']); ?>
        </a>
      </li>
    <?php endforeach; ?>
  </ul>

  <!-- Actions -->
  <div class="nav-actions">
    <!-- Theme Toggle -->
    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark/light mode">
      <span id="theme-icon">🌙</span>
    </button>

    <!-- CTA -->
    <a href="contact.php" class="btn-primary">
      <span>Start a Project</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>

    <!-- Hamburger -->
    <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- Mobile Nav Overlay -->
<div class="mobile-nav-overlay" id="mobile-nav-overlay" aria-hidden="true"></div>
<div class="mobile-nav" id="mobile-nav" role="dialog" aria-label="Mobile navigation" aria-modal="true">
  <button class="mobile-nav-close" id="mobile-nav-close" aria-label="Close menu">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
  </button>
  <?php foreach ($navLinks as $key => $link): ?>
    <a href="<?php echo htmlspecialchars($link['href']); ?>"
       style="animation-delay: <?php echo (array_search($key, array_keys($navLinks)) * 0.06 + 0.05); ?>s"
       class="<?php echo ($pageCurrent === $key) ? 'active' : ''; ?>"
       <?php echo ($pageCurrent === $key) ? 'aria-current="page"' : ''; ?>>
      <?php echo htmlspecialchars($link['label']); ?>
    </a>
  <?php endforeach; ?>
  <a href="contact.php" class="mobile-cta-btn" style="animation-delay:0.48s;">
    Start a Project →
  </a>
</div>
