import { motion } from 'framer-motion';

interface Props {
  image: string;
  overlayOpacity?: number;
}

export default function HeroBackground({ image, overlayOpacity = 1 }: Props) {
  return (
    <>
      {/* Cinematic background: slow Ken Burns scale */}
      <motion.div
        style={{
          position:          'absolute',
          inset:             0,
          backgroundImage:   `url('${image}')`,
          backgroundSize:    'cover',
          backgroundPosition:'center',
          willChange:        'transform',
          zIndex:            0,
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position:  'absolute',
          inset:     0,
          background:'linear-gradient(135deg,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.58) 50%,rgba(0,0,0,0.38) 100%)',
          opacity:   overlayOpacity,
          zIndex:    1,
        }}
      />
    </>
  );
}
