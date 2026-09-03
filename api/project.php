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

$project = project_by_slug($slug);
if (!$project || ($project['status'] ?? '') !== 'published') {
    ob_end_clean();
    http_response_code(404);
    echo json_encode(['ok' => false, 'error' => 'not found']);
    exit;
}

// Related projects (same category, excluding this one)
$all     = portfolio_all(true);
$related = array_slice(
    array_values(array_filter($all, fn($p) =>
        $p['slug'] !== $slug &&
        ($p['category'] ?? '') === ($project['category'] ?? '')
    )),
    0, 3
);

$format = fn($p) => [
    'id'         => $p['id']         ?? '',
    'slug'       => $p['slug']       ?? '',
    'title'      => $p['title']      ?? '',
    'category'   => $p['category']   ?? '',
    'image'      => $p['image']      ?? '',
    'client'     => $p['client']     ?? '',
    'year'       => $p['year']       ?? null,
];

$json = json_encode([
    'ok'      => true,
    'project' => array_merge($format($project), [
        'tags'      => $project['tags']      ?? [],
        'results'   => $project['results']   ?? [],
        'url'       => $project['url']       ?? '',
        'challenge' => $project['challenge'] ?? '',
        'solution'  => $project['solution']  ?? '',
    ]),
    'related' => array_map($format, $related),
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
ob_end_clean();
echo $json;
