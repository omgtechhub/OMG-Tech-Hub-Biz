export function useFloatingAnimation(duration = 6, delay = 0) {
  return {
    animate: {
      y:      [-10, 10, -10] as number[],
      rotate: [-1,  1,  -1]  as number[],
    },
    transition: {
      duration,
      repeat:     Infinity,
      ease:       'easeInOut' as const,
      delay,
    },
  };
}
