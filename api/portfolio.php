<?php
ob_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Cache-Control: no-cache, must-revalidate');

require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';

$projects = portfolio_all(true); // published only

// Shape response to match what the React app expects (src/data/projects.js shape)
$out = array_map(function($p) {
    return [
        'id'         => $p['id']         ?? '',
        'slug'       => $p['slug']       ?? '',
        'title'      => $p['title']      ?? '',
        'category'   => $p['category']   ?? '',
        'image'      => $p['image']      ?? '',
        'images'     => project_images($p),
        'client'     => $p['client']     ?? '',
        'year'       => $p['year']       ?? null,
        'tags'       => $p['tags']       ?? [],
        'results'    => $p['results']    ?? [],
        'url'        => $p['url']        ?? '',
        'challenge'  => $p['challenge']  ?? '',
        'solution'   => $p['solution']   ?? '',
        'created_at' => $p['created_at'] ?? '',
    ];
}, $projects);

$json = json_encode(['ok' => true, 'projects' => $out], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
ob_end_clean();
echo $json;
