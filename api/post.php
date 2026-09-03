<?php
ob_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Cache-Control: no-cache, must-revalidate');

require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';

$slug = trim($_GET['slug'] ?? '');
if (!$slug) {
    ob_end_clean();
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'slug is required']);
    exit;
}

$post = post_by_slug($slug);
if (!$post || ($post['status'] ?? '') !== 'published') {
    ob_end_clean();
    http_response_code(404);
    echo json_encode(['ok' => false, 'error' => 'not found']);
    exit;
}

// Get related posts (same platform, excluding this one)
$all     = posts_all(true);
$related = array_slice(
    array_values(array_filter($all, fn($p) =>
        $p['slug'] !== $slug &&
        ($p['platform'] ?? '') === ($post['platform'] ?? '')
    )),
    0, 3
);

$format = fn($p) => [
    'id'           => $p['id']           ?? '',
    'slug'         => $p['slug']         ?? '',
    'title'        => $p['title']        ?? '',
    'excerpt'      => $p['excerpt']      ?? '',
    'platform'     => $p['platform']     ?? 'general',
    'image'        => $p['image']        ?? '',
    'reading_time' => $p['reading_time'] ?? null,
    'featured'     => (bool)($p['featured'] ?? false),
    'author'       => $p['author']       ?? 'David Omigie',
    'author_role'  => $p['author_role']  ?? 'Founder & CEO, OMG Tech Hub',
    'author_avatar'=> $p['author_avatar'] ?? '/images/david.jpeg',
    'created_at'   => $p['created_at']   ?? '',
];

$json = json_encode([
    'ok'   => true,
    'post' => array_merge($format($post), [
        'content'  => $post['content']  ?? '',
        'tags'     => $post['tags']     ?? [],
        'post_url' => $post['post_url'] ?? '',
    ]),
    'related' => array_map($format, $related),
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
ob_end_clean();
echo $json;
