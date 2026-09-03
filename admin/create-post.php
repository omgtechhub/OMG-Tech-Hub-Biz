<?php
if (session_status() === PHP_SESSION_NONE) session_start();
require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';
require_once 'includes/auth.php';
require_once 'includes/layout.php';

$errors = [];
$old = [
    'title'        => '',
    'excerpt'      => '',
    'content'      => '',
    'platform'     => 'general',
    'post_url'     => '',
    'tags'         => '',
    'reading_time' => '',
    'featured'     => '0',
    'status'       => 'published',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $old['title']        = trim($_POST['title']        ?? '');
    $old['excerpt']      = trim($_POST['excerpt']      ?? '');
    $old['content']      = trim($_POST['content']      ?? '');
    $old['platform']     = trim($_POST['platform']     ?? 'general');
    $old['post_url']     = trim($_POST['post_url']     ?? '');
    $old['tags']         = trim($_POST['tags']         ?? '');
    $old['reading_time'] = trim($_POST['reading_time'] ?? '');
    $old['featured']     = !empty($_POST['featured']) ? '1' : '0';
    $old['status']       = in_array($_POST['status'] ?? '', ['published','draft']) ? $_POST['status'] : 'published';

    if (!$old['title'])   $errors[] = 'Title is required.';

    if (!empty($old['post_url']) && !filter_var($old['post_url'], FILTER_VALIDATE_URL)) {
        $errors[] = 'Post URL must be a valid URL (or leave blank).';
    }

    // Image upload
    $image_path = '';
    if (!empty($_FILES['image']['name'])) {
        $allowed = ['image/jpeg','image/jpg','image/png','image/webp','image/gif'];
        $max     = 5 * 1024 * 1024;
        $mime    = mime_content_type($_FILES['image']['tmp_name']);
        if (!in_array($mime, $allowed))          $errors[] = 'Image must be JPG, PNG, WebP, or GIF.';
        elseif ($_FILES['image']['size'] > $max) $errors[] = 'Image must be under 5MB.';
        else {
            $ext  = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $name = uniqid('post_', true) . '.' . strtolower($ext);
            if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);
            if (move_uploaded_file($_FILES['image']['tmp_name'], UPLOAD_DIR . $name)) {
                $image_path = UPLOAD_URL . $name;
            } else {
                $errors[] = 'Failed to save image.';
            }
        }
    }

    if (empty($errors)) {
        $id   = omg_generate_id();
        $base = omg_slugify($old['title']) ?: ('post-' . date('Y-m-d'));
        $slug = omg_unique_slug($base, null);
        $tags = array_values(array_filter(array_map('trim', explode(',', $old['tags']))));

        $post = [
            'id'           => $id,
            'slug'         => $slug,
            'title'        => $old['title'],
            'excerpt'      => $old['excerpt'],
            'content'      => $old['content'],
            'platform'     => $old['platform'],
            'post_url'     => $old['post_url'],
            'image'        => $image_path,
            'tags'         => $tags,
            'reading_time' => $old['reading_time'] ? (int)$old['reading_time'] : null,
            'featured'     => $old['featured'] === '1',
            'status'       => $old['status'],
            'author'       => 'David Omigie',
            'author_role'  => 'Founder & CEO, OMG Tech Hub',
            'author_avatar'=> '/images/david.jpeg',
            'created_at'   => date('c'),
        ];

        post_save($post);
        $_SESSION['flash'] = 'Post "' . htmlspecialchars($old['title']) . '" created successfully!';
        header('Location: dashboard.php'); exit;
    }
}

layout_head('New Post');
layout_sidebar('create-post');
?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.js" defer></script>
<div class="admin-topbar">
  <div class="topbar-title">New Post</div>
  <div class="topbar-actions">
    <a href="dashboard.php" class="btn btn-ghost btn-sm">← Back</a>
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
          <div class="admin-card-title">Post Content</div>

          <div class="form-group">
            <label class="form-label" for="title">Title *</label>
            <input type="text" id="title" name="title" class="form-input"
                   value="<?php echo htmlspecialchars($old['title']); ?>"
                   placeholder="Enter a compelling post title…" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="excerpt">Excerpt</label>
            <textarea id="excerpt" name="excerpt" class="form-textarea" rows="2"
                      placeholder="A short summary shown on blog cards…"><?php echo htmlspecialchars($old['excerpt']); ?></textarea>
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
          <div class="form-group">
            <label class="form-label">Platform / Category</label>
            <select name="platform" class="form-select">
              <option value="general"   <?php echo $old['platform']==='general'?'selected':''; ?>>General</option>
              <option value="linkedin"  <?php echo $old['platform']==='linkedin'?'selected':''; ?>>LinkedIn</option>
              <option value="instagram" <?php echo $old['platform']==='instagram'?'selected':''; ?>>Instagram</option>
              <option value="twitter"   <?php echo $old['platform']==='twitter'?'selected':''; ?>>X / Twitter</option>
              <option value="youtube"   <?php echo $old['platform']==='youtube'?'selected':''; ?>>YouTube</option>
              <option value="facebook"  <?php echo $old['platform']==='facebook'?'selected':''; ?>>Facebook</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Reading Time (mins)</label>
            <input type="number" name="reading_time" class="form-input" min="1" max="60"
                   value="<?php echo htmlspecialchars($old['reading_time']); ?>"
                   placeholder="e.g. 5">
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label style="display:flex;align-items:center;gap:9px;cursor:pointer;font-size:.875rem;font-weight:500;">
              <input type="checkbox" name="featured" value="1"
                     <?php echo $old['featured']==='1'?'checked':''; ?>
                     style="width:16px;height:16px;accent-color:var(--accent);cursor:pointer;">
              Mark as Featured
            </label>
          </div>
        </div>

        <div class="admin-card">
          <div class="admin-card-title">Cover Image</div>
          <input type="file" id="img-input" name="image" accept="image/jpeg,image/png,image/webp,image/gif" style="display:none;" onchange="openCropper(this)">
          <div class="upload-zone" id="upload-zone" onclick="document.getElementById('img-input').click();" style="position:relative;cursor:pointer;">
            <div id="upload-prompt">
              <svg width="28" height="28" fill="none" stroke="var(--text-4)" stroke-width="1.5" viewBox="0 0 24 24" style="margin:0 auto 8px;"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <div style="font-size:.85rem;font-weight:600;color:var(--text-3);">Click to upload image</div>
              <div class="form-hint">JPG, PNG, WebP — max 5MB</div>
            </div>
            <div id="img-preview-wrap" style="display:none;position:relative;">
              <img id="img-preview" class="upload-preview" alt="Preview" style="display:block;border-radius:8px;width:100%;object-fit:cover;">
              <button type="button" id="recrop-btn"
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
            <input type="text" name="tags" class="form-input"
                   value="<?php echo htmlspecialchars($old['tags']); ?>"
                   placeholder="Design, Branding, Tips (comma-separated)">
            <div class="form-hint">Separate multiple tags with commas.</div>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Social Post URL</label>
            <input type="url" name="post_url" class="form-input"
                   value="<?php echo htmlspecialchars($old['post_url']); ?>"
                   placeholder="https://linkedin.com/posts/…">
            <div class="form-hint">Optional link to the original social media post.</div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg" style="width:100%;justify-content:center;">
          Publish Post
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  </form>
</div>

<!-- Crop Modal -->
<div id="crop-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.82);z-index:9999;padding:16px;overflow-y:auto;backdrop-filter:blur(4px);">
  <div style="background:var(--surface);border-radius:16px;max-width:820px;margin:32px auto;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.4);">

    <!-- Modal header -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid var(--border);">
      <div style="font-size:.95rem;font-weight:700;color:var(--text);">Crop Cover Image</div>
      <button type="button" onclick="closeCropper()" style="background:none;border:none;cursor:pointer;color:var(--text-3);padding:4px;border-radius:6px;display:flex;align-items:center;" aria-label="Close">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Aspect ratio presets -->
    <div style="display:flex;align-items:center;gap:8px;padding:12px 20px;border-bottom:1px solid var(--border);flex-wrap:wrap;">
      <span style="font-size:.75rem;font-weight:600;color:var(--text-3);text-transform:uppercase;letter-spacing:.05em;margin-right:4px;">Ratio</span>
      <button type="button" class="crop-ratio-btn active" data-ratio="1.7778" onclick="setRatio(this,16/9)">16 : 9</button>
      <button type="button" class="crop-ratio-btn" data-ratio="1.3333" onclick="setRatio(this,4/3)">4 : 3</button>
      <button type="button" class="crop-ratio-btn" data-ratio="1" onclick="setRatio(this,1)">1 : 1</button>
      <button type="button" class="crop-ratio-btn" data-ratio="free" onclick="setRatio(this,NaN)">Free</button>
      <div style="flex:1;"></div>
      <!-- Zoom & rotate controls -->
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
      <button type="button" class="crop-ctrl-btn" onclick="cropperInst&&cropperInst.reset()" title="Reset">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
        <span style="font-size:.7rem;font-weight:700;margin-left:2px;">Reset</span>
      </button>
    </div>

    <!-- Cropper image area -->
    <div style="background:#111;max-height:420px;overflow:hidden;">
      <img id="crop-img" style="display:block;max-width:100%;" alt="">
    </div>

    <!-- Modal footer -->
    <div style="display:flex;align-items:center;justify-content:flex-end;gap:10px;padding:16px 20px;border-top:1px solid var(--border);">
      <button type="button" class="btn btn-ghost btn-sm" onclick="closeCropper()">Cancel</button>
      <button type="button" class="btn btn-primary btn-sm" onclick="applyCrop()">
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
var cropperInst = null;
var croppedBlob = null;
var originalSrc = null;

function openCropper(input) {
  if (!input.files || !input.files[0]) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    originalSrc = e.target.result;
    launchCropper(originalSrc);
  };
  reader.readAsDataURL(input.files[0]);
}

function reopenCropper() {
  if (originalSrc) launchCropper(originalSrc);
}

function launchCropper(src) {
  var img = document.getElementById('crop-img');
  img.src = src;
  document.getElementById('crop-modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
  if (cropperInst) { cropperInst.destroy(); cropperInst = null; }
  img.onload = function() {
    cropperInst = new Cropper(img, {
      aspectRatio: 16/9,
      viewMode: 2,
      dragMode: 'move',
      autoCropArea: 0.95,
      restore: false,
      guides: true,
      center: true,
      highlight: true,
      cropBoxMovable: true,
      cropBoxResizable: true,
      toggleDragModeOnDblclick: false,
      responsive: true,
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
  var btn = document.querySelector('#crop-modal .btn-primary');
  btn.textContent = 'Processing…';
  btn.disabled = true;
  cropperInst.getCroppedCanvas({ maxWidth: 1400, maxHeight: 900, imageSmoothingQuality: 'high' }).toBlob(function(blob) {
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

// Intercept submit — swap in the cropped blob as the image file
document.querySelector('form').addEventListener('submit', function(e) {
  if (!croppedBlob) return; // no crop — normal submit
  e.preventDefault();
  var submitBtn = this.querySelector('[type=submit]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Publishing…';

  var fd = new FormData(this);
  fd.delete('image');
  fd.append('image', new File([croppedBlob], 'thumbnail.jpg', { type: 'image/jpeg' }), 'thumbnail.jpg');

  fetch(window.location.pathname, { method: 'POST', body: fd, redirect: 'follow' })
    .then(function(r) { window.location.href = r.url; })
    .catch(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Publish Post';
      alert('Upload failed. Please try again.');
    });
});

// Close modal on backdrop click
document.getElementById('crop-modal').addEventListener('click', function(e) {
  if (e.target === this) closeCropper();
});
// Close on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.getElementById('crop-modal').style.display !== 'none') closeCropper();
});
</script>
<?php layout_foot(); ?>
