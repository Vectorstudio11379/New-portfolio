import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-transparent">
      {/* Background track line */}
      <div className="absolute inset-0 bg-white/5" />
      {/* Dynamic Animated Progress in Accent #b91f2a */}
      <motion.div
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-[#8a141d] via-[#b91f2a] to-[#e63946] origin-left shadow-[0_0_12px_rgba(185,31,42,0.8)]"
      />
      {/* Leading Glow Particle */}
      <motion.div
        style={{
          left: `${scaleX.get() * 100}%`,
        }}
        className="hidden"
      />
    </div>
  );
};
