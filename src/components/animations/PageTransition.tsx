import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/animations/gsap';

interface Props {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  ease?: string;
  distance?: number;
}

export default function PageTransition({
  children,
  className,
  duration = 0.7,
  delay = 0.05,
  ease = 'power3.out',
  distance = 24,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      // Fire immediately on mount — no ScrollTrigger needed
      gsap.fromTo(
        el,
        { opacity: 0, y: distance },
        { opacity: 1, y: 0, duration, delay, ease, clearProps: 'transform,opacity' },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
