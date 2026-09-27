export const heroBgScale = {
  animate: { scale: [1, 1.08, 1] },
  transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' as const },
};

export const heroForeground = {
  animate: { y: [0, -20, 0] },
  transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const },
};

export const floatingCard = (delay = 0, duration = 6) => ({
  animate: {
    y: [-10, 10, -10],
    rotate: [-1, 1, -1],
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay,
  },
});

export const orbPulse = {
  animate: { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] },
  transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const },
};
