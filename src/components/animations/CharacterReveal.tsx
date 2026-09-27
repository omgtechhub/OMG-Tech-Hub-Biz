import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/animations/gsap';

interface Props {
  text: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  charClassName?: string;
  threshold?: string;
  once?: boolean;
}

export default function CharacterReveal({
  text,
  stagger = 0.03,
  duration = 0.7,
  delay = 0,
  ease = 'power4.out',
  className,
  charClassName,
  threshold = '90%',
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const chars = text.split('');

  useGSAP(
    () => {
      const inners = ref.current?.querySelectorAll('[data-cr-inner]');
      if (!inners?.length) return;

      gsap.fromTo(
        inners,
        { yPercent: 115, opacity: 0, rotateX: 40 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration,
          delay,
          ease,
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: `top ${threshold}`,
            once,
          },
        },
      );
    },
    { scope: ref, dependencies: [stagger, duration, delay, ease, threshold, once] },
  );

  return (
    <div
      ref={ref}
      className={className}
      aria-label={text}
      style={{ display: 'flex', flexWrap: 'wrap', perspective: '600px' }}
    >
      {chars.map((char, i) =>
        char === ' ' ? (
          <span key={i} style={{ display: 'inline-block', width: '0.3em' }} aria-hidden="true" />
        ) : (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.05em' }}
            aria-hidden="true"
          >
            <span
              data-cr-inner
              className={charClassName}
              style={{ display: 'inline-block', opacity: 0 }}
            >
              {char}
            </span>
          </span>
        ),
      )}
    </div>
  );
}
