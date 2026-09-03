<?php
/**
 * OMG Tech Hub — Shared <head> + Loader
 * Usage: include __DIR__ . '/includes/header.php';
 * Set $pageTitle, $pageDesc, $pageCurrent before including.
 */
$pageTitle   = isset($pageTitle)   ? $pageTitle   : 'OMG Tech Hub | Premium Creative-Tech Agency';
$pageDesc    = isset($pageDesc)    ? $pageDesc    : 'OMG Tech Hub is a premium creative-tech agency in Benin City, Nigeria. We build brands, websites, UI/UX, motion graphics & digital experiences.';
$pageCurrent = isset($pageCurrent) ? $pageCurrent : 'home';
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="<?php echo htmlspecialchars($pageDesc); ?>" />
  <meta name="keywords" content="creative agency, branding, web development, UI UX design, motion graphics, Nigeria, Benin City, OMG Tech Hub" />
  <meta name="author" content="OMG Tech Hub" />
  <meta property="og:title"       content="<?php echo htmlspecialchars($pageTitle); ?>" />
  <meta property="og:description" content="<?php echo htmlspecialchars($pageDesc); ?>" />
  <meta property="og:type"        content="website" />
  <meta property="og:image"       content="assets/images/og-image.jpg" />
  <meta name="twitter:card"       content="summary_large_image" />
  <title><?php echo htmlspecialchars($pageTitle); ?></title>

  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Clash Display (headings) + Satoshi (body) — matching reference site -->
  <link rel="preconnect" href="https://api.fontshare.com" crossorigin>
  <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,800&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <noscript>
    <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet">
    <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700,800&display=swap" rel="stylesheet">
  </noscript>
  <!-- Inter as fallback via Google Fonts — deferred, non-blocking -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="assets/css/style.css" />

  <!-- Favicon (inline SVG favicon) -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%237A0D0D'/><text y='24' x='3' font-size='20' font-family='sans-serif' font-weight='bold' fill='%23F5B301'>O</text></svg>" />

  <!-- Theme init script — runs before paint to avoid flash -->
  <script>
    (function(){
      var t = localStorage.getItem('omg_theme');
      if(t) document.documentElement.setAttribute('data-theme', t);
    })();
  </script>
</head>
<body>

<!-- Custom Cursor -->
<div class="cursor-dot"  aria-hidden="true"></div>
<div class="cursor-ring" aria-hidden="true"></div>

<!-- Page Transition Overlay -->
<div class="page-transition" aria-hidden="true">
  <div class="pt-logo"><span class="pt-red">OMG</span> <span>Tech</span> <span class="pt-gold">Hub</span></div>
</div>

<?php if ($pageCurrent === 'home'): ?>
<!-- Intro Loader (homepage only) -->
<div id="intro-loader" role="status" aria-label="Loading OMG Tech Hub">
  <div class="loader-logo">
    <span class="omg-red">OMG</span> <span>Tech</span> <span class="omg-yellow">Hub</span>
  </div>
  <div class="loader-bar">
    <div class="loader-bar-fill"></div>
  </div>
  <p class="loader-tagline">Premium Creative-Tech Agency · Benin City, Nigeria</p>
</div>
<?php endif; ?>
