import React from 'react';
import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  size?: 'desktop' | 'mobile';
}

export const SquashHamburger: React.FC<SquashHamburgerProps> = ({
  isOpen,
  size = 'desktop',
}) => {
  const isDesktop = size === 'desktop';
  const width = isDesktop ? 18 : 15;
  const height = isDesktop ? 12 : 10;
  const barHeight = isDesktop ? 1.5 : 1.2;
  const translateYCenter = isDesktop ? 5.25 : 4.4;

  const springConfig = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  };

  return (
    <div
      className="relative flex flex-col justify-between items-center select-none"
      style={{ width: `${width}px`, height: `${height}px` }}
      aria-label="Navigation Toggle"
    >
      {/* Top bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full origin-center"
        style={{ height: `${barHeight}px`, top: 0 }}
        animate={{
          y: isOpen ? translateYCenter : 0,
          rotate: isOpen ? 45 : 0,
        }}
        transition={springConfig}
      />

      {/* Middle bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full origin-center"
        style={{
          height: `${barHeight}px`,
          top: `${(height - barHeight) / 2}px`,
        }}
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0.2 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Bottom bar */}
      <motion.span
        className="absolute left-0 w-full bg-white rounded-full origin-center"
        style={{ height: `${barHeight}px`, bottom: 0 }}
        animate={{
          y: isOpen ? -translateYCenter : 0,
          rotate: isOpen ? -45 : 0,
        }}
        transition={springConfig}
      />
    </div>
  );
};
