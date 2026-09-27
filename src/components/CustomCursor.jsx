import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Skip on touch-only devices (no hover capability)
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot) {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ring) {
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseEnterHover = (e) => {
      const target = e.target.closest('[data-cursor="hover"]');
      if (target && ring) {
        ring.classList.add('hovered');
      }
    };

    const onMouseLeaveHover = () => {
      if (ring) ring.classList.remove('hovered');
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnterHover);
    document.addEventListener('mouseout', onMouseLeaveHover);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnterHover);
      document.removeEventListener('mouseout', onMouseLeaveHover);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
