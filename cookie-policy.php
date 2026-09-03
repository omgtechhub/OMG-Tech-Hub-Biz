<?php
$pageTitle   = 'Cookie Policy | OMG Tech Hub';
$pageDesc    = 'Read the OMG Tech Hub Cookie Policy to understand how we use cookies and how you can manage your preferences.';
$pageCurrent = '';
include __DIR__ . '/includes/header.php';
include __DIR__ . '/includes/navbar.php';
?>

<main id="main-content">

  <!-- PAGE HERO -->
  <section class="about-hero section" aria-labelledby="cookie-heading" style="padding-bottom:60px;">
    <div class="hero-orb orb-1" style="opacity:0.1;" aria-hidden="true"></div>
    <div class="hero-grid" style="opacity:0.2;" aria-hidden="true"></div>
    <div class="container">
      <span class="section-tag reveal">Legal</span>
      <h1 id="cookie-heading" class="page-hero-title reveal">Cookie Policy</h1>
      <p class="section-subtitle reveal" style="margin-top:12px;">
        Last updated: <time datetime="2025-01-01">1 January 2025</time>
      </p>
    </div>
  </section>

  <!-- CONTENT -->
  <section class="section" style="padding-top:0;">
    <div class="container">
      <div class="legal-wrap">

        <nav class="legal-toc" aria-label="Table of contents">
          <p class="legal-toc-title">On this page</p>
          <ol>
            <li><a href="#what-are-cookies">What Are Cookies?</a></li>
            <li><a href="#how-we-use">How We Use Cookies</a></li>
            <li><a href="#types">Types of Cookies We Use</a></li>
            <li><a href="#third-party">Third-Party Cookies</a></li>
            <li><a href="#managing">Managing Your Cookies</a></li>
            <li><a href="#updates">Updates to This Policy</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ol>
        </nav>

        <div class="legal-body">

          <div class="legal-intro">
            This Cookie Policy explains how <strong>OMG Tech Hub</strong> uses cookies and similar
            tracking technologies on our website at <a href="https://omgtechhub.com">omgtechhub.com</a>.
            It should be read alongside our <a href="privacy-policy.php">Privacy Policy</a>, which
            describes how we handle personal data more broadly.
          </div>

          <div class="legal-section" id="what-are-cookies">
            <h2>1. What Are Cookies?</h2>
            <p>Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work efficiently, to remember your preferences, and to provide analytics information to site owners.</p>
            <p>Similar technologies — such as web beacons, pixel tags, and local storage — work in comparable ways and are also covered by this policy. We refer to all of these collectively as &ldquo;cookies&rdquo;.</p>
          </div>

          <div class="legal-section" id="how-we-use">
            <h2>2. How We Use Cookies</h2>
            <p>We use cookies to:</p>
            <ul>
              <li>Make our website function correctly and securely.</li>
              <li>Remember your preferences (e.g. dark/light mode theme selection).</li>
              <li>Understand how visitors use our site so we can improve it.</li>
              <li>Measure the effectiveness of our content and services.</li>
            </ul>
            <p>We do not use cookies to serve targeted advertising or to sell your data to third parties.</p>
          </div>

          <div class="legal-section" id="types">
            <h2>3. Types of Cookies We Use</h2>

            <div class="legal-cookie-table">
              <div class="cookie-row cookie-row-header">
                <span>Cookie Type</span>
                <span>Purpose</span>
                <span>Duration</span>
              </div>

              <div class="cookie-row">
                <span class="cookie-type">
                  <strong>Strictly Necessary</strong>
                  <em>Essential</em>
                </span>
                <span>These cookies are required for the website to function. They enable core features like page navigation, the admin panel session, and form security (CSRF tokens). The site cannot work properly without them.</span>
                <span class="cookie-duration">Session / Up to 1 day</span>
              </div>

              <div class="cookie-row">
                <span class="cookie-type">
                  <strong>Preference</strong>
                  <em>Functional</em>
                </span>
                <span>These cookies remember your choices and personalise your experience. For example, we store your dark/light theme preference in <code>localStorage</code> so the site loads in your preferred mode on return visits.</span>
                <span class="cookie-duration">Up to 1 year</span>
              </div>

              <div class="cookie-row">
                <span class="cookie-type">
                  <strong>Analytics</strong>
                  <em>Performance</em>
                </span>
                <span>If analytics tools are enabled, these cookies collect anonymised information about how visitors use our site — which pages are most visited, how long visitors stay, and where they come from. This helps us improve the site. No personally identifiable information is collected by analytics cookies.</span>
                <span class="cookie-duration">Up to 2 years</span>
              </div>

              <div class="cookie-row">
                <span class="cookie-type">
                  <strong>Admin Session</strong>
                  <em>Security</em>
                </span>
                <span>When an administrator logs into the OMG Tech Hub admin panel, a session cookie is created to authenticate the session securely. This cookie is deleted when the browser is closed or the administrator logs out.</span>
                <span class="cookie-duration">Session only</span>
              </div>
            </div>

            <div class="legal-notice">
              <strong>Note on localStorage:</strong> We use the browser's <code>localStorage</code> API (not a cookie) to store your theme preference (dark/light mode). This data stays on your device only and is never sent to our servers.
            </div>
          </div>

          <div class="legal-section" id="third-party">
            <h2>4. Third-Party Cookies</h2>
            <p>Some of our pages may include content or functionality from third parties that may set their own cookies. These third parties include:</p>

            <ul>
              <li>
                <strong>Google Fonts</strong> — we load fonts from Google&rsquo;s servers. Google may set cookies or collect data in accordance with
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google&rsquo;s Privacy Policy</a>.
              </li>
              <li>
                <strong>WhatsApp (Meta)</strong> — our &ldquo;Chat on WhatsApp&rdquo; links redirect to WhatsApp&rsquo;s platform. If you click them, WhatsApp&rsquo;s own privacy practices apply.
              </li>
              <li>
                <strong>Cloudflare</strong> — we use Cloudflare CDN for performance and security. Cloudflare may set performance and security cookies. See
                <a href="https://www.cloudflare.com/cookie-policy/" target="_blank" rel="noopener">Cloudflare&rsquo;s Cookie Policy</a>.
              </li>
            </ul>
            <p>We do not control the cookies set by third parties and recommend reviewing their respective privacy policies.</p>
          </div>

          <div class="legal-section" id="managing">
            <h2>5. Managing Your Cookies</h2>
            <p>You have several options for managing cookies:</p>

            <h3>5.1 Browser Settings</h3>
            <p>All modern browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies, alert you when cookies are being sent, or delete cookies after your visit. Note that blocking strictly necessary cookies may prevent parts of our website from functioning correctly.</p>
            <p>Find cookie settings for popular browsers:</p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/view-cookies-in-microsoft-edge-a7d95376-f2cd-8e4a-25dc-1de753474879" target="_blank" rel="noopener">Microsoft Edge</a></li>
            </ul>

            <h3>5.2 Opt-Out of Analytics</h3>
            <p>If we use Google Analytics, you can opt out of tracking by installing the
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-Out Browser Add-on</a>.</p>

            <h3>5.3 Clearing localStorage</h3>
            <p>To clear your stored theme preference, open your browser&rsquo;s developer tools, navigate to &ldquo;Application&rdquo; &rarr; &ldquo;Local Storage&rdquo;, and delete the <code>omg_theme</code> key. Alternatively, clearing your browser data will remove it.</p>
          </div>

          <div class="legal-section" id="updates">
            <h2>6. Updates to This Policy</h2>
            <p>We may update this Cookie Policy from time to time as our website evolves or regulations change. The &ldquo;Last updated&rdquo; date at the top of this page will reflect any changes. We encourage you to check this page periodically.</p>
          </div>

          <div class="legal-section" id="contact-us">
            <h2>7. Contact Us</h2>
            <p>If you have any questions about our use of cookies, please contact us:</p>
            <div class="legal-contact-card">
              <p><strong>OMG Tech Hub</strong></p>
              <p>Benin City, Edo State, Nigeria</p>
              <p>Email: <a href="mailto:hello@omgtechhub.com">hello@omgtechhub.com</a></p>
              <p>Phone: <a href="tel:+2347084321204">+234 708 432 1204</a></p>
            </div>
          </div>

          <div class="legal-nav-links">
            <a href="privacy-policy.php">Privacy Policy →</a>
            <a href="terms.php">Terms of Service →</a>
          </div>

        </div><!-- /.legal-body -->
      </div><!-- /.legal-wrap -->
    </div>
  </section>

</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
