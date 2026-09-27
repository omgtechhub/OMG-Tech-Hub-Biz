import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const observed = new WeakSet();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el    = entry.target;
            const delay = parseFloat(el.getAttribute('data-delay') || '0');
            setTimeout(() => {
              el.classList.add('revealed');
              observer.unobserve(el);
            }, delay * 1000);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    const observeIfNew = (el) => {
      if (!observed.has(el)) {
        observed.add(el);
        observer.observe(el);
      }
    };

    const scan = (root) => {
      if (root.nodeType !== 1) return;
      if (root.matches?.('[data-reveal]')) observeIfNew(root);
      root.querySelectorAll?.('[data-reveal]').forEach(observeIfNew);
    };

    // Elements present at mount (e.g. hardcoded/static content resolved on first render)
    scan(document.body);

    // Elements added later (e.g. content that swaps in after an async data fetch resolves)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(scan);
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
