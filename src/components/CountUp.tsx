import { useRef, useEffect, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface Props {
  value:      string;
  style?:     React.CSSProperties;
  className?: string;
}

export default function CountUp({ value, style, className }: Props) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState<string>('');

  const num    = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!inView || isNaN(num)) return;

    const ctrl = animate(0, num, {
      duration:  2,
      ease:      [0.16, 1, 0.3, 1],
      onUpdate:  (v) => setDisplay(`${Math.round(v)}${suffix}`),
    });

    return () => ctrl.stop();
  }, [inView, num, suffix]);

  return (
    <span ref={ref} style={style} className={className}>
      {isNaN(num) ? value : (inView ? display || `0${suffix}` : `0${suffix}`)}
    </span>
  );
}
