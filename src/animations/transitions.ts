import { EASE_PREMIUM, SPRING_GENTLE } from './constants';

export const defaultTransition = { duration: 0.8, ease: EASE_PREMIUM };
export const fastTransition    = { duration: 0.4, ease: EASE_PREMIUM };
export const slowTransition    = { duration: 1.2, ease: EASE_PREMIUM };
export const pageTransitionCfg = { duration: 0.6, ease: EASE_PREMIUM };
export const springTransition  = SPRING_GENTLE;

export const stagger = (amount = 0.1, delay = 0.05) => ({
  staggerChildren: amount,
  delayChildren:   delay,
});
