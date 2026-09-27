import type { Variants } from 'framer-motion';
import { EASE_PREMIUM } from './constants';

const e = EASE_PREMIUM;

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: (d = 0) => ({ opacity: 1, transition: { duration: 0.8, ease: e, delay: d } }),
};

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: e, delay: d } }),
};

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -30 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: e, delay: d } }),
};

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, ease: e, delay: d } }),
};

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, ease: e, delay: d } }),
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: (d = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.8, ease: e, delay: d } }),
};

export const clipReveal: Variants = {
  hidden:  { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: (d = 0) => ({
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 1.0, ease: e, delay: d },
  }),
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: e } },
};

export const textReveal: Variants = {
  hidden:  { opacity: 0, y: '100%' },
  visible: (d = 0) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 0.9, ease: e, delay: d },
  }),
};
