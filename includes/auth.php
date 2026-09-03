<?php
/**
 * OMG Tech Hub — Admin Auth
 */

function admin_is_logged_in(): bool {
    return !empty($_SESSION[ADMIN_SESSION_KEY]);
}

function admin_require_login(): void {
    if (!admin_is_logged_in()) {
        header('Location: ' . admin_url('index.php') . '?redirect=' . urlencode($_SERVER['REQUEST_URI'] ?? ''));
        exit;
    }
}

function admin_login(string $user, string $pass): bool {
    if ($user === ADMIN_USER && password_verify($pass, ADMIN_PASS_HASH)) {
        session_regenerate_id(true);
        $_SESSION[ADMIN_SESSION_KEY] = [
            'user'    => $user,
            'ip'      => $_SERVER['REMOTE_ADDR'] ?? '',
            'logged_in_at' => time(),
        ];
        return true;
    }
    return false;
}

function admin_logout(): void {
    unset($_SESSION[ADMIN_SESSION_KEY]);
    session_destroy();
}

function admin_url(string $page = ''): string {
    // Works whether admin/ is at root or a subfolder
    $base = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'] ?? '')), '/');
    return $base . '/admin/' . ltrim($page, '/');
}

function admin_csrf_token(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(24));
    }
    return $_SESSION['csrf_token'];
}

function admin_verify_csrf(string $token): bool {
    return !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
