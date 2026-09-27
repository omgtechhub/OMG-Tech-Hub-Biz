import { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/animations/gsap';

interface Props {
  text: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
  wordClassName?: string;
  threshold?: string;
  once?: boolean;
}

export default function WordReveal({
  text,
  stagger = 0.06,
  duration = 0.8,
  delay = 0,
  ease = 'power4.out',
  className,
  wordClassName,
  threshold = '90%',
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useGSAP(
    () => {
      const inners = ref.current?.querySelectorAll('[data-wr-inner]');
      if (!inners?.length) return;

      gsap.fromTo(
        inners,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
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
      style={{ display: 'flex', flexWrap: 'wrap', rowGap: '0.1em', columnGap: '0.28em' }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.1em' }}>
          <span
            data-wr-inner
            className={wordClassName}
            style={{ display: 'inline-block', opacity: 0 }}
          >
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}
