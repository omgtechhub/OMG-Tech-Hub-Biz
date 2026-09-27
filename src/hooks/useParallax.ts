import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useParallax(strength = 10) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y    = useSpring(rawY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * strength * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * strength * 2);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [rawX, rawY, strength]);

  return { x, y };
}
