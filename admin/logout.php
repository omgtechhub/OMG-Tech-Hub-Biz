<?php
// config.php starts the session itself, with hardened cookie parameters —
// they have to match here or the cookie below is not the one we clear.
require_once dirname(__DIR__) . '/includes/config.php';

// Clear the data, then the cookie, then the server-side session.
// session_destroy() on its own leaves the cookie sitting in the browser.
$_SESSION = [];

if (ini_get('session.use_cookies')) {
    $p = session_get_cookie_params();
    setcookie(session_name(), '', [
        'expires'  => time() - 42000,
        'path'     => $p['path']     ?: '/',
        'domain'   => $p['domain']   ?? '',
        'secure'   => $p['secure']   ?? false,
        'httponly' => $p['httponly'] ?? true,
        'samesite' => $p['samesite'] ?? 'Lax',
    ]);
}

session_destroy();

header('Location: login.php');
exit;
