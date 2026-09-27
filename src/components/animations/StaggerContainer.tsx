import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/animations/gsap';

interface Props {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: string;
  once?: boolean;
  selector?: string;
}

export default function StaggerContainer({
  children,
  stagger = 0.1,
  duration = 0.7,
  delay = 0,
  ease = 'power3.out',
  direction = 'up',
  distance = 30,
  className,
  style,
  threshold = '90%',
  once = true,
  selector = ':scope > *',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll(selector);
      if (!items.length) return;

      const from: gsap.TweenVars = {
        opacity: 0,
        y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
        x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      };

      gsap.fromTo(items, from, {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        ease,
        stagger,
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: `top ${threshold}`,
          once,
        } as ScrollTrigger.Vars,
      });
    },
    { scope: ref, dependencies: [stagger, duration, delay, ease, direction, distance, threshold, once, selector] },
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
