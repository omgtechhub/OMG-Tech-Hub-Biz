import { useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';

export function useReveal(delay = 0, amount = 0.2) {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
}
