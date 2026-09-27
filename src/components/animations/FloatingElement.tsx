import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/animations/gsap';

interface Props {
  children: React.ReactNode;
  yRange?: number;
  xRange?: number;
  duration?: number;
  delay?: number;
  rotate?: number;
  ease?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function FloatingElement({
  children,
  yRange = 14,
  xRange = 0,
  duration = 5,
  delay = 0,
  rotate = 1.5,
  ease = 'sine.inOut',
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.to(el, {
        y: yRange,
        x: xRange,
        rotate,
        duration,
        delay,
        ease,
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: ref, dependencies: [yRange, xRange, duration, delay, rotate, ease] },
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
