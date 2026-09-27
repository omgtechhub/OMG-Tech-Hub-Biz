import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/animations/gsap';

interface Props {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  ease?: string;
  className?: string;
  style?: React.CSSProperties;
  threshold?: string;
  once?: boolean;
}

export default function TextReveal({
  children,
  delay = 0,
  duration = 0.9,
  ease = 'power4.out',
  className,
  style,
  threshold = '90%',
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const inner = ref.current?.querySelector('[data-tr-inner]') as HTMLElement | null;
      if (!inner) return;

      gsap.fromTo(
        inner,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start: `top ${threshold}`,
            once,
          },
        },
      );
    },
    { scope: ref, dependencies: [delay, duration, ease, threshold, once] },
  );

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', ...style }}>
      <span data-tr-inner style={{ display: 'block', opacity: 0 }}>
        {children}
      </span>
    </div>
  );
}
