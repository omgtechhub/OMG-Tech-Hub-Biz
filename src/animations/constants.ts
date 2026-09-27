export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT  = [0.4, 0, 0.2, 1] as const;
export const EASE_OUT     = [0, 0, 0.2, 1] as const;

export const SPRING_GENTLE = { type: 'spring' as const, stiffness: 300, damping: 20 };
export const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 500, damping: 30 };
export const SPRING_FLUID  = { type: 'spring' as const, stiffness: 200, damping: 40 };
export const SPRING_MOUSE  = { type: 'spring' as const, stiffness: 60,  damping: 20 };

export const DURATION_FAST   = 0.3;
export const DURATION_NORMAL = 0.6;
export const DURATION_SLOW   = 0.8;
export const DURATION_HERO   = 1.2;

export const STAGGER_FAST   = 0.07;
export const STAGGER_NORMAL = 0.10;
export const STAGGER_SLOW   = 0.15;
