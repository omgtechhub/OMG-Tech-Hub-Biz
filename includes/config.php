<?php
require_once __DIR__ . '/env_loader.php';

// ── MySQL Database ────────────────────────────────────────
define('DB_HOST', omg_env('DB_HOST') ?: 'localhost');
define('DB_NAME', omg_env('DB_NAME') ?: 'omgtechhub');
define('DB_USER', omg_env('DB_USER') ?: 'root');
define('DB_PASS', omg_env('DB_PASS') ?: '');

// ── Admin Credentials ─────────────────────────────────────
define('ADMIN_USER',        omg_env('ADMIN_USER') ?: '@OMGadmin');
define('ADMIN_PASS_HASH',   omg_env('ADMIN_PASS_HASH') ?: '');
define('ADMIN_SESSION_KEY', omg_env('ADMIN_SESSION_KEY') ?: 'omg_admin_auth_v1');

// ── Site ──────────────────────────────────────────────────
define('SITE_NAME',  'OMG Tech Hub');
define('SITE_EMAIL', 'omgtechhub@gmail.com');
define('SITE_URL',   'https://omgtechhub.great-site.net');

// ── File Paths ────────────────────────────────────────────
define('DATA_DIR',         dirname(__DIR__) . '/data/');
define('POSTS_FILE',       DATA_DIR . 'posts.json');
define('CONTACTS_FILE',    DATA_DIR . 'contacts.json');
define('NEWSLETTER_FILE',  DATA_DIR . 'newsletter.json');
define('PORTFOLIO_FILE',   DATA_DIR . 'portfolio.json');

// ── Upload Paths ──────────────────────────────────────────
define('UPLOAD_DIR', dirname(__DIR__) . '/uploads/blog/');
define('UPLOAD_URL', 'uploads/blog/');
define('PORTFOLIO_UPLOAD_DIR', dirname(__DIR__) . '/uploads/portfolio/');
define('PORTFOLIO_UPLOAD_URL', 'uploads/portfolio/');

// ── Portfolio Categories ──────────────────────────────────
// Must exactly match the categories used in src/data/projects.js
define('PORTFOLIO_CATEGORIES', ['Graphic Design', 'Web Development', 'UI/UX Design', 'Motion Design']);

// ── Session ───────────────────────────────────────────────
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.use_strict_mode', 1);
    ini_set('session.use_only_cookies', 1);

    // Mark the cookie Secure only when the request really arrived over HTTPS.
    // Forcing it on plain-HTTP local XAMPP would stop the cookie being set at
    // all, and you would never stay logged in.
    $omgHttps = (!empty($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off')
             || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
             || ((string) ($_SERVER['SERVER_PORT'] ?? '') === '443');

    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'httponly' => true,       // JavaScript can never read the session id
        'secure'   => $omgHttps,  // never sent over plain HTTP in production
        'samesite' => 'Lax',      // blocks cross-site POST in modern browsers
    ]);
    session_start();
}
