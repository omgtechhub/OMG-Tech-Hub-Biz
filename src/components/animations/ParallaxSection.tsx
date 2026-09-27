import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/animations/gsap';

interface Props {
  children: React.ReactNode;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  className?: string;
  style?: React.CSSProperties;
  scrub?: number | boolean;
}

export default function ParallaxSection({
  children,
  speed = 0.25,
  direction = 'vertical',
  className,
  style,
  scrub = 1.2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const offset = speed * 100;
      const isV = direction === 'vertical';

      gsap.fromTo(
        el,
        {
          y: isV ? offset : 0,
          x: isV ? 0 : offset,
        },
        {
          y: isV ? -offset : 0,
          x: isV ? 0 : -offset,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub,
          },
        },
      );
    },
    { scope: ref, dependencies: [speed, direction, scrub] },
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
