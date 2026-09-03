<?php
function omg_read_json(string $file): array {
    if (!file_exists($file)) return [];
    return json_decode(file_get_contents($file), true) ?? [];
}

function omg_write_json(string $file, array $data): bool {
    $dir = dirname($file);
    if (!is_dir($dir)) mkdir($dir, 0755, true);
    return (bool) file_put_contents(
        $file,
        json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        LOCK_EX
    );
}

function omg_generate_id(): string {
    return 'post-' . bin2hex(random_bytes(6));
}

function omg_slugify(string $text): string {
    // Transliterate Unicode (bold, accented chars, etc.) to ASCII equivalents
    $text = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text) ?: $text;
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9\s-]/', '', $text);
    $text = preg_replace('/[\s-]+/', '-', $text);
    return trim($text, '-');
}

function omg_unique_slug(string $base, ?string $excludeId = null): string {
    $data  = omg_read_json(POSTS_FILE);
    $posts = $data['posts'] ?? [];
    $slugs = array_column(
        array_filter($posts, fn($p) => $p['id'] !== $excludeId),
        'slug'
    );
    $slug = $base;
    $i    = 2;
    while (in_array($slug, $slugs)) { $slug = $base . '-' . $i++; }
    return $slug;
}

// ── POSTS ─────────────────────────────────────────────────────────────────────

function posts_all(bool $publishedOnly = true): array {
    $data  = omg_read_json(POSTS_FILE);
    $posts = $data['posts'] ?? [];
    if ($publishedOnly) {
        $posts = array_values(array_filter($posts, fn($p) => ($p['status'] ?? '') === 'published'));
    }
    usort($posts, fn($a, $b) => strcmp($b['created_at'] ?? '', $a['created_at'] ?? ''));
    return $posts;
}

function post_by_slug(string $slug): ?array {
    foreach (posts_all(false) as $p) {
        if (($p['slug'] ?? '') === $slug) return $p;
    }
    return null;
}

function post_by_id(string $id): ?array {
    $data = omg_read_json(POSTS_FILE);
    foreach (($data['posts'] ?? []) as $p) {
        if (($p['id'] ?? '') === $id) return $p;
    }
    return null;
}

function post_save(array $post): bool {
    $data  = omg_read_json(POSTS_FILE);
    $posts = $data['posts'] ?? [];
    $found = false;
    foreach ($posts as &$p) {
        if ($p['id'] === $post['id']) { $p = $post; $found = true; break; }
    }
    unset($p);
    if (!$found) $posts[] = $post;
    $data['posts'] = $posts;
    return omg_write_json(POSTS_FILE, $data);
}

function post_delete(string $id): bool {
    $data          = omg_read_json(POSTS_FILE);
    $data['posts'] = array_values(
        array_filter($data['posts'] ?? [], fn($p) => $p['id'] !== $id)
    );
    return omg_write_json(POSTS_FILE, $data);
}

// ── PORTFOLIO ─────────────────────────────────────────────────────────────────

function omg_generate_project_id(): string {
    return 'proj-' . bin2hex(random_bytes(6));
}

function omg_unique_project_slug(string $base, ?string $excludeId = null): string {
    $data     = omg_read_json(PORTFOLIO_FILE);
    $projects = $data['projects'] ?? [];
    $slugs = array_column(
        array_filter($projects, fn($p) => $p['id'] !== $excludeId),
        'slug'
    );
    $slug = $base;
    $i    = 2;
    while (in_array($slug, $slugs)) { $slug = $base . '-' . $i++; }
    return $slug;
}

function portfolio_all(bool $publishedOnly = true): array {
    $data     = omg_read_json(PORTFOLIO_FILE);
    $projects = $data['projects'] ?? [];
    if ($publishedOnly) {
        $projects = array_values(array_filter($projects, fn($p) => ($p['status'] ?? '') === 'published'));
    }
    usort($projects, fn($a, $b) => strcmp($b['created_at'] ?? '', $a['created_at'] ?? ''));
    return $projects;
}

function project_by_slug(string $slug): ?array {
    foreach (portfolio_all(false) as $p) {
        if (($p['slug'] ?? '') === $slug) return $p;
    }
    return null;
}

function project_by_id(string $id): ?array {
    $data = omg_read_json(PORTFOLIO_FILE);
    foreach (($data['projects'] ?? []) as $p) {
        if (($p['id'] ?? '') === $id) return $p;
    }
    return null;
}

function portfolio_save(array $project): bool {
    $data     = omg_read_json(PORTFOLIO_FILE);
    $projects = $data['projects'] ?? [];
    $found    = false;
    foreach ($projects as &$p) {
        if ($p['id'] === $project['id']) { $p = $project; $found = true; break; }
    }
    unset($p);
    if (!$found) $projects[] = $project;
    $data['projects'] = $projects;
    return omg_write_json(PORTFOLIO_FILE, $data);
}

function portfolio_delete(string $id): bool {
    $data              = omg_read_json(PORTFOLIO_FILE);
    $data['projects']  = array_values(
        array_filter($data['projects'] ?? [], fn($p) => $p['id'] !== $id)
    );
    return omg_write_json(PORTFOLIO_FILE, $data);
}
