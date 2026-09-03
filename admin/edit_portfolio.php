<?php
if (session_status() === PHP_SESSION_NONE) session_start();
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';

$id      = trim($_GET['id'] ?? '');
$project = $id ? project_by_id($id) : null;
if (!$project) { $_SESSION['flash_err'] = 'Project not found.'; header('Location: dashboard.php#portfolio'); exit; }

$errors = [];
$old    = $project;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $old['title']         = trim($_POST['title']        ?? '');
    $old['category']      = trim($_POST['category']     ?? '');
    $old['client']        = trim($_POST['client']        ?? '');
    $old['year']          = trim($_POST['year']          ?? '');
    $old['tags']          = trim($_POST['tags_raw']      ?? '');
    $old['results']       = trim($_POST['results_raw']   ?? '');
    $old['url']           = trim($_POST['url']           ?? '');
    $old['challenge']     = trim($_POST['challenge']     ?? '');
    $old['solution']      = trim($_POST['solution']      ?? '');
    $old['status']        = in_array($_POST['status'] ?? '', ['published','draft']) ? $_POST['status'] : 'published';

    if (!$old['title'])  $errors[] = 'Title is required.';
    if (!in_array($old['category'], PORTFOLIO_CATEGORIES, true)) $errors[] = 'Please choose a valid category.';
    if (!$old['client']) $errors[] = 'Client is required.';
    if (!$old['year'] || !ctype_digit((string)$old['year'])) $errors[] = 'Year must be a valid number.';
    if (!empty($old['url']) && !filter_var($old['url'], FILTER_VALIDATE_URL)) {
        $errors[] = 'Project URL must be a valid URL (or leave blank).';
    }

    $image_path = $project['image'] ?? '';
    if (!empty($_FILES['image']['name'])) {
        $allowed = ['image/jpeg','image/jpg','image/png','image/webp','image/gif'];
        $mime    = mime_content_type($_FILES['image']['tmp_name']);
        if (!in_array($mime, $allowed))                 $errors[] = 'Image must be JPG, PNG, WebP, or GIF.';
        elseif ($_FILES['image']['size'] > 5*1024*1024) $errors[] = 'Image must be under 5MB.';
        else {
            $ext  = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $name = uniqid('proj_', true) . '.' . strtolower($ext);
            if (!is_dir(PORTFOLIO_UPLOAD_DIR)) mkdir(PORTFOLIO_UPLOAD_DIR, 0755, true);
            if (move_uploaded_file($_FILES['image']['tmp_name'], PORTFOLIO_UPLOAD_DIR . $name)) {
                if ($image_path && file_exists(dirname(__DIR__) . '/' . $image_path))
                    @unlink(dirname(__DIR__) . '/' . $image_path);
                $image_path = PORTFOLIO_UPLOAD_URL . $name;
            } else {
                $errors[] = 'Failed to save image.';
            }
        }
    }
    if (!$image_path) $errors[] = 'A cover image is required.';

    if (empty($errors)) {
        $tags    = array_values(array_filter(array_map('trim', explode(',', $old['tags']))));
        $results = array_values(array_filter(array_map('trim', explode(',', $old['results']))));
        $title   = $old['title'];
        $project = array_merge($project, [
            'title'      => $title,
            'category'   => $old['category'],
            'image'      => $image_path,
            'client'     => $old['client'],
            'year'       => (int)$old['year'],
            'tags'       => $tags,
            'results'    => $results,
            'url'        => $old['url'],
            'challenge'  => $old['challenge'],
            'solution'   => $old['solution'],
            'status'     => $old['status'],
            'updated_at' => date('c'),
        ]);
        portfolio_save($project);
        $_SESSION['flash'] = 'Project updated!';
        header('Location: dashboard.php#portfolio'); exit;
    }
}

$tags_raw    = is_array($old['tags']    ?? '') ? implode(', ', $old['tags'])    : ($old['tags']    ?? '');
$results_raw = is_array($old['results'] ?? '') ? implode(', ', $old['results']) : ($old['results'] ?? '');

layout_head('Edit Portfolio Project');
layout_sidebar('');
?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.js" defer></script>
<div class="admin-topbar">
  <div class="topbar-title">Edit Portfolio Project</div>
  <div class="topbar-actions">
    <?php if (($old['status'] ?? '') === 'published'): ?>
    <a href="<?php echo SITE_URL; ?>/dist/#/portfolio/<?php echo urlencode($old['slug']); ?>" target="_blank" class="btn btn-ghost btn-sm">
      <?php echo svg_view(); ?> View Live
    </a>
    <?php endif; ?>
    <a href="dashboard.php#portfolio" class="btn btn-ghost btn-sm">← Back</a>
  </div>
</div>

<div class="admin-content">
  <?php if($errors): ?>
  <div class="alert alert-error"><?php echo implode('<br>', array_map('htmlspecialchars', $errors)); ?></div>
  <?php endif; ?>

  <form method="post" enctype="multipart/form-data">
    <div class="post-form-grid" style="display:grid;grid-template-columns:1fr 340px;gap:20px;align-items:start;">

      <!-- Main -->
      <div>
        <div class="admin-card">
          <div class="admin-card-title">Project Details</div>

          <div class="form-group">
            <label class="form-label" for="title">Title *</label>
            <input type="text" id="title" name="title" class="form-input"
                   value="<?php echo htmlspecialchars($old['title'] ?? ''); ?>" required>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label class="form-label" for="client">Client *</label>
              <input type="text" id="client" name="client" class="form-input"
                     value="<?php echo htmlspecialchars($old['client'] ?? ''); ?>" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="year">Year *</label>
              <input type="number" id="year" name="year" class="form-input" min="2000" max="2100"
                     value="<?php echo htmlspecialchars((string)($old['year'] ?? '')); ?>" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="challenge">The Challenge</label>
            <textarea id="challenge" name="challenge" class="form-textarea" rows="4"><?php echo htmlspecialchars($old['challenge'] ?? ''); ?></textarea>
          </div>

          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" for="solution">Our Solution</label>
            <textarea id="solution" name="solution" class="form-textarea" rows="4"><?php echo htmlspecialchars($old['solution'] ?? ''); ?></textarea>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div>
        <div class="admin-card">
          <div class="admin-card-title">Publish</div>
          <div style="font-size:.78rem;color:var(--text-3);margin-bottom:14px;">
            Slug: <code style="background:var(--bg);padding:2px 6px;border-radius:4px;font-size:.78rem;"><?php echo htmlspecialchars($old['slug'] ?? ''); ?></code>
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <select name="status" class="form-select">
              <option value="published" <?php echo ($old['status']??'')==='published'?'selected':''; ?>>Published</option>
              <option value="draft"     <?php echo ($old['status']??'')==='draft'?'selected':''; ?>>Draft</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Category *</label>
            <select name="category" id="category-select" class="form-select" onchange="updateCropRatio()">
              <?php foreach (PORTFOLIO_CATEGORIES as $cat): ?>
              <option value="<?php echo htmlspecialchars($cat); ?>" <?php echo ($old['category']??'')===$cat?'selected':''; ?>><?php echo htmlspecialchars($cat); ?></option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">Cover Image *</div>
          <?php if (!empty($old['image'])): ?>
          <div id="current-img-wrap">
            <img id="current-img" src="../<?php echo htmlspecialchars($old['image']); ?>"
                 style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:12px;" alt="">
            <div style="font-size:.76rem;color:var(--text-3);margin-bottom:8px;">Upload new to replace:</div>
          </div>
          <?php endif; ?>
          <input type="file" id="img-input" name="image" accept="image/jpeg,image/png,image/webp,image/gif" style="display:none;" onchange="openCropper(this)">
          <div class="upload-zone" id="upload-zone" onclick="document.getElementById('img-input').click();" style="position:relative;cursor:pointer;">
            <div id="upload-prompt">
              <svg width="24" height="24" fill="none" stroke="var(--text-4)" stroke-width="1.5" viewBox="0 0 24 24" style="margin:0 auto 6px;"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <div style="font-size:.82rem;font-weight:600;color:var(--text-3);">Click to upload</div>
            </div>
            <div id="img-preview-wrap" style="display:none;position:relative;">
              <img id="img-preview" class="upload-preview" alt="" style="display:block;border-radius:8px;width:100%;object-fit:cover;">
              <button type="button"
                onclick="event.stopPropagation();reopenCropper();"
                style="position:absolute;bottom:8px;right:8px;background:rgba(0,0,0,0.65);color:#fff;border:none;border-radius:6px;padding:5px 10px;font-size:.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:5px;backdrop-filter:blur(4px);">
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Re-crop
              </button>
            </div>
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">Meta</div>
          <div class="form-group">
            <label class="form-label">Tags</label>
            <input type="text" name="tags_raw" class="form-input"
                   value="<?php echo htmlspecialchars($tags_raw); ?>"
                   placeholder="Fintech, Mobile App, UX Research">
          </div>
          <div class="form-group">
            <label class="form-label">Results</label>
            <input type="text" name="results_raw" class="form-input"
                   value="<?php echo htmlspecialchars($results_raw); ?>"
                   placeholder="12 Countries, Full Design System, Dev Ready">
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Project / Video URL</label>
            <input type="url" name="url" class="form-input"
                   value="<?php echo htmlspecialchars($old['url'] ?? ''); ?>"
                   placeholder="https://example.com or https://youtu.be/…">
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg" style="width:100%;justify-content:center;">
          Save Changes
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  </form>
</div>

<!-- Crop Modal -->
<div id="crop-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.82);z-index:9999;padding:16px;overflow-y:auto;backdrop-filter:blur(4px);">
  <div style="background:var(--surface);border-radius:16px;max-width:820px;margin:32px auto;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.4);">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid var(--border);">
      <div style="font-size:.95rem;font-weight:700;color:var(--text);">Crop Cover Image</div>
      <button type="button" onclick="closeCropper()" style="background:none;border:none;cursor:pointer;color:var(--text-3);padding:4px;border-radius:6px;display:flex;align-items:center;" aria-label="Close">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div style="display:flex;align-items:center;gap:8px;padding:12px 20px;border-bottom:1px solid var(--border);flex-wrap:wrap;">
      <span style="font-size:.75rem;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;margin-right:4px;">Ratio</span>
      <button type="button" class="crop-ratio-btn" onclick="setRatio(this,16/10)">16 : 10</button>
      <button type="button" class="crop-ratio-btn" onclick="setRatio(this,4/3)">4 : 3</button>
      <button type="button" class="crop-ratio-btn" onclick="setRatio(this,1)">1 : 1</button>
      <button type="button" class="crop-ratio-btn" onclick="setRatio(this,NaN)">Free</button>
      <div style="flex:1;"></div>
      <button type="button" class="crop-ctrl-btn" onclick="cropperInst&&cropperInst.zoom(0.1)" title="Zoom in">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </button>
      <button type="button" class="crop-ctrl-btn" onclick="cropperInst&&cropperInst.zoom(-0.1)" title="Zoom out">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </button>
      <button type="button" class="crop-ctrl-btn" onclick="cropperInst&&cropperInst.rotate(-90)" title="Rotate left">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
      </button>
      <button type="button" class="crop-ctrl-btn" onclick="cropperInst&&cropperInst.rotate(90)" title="Rotate right">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
      </button>
      <button type="button" class="crop-ctrl-btn" onclick="cropperInst&&cropperInst.reset()" title="Reset" style="gap:4px;">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
        <span style="font-size:.7rem;font-weight:700;">Reset</span>
      </button>
    </div>
    <div style="background:#111;max-height:420px;overflow:hidden;">
      <img id="crop-img" style="display:block;max-width:100%;" alt="">
    </div>
    <div style="display:flex;align-items:center;justify-content:flex-end;gap:10px;padding:16px 20px;border-top:1px solid var(--border);">
      <button type="button" class="btn btn-ghost btn-sm" onclick="closeCropper()">Cancel</button>
      <button type="button" id="apply-crop-btn" class="btn btn-primary btn-sm" onclick="applyCrop()">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        Apply Crop
      </button>
    </div>
  </div>
</div>

<style>
.crop-ratio-btn{padding:4px 10px;font-size:.75rem;font-weight:600;border:1px solid var(--border);border-radius:6px;background:none;color:var(--text-2);cursor:pointer;transition:all .15s;}
.crop-ratio-btn:hover,.crop-ratio-btn.active{background:var(--accent);border-color:var(--accent);color:#fff;}
.crop-ctrl-btn{display:flex;align-items:center;padding:5px 8px;font-size:.75rem;font-weight:600;border:1px solid var(--border);border-radius:6px;background:none;color:var(--text-2);cursor:pointer;gap:2px;transition:all .15s;}
.crop-ctrl-btn:hover{background:var(--surface-2,var(--border));color:var(--text);}
</style>

<script>
// Cropper
var cropperInst = null;
var croppedBlob = null;
var originalSrc  = null;

function currentRatio() {
  var cat = document.getElementById('category-select').value;
  return cat === 'Graphic Design' ? 4/3 : 16/10;
}
function updateCropRatio() {
  if (cropperInst) cropperInst.setAspectRatio(currentRatio());
}

function openCropper(input) {
  if (!input.files || !input.files[0]) return;
  var reader = new FileReader();
  reader.onload = function(e) { originalSrc = e.target.result; launchCropper(originalSrc); };
  reader.readAsDataURL(input.files[0]);
}
function reopenCropper() { if (originalSrc) launchCropper(originalSrc); }
function launchCropper(src) {
  var img = document.getElementById('crop-img');
  img.src = src;
  document.getElementById('crop-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
  if (cropperInst) { cropperInst.destroy(); cropperInst = null; }
  img.onload = function() {
    cropperInst = new Cropper(img, {
      aspectRatio: currentRatio(), viewMode: 2, dragMode: 'move',
      autoCropArea: 0.95, restore: false, guides: true,
      center: true, highlight: true, cropBoxMovable: true,
      cropBoxResizable: true, toggleDragModeOnDblclick: false, responsive: true,
    });
  };
}
function closeCropper() {
  document.getElementById('crop-modal').style.display = 'none';
  document.body.style.overflow = '';
  if (!croppedBlob) {
    document.getElementById('img-input').value = '';
    document.getElementById('upload-prompt').style.display = '';
    document.getElementById('img-preview-wrap').style.display = 'none';
    originalSrc = null;
  }
}
function setRatio(btn, ratio) {
  document.querySelectorAll('.crop-ratio-btn').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  if (cropperInst) cropperInst.setAspectRatio(ratio);
}
function applyCrop() {
  if (!cropperInst) return;
  var btn = document.getElementById('apply-crop-btn');
  btn.textContent = 'Processing…'; btn.disabled = true;
  cropperInst.getCroppedCanvas({ maxWidth: 1400, maxHeight: 1050, imageSmoothingQuality: 'high' }).toBlob(function(blob) {
    croppedBlob = blob;
    var url = URL.createObjectURL(blob);
    document.getElementById('img-preview').src = url;
    document.getElementById('img-preview-wrap').style.display = 'block';
    document.getElementById('upload-prompt').style.display = 'none';
    document.getElementById('crop-modal').style.display = 'none';
    document.body.style.overflow = '';
    btn.innerHTML = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Apply Crop';
    btn.disabled = false;
  }, 'image/jpeg', 0.92);
}

// Form submit — inject cropped blob if present
document.querySelector('form').addEventListener('submit', function(e) {
  if (!croppedBlob) return;
  e.preventDefault();
  var submitBtn = this.querySelector('[type=submit]');
  submitBtn.disabled = true; submitBtn.textContent = 'Saving…';
  var fd = new FormData(this);
  fd.delete('image');
  fd.append('image', new File([croppedBlob], 'thumbnail.jpg', { type: 'image/jpeg' }), 'thumbnail.jpg');
  fetch(window.location.pathname + window.location.search, { method: 'POST', body: fd, redirect: 'follow' })
    .then(function(r) { window.location.href = r.url; })
    .catch(function() { submitBtn.disabled = false; submitBtn.textContent = 'Save Changes'; alert('Upload failed. Please try again.'); });
});

// Close modal on backdrop / Escape
document.getElementById('crop-modal').addEventListener('click', function(e){ if(e.target===this) closeCropper(); });
document.addEventListener('keydown', function(e){ if(e.key==='Escape' && document.getElementById('crop-modal').style.display!=='none') closeCropper(); });
</script>
<?php layout_foot(); ?>
