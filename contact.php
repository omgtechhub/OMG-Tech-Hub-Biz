<?php
/**
 * OMG Tech Hub — Contact Page
 */

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/mailer.php';

$pageTitle   = 'Contact | OMG Tech Hub — Get a Quote or Book a Discovery Call';
$pageDesc    = 'Contact OMG Tech Hub to start your project, get a quote, or book a free 30-minute discovery call. Based in Benin City, Nigeria — serving clients globally.';
$pageCurrent = 'contact';

$prePackage = htmlspecialchars(strip_tags($_GET['package'] ?? ''));
$preService = htmlspecialchars(strip_tags($_GET['service'] ?? ''));

$formSent  = false;
$formError = '';
$fieldData = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['contact_submit'])) {

  // Honeypot check
  if (!empty($_POST['website_url'])) { exit; }

  $fname      = trim(strip_tags($_POST['fname']       ?? ''));
  $lname      = trim(strip_tags($_POST['lname']       ?? ''));
  $email      = trim(strip_tags($_POST['email']       ?? ''));
  $phone      = trim(strip_tags($_POST['phone']       ?? ''));
  $company    = trim(strip_tags($_POST['company']     ?? ''));
  $service    = trim(strip_tags($_POST['service']     ?? ''));
  $budget     = trim(strip_tags($_POST['budget']      ?? ''));
  $message    = trim(strip_tags($_POST['message']     ?? ''));
  $start_date = trim(strip_tags($_POST['start_date']  ?? ''));
  $end_date   = trim(strip_tags($_POST['end_date']    ?? ''));
  $how_found  = trim(strip_tags($_POST['how_found']   ?? ''));

  $fieldData = compact('fname','lname','email','phone','company','service','budget','message','start_date','end_date','how_found');

  if (!$fname || !$email || !$message) {
    $formError = 'Please fill in all required fields (Name, Email, Message).';
  } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $formError = 'Please enter a valid email address.';
  } elseif (empty($_POST['agree'])) {
    $formError = 'Please agree to the Terms of Service to continue.';
  } else {
    // Save submission to file
    contact_save([
      'name'       => "$fname $lname",
      'email'      => $email,
      'phone'      => $phone,
      'company'    => $company,
      'service'    => $service,
      'budget'     => $budget,
      'message'    => $message,
      'start_date' => $start_date,
      'end_date'   => $end_date,
      'how_found'  => $how_found,
    ]);

    // Send notification email to admin
    send_contact_email([
      'name'       => "$fname $lname",
      'email'      => $email,
      'phone'      => $phone,
      'company'    => $company,
      'service'    => $service,
      'budget'     => $budget,
      'message'    => $message,
      'start_date' => $start_date,
      'end_date'   => $end_date,
      'how_found'  => $how_found,
    ]);

    // Send autoresponder to the enquirer
    send_contact_autoresponder(['name' => $fname, 'email' => $email]);

    $formSent  = true;
    $fieldData = [];
  }
}

include __DIR__ . '/includes/header.php';
include __DIR__ . '/includes/navbar.php';
?>

<main id="main-content">

<!-- ══════════════════════ PAGE HERO ════════════════════ -->
<section class="about-hero section content-page-hero contact-hero" aria-labelledby="contact-page-heading">
  <div class="about-video-bg">
    <div class="about-video-placeholder has-bg"></div>
  </div>
  <div class="hero-orb orb-1" style="opacity:0.15;" aria-hidden="true"></div>
  <div class="hero-grid" style="opacity:0.3;" aria-hidden="true"></div>
  <div class="container">
    <div style="max-width: 760px;">
      <span class="section-tag reveal">Get In Touch</span>
      <h1 id="contact-page-heading" class="page-hero-title reveal">
        Let's Build Something<br>
        <span class="line2">Extraordinary Together</span>
      </h1>
      <p class="section-subtitle reveal" style="font-size:1.1rem;">
        Have a project in mind? We'd love to hear about it. 
        Fill in the form below and we'll get back to you within 24 hours.
      </p>
    </div>
  </div>
</section>

  <!-- ══════════════════════ CONTACT SECTION ═══════════════ -->
  <section class="section contact-page-hero" aria-labelledby="contact-hero-heading">
    <div class="container">

      <div class="contact-grid">

        <!-- ── LEFT: Info Panel ──────────────────────────── -->
        <div class="contact-info-box reveal-left" style="box-sizing:border-box;width:100%;min-width:0;">
          <span class="section-tag" style="margin-bottom:24px;">Let's Talk</span>
          <h2 id="contact-hero-heading">
            Start Your<br>
            <em>Dream Project</em>
          </h2>
          <p style="color:var(--text-muted);line-height:1.8;margin-bottom:36px;font-size:.97rem;">
            Ready to transform your brand? Fill in the form and we'll get back to you
            within 24 hours. For urgent projects, message us directly on WhatsApp.
          </p>

          <!-- Contact details -->
          <div style="display:flex;flex-direction:column;gap:18px;margin-bottom:36px;">
            <div style="display:flex;align-items:center;gap:16px;">
              <div style="width:44px;height:44px;border-radius:12px;background:rgba(122,13,13,.08);border:1px solid rgba(122,13,13,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-muted);margin-bottom:2px;">Email</div>
                <a href="mailto:omigiegraphics@gmail.com" style="color:var(--primary);font-weight:600;font-size:.95rem;">omigiegraphics@gmail.com</a>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:16px;">
              <div style="width:44px;height:44px;border-radius:12px;background:rgba(37,211,102,.08);border:1px solid rgba(37,211,102,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-muted);margin-bottom:2px;">WhatsApp</div>
                <a href="https://wa.me/2347084321204" target="_blank" rel="noopener" style="color:#25D366;font-weight:600;font-size:.95rem;">+234 708 432 1204</a>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:16px;">
              <div style="width:44px;height:44px;border-radius:12px;background:rgba(122,13,13,.08);border:1px solid rgba(122,13,13,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div style="font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-muted);margin-bottom:2px;">Location</div>
                <span style="color:var(--text);font-size:.95rem;">Benin City, Edo State, Nigeria</span>
              </div>
            </div>
          </div>

          <!-- Newsletter subscribe -->
          <div class="contact-newsletter-section">
            <div style="font-family:var(--font-head);font-size:.95rem;font-weight:700;color:var(--text);margin-bottom:6px;">Get Weekly Creative Insights</div>
            <p style="font-size:.84rem;color:var(--text-muted);margin-bottom:0;line-height:1.6;">Join 2,000+ business owners who read our newsletter on branding, design, and digital growth.</p>
            <form class="newsletter-form" aria-label="Newsletter signup">
              <input type="email" class="newsletter-input" placeholder="Your email address" aria-label="Email" required />
              <button type="submit" class="newsletter-btn">Subscribe</button>
            </form>
            <p style="font-size:.75rem;color:var(--text-muted);margin-top:10px;">No spam, ever. Unsubscribe anytime. ✦</p>
          </div>
        </div>

        <!-- ── RIGHT: Form ──────────────────────────────── -->
        <div class="reveal-right" style="min-width:0;max-width:100%;overflow:hidden;box-sizing:border-box;width:100%;">

          <?php if ($formSent): ?>
          <!-- Success State -->
          <div style="background:rgba(22,163,74,.08);border:1px solid rgba(22,163,74,.25);border-radius:20px;padding:56px 24px;text-align:center;">
            <div style="font-size:3.5rem;margin-bottom:20px;">🎉</div>
            <h3 style="font-family:var(--font-head);font-size:1.5rem;font-weight:800;color:var(--text);margin-bottom:12px;">Message Sent!</h3>
            <p style="color:var(--text-muted);line-height:1.75;margin-bottom:28px;">Thank you for reaching out. We've received your message and we'll reply within 24 hours. Check your inbox — we've sent a confirmation email.</p>
            <a href="index.php" class="btn-primary"><span>Back to Home</span></a>
          </div>
          <?php else: ?>

          <div style="background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:48px 24px;box-sizing:border-box;max-width:100%;">
            <h3 style="font-family:var(--font-head);font-size:1.25rem;font-weight:800;letter-spacing:-.03em;color:var(--text);margin-bottom:8px;">Tell Us About Your Project</h3>
            <p style="font-size:.88rem;color:var(--text-muted);margin-bottom:32px;">Fill in the form below and we'll get back to you within 24 hours.</p>

            <?php if ($formError): ?>
            <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:14px 18px;color:#dc2626;font-size:.86rem;margin-bottom:24px;display:flex;align-items:center;gap:10px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              <?php echo htmlspecialchars($formError); ?>
            </div>
            <?php endif; ?>

            <form id="contact-form" method="POST" action="" novalidate>
              <input type="hidden" name="contact_submit" value="1" />

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="fname">First Name *</label>
                  <input type="text" id="fname" name="fname" class="form-input" placeholder="Adaeze" required autocomplete="given-name" value="<?php echo htmlspecialchars($fieldData['fname'] ?? ''); ?>" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="lname">Last Name</label>
                  <input type="text" id="lname" name="lname" class="form-input" placeholder="Okonkwo" autocomplete="family-name" value="<?php echo htmlspecialchars($fieldData['lname'] ?? ''); ?>" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="email">Email Address *</label>
                  <input type="email" id="email" name="email" class="form-input" placeholder="hello@yourcompany.com" required autocomplete="email" value="<?php echo htmlspecialchars($fieldData['email'] ?? ''); ?>" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="phone">Phone / WhatsApp</label>
                  <input type="tel" id="phone" name="phone" class="form-input" placeholder="+234 800 000 0000" autocomplete="tel" value="<?php echo htmlspecialchars($fieldData['phone'] ?? ''); ?>" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="company">Company / Brand Name</label>
                <input type="text" id="company" name="company" class="form-input" placeholder="Your business name" autocomplete="organization" value="<?php echo htmlspecialchars($fieldData['company'] ?? ''); ?>" />
              </div>

              <div class="form-group">
                <label class="form-label" for="service">Service You're Interested In *</label>
                <select id="service" name="service" class="form-input" required>
                  <option value="">Select a service…</option>
                  <option value="Brand Identity" <?php echo (($fieldData['service'] ?? '') === 'Brand Identity') ? 'selected' : ''; ?>>🎨 Brand Identity &amp; Graphic Design</option>
                  <option value="Web Development" <?php echo (($fieldData['service'] ?? '') === 'Web Development') ? 'selected' : ''; ?>>💻 Web Development</option>
                  <option value="UI/UX Design" <?php echo (($fieldData['service'] ?? '') === 'UI/UX Design') ? 'selected' : ''; ?>>🖥️ UI/UX Design</option>
                  <option value="Motion Graphics" <?php echo (($fieldData['service'] ?? '') === 'Motion Graphics') ? 'selected' : ''; ?>>🎬 Motion Graphics &amp; Video</option>
                  <option value="Graphic Design" <?php echo (($fieldData['service'] ?? '') === 'Graphic Design') ? 'selected' : ''; ?>>✏️ Graphic Design</option>
                  <option value="Digital Product" <?php echo (($fieldData['service'] ?? '') === 'Digital Product') ? 'selected' : ''; ?>>📱 Digital Product Design</option>
                  <option value="Other" <?php echo (($fieldData['service'] ?? '') === 'Other') ? 'selected' : ''; ?>>💬 Other / General Inquiry</option>
                </select>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="budget">Budget Range</label>
                  <select id="budget" name="budget" class="form-input">
                    <option value="">Select budget…</option>
                    <option value="Under ₦100k">Under ₦100,000</option>
                    <option value="₦100k–₦500k">₦100,000 – ₦500,000</option>
                    <option value="₦500k–₦1m">₦500,000 – ₦1,000,000</option>
                    <option value="Above ₦1m">Above ₦1,000,000</option>
                    <option value="Discuss">Prefer to Discuss</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label" for="start_date">Desired Start Date</label>
                  <input type="date" id="start_date" name="start_date" class="form-input" value="<?php echo htmlspecialchars($fieldData['start_date'] ?? ''); ?>" />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="message">Tell Us About Your Project *</label>
                <textarea id="message" name="message" class="form-input" placeholder="Describe your brand, what you're looking for, target audience, and any specific requirements…" rows="5" required style="resize:vertical;min-height:120px;"><?php echo htmlspecialchars($fieldData['message'] ?? ''); ?></textarea>
              </div>

              <div class="form-group">
                <label class="form-label" for="how_found">How Did You Find Us?</label>
                <select id="how_found" name="how_found" class="form-input">
                  <option value="">Select…</option>
                  <option value="google">Google Search</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter / X</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="referral">Friend / Referral</option>
                  <option value="behance">Behance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <!-- Agreement -->
              <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:28px;">
                <input type="checkbox" id="agree" name="agree" value="1" style="margin-top:3px;width:16px;height:16px;accent-color:var(--primary);flex-shrink:0;" required />
                <label for="agree" style="font-size:.85rem;color:var(--text-muted);line-height:1.65;cursor:pointer;">
                  I agree to be contacted regarding my inquiry. I understand OMG Tech Hub handles client information with strict confidentiality. <a href="terms.php" style="color:var(--primary);">Terms of Service</a>.
                </label>
              </div>

              <!-- Honeypot -->
              <input type="text" name="website_url" style="display:none;" tabindex="-1" autocomplete="off" />

              <button type="submit" class="btn-primary" style="width:100%;justify-content:center;padding:16px 32px;font-size:.97rem;border-radius:12px;">
                <span>Send Message</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>

              <div style="text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid var(--border);">
                <p style="font-size:.84rem;color:var(--text-muted);margin-bottom:14px;">Prefer a faster response?</p>
                <a href="https://wa.me/2347084321204?text=Hi%20OMG%20Tech%20Hub!%20I'd%20like%20to%20discuss%20a%20project."
                   target="_blank" rel="noopener"
                   class="wa-cta-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>
            </form>
          </div>
          <?php endif; ?>

        </div><!-- /.reveal-right -->

      </div><!-- /.contact-grid -->

    </div><!-- /.container -->
  </section>

</main>

<?php include __DIR__ . '/includes/footer.php'; ?>