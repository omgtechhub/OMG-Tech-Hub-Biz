<?php
ob_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Cache-Control: no-cache, must-revalidate');

require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';

$posts = posts_all(true); // published only

// Shape response to match what the React app expects
$out = array_map(function($p) {
    return [
        'id'           => $p['id']           ?? '',
        'slug'         => $p['slug']         ?? '',
        'title'        => $p['title']        ?? '',
        'excerpt'      => $p['excerpt']      ?? '',
        'platform'     => $p['platform']     ?? 'general',
        'post_url'     => $p['post_url']     ?? '',
        'image'        => $p['image']        ?? '',
        'tags'         => $p['tags']         ?? [],
        'reading_time' => $p['reading_time'] ?? null,
        'featured'     => (bool)($p['featured'] ?? false),
        'author'       => $p['author']       ?? 'David Omigie',
        'author_role'  => $p['author_role']  ?? 'Founder & CEO, OMG Tech Hub',
        'author_avatar'=> $p['author_avatar'] ?? '/images/david.jpeg',
        'created_at'   => $p['created_at']   ?? '',
    ];
}, $posts);

$json = json_encode(['ok' => true, 'posts' => $out], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
ob_end_clean();
echo $json;
