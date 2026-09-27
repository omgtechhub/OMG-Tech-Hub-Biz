import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useMagneticButton(strength = 0.3) {
  const ref  = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, { stiffness: 300, damping: 20 });
  const y    = useSpring(rawY, { stiffness: 300, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - (rect.left + rect.width  / 2)) * strength);
    rawY.set((e.clientY - (rect.top  + rect.height / 2)) * strength);
  }, [rawX, rawY, strength]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, x, y, onMouseMove, onMouseLeave };
}
