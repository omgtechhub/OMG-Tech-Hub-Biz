import { useRef, useState, useEffect } from 'react';
import { gsap } from '../../lib/animations/gsap';

interface Props {
  minDuration?: number;
  onComplete?: () => void;
  logo?: React.ReactNode;
  sessionKey?: string;
}

export default function LoadingScreen({
  minDuration = 900,
  onComplete,
  logo,
  sessionKey = 'omg-loaded',
}: Props) {
  const [visible] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (sessionStorage.getItem(sessionKey)) return false;
    sessionStorage.setItem(sessionKey, '1');
    return true;
  });

  const ref    = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (!visible) return;

    const el  = ref.current;
    const bar = barRef.current;
    if (!el || !bar) return;

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        setMounted(false);
        onComplete?.();
      },
    });

    tl.to(bar, { width: '100%', duration: minDuration / 1000, ease: 'power1.inOut' })
      .to(el,  { yPercent: -105, duration: 0.65, ease: 'power4.inOut' }, '+=0.1');

    return () => { tl.kill(); };
  }, [visible, minDuration, onComplete]);

  if (!mounted) return null;

  return (
    <div
      ref={ref}
      aria-label="Loading"
      aria-live="polite"
      style={{
        position:       'fixed',
        inset:          0,
        backgroundColor:'var(--t-bg)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '2rem',
        zIndex:         99999,
      }}
    >
      {logo ?? (
        <div style={{ color: 'var(--t-text)', fontSize: '1.75rem', fontWeight: 700, letterSpacing: '0.08em' }}>
          OMG<span style={{ color: 'var(--t-accent)' }}>.</span>
        </div>
      )}

      <div
        style={{
          width:           '180px',
          height:          '1px',
          backgroundColor: 'var(--t-border)',
          overflow:        'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            height:          '100%',
            width:           '0%',
            backgroundColor: 'var(--t-accent)',
          }}
        />
      </div>
    </div>
  );
}
