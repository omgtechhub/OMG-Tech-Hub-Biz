import { useRef, useCallback } from 'react';
import { gsap } from '../../lib/animations/gsap';

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  className,
  style,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)', overwrite: 'auto' });
  }, []);

  const onMouseDown = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, { scale: 0.95, duration: 0.15, ease: 'power2.out' });
  }, []);

  const onMouseUp = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, { scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.4)' });
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-block', cursor: 'pointer', ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClick}
      data-cursor="hover"
    >
      {children}
    </div>
  );
}
