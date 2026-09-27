import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../lib/animations/gsap';
import { LENIS_CONFIG } from '../lib/animations/lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Disable CSS smooth scroll — Lenis handles it
    document.documentElement.style.scrollBehavior = 'auto';

    const lenis = new Lenis(LENIS_CONFIG);
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis via GSAP ticker for synchronized RAF
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Scroll to top and refresh triggers on route change
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    // Defer refresh so new page DOM is rendered first
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return lenisRef;
}
