import { useState, useEffect, useRef } from 'react';

export function useScrollProgress(containerRef?: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef?.current ?? null;

    const update = () => {
      if (el) {
        const max = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? el.scrollTop / max : 0);
      } else {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? scrollTop / max : 0);
      }
    };

    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    const target: EventTarget = el ?? window;
    target.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      target.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef]);

  return progress;
}
