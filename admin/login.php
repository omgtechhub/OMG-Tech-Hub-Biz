<?php
if (session_status() === PHP_SESSION_NONE) session_start();
require_once dirname(__DIR__) . '/includes/config.php';

if (!empty($_SESSION[ADMIN_SESSION_KEY])) {
    header('Location: dashboard.php'); exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = trim($_POST['username'] ?? '');
    $pass = trim($_POST['password'] ?? '');
    if ($user === ADMIN_USER && password_verify($pass, ADMIN_PASS_HASH)) {
        session_regenerate_id(true);
        $_SESSION[ADMIN_SESSION_KEY] = true;
        $_SESSION['omg_admin_user']  = $user;
        header('Location: dashboard.php'); exit;
    }
    $error = 'Invalid username or password.';
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Admin Login — OMG Tech Hub</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<link rel="stylesheet" href="assets/admin.css">
<script>(function(){var t=localStorage.getItem('omg_admin_theme')||'light';document.documentElement.setAttribute('data-theme',t);})();</script>
</head>
<body>
<div class="login-page">
  <div class="login-card">
    <div class="login-logo">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="9" fill="#e63322"/>
        <text x="18" y="25" text-anchor="middle" font-family="Inter,sans-serif" font-weight="900" font-size="16" fill="white">OMG</text>
      </svg>
      <div class="login-brand">Tech Hub</div>
    </div>
    <p class="login-sub">Sign in to manage your blog</p>

    <?php if ($error): ?>
    <div class="alert alert-error"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <form method="post" autocomplete="on">
      <div class="form-group">
        <label class="form-label" for="username">Username</label>
        <input type="text" id="username" name="username" class="form-input"
               autocomplete="username" required autofocus
               placeholder="Enter your username">
      </div>
      <div class="form-group" style="margin-bottom:28px;">
        <label class="form-label" for="password">Password</label>
        <div style="position:relative;">
          <input type="password" id="password" name="password" class="form-input"
                 autocomplete="current-password" required
                 placeholder="Enter your password"
                 style="padding-right:44px;">
          <button type="button" id="toggle-pw" aria-label="Toggle password visibility"
            style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--text-3);padding:4px;display:flex;align-items:center;transition:color .2s;"
            onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--text-3)'"
            onclick="var i=document.getElementById('password'),show=i.type==='password';i.type=show?'text':'password';this.querySelector('.eye-on').style.display=show?'none':'block';this.querySelector('.eye-off').style.display=show?'block':'none';">
            <svg class="eye-on" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:block;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="eye-off" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="display:none;"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          </button>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-lg" style="width:100%;justify-content:center;">
        Sign In
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </form>

    <div style="margin-top:24px;text-align:center;">
      <a href="<?php echo SITE_URL; ?>/dist/" style="font-size:.8rem;color:var(--text-3);transition:color .2s;"
         onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='var(--text-3)'">
        ← Back to website
      </a>
    </div>
  </div>
</div>
</body>
</html>
