import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

type VariantKey =
  | 'fadeUp'    | 'slideLeft' | 'slideRight' | 'scaleIn'   | 'popIn'
  | 'flipY'     | 'flipX'    | 'tiltLeft'   | 'tiltRight'
  | 'rotateIn'  | 'swingIn'  | 'bounce'     | 'springUp';

type VariantDef = {
  hidden:  Record<string, unknown>;
  visible: Record<string, unknown>;
  t:       Record<string, unknown>;
};

const DEFS: Record<VariantKey, VariantDef> = {
  fadeUp:     { hidden: { opacity:0, y:40 },                                               visible: { opacity:1, y:0 },                                               t: { duration:0.52, ease:EASE } },
  slideLeft:  { hidden: { opacity:0, x:-70 },                                              visible: { opacity:1, x:0 },                                               t: { duration:0.55, ease:EASE } },
  slideRight: { hidden: { opacity:0, x:70 },                                               visible: { opacity:1, x:0 },                                               t: { duration:0.55, ease:EASE } },
  scaleIn:    { hidden: { opacity:0, scale:0.72 },                                         visible: { opacity:1, scale:1 },                                           t: { duration:0.5,  ease:EASE } },
  popIn:      { hidden: { opacity:0, scale:0.45, rotate:-10 },                             visible: { opacity:1, scale:1, rotate:0 },                                 t: { type:'spring', stiffness:480, damping:17 } },
  flipY:      { hidden: { opacity:0, rotateY:90,  transformPerspective:1200, scale:0.94 }, visible: { opacity:1, rotateY:0,  transformPerspective:1200, scale:1 },    t: { duration:0.62, ease:EASE } },
  flipX:      { hidden: { opacity:0, rotateX:80,  transformPerspective:1200, scale:0.94 }, visible: { opacity:1, rotateX:0,  transformPerspective:1200, scale:1 },    t: { duration:0.62, ease:EASE } },
  tiltLeft:   { hidden: { opacity:0, rotateY:-50, transformPerspective:1200, x:-28 },      visible: { opacity:1, rotateY:0,  transformPerspective:1200, x:0 },         t: { duration:0.58, ease:EASE } },
  tiltRight:  { hidden: { opacity:0, rotateY:50,  transformPerspective:1200, x:28 },       visible: { opacity:1, rotateY:0,  transformPerspective:1200, x:0 },         t: { duration:0.58, ease:EASE } },
  rotateIn:   { hidden: { opacity:0, rotate:-18, scale:0.85 },                             visible: { opacity:1, rotate:0,  scale:1 },                                t: { duration:0.52, ease:EASE } },
  swingIn:    { hidden: { opacity:0, rotate:22,  y:-22 },                                  visible: { opacity:1, rotate:0,  y:0 },                                    t: { type:'spring', stiffness:270, damping:13 } },
  bounce:     { hidden: { opacity:0, y:65, scale:0.82 },                                   visible: { opacity:1, y:0,  scale:1 },                                     t: { type:'spring', stiffness:340, damping:11 } },
  springUp:   { hidden: { opacity:0, y:80 },                                               visible: { opacity:1, y:0 },                                               t: { type:'spring', stiffness:390, damping:15 } },
};

const DEFAULT_CYCLE: VariantKey[] = [
  'flipY', 'bounce', 'flipX', 'rotateIn', 'tiltLeft', 'tiltRight', 'scaleIn', 'popIn',
];

interface SectionProps {
  children:      React.ReactNode;
  variantCycle?: VariantKey[];
  stagger?:      number;
  className?:    string;
  style?:        React.CSSProperties;
}

export interface ItemProps {
  children:   React.ReactNode;
  variant?:   VariantKey;
  delay?:     number;
  __variant?: VariantKey;
  __delay?:   number;
  className?: string;
  style?:     React.CSSProperties;
}

// Stable hash of a React key so a card's animation variant is tied to its
// identity, not its position in the list. Lists that reorder (e.g. a newly
// uploaded portfolio project prepended ahead of existing ones) would
// otherwise reassign a different variant to an already-settled card mid­
// flight, which Framer Motion animates toward — visibly "stuck" mid-rotation.
function hashKey(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export default function AnimatedSection({
  children,
  variantCycle = DEFAULT_CYCLE,
  stagger = 0.07,
  className,
  style,
}: SectionProps) {
  return (
    <div className={className} style={style}>
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;
        const index = child.key != null ? hashKey(String(child.key)) % variantCycle.length : i % variantCycle.length;
        return React.cloneElement(child as React.ReactElement<any>, {
          __variant: variantCycle[index],
          __delay:   i * stagger,
        });
      })}
    </div>
  );
}

export const AnimatedItem = ({
  children,
  variant,
  delay,
  __variant,
  __delay,
  className,
  style,
}: ItemProps) => {
  const key = (variant ?? __variant ?? 'fadeUp') as VariantKey;
  const d   = delay   ?? __delay   ?? 0;
  const def = DEFS[key];
  const t   = { ...def.t, delay: d };

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden:  def.hidden  as any,
        visible: { ...(def.visible as any), transition: t },
      }}
    >
      {children}
    </motion.div>
  );
};
