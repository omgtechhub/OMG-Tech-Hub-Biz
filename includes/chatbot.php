<?php
/**
 * OMG Tech Hub — Floating Chat Widget
 * Handles PHP form submission + quick action buttons
 */

$chatSent  = false;
$chatError = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['chat_submit'])) {
  $name    = trim(htmlspecialchars($_POST['chat_name']    ?? ''));
  $email   = trim(htmlspecialchars($_POST['chat_email']   ?? ''));
  $message = trim(htmlspecialchars($_POST['chat_message'] ?? ''));

  if ($name && $email && $message) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
      // In production: send email via mail() or SMTP
      // mail('hello@omgtechhub.com', 'New Chat Enquiry from ' . $name, $message, 'From: ' . $email);
      $chatSent = true;
    } else {
      $chatError = 'Please enter a valid email.';
    }
  } else {
    $chatError = 'All fields are required.';
  }
}
?>

<!-- Floating Chat Widget -->
<div class="chat-widget" role="complementary" aria-label="Chat widget">

  <!-- Chat Panel -->
  <div class="chat-panel" id="chat-panel" role="dialog" aria-label="Chat with OMG Tech Hub" aria-modal="false">

    <!-- Panel Header -->
    <div class="chat-header">
      <div class="chat-header-avatar" aria-hidden="true">🚀</div>
      <div>
        <div class="chat-header-title">Chat with OMG Tech Hub 👋</div>
        <div class="chat-header-sub chat-online">We're online · Usually replies instantly</div>
      </div>
    </div>

    <!-- Panel Body -->
    <div class="chat-body">

      <?php if ($chatSent): ?>
        <!-- Success State -->
        <div style="text-align:center; padding: 20px 0;">
          <div style="font-size: 3rem; margin-bottom: 12px;">✅</div>
          <p style="font-weight: 600; color: var(--text); margin-bottom: 6px;">Message Sent!</p>
          <p style="font-size: 0.85rem; color: var(--text-muted);">We'll get back to you within 1 hour during business hours.</p>
        </div>

      <?php else: ?>

        <!-- Quick Action Buttons -->
        <div class="chat-quick-btns">
          <a href="https://wa.me/2347084321204?text=Hi%20OMG%20Tech%20Hub!%20I%20need%20help%20with%20my%20project."
             target="_blank" rel="noopener noreferrer"
             class="chat-quick-btn" aria-label="WhatsApp us">
            <span class="qb-icon">💬</span>
            <span>WhatsApp Us — Quick Reply</span>
          </a>
          <a href="contact.php#booking" class="chat-quick-btn" aria-label="Book a discovery call">
            <span class="qb-icon">📅</span>
            <span>Book a Discovery Call</span>
          </a>
          <a href="pricing.php" class="chat-quick-btn" aria-label="Get a quote">
            <span class="qb-icon">💰</span>
            <span>Get a Quote</span>
          </a>
        </div>

        <div class="chat-divider">or send a message</div>

        <!-- Contact Form -->
        <?php if ($chatError): ?>
          <p style="font-size: 0.8rem; color: #ef4444; margin-bottom: 10px; text-align: center;">
            ⚠️ <?php echo $chatError; ?>
          </p>
        <?php endif; ?>

        <form class="chat-form" id="chat-form" method="POST" action="" novalidate>
          <input type="hidden" name="chat_submit" value="1" />
          <input
            type="text"
            name="chat_name"
            class="chat-input"
            placeholder="Your name *"
            aria-label="Your name"
            required
            autocomplete="given-name"
            value="<?php echo htmlspecialchars($_POST['chat_name'] ?? ''); ?>"
          />
          <input
            type="email"
            name="chat_email"
            class="chat-input"
            placeholder="Your email *"
            aria-label="Your email"
            required
            autocomplete="email"
            value="<?php echo htmlspecialchars($_POST['chat_email'] ?? ''); ?>"
          />
          <textarea
            name="chat_message"
            class="chat-input"
            placeholder="How can we help you? *"
            aria-label="Your message"
            required
          ><?php echo htmlspecialchars($_POST['chat_message'] ?? ''); ?></textarea>
          <button type="submit" class="chat-submit">Send Message →</button>
        </form>

      <?php endif; ?>

    </div><!-- /.chat-body -->
  </div><!-- /.chat-panel -->

  <!-- Toggle Button -->
  <button class="chat-toggle" id="chat-toggle" aria-label="Open chat" aria-expanded="false" aria-controls="chat-panel">
    <span aria-hidden="true">💬</span>
    <span class="chat-badge" aria-label="1 unread message"></span>
  </button>

</div><!-- /.chat-widget -->
