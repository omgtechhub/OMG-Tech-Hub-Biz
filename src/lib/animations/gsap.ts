import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Honor prefers-reduced-motion globally
if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.defaults({ duration: 0, delay: 0 });
  ScrollTrigger.config({ limitCallbacks: true });
}

export { gsap, ScrollTrigger, useGSAP };
