<?php
function layout_head(string $title): void { ?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title><?php echo htmlspecialchars($title); ?> — OMG Tech Hub Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap" rel="stylesheet"></noscript>
<link rel="stylesheet" href="assets/admin.css">
<script>(function(){var t=localStorage.getItem('omg_admin_theme')||'light';document.documentElement.setAttribute('data-theme',t);})();</script>
</head>
<body>
<div class="sidebar-overlay" id="sidebar-overlay"></div>
<button class="sidebar-toggle" id="sidebar-toggle" aria-label="Open menu" aria-expanded="false">
  <svg id="toggle-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
</button>
<div class="admin-layout">
<?php }

function layout_sidebar(string $active = 'dashboard'): void {
  $nav = [
    'dashboard'         => ['Dashboard',         'dashboard.php',         svg_dash()],
    'create-post'       => ['New Post',          'create-post.php',       svg_plus()],
    'upload-portfolio'  => ['Upload Portfolio',  'upload_portfolio.php',  svg_plus()],
  ]; ?>
  <aside class="admin-sidebar" id="admin-sidebar">
    <div class="sidebar-brand">
      <div class="sidebar-logo">
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="8" fill="#e63322"/>
          <text x="18" y="25" text-anchor="middle" font-family="Inter,sans-serif" font-weight="900" font-size="16" fill="white">OMG</text>
        </svg>
        <div>
          <div class="sidebar-brand-name">Tech Hub</div>
          <div class="sidebar-brand-sub">Admin Panel</div>
        </div>
      </div>
    </div>
    <nav class="sidebar-nav">
      <?php foreach ($nav as $key => [$label, $href, $icon]): ?>
      <a href="<?php echo $href; ?>" class="nav-link <?php echo $active===$key?'active':''; ?>">
        <?php echo $icon; ?>
        <span><?php echo $label; ?></span>
      </a>
      <?php endforeach; ?>
    </nav>
    <div class="sidebar-divider"></div>
    <div class="sidebar-bottom">
      <a href="<?php echo SITE_URL; ?>/dist/" target="_blank" class="nav-link">
        <?php echo svg_eye(); ?> <span>View Website</span>
      </a>
      <button class="nav-link theme-btn" id="theme-toggle-btn" onclick="(function(){var h=document.documentElement;var n=h.getAttribute('data-theme')==='dark'?'light':'dark';h.setAttribute('data-theme',n);localStorage.setItem('omg_admin_theme',n);document.querySelector('.theme-label').textContent=n==='dark'?'Light Mode':'Dark Mode';})()">
        <?php echo svg_moon(); ?> <span class="theme-label">Dark Mode</span>
      </button>
      <a href="logout.php" class="nav-link logout-link">
        <?php echo svg_logout(); ?> <span>Log Out</span>
      </a>
    </div>
  </aside>

  <main class="admin-main">
  <script>
  (function(){
    var t=localStorage.getItem('omg_admin_theme')||'light';
    var btn=document.querySelector('.theme-label');
    if(btn) btn.textContent=t==='dark'?'Light Mode':'Dark Mode';

    var toggle=document.getElementById('sidebar-toggle');
    var icon=document.getElementById('toggle-icon');
    var sidebar=document.getElementById('admin-sidebar');
    var overlay=document.getElementById('sidebar-overlay');
    var H='<path d="M3 12h18M3 6h18M3 18h18"/>';
    var X='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
    function open(){sidebar.classList.add('open');overlay.classList.add('open');document.body.style.overflow='hidden';toggle.setAttribute('aria-expanded','true');icon.innerHTML=X;}
    function close(){sidebar.classList.remove('open');overlay.classList.remove('open');document.body.style.overflow='';toggle.setAttribute('aria-expanded','false');icon.innerHTML=H;}
    if(toggle){
      toggle.addEventListener('click',function(e){e.stopPropagation();sidebar.classList.contains('open')?close():open();});
      overlay.addEventListener('click',close);
      document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
      sidebar.querySelectorAll('nav a').forEach(function(l){l.addEventListener('click',function(){if(window.innerWidth<=900)close();});});
    }
  })();
  </script>
<?php }

function layout_foot(): void { echo '</main></div></body></html>'; }

// SVG icons
function svg_dash():    string { return '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>'; }
function svg_plus():   string { return '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'; }
function svg_eye():    string { return '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'; }
function svg_moon():   string { return '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>'; }
function svg_logout(): string { return '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>'; }
function svg_edit():   string { return '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'; }
function svg_trash():  string { return '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>'; }
function svg_view():   string { return '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>'; }
