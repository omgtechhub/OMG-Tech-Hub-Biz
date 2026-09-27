import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/animations/gsap';

type Direction = 'left' | 'right' | 'top' | 'bottom';

interface Props {
  src: string;
  alt: string;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  direction?: Direction;
  threshold?: string;
  once?: boolean;
  scaleFrom?: number;
}

const clipStart: Record<Direction, string> = {
  left:   'inset(0 100% 0 0)',
  right:  'inset(0 0 0 100%)',
  top:    'inset(100% 0 0 0)',
  bottom: 'inset(0 0 100% 0)',
};

export default function RevealImage({
  src,
  alt,
  duration = 1.2,
  delay = 0,
  ease = 'power4.inOut',
  className,
  imgClassName,
  style,
  direction = 'left',
  threshold = '80%',
  once = true,
  scaleFrom = 1.08,
}: Props) {
  const ref    = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const wrapper = ref.current;
      const img = imgRef.current;
      if (!wrapper || !img) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: `top ${threshold}`,
          once,
        },
      });

      tl.fromTo(
        wrapper,
        { clipPath: clipStart[direction] },
        { clipPath: 'inset(0 0% 0 0)', duration, delay, ease },
      ).fromTo(
        img,
        { scale: scaleFrom },
        { scale: 1, duration, ease, clearProps: 'transform' },
        0,
      );
    },
    { scope: ref, dependencies: [direction, duration, delay, ease, threshold, once, scaleFrom] },
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: 'hidden', clipPath: clipStart[direction], ...style }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={imgClassName}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', scale: String(scaleFrom) }}
      />
    </div>
  );
}
