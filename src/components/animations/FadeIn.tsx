import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/animations/gsap';

interface Props {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
  threshold?: string;
}

export default function FadeIn({
  children,
  direction = 'up',
  distance = 40,
  duration = 0.8,
  delay = 0,
  ease = 'power3.out',
  className,
  style,
  once = true,
  threshold = '85%',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const from: gsap.TweenVars = {
        opacity: 0,
        y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
        x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      };

      gsap.fromTo(el, from, {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        ease,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: `top ${threshold}`,
          once,
        } as ScrollTrigger.Vars,
      });
    },
    { scope: ref, dependencies: [direction, distance, duration, delay, ease, once, threshold] },
  );

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  );
}
