import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../../lib/animations/gsap';

interface Props {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
  threshold?: string;
  once?: boolean;
}

function format(n: number, decimals: number, separator: string): string {
  const fixed = n.toFixed(decimals);
  if (!separator) return fixed;
  const [int, dec] = fixed.split('.');
  const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return dec !== undefined ? `${withSep}.${dec}` : withSep;
}

export default function AnimatedCounter({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  ease = 'power2.out',
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = '',
  className,
  threshold = '80%',
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(`${prefix}${format(from, decimals, separator)}${suffix}`);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const obj = { value: from };

      gsap.to(obj, {
        value: to,
        duration,
        delay,
        ease,
        onUpdate: () => setDisplay(`${prefix}${format(obj.value, decimals, separator)}${suffix}`),
        scrollTrigger: {
          trigger: el,
          start: `top ${threshold}`,
          once,
        },
      });
    },
    { scope: ref, dependencies: [to, from, duration, delay, ease, prefix, suffix, decimals, separator, threshold, once] },
  );

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
