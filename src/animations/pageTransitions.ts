import type { Variants } from 'framer-motion';
import { EASE_PREMIUM } from './constants';

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -20 },
};

export const pageTransition = {
  duration: 0.6,
  ease: EASE_PREMIUM,
};
