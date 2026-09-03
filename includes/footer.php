<?php
/**
 * OMG Tech Hub — Footer Include
 * Always dark background regardless of theme.
 */
?>

<!-- WA WRAP -->
<div class="wa-wrap">
  <a href="https://wa.me/2347084321204?text=Hi%20OMG%20Tech%20Hub!%20I'd%20like%20to%20discuss%20a%20project."
     class="wa-float"
     target="_blank"
     rel="noopener noreferrer"
     aria-label="Chat with OMG Tech Hub on WhatsApp">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span class="wa-tooltip">Chat with OMG Tech Hub 👋🏻</span>
  </a>
</div>

<!-- AI CHAT WIDGET -->
<div class="chat-widget" id="chat-widget" aria-live="polite">
  <button class="chat-toggle" id="chat-toggle" aria-label="Open AI assistant" aria-expanded="false">
    <span class="chat-toggle-icon">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </span>
    <span class="chat-badge" id="chat-badge" aria-label="1 new message">1</span>
  </button>
  <div class="chat-panel" id="chat-panel" role="dialog" aria-label="OMG Tech Hub AI assistant">
    <div class="chat-header">
      <div class="chat-avatar" aria-hidden="true"><span>OMG</span></div>
      <div class="chat-header-info">
        <div class="chat-name">OMG Assistant</div>
        <div class="chat-status"><span class="chat-online-dot" aria-hidden="true"></span>Online · Usually replies instantly</div>
      </div>
      <button class="chat-close-btn" id="chat-close-btn" aria-label="Close chat">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="chat-messages" id="chat-messages" role="log" aria-label="Chat messages">
      <div class="chat-bubble chat-bubble-bot">
        👋 Hey! I'm OMG Assistant. How can I help you today? I can answer questions about our services, pricing, and process.
      </div>
    </div>
    <div class="chat-quick-replies" id="chat-quick-replies">
      <button class="chat-qr" data-msg="What services do you offer?">Our Services</button>
      <button class="chat-qr" data-msg="How much do you charge?">Pricing</button>
      <button class="chat-qr" data-msg="How long does a project take?">Timeline</button>
      <button class="chat-qr" data-msg="How do I get started?">Get Started</button>
    </div>
    <div class="chat-input-wrap">
      <input type="text" class="chat-input" id="chat-input" placeholder="Type a message…" aria-label="Type your message" maxlength="200" autocomplete="off" />
      <button class="chat-send" id="chat-send" aria-label="Send message">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">

      <div class="footer-brand">
        <div class="footer-logo"><span>OMG</span>.Tech Hub</div>
        <p class="footer-desc">Premium creative-tech agency based in Benin City, Nigeria. We design brands, build digital products, and craft visual experiences that drive real business results.</p>
        <div class="footer-socials">
          <a href="https://www.instagram.com/omigiedavid?igsh=Njk3b3N4ZjFmM3J0" class="footer-social" aria-label="Instagram" title="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://x.com/OMGTechHub" class="footer-social" aria-label="Twitter" title="Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.264 5.638 5.9-5.638zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/david-omigie-2b0644353" class="footer-social" aria-label="LinkedIn" title="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.facebook.com/omigie.aisosa" class="footer-social footer-social--facebook" aria-label="Facebook" title="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://vm.tiktok.com/ZS9Y444c8CVX7-aQ87R/" class="footer-social footer-social--tiktok" aria-label="TikTok" title="TikTok">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
          </a>
        </div>
        <form class="newsletter-form" style="margin-top:24px;" aria-label="Newsletter signup">
          <input type="email" class="newsletter-input" placeholder="Your email address" aria-label="Email address" required />
          <button type="submit" class="newsletter-btn">Subscribe</button>
        </form>
      </div>

      <div class="footer-col">
        <h3 class="footer-col-title">Company</h3>
        <nav class="footer-links" aria-label="Company links">
          <a href="index.php">Home</a>
          <a href="about.php">About Us</a>
          <a href="process.php">Our Process</a>
          <a href="portfolio.php">Portfolio</a>
          <a href="blog.php">Blog</a>
          <a href="contact.php">Contact</a>
        </nav>
      </div>

      <div class="footer-col">
        <h3 class="footer-col-title">Services</h3>
        <nav class="footer-links" aria-label="Services links">
          <a href="services.php">Brand Identity</a>
          <a href="services.php">Web Development</a>
          <a href="services.php">UI/UX Design</a>
          <a href="services.php">Motion Graphics</a>
          <a href="services.php">Video Editing</a>
          <a href="services.php">Animation</a>
          <a href="services.php">Graphic Design</a>
        </nav>
      </div>

      <div class="footer-col">
        <h3 class="footer-col-title">Contact</h3>
        <div class="footer-links">
          <span style="color:rgba(255,255,255,.4);font-size:.88rem;pointer-events:none;">📍 Benin City, Edo State, Nigeria</span>
          <a href="mailto:omigiegraphics@gmail.com">omigiegraphics@gmail.com</a>
          <a href="tel:+2347084321204">+234 708 432 1204</a>
          <a href="https://wa.me/2347084321204" target="_blank" rel="noopener" style="color:#25D366;font-weight:600;">💬 WhatsApp Us</a>
          <a href="contact.php" style="color:var(--accent);font-weight:600;margin-top:8px;">📅 Book a Discovery Call →</a>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <p class="footer-copy">&copy; <?php echo date('Y'); ?> OMG Tech Hub. All rights reserved. Built with ❤️ in Benin City, Nigeria.</p>
      <nav class="footer-bottom-links" aria-label="Legal links">
        <a href="privacy-policy.php">Privacy Policy</a>
        <a href="terms.php">Terms of Service</a>
        <a href="cookie-policy.php">Cookie Policy</a>
      </nav>
    </div>

  </div>
</footer>

<script src="assets/js/main.js"></script>
</body>
</html>
