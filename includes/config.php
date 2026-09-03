<?php
require_once __DIR__ . '/env_loader.php';

// ── MySQL Database ────────────────────────────────────────
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'omgtechhub');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');

// ── Admin Credentials ─────────────────────────────────────
define('ADMIN_USER',        getenv('ADMIN_USER') ?: '@OMGadmin');
define('ADMIN_PASS_HASH',   getenv('ADMIN_PASS_HASH') ?: '');
define('ADMIN_SESSION_KEY', getenv('ADMIN_SESSION_KEY') ?: 'omg_admin_auth_v1');

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
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_strict_mode', 1);
    session_start();
}
