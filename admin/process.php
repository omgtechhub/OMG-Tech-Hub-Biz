<?php
// config.php starts the session itself, with hardened cookie parameters.
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/security.php';
require_once dirname(__DIR__) . '/includes/db.php';
require_once 'includes/auth.php';

// Every POST below creates, edits or deletes something. Without this a page
// on any other site could drive the panel using your logged-in session.
omg_csrf_require();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: dashboard.php'); exit; }

$action = $_POST['action'] ?? '';
$id     = trim($_POST['id'] ?? '');

if ($action === 'delete' && $id) {
    $post = post_by_id($id);
    if ($post) {
        // Remove image file
        if (!empty($post['image'])) omg_delete_upload($post['image']);
        post_delete($id);
        $_SESSION['flash'] = 'Post deleted.';
    } else {
        $_SESSION['flash_err'] = 'Post not found.';
    }
    header('Location: dashboard.php');
    exit;
}

if ($action === 'delete_project' && $id) {
    $project = project_by_id($id);
    if ($project) {
        foreach (project_images($project) as $img) {
            if ($img) omg_delete_upload($img);
        }
        portfolio_delete($id);
        $_SESSION['flash'] = 'Project deleted.';
    } else {
        $_SESSION['flash_err'] = 'Project not found.';
    }
    header('Location: dashboard.php#portfolio');
    exit;
}

header('Location: dashboard.php');
exit;
