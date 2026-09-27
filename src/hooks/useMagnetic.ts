import { useRef, useCallback } from 'react';
import { gsap } from '../lib/animations/gsap';

export function useMagnetic(strength = 0.4) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
