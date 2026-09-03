/* ============================================================
   OMG Tech Hub — Premium Agency JS v2.0
   ============================================================ */
(function () {
  'use strict';

  /* ── 1. Intro Loader ───────────────────────────────────── */
  function initLoader() {
    const loader = document.getElementById('intro-loader');
    if (!loader) return;
    if (sessionStorage.getItem('omg_loader_shown')) {
      loader.style.display = 'none'; return;
    }
    setTimeout(() => {
      loader.classList.add('hidden');
      sessionStorage.setItem('omg_loader_shown', '1');
    }, 2700);
  }

  /* ── 2. Custom Cursor ──────────────────────────────────── */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function anim() {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(anim);
    })();
    document.querySelectorAll('a, button, [data-cursor], .portfolio-card, .blog-card, .service-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }

  /* ── 3. Theme Toggle ───────────────────────────────────── */
  function initTheme() {
    const btn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    const saved = localStorage.getItem('omg_theme') || 'light';
    html.setAttribute('data-theme', saved);
    if (icon) icon.textContent = saved === 'dark' ? '☀️' : '🌙';
    if (btn) btn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.classList.add('theme-switching');
  html.setAttribute('data-theme', next);
  localStorage.setItem('omg_theme', next);
  if (icon) icon.textContent = next === 'dark' ? '☀️' : '🌙';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      html.classList.remove('theme-switching');
    });
  });
});
  }

  /* ── 4. Navbar Scroll & Active ─────────────────────────── */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
    const current = window.location.pathname.split('/').pop() || 'index.php';
    navbar.querySelectorAll('.nav-menu a').forEach(link => {
      const href = link.getAttribute('href').split('/').pop();
      if (href === current || (current === '' && href === 'index.php'))
        link.classList.add('active');
    });
  }

  /* ── 5. Mobile Nav — FIXED ─────────────────────────────── */
  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay   = document.querySelector('.mobile-nav-overlay');
    if (!hamburger || !mobileNav) return;

    function openNav() {
      hamburger.classList.add('open');
      mobileNav.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    }
    function closeNav() {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }
    hamburger.addEventListener('click', () => {
      mobileNav.classList.contains('open') ? closeNav() : openNav();
    });
    // Close button inside nav
    const closeBtn = mobileNav.querySelector('.mobile-nav-close');
    if (closeBtn) closeBtn.addEventListener('click', closeNav);
    // Close on overlay click
    if (overlay) overlay.addEventListener('click', closeNav);
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });
    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ── 6. Scroll Reveal ──────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;
    const vp = window.innerHeight;
    // Pre-mark elements already in viewport so they don't flash hidden
    els.forEach(el => {
      if (el.getBoundingClientRect().top < vp) el.classList.add('visible');
    });
    // Now safe to hide non-visible ones
    document.documentElement.classList.add('js-ready');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });
    els.forEach(el => { if (!el.classList.contains('visible')) obs.observe(el); });
  }

  /* ── 7. Count-Up Animation ─────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const dur    = 2200;
      let start    = null;
      function tick(ts) {
        if (!start) start = ts;
        const p      = Math.min((ts - start) / dur, 1);
        const eased  = 1 - Math.pow(1 - p, 3); // cubic ease-out
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }

  /* ── 8. Testimonial Slider — FIXED ─────────────────────── */
  function initSlider() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;
    const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
    const dots = Array.from(document.querySelectorAll('.slider-dot'));
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const sliderWrap = document.querySelector('.testimonial-slider');
    let current = 0;
    let autoTimer = null;

    function goTo(idx) {
      current = ((idx % slides.length) + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === current);
        d.setAttribute('aria-selected', i === current ? 'true' : 'false');
      });
    }
    function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 5500); }
    function stopAuto() { clearInterval(autoTimer); }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));

    // Pause on hover
    if (sliderWrap) {
      sliderWrap.addEventListener('mouseenter', stopAuto);
      sliderWrap.addEventListener('mouseleave', startAuto);
    }

    // Touch swipe
    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { stopAuto(); goTo(current + (diff > 0 ? 1 : -1)); startAuto(); }
    }, { passive: true });

    goTo(0);
    startAuto();
  }

  /* ── 9. Work Category Tabs ─────────────────────────────── */
  function initWorkTabs() {
    const tabs  = document.querySelectorAll('.work-tab');
    const cards = document.querySelectorAll('#work-panel .portfolio-card');
    if (!tabs.length || !cards.length) return;

    function showCategory(cat) {
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cardCat === cat) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92) translateY(16px)';
          setTimeout(() => {
            card.style.transition = 'opacity .45s var(--ease-smooth), transform .45s var(--ease-smooth)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => { card.style.display = 'none'; }, 320);
        }
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        showCategory(tab.getAttribute('data-category'));
      });
    });
  }

  /* ── 10. Portfolio Filter ──────────────────────────────── */
  function initPortfolioFilter() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.portfolio-card');
    if (!tabs.length || !cards.length) return;
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.opacity = '0'; card.style.transform = 'scale(0.9)'; card.style.display = '';
            setTimeout(() => {
              card.style.transition = 'opacity .4s, transform .4s';
              card.style.opacity = '1'; card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.transition = 'opacity .3s, transform .3s';
            card.style.opacity = '0'; card.style.transform = 'scale(0.9)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  /* ── 11. Chat Widget ───────────────────────────────────── */
  function initChatWidget() {
    const widget = document.querySelector('.chat-widget');
    const toggle = document.querySelector('.chat-toggle');
    const panel = document.querySelector('.chat-panel');
    if (!toggle || !panel) return;

    const botMessages = [
      "👋 Hi! I'm OMG's AI assistant. How can we help you today?",
      "We'd love to learn about your project!"
    ];

    // Show initial message
    const msgContainer = panel.querySelector('.chat-messages');
    if (msgContainer && msgContainer.children.length === 0) {
      botMessages.forEach((msg, i) => {
        setTimeout(() => {
          const bubble = document.createElement('div');
          bubble.className = 'chat-bubble chat-bubble-bot';
          bubble.textContent = msg;
          msgContainer.appendChild(bubble);
          msgContainer.scrollTop = msgContainer.scrollHeight;
        }, i * 600);
      });
    }

    function openChat() {
      widget.classList.add('open');
      panel.classList.add('open');
      const badge = widget.querySelector('.chat-badge');
      if (badge) badge.style.display = 'none';
    }
    function closeChat() {
      widget.classList.remove('open');
      panel.classList.remove('open');
    }

    toggle.addEventListener('click', e => {
      e.stopPropagation();
      widget.classList.contains('open') ? closeChat() : openChat();
    });

    // Close button inside the panel header
    const closeBtn = panel.querySelector('#chat-close-btn') || panel.querySelector('.chat-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', e => {
        e.stopPropagation();
        closeChat();
      });
    }

    document.addEventListener('click', e => {
      if (widget && !widget.contains(e.target)) {
        closeChat();
      }
    });

    // Quick replies
    panel.querySelectorAll('.chat-qr').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.textContent;
        addUserMessage(text);
        addTyping();
        fetch('chat-handler.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text })
        })
        .then(r => r.json())
        .then(data => { removeTyping(); addBotMessage(data.reply || 'Sorry, something went wrong.'); })
        .catch(() => { removeTyping(); addBotMessage("I'm having trouble connecting. Please reach us on WhatsApp 📱"); });
      });
    });

    // Chat form
    const chatForm = panel.querySelector('form') || panel;
    const chatInput = panel.querySelector('.chat-input');
    const chatSend = panel.querySelector('.chat-send');

    function sendMessage() {
      if (!chatInput || !chatInput.value.trim()) return;
      const msg = chatInput.value.trim();
      addUserMessage(msg);
      chatInput.value = '';
      addTyping();
      fetch('chat-handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      })
      .then(r => r.json())
      .then(data => { removeTyping(); addBotMessage(data.reply || 'Sorry, something went wrong.'); })
      .catch(() => { removeTyping(); addBotMessage("I'm having trouble connecting. Please reach us on WhatsApp 📱"); });
    }

    if (chatSend) chatSend.addEventListener('click', sendMessage);
    if (chatInput) chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

    function addUserMessage(text) {
      if (!msgContainer) return;
      const b = document.createElement('div');
      b.className = 'chat-bubble chat-bubble-user';
      b.textContent = text;
      msgContainer.appendChild(b);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
    function addBotMessage(text) {
      if (!msgContainer) return;
      const b = document.createElement('div');
      b.className = 'chat-bubble chat-bubble-bot';
      b.textContent = text;
      msgContainer.appendChild(b);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
    function addTyping() {
      if (!msgContainer) return;
      const t = document.createElement('div');
      t.className = 'chat-bubble chat-bubble-bot';
      t.id = 'chat-typing-indicator';
      t.textContent = 'Typing…';
      msgContainer.appendChild(t);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
    function removeTyping() {
      const t = document.getElementById('chat-typing-indicator');
      if (t) t.remove();
    }
  }

  /* ── 12. FAQ Accordion ─────────────────────────────────── */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const q = item.querySelector('.faq-question');
      if (!q) return;
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  /* ── 13. Contact Form ──────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', () => {
      const btn = form.querySelector('[type="submit"]');
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
    });
  }

  /* ── 14. Page Transition — Branded ─────────────────────── */
  function initPageTransition() {
    const overlay = document.querySelector('.page-transition');
    if (!overlay) return;

    // Always force-clear overlay on page load with a hard deadline
    overlay.classList.remove('entering');
    overlay.style.opacity = '';
    overlay.style.pointerEvents = '';
    requestAnimationFrame(function() {
      overlay.classList.add('leaving');
      // Failsafe: force hide after 800ms no matter what
      setTimeout(function() {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }, 800);
    });

  }

  /* ── 15. Hero Canvas Particles ─────────────────────────── */
  function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles, animId;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function Particle() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.r     = Math.random() * 1.2 + 0.4;
      this.dx    = (Math.random() - 0.5) * 0.3;
      this.dy    = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.35 + 0.06;
    }

    function init() {
      resize();
      particles = [];
      // Reduced from 55 to 35
      for (let i = 0; i < 35; i++) particles.push(new Particle());
    }

    // Cache theme color so we don't read the DOM every frame
    let cachedColor = '255,255,255';
    function updateColor() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      cachedColor = isDark ? '255,255,255' : '122,13,13';
    }
    updateColor();

    // Update color when theme changes
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    function draw() {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      const c = cachedColor;

      // Draw dots
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},${p.alpha})`;
        ctx.fill();
      });

      // Draw lines — only check every other particle to halve the calculations
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${c},${0.04 * (1 - d / 100)})`;
            ctx.stroke();
          }
        }
      }
    }

    init();
    draw();
    window.addEventListener('resize', init, { passive: true });

    // Pause animation when tab is hidden to save resources
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        draw();
      }
    });
  }

  /* ── 16. Newsletter Form ───────────────────────────────── */
  function initNewsletter() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('.newsletter-input');
        const btn   = form.querySelector('.newsletter-btn');
        if (!input || !btn) return;
        const email = input.value.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          input.style.borderColor = '#ef4444';
          setTimeout(() => { input.style.borderColor = ''; }, 2000);
          return;
        }
        const orig = btn.textContent;
        btn.textContent = '…';
        btn.disabled = true;
        const fd = new FormData();
        fd.append('email', email);
        fetch('api/newsletter.php', { method: 'POST', body: fd })
          .then(r => r.json())
          .then(data => {
            btn.textContent = data.ok ? '✓ Subscribed!' : data.msg || 'Try again';
            if (data.ok) input.value = '';
            btn.style.background = data.ok ? '#16a34a' : '#ef4444';
            setTimeout(() => {
              btn.textContent = orig;
              btn.disabled = false;
              btn.style.background = '';
            }, 3500);
          })
          .catch(() => {
            btn.textContent = 'Try again';
            btn.disabled = false;
            setTimeout(() => { btn.textContent = orig; }, 2000);
          });
      });
    });
  }

  /* ── 17. Pricing Toggle ────────────────────────────────── */
  function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    if (!toggle) return;
    toggle.addEventListener('change', () => {
      document.querySelectorAll('[data-monthly][data-annual]').forEach(el => {
        el.textContent = toggle.checked ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
      });
    });
  }

  /* ── 18. Blog Search ───────────────────────────────────── */
  function initBlogSearch() {
    const input = document.getElementById('blog-search');
    if (!input) return;

    function doSearch() {
      const q = input.value.toLowerCase().trim();
      let visible = 0;
      document.querySelectorAll('.blog-card').forEach(card => {
        const title = (card.querySelector('.blog-title') || card.querySelector('h3') || {}).textContent || '';
        const exc   = (card.querySelector('.blog-excerpt') || card.querySelector('p') || {}).textContent || '';
        const cat   = (card.getAttribute('data-category') || '');
        const match = !q || (title + exc + cat).toLowerCase().includes(q);
        card.style.display = match ? '' : 'none';
        if (match) visible++;
      });
      // Show no results message
      let noResults = document.getElementById('blog-no-results');
      if (!noResults) {
        noResults = document.createElement('p');
        noResults.id = 'blog-no-results';
        noResults.style.cssText = 'text-align:center;padding:40px;color:var(--text-muted);display:none;grid-column:1/-1;';
        noResults.textContent = 'No articles found for your search. Try different keywords.';
        const grid = document.querySelector('.blog-grid');
        if (grid) grid.appendChild(noResults);
      }
      noResults.style.display = visible === 0 && q ? 'block' : 'none';
    }

    input.addEventListener('input', doSearch);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); doSearch(); } });

    // Wire up any search button nearby
    const btn = input.closest('div')?.querySelector('button') ||
                document.querySelector('.blog-search-btn') ||
                input.nextElementSibling;
    if (btn && btn.tagName === 'BUTTON') btn.addEventListener('click', doSearch);
  }

  /* ── 19. Lightbox ──────────────────────────────────────── */
  function initLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    const lbClose = lb.querySelector('.lb-close');
    const lbTitle = lb.querySelector('.lb-title');
    const lbCat = lb.querySelector('.lb-cat');
    const lbDesc = lb.querySelector('.lb-desc');
    document.querySelectorAll('.portfolio-card[data-title]').forEach(card => {
      card.addEventListener('click', () => {
        if (lbTitle) lbTitle.textContent = card.getAttribute('data-title') || '';
        if (lbCat) lbCat.textContent = card.getAttribute('data-category') || '';
        if (lbDesc) lbDesc.textContent = card.getAttribute('data-desc') || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLB() { lb.classList.remove('open'); document.body.style.overflow = ''; }
    if (lbClose) lbClose.addEventListener('click', closeLB);
    lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
  }

  /* ── Init ──────────────────────────────────────────────── */
  function init() {
    initLoader();
    initCursor();
    initTheme();
    initNavbar();
    initMobileNav();
    initReveal();
    initCounters();
    initSlider();
    initWorkTabs();
    initPortfolioFilter();
    initChatWidget();
    initFAQ();
    initContactForm();
    initPageTransition();
    initParticles();
    initNewsletter();
    initPricingToggle();
    initBlogSearch();
    initLightbox();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/* ── bfcache fix — browser back/forward navigation ── */
/*window.addEventListener('pageshow', function(e) {
  if (e.persisted) {
    // Force-hide the page transition overlay
    var overlay = document.querySelector('.page-transition');
    if (overlay) {
      overlay.classList.remove('entering');
      overlay.classList.add('leaving');
    }

    // Force-hide the intro loader
    var loader = document.getElementById('intro-loader');
    if (loader) {
      loader.classList.add('hidden');
      loader.style.display = 'none';
    }

    // Re-apply saved theme
    var saved = localStorage.getItem('omg_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);

    // Rewire nav toggle
    var navToggle  = document.getElementById('nav-toggle');
    var navOverlay = document.getElementById('nav-overlay');
    var navClose   = document.getElementById('nav-close');
    if (navToggle && navOverlay) {
      navToggle.onclick = function() {
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
      if (navClose) navClose.onclick = function() {
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      };
    }
  }
});*/

/* ── bfcache + overlay failsafe ── */
window.addEventListener('pageshow', function(e) {
  var overlay = document.querySelector('.page-transition');
  if (overlay) {
    overlay.classList.remove('entering');
    overlay.classList.add('leaving');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  }
  var loader = document.getElementById('intro-loader');
  if (loader) { loader.classList.add('hidden'); loader.style.display = 'none'; }

  if (e.persisted) {
    var saved = localStorage.getItem('omg_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    var icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = saved === 'dark' ? '☀️' : '🌙';

    // Rewire theme toggle
    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      var newBtn = themeBtn.cloneNode(true);
      themeBtn.parentNode.replaceChild(newBtn, themeBtn);
      newBtn.addEventListener('click', function() {
        var html = document.documentElement;
        var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('omg_theme', next);
        var ic = document.getElementById('theme-icon');
        if (ic) ic.textContent = next === 'dark' ? '☀️' : '🌙';
      });
    }

    // Rewire hamburger
    var hamburger = document.querySelector('.hamburger');
    var mobileNav = document.querySelector('.mobile-nav');
    var mobOverlay = document.querySelector('.mobile-nav-overlay');
    if (hamburger && mobileNav) {
      var newHam = hamburger.cloneNode(true);
      hamburger.parentNode.replaceChild(newHam, hamburger);
      newHam.addEventListener('click', function() {
        var isOpen = mobileNav.classList.contains('open');
        if (isOpen) {
          newHam.classList.remove('open');
          mobileNav.classList.remove('open');
          if (mobOverlay) mobOverlay.classList.remove('open');
          document.body.style.overflow = '';
        } else {
          newHam.classList.add('open');
          mobileNav.classList.add('open');
          if (mobOverlay) mobOverlay.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    }

    // Rewire chat toggle
    var chatToggle = document.querySelector('.chat-toggle');
    var chatWidget = document.querySelector('.chat-widget');
    var chatPanel  = document.querySelector('.chat-panel');
    if (chatToggle && chatWidget && chatPanel) {
      var newToggle = chatToggle.cloneNode(true);
      chatToggle.parentNode.replaceChild(newToggle, chatToggle);
      newToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (chatWidget.classList.contains('open')) {
          chatWidget.classList.remove('open');
          chatPanel.classList.remove('open');
        } else {
          chatWidget.classList.add('open');
          chatPanel.classList.add('open');
          var badge = chatWidget.querySelector('.chat-badge');
          if (badge) badge.style.display = 'none';
        }
      });
    }
  }
});