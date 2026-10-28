export const LENIS_CONFIG = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
};

// ─────────────────────────────────────────────────────────────────────────────
//  Instance holder
// ─────────────────────────────────────────────────────────────────────────────
//  Lenis takes over the wheel globally (smoothWheel), so anything that opens an
//  overlay has to be able to pause it — otherwise the wheel keeps scrolling the
//  page underneath while the overlay itself stays put. `useLenis` registers the
//  live instance here; overlays call getLenis()?.stop() / .start().

type LenisLike = { stop: () => void; start: () => void };

let instance: LenisLike | null = null;

export function setLenis(l: LenisLike | null): void {
  instance = l;
}

export function getLenis(): LenisLike | null {
  return instance;
}
