<?php
if (session_status() === PHP_SESSION_NONE) session_start();
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';

$errors = [];
$old = [
    'title'     => '',
    'category'  => PORTFOLIO_CATEGORIES[0],
    'client'    => '',
    'year'      => date('Y'),
    'tags'      => '',
    'results'   => '',
    'url'       => '',
    'challenge' => '',
    'solution'  => '',
    'status'    => 'published',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $old['title']     = trim($_POST['title']     ?? '');
    $old['category']  = trim($_POST['category']  ?? '');
    $old['client']    = trim($_POST['client']     ?? '');
    $old['year']      = trim($_POST['year']       ?? '');
    $old['tags']      = trim($_POST['tags']       ?? '');
    $old['results']   = trim($_POST['results']    ?? '');
    $old['url']       = trim($_POST['url']        ?? '');
    $old['challenge'] = trim($_POST['challenge']  ?? '');
    $old['solution']  = trim($_POST['solution']   ?? '');
    $old['status']    = in_array($_POST['status'] ?? '', ['published','draft']) ? $_POST['status'] : 'published';

    if (!$old['title'])    $errors[] = 'Title is required.';
    if (!in_array($old['category'], PORTFOLIO_CATEGORIES, true)) $errors[] = 'Please choose a valid category.';
    if (!$old['client'])   $errors[] = 'Client is required.';
    if (!$old['year'] || !ctype_digit($old['year'])) $errors[] = 'Year must be a valid number.';
    if (!empty($old['url']) && !filter_var($old['url'], FILTER_VALIDATE_URL)) {
        $errors[] = 'Project URL must be a valid URL (or leave blank).';
    }

    // Design images (one or more, required). Stored exactly as uploaded —
    // no forced cropping/resizing/re-encoding — so each image keeps its
    // original resolution, quality, and aspect ratio.
    $images = [];
    if (empty($errors) && !empty($_FILES['images']['name'][0])) {
        $allowed = ['image/jpeg','image/jpg','image/png','image/webp','image/gif'];
        $max     = 10 * 1024 * 1024;
        if (!is_dir(PORTFOLIO_UPLOAD_DIR)) mkdir(PORTFOLIO_UPLOAD_DIR, 0755, true);
        $count = count($_FILES['images']['name']);
        for ($i = 0; $i < $count; $i++) {
            if ($_FILES['images']['error'][$i] === UPLOAD_ERR_NO_FILE) continue;
            if ($_FILES['images']['error'][$i] !== UPLOAD_ERR_OK) { $errors[] = 'One of the images failed to upload.'; continue; }
            $tmp  = $_FILES['images']['tmp_name'][$i];
            $mime = mime_content_type($tmp);
            if (!in_array($mime, $allowed)) { $errors[] = 'Images must be JPG, PNG, WebP, or GIF.'; continue; }
            if ($_FILES['images']['size'][$i] > $max) { $errors[] = 'Each image must be under 10MB.'; continue; }
            $ext  = strtolower(pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION));
            $name = uniqid('proj_', true) . '.' . $ext;
            if (move_uploaded_file($tmp, PORTFOLIO_UPLOAD_DIR . $name)) {
                $images[] = PORTFOLIO_UPLOAD_URL . $name;
            } else {
                $errors[] = 'Failed to save one of the images.';
            }
        }
    }
    if (empty($errors) && !$images) $errors[] = 'At least one design image is required.';

    if (empty($errors)) {
        $id      = omg_generate_project_id();
        $base    = omg_slugify($old['title']) ?: ('project-' . date('Y-m-d'));
        $slug    = omg_unique_project_slug($base, null);
        $tags    = array_values(array_filter(array_map('trim', explode(',', $old['tags']))));
        $results = array_values(array_filter(array_map('trim', explode(',', $old['results']))));

        $project = [
            'id'         => $id,
            'slug'       => $slug,
            'title'      => $old['title'],
            'category'   => $old['category'],
            'image'      => $images[0],
            'images'     => $images,
            'client'     => $old['client'],
            'year'       => (int)$old['year'],
            'tags'       => $tags,
            'results'    => $results,
            'url'        => $old['url'],
            'challenge'  => $old['challenge'],
            'solution'   => $old['solution'],
            'status'     => $old['status'],
            'created_at' => date('c'),
        ];

        portfolio_save($project);
        $_SESSION['flash'] = 'Project "' . htmlspecialchars($old['title']) . '" uploaded successfully!';
        header('Location: dashboard.php#portfolio'); exit;
    } elseif ($images) {
        // Validation failed elsewhere after files were already moved — clean up
        // so we don't leave orphaned uploads behind.
        foreach ($images as $img) @unlink(dirname(__DIR__) . '/' . $img);
    }
}

layout_head('Upload Portfolio Project');
layout_sidebar('upload-portfolio');
?>
<div class="admin-topbar">
  <div class="topbar-title">Upload Portfolio Project</div>
  <div class="topbar-actions">
    <a href="dashboard.php#portfolio" class="btn btn-ghost btn-sm">← Back</a>
  </div>
</div>

<div class="admin-content">
  <?php if($errors): ?>
  <div class="alert alert-error"><?php echo implode('<br>', array_map('htmlspecialchars', $errors)); ?></div>
  <?php endif; ?>

  <form method="post" enctype="multipart/form-data">
    <div class="post-form-grid" style="display:grid;grid-template-columns:1fr 340px;gap:20px;align-items:start;">

      <!-- Main content -->
      <div>
        <div class="admin-card">
          <div class="admin-card-title">Project Details</div>

          <div class="form-group">
            <label class="form-label" for="title">Title *</label>
            <input type="text" id="title" name="title" class="form-input"
                   value="<?php echo htmlspecialchars($old['title']); ?>"
                   placeholder="e.g. Zova — Fintech Super App" required>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label class="form-label" for="client">Client *</label>
              <input type="text" id="client" name="client" class="form-input"
                     value="<?php echo htmlspecialchars($old['client']); ?>"
                     placeholder="e.g. Zova Technologies" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="year">Year *</label>
              <input type="number" id="year" name="year" class="form-input" min="2000" max="2100"
                     value="<?php echo htmlspecialchars($old['year']); ?>" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="challenge">The Challenge</label>
            <textarea id="challenge" name="challenge" class="form-textarea" rows="4"
                      placeholder="What problem did this project solve?"><?php echo htmlspecialchars($old['challenge']); ?></textarea>
          </div>

          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" for="solution">Our Solution</label>
            <textarea id="solution" name="solution" class="form-textarea" rows="4"
                      placeholder="How was it solved?"><?php echo htmlspecialchars($old['solution']); ?></textarea>
          </div>
        </div>
      </div>

      <!-- Sidebar settings -->
      <div>
        <div class="admin-card">
          <div class="admin-card-title">Publish</div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select name="status" class="form-select">
              <option value="published" <?php echo $old['status']==='published'?'selected':''; ?>>Published</option>
              <option value="draft"     <?php echo $old['status']==='draft'?'selected':''; ?>>Draft</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Category *</label>
            <select name="category" id="category-select" class="form-select">
              <?php foreach (PORTFOLIO_CATEGORIES as $cat): ?>
              <option value="<?php echo htmlspecialchars($cat); ?>" <?php echo $old['category']===$cat?'selected':''; ?>><?php echo htmlspecialchars($cat); ?></option>
              <?php endforeach; ?>
            </select>
            <div class="form-hint">Must be one of the four site categories.</div>
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">Design Images *</div>
          <div class="form-hint" style="margin-top:-6px;margin-bottom:12px;">
            Upload one or more images at full quality — they're stored exactly as-is (no cropping or compression) so every image keeps its original resolution and aspect ratio. The first image is used as the cover thumbnail.
          </div>
          <input type="file" id="img-input" name="images[]" accept="image/jpeg,image/png,image/webp,image/gif" multiple style="display:none;" onchange="handleImageFiles(this.files)">
          <div class="upload-zone" id="upload-zone" onclick="document.getElementById('img-input').click();" style="position:relative;cursor:pointer;">
            <div id="upload-prompt">
              <svg width="28" height="28" fill="none" stroke="var(--text-4)" stroke-width="1.5" viewBox="0 0 24 24" style="margin:0 auto 8px;"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <div style="font-size:.85rem;font-weight:600;color:var(--text-3);">Click to upload image(s)</div>
              <div class="form-hint">JPG, PNG, WebP, GIF — max 10MB each</div>
            </div>
            <div id="img-preview-grid" class="img-thumb-grid" style="display:none;"></div>
          </div>
          <div class="form-hint" id="img-add-more" style="display:none;margin-top:10px;">
            <a href="#" onclick="event.preventDefault();document.getElementById('img-input').click();">+ Add more images</a>
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">Meta</div>
          <div class="form-group">
            <label class="form-label">Tags</label>
            <input type="text" name="tags" class="form-input"
                   value="<?php echo htmlspecialchars($old['tags']); ?>"
                   placeholder="Fintech, Mobile App, UX Research">
            <div class="form-hint">Comma-separated. Shown as pills on the card.</div>
          </div>
          <div class="form-group">
            <label class="form-label">Results</label>
            <input type="text" name="results" class="form-input"
                   value="<?php echo htmlspecialchars($old['results']); ?>"
                   placeholder="12 Countries, Full Design System, Dev Ready">
            <div class="form-hint">Comma-separated. Shown as outcome pills.</div>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Project / Video URL</label>
            <input type="url" name="url" class="form-input"
                   value="<?php echo htmlspecialchars($old['url']); ?>"
                   placeholder="https://example.com or https://youtu.be/…">
            <div class="form-hint">Live site URL (Web Development) or YouTube link (Motion Design). Optional otherwise.</div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg" style="width:100%;justify-content:center;">
          Publish Project
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  </form>
</div>

<script>
var selectedImages = []; // File[] kept in sync with #img-input

function handleImageFiles(fileList) {
  for (var i = 0; i < fileList.length; i++) selectedImages.push(fileList[i]);
  renderImagePreviews();
}

function removeSelectedImage(index) {
  selectedImages.splice(index, 1);
  renderImagePreviews();
}

function renderImagePreviews() {
  var grid   = document.getElementById('img-preview-grid');
  var prompt = document.getElementById('upload-prompt');
  var addMore = document.getElementById('img-add-more');

  if (!selectedImages.length) {
    grid.style.display = 'none';
    grid.innerHTML = '';
    prompt.style.display = '';
    addMore.style.display = 'none';
    syncFileInput();
    return;
  }

  prompt.style.display = 'none';
  addMore.style.display = '';
  grid.style.display = 'grid';
  grid.innerHTML = selectedImages.map(function(file, i) {
    var url = URL.createObjectURL(file);
    return '<div class="img-thumb-wrap">' +
      '<img src="' + url + '" class="img-thumb" alt="">' +
      (i === 0 ? '<span class="img-thumb-cover">Cover</span>' : '') +
      '<button type="button" class="img-thumb-remove" onclick="event.stopPropagation();removeSelectedImage(' + i + ')" aria-label="Remove image">&times;</button>' +
      '</div>';
  }).join('');

  syncFileInput();
}

function syncFileInput() {
  var dt = new DataTransfer();
  selectedImages.forEach(function(f) { dt.items.add(f); });
  document.getElementById('img-input').files = dt.files;
}

document.querySelector('form').addEventListener('submit', function(e) {
  if (!selectedImages.length) {
    e.preventDefault();
    alert('Please add at least one design image.');
  }
});
</script>
<?php layout_foot(); ?>
