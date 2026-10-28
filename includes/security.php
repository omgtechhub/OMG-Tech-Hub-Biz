<?php
// ─────────────────────────────────────────────────────────────────────────────
//  Shared security helpers  —  OMG Tech Hub
// ─────────────────────────────────────────────────────────────────────────────
//  CSRF tokens, safe image-upload validation, and simple file-backed rate
//  limiting. Requires includes/config.php (session + DATA_DIR) first.
// ─────────────────────────────────────────────────────────────────────────────

// ── CSRF ─────────────────────────────────────────────────────────────────────

function omg_csrf_token(): string {
    if (empty($_SESSION['omg_csrf'])) {
        $_SESSION['omg_csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['omg_csrf'];
}

/** Hidden input to drop inside every state-changing form. */
function omg_csrf_field(): string {
    return '<input type="hidden" name="csrf_token" value="'
         . htmlspecialchars(omg_csrf_token(), ENT_QUOTES) . '">';
}

function omg_csrf_valid(): bool {
    $sent = $_POST['csrf_token'] ?? '';
    $held = $_SESSION['omg_csrf'] ?? '';
    return is_string($sent) && $sent !== '' && $held !== '' && hash_equals($held, $sent);
}

/**
 * Guard a POST handler. A forged cross-site request is stopped before any
 * file is written, moved or deleted. Deliberately plain output — a forged
 * request should learn nothing about the panel behind it.
 */
function omg_csrf_require(): void {
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') return;
    if (omg_csrf_valid()) return;
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    exit("Request rejected: invalid or expired security token.\nGo back, reload the page, and try again.");
}

// ── Uploads ──────────────────────────────────────────────────────────────────
//  The stored extension is derived from the VERIFIED image type, never from
//  the uploaded filename. A GIF/PHP polyglot passes mime_content_type() quite
//  happily, so trusting $_FILES['name'] is how an "image" upload becomes a
//  webshell at uploads/<something>.php.

define('OMG_IMAGE_TYPES', [
    IMAGETYPE_JPEG => 'jpg',
    IMAGETYPE_PNG  => 'png',
    IMAGETYPE_GIF  => 'gif',
    IMAGETYPE_WEBP => 'webp',
]);

/**
 * Returns a safe extension ('jpg'|'png'|'gif'|'webp') for an uploaded file,
 * or null when it is not a usable image of an accepted type.
 *
 * What this DOES guarantee: the name we store never contains anything the
 * uploader chose, and the extension always matches the detected image type.
 * That is what stops uploads/<x>.php existing at all.
 *
 * What it does NOT guarantee: that the bytes contain no PHP. A genuinely
 * valid GIF with a webshell appended after the trailer is still a valid GIF,
 * and the only way to strip it is to re-encode — which this project
 * deliberately does not do, because originals must keep their exact quality.
 * uploads/.htaccess is the control that makes that harmless: nothing in that
 * folder is ever executed, whatever it contains.
 */
function omg_safe_image_ext(string $tmpPath): ?string {
    if ($tmpPath === '' || !is_uploaded_file($tmpPath)) return null;

    $info = @getimagesize($tmpPath);
    if ($info === false || empty($info[2])) return null;

    // getimagesize() is lenient. A file that is just the six bytes "GIF89a"
    // followed by PHP parses as a 15370x28735 "GIF". Real design work is never
    // that size, so bound the dimensions instead of paying to fully decode a
    // 10MB upload (imagecreatefromstring allocates roughly width*height*4
    // bytes, which would blow the memory limit on shared hosting).
    $w = (int) ($info[0] ?? 0);
    $h = (int) ($info[1] ?? 0);
    if ($w < 1 || $h < 1 || $w > 12000 || $h > 12000 || $w * $h > 50000000) return null;

    $types = OMG_IMAGE_TYPES;
    return $types[$info[2]] ?? null;
}

/** Collision-proof filename containing no caller-supplied text. */
function omg_upload_filename(string $prefix, string $ext): string {
    return $prefix . bin2hex(random_bytes(8)) . '.' . $ext;
}

/**
 * Resolve a stored image path (as kept in posts.json / portfolio.json) to an
 * absolute path, but ONLY if it really sits inside one of our upload folders.
 * Returns null for traversal attempts and for anything outside them.
 */
function omg_resolve_upload_path(string $stored): ?string {
    $stored = str_replace('\\', '/', trim($stored));
    if ($stored === '' || strpos($stored, "\0") !== false) return null;

    $root = realpath(dirname(__DIR__));
    if ($root === false) return null;

    $full = realpath($root . '/' . $stored);
    if ($full === false || !is_file($full)) return null;

    $full = str_replace('\\', '/', $full);
    foreach ([UPLOAD_DIR, PORTFOLIO_UPLOAD_DIR] as $dir) {
        $real = realpath($dir);
        if ($real === false) continue;
        $real = rtrim(str_replace('\\', '/', $real), '/') . '/';
        if (strncmp($full, $real, strlen($real)) === 0) return $full;
    }
    return null;
}

/** Delete a stored upload, ignoring anything that is not actually ours. */
function omg_delete_upload(string $stored): bool {
    $path = omg_resolve_upload_path($stored);
    return $path !== null ? @unlink($path) : false;
}

// ── Rate limiting ────────────────────────────────────────────────────────────
//  Counters live in data/ratelimit/, already blocked from the web by
//  data/.htaccess. Deliberately fails OPEN: a disk problem must never lock
//  real customers out of the checkout.

function omg_ratelimit_dir(): string {
    $dir = DATA_DIR . 'ratelimit';
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    return $dir;
}

function omg_client_ip(): string {
    return (string) ($_SERVER['REMOTE_ADDR'] ?? 'cli');
}

/** Occasionally sweep stale counters so the folder cannot grow without end. */
function omg_ratelimit_gc(int $maxAgeSeconds = 86400): void {
    if (random_int(1, 50) !== 1) return;
    $cutoff = time() - $maxAgeSeconds;
    foreach ((array) @glob(omg_ratelimit_dir() . '/*.json') as $f) {
        if (@filemtime($f) < $cutoff) @unlink($f);
    }
}

/**
 * True when the action is allowed. Counts one hit per allowed call, keyed by
 * bucket + client IP over a sliding window.
 */
function omg_rate_limit(string $bucket, int $max, int $windowSeconds): bool {
    omg_ratelimit_gc();
    $key  = preg_replace('/[^a-z0-9_-]/i', '', $bucket);
    $file = omg_ratelimit_dir() . '/' . $key . '_' . sha1(omg_client_ip()) . '.json';

    $fh = @fopen($file, 'c+');
    if ($fh === false) return true;          // fail open
    @flock($fh, LOCK_EX);

    $raw  = stream_get_contents($fh);
    $hits = json_decode($raw !== false && $raw !== '' ? $raw : '[]', true);
    if (!is_array($hits)) $hits = [];

    $now  = time();
    $hits = array_values(array_filter(
        $hits,
        fn($t) => is_int($t) && $t > $now - $windowSeconds
    ));

    $allowed = count($hits) < $max;
    if ($allowed) $hits[] = $now;

    @ftruncate($fh, 0);
    @rewind($fh);
    @fwrite($fh, json_encode($hits));
    @fflush($fh);
    @flock($fh, LOCK_UN);
    @fclose($fh);

    return $allowed;
}

// ── Login throttling ─────────────────────────────────────────────────────────
//  Failures only. A correct password clears the counter, so a legitimate
//  admin who mistypes twice is never punished.

function omg_login_throttle_file(): string {
    return omg_ratelimit_dir() . '/login_' . sha1(omg_client_ip()) . '.json';
}

/** Seconds still to wait, or 0 when an attempt is allowed right now. */
function omg_login_lock_remaining(): int {
    $f = omg_login_throttle_file();
    if (!is_file($f)) return 0;
    $s = json_decode((string) @file_get_contents($f), true);
    if (!is_array($s)) return 0;
    return max(0, (int) ($s['until'] ?? 0) - time());
}

function omg_login_record_failure(): void {
    $f = omg_login_throttle_file();
    $s = is_file($f) ? json_decode((string) @file_get_contents($f), true) : null;
    if (!is_array($s)) $s = ['fails' => 0, 'last' => 0, 'until' => 0];

    // A quiet half-hour wipes the slate.
    if ((int) ($s['last'] ?? 0) < time() - 1800) $s['fails'] = 0;

    $s['fails'] = (int) $s['fails'] + 1;
    $s['last']  = time();
    // First four are free. Then 30s, 60s, 120s … capped at 15 minutes.
    $s['until'] = $s['fails'] >= 5
        ? time() + (int) min(900, 30 * pow(2, $s['fails'] - 5))
        : 0;

    @file_put_contents($f, json_encode($s), LOCK_EX);
}

function omg_login_clear(): void {
    @unlink(omg_login_throttle_file());
}
