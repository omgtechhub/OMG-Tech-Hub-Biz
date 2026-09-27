import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { TargetAndTransition } from 'framer-motion';
import { EASE_PREMIUM } from '../animations/constants';

type Variant = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleIn';

const map: Record<Variant, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  fadeUp:    { hidden: { opacity: 0, y: 40 },         visible: { opacity: 1, y: 0 } },
  fadeIn:    { hidden: { opacity: 0 },                 visible: { opacity: 1 } },
  fadeLeft:  { hidden: { opacity: 0, x: -40 },         visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 40 },          visible: { opacity: 1, x: 0 } },
  scaleIn:   { hidden: { opacity: 0, scale: 0.92 },    visible: { opacity: 1, scale: 1 } },
};

interface Props {
  children: React.ReactNode;
  delay?:    number;
  duration?: number;
  variant?:  Variant;
  className?: string;
  style?:    React.CSSProperties;
  once?:     boolean;
  amount?:   number;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Reveal({
  children,
  delay    = 0,
  duration = 0.8,
  variant  = 'fadeUp',
  className,
  style,
  once   = true,
  amount = 0.2,
}: Props) {
  const ref      = useRef<HTMLDivElement>(null);
  const inView   = useInView(ref, { once, amount });
  const { hidden, visible } = map[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden,
        visible: { ...visible, transition: { duration, ease: EASE_PREMIUM, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}
