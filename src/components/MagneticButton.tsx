import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useCallback } from 'react';

interface Props {
  children:  React.ReactNode;
  strength?: number;
  className?: string;
  style?:    React.CSSProperties;
  onClick?:  React.MouseEventHandler;
}

export default function MagneticButton({
  children,
  strength = 0.3,
  className,
  style,
  onClick,
}: Props) {
  const ref  = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, { stiffness: 300, damping: 20 });
  const y    = useSpring(rawY, { stiffness: 300, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - (rect.left + rect.width  / 2)) * strength);
    rawY.set((e.clientY - (rect.top  + rect.height / 2)) * strength);
  }, [rawX, rawY, strength]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block', ...style }}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.div>
  );
}
