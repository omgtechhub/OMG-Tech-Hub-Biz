import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/animations/gsap';

interface Props {
  size?: number;
  color?: string;
  opacity?: number;
  blur?: number;
  speed?: number;
}

export default function CursorFollower({
  size = 320,
  color = 'var(--t-accent)',
  opacity = 0.06,
  blur = 80,
  speed = 1.0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(el, {
        x: e.clientX - size / 2,
        y: e.clientY - size / 2,
        duration: speed,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const onMouseEnter = () => gsap.to(el, { opacity, duration: 0.4 });
    const onMouseLeave = () => gsap.to(el, { opacity: 0, duration: 0.4 });

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [size, opacity, speed]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: 0,
        filter: `blur(${blur}px)`,
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
        mixBlendMode: 'normal',
      }}
    />
  );
}
