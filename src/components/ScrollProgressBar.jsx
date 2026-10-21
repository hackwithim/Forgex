import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 9999,
        background: 'rgba(255, 255, 255, 0.05)',
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: '0%',
          scaleX,
          background: 'linear-gradient(90deg, #ff5e14, #ff9d00, #ff5e14)',
          boxShadow: '0 0 10px rgba(255, 94, 20, 0.8), 0 0 4px #ff5e14'
        }}
      />
    </div>
  );
}
