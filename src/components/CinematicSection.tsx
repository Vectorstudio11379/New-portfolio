import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

const SECTION_2_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

export const CinematicSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Spring smoothing for the 3D translation effect
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  // Transform translateY from 60px down to -120px
  const translateY = useTransform(smoothProgress, [0, 1], [60, -120]);
  // Opacity fades in from 0 to 1 between scroll 0.2 and 0.55
  const opacity = useTransform(smoothProgress, [0.15, 0.45, 0.85, 1], [0, 1, 1, 0.4]);

  // Dynamic 3D transform template: rotateX(24deg) translateY(Xpx) translateZ(15px)
  const transform = useMotionTemplate`perspective(400px) rotateX(24deg) translateY(${translateY}px) translateZ(15px)`;

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="relative w-full h-screen h-[100dvh] overflow-hidden bg-black flex items-center justify-center select-none"
    >
      {/* 1. Autoplay Muted Loop Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src={SECTION_2_VIDEO_URL}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.75] contrast-[1.15]"
      />

      {/* 2. Top Gradient Overlay */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '180px',
          background: 'linear-gradient(to bottom, #010103, rgba(1, 1, 3, 0))',
        }}
      />

      {/* 3. Bottom Gradient Blend Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: '160px',
          background: 'linear-gradient(to top, #000000, rgba(0, 0, 0, 0))',
        }}
      />

      {/* 4. Subtle center radial darkener for high legibility */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] pointer-events-none z-10" />

      {/* 5. 3D Perspective Kinetic Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-12 flex flex-col items-center justify-center">
        {/* Subtle Category Pill */}
        <motion.div
          style={{ opacity }}
          className="mb-6 px-3.5 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[11px] uppercase tracking-[0.25em] text-white/75 font-mono"
        >
          Engineering Philosophy & Trajectory
        </motion.div>

        {/* 3D Perspective Statement */}
        <motion.div
          style={{
            transform,
            opacity,
          }}
          className="w-full text-center"
        >
          <p className="font-space font-normal text-[18px] sm:text-[26px] md:text-[32px] lg:text-[36px] text-white leading-[1.4] tracking-[-0.02em] select-none text-center">
            From foundational laboratory precision at Dangote Cement and logistics operations at Unateus, to engineering client platforms at 5th Element Media Group and architecting systems at Mirola Enterprises. Elijah Ezekiel turns complex business logic into intuitive user experiences and high-conversion web platforms.
          </p>
        </motion.div>

        {/* Highlight badge beneath */}
        <motion.div
          style={{ opacity }}
          className="mt-8 flex items-center gap-4 text-xs font-mono text-white/60 tracking-wider"
        >
          <span className="flex items-center gap-1.5 text-[#ff6b76]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b91f2a] shadow-[0_0_8px_rgba(185,31,42,0.9)] animate-pulse" />
            Lead Web Developer @ Mirola Enterprises
          </span>
          <span>/</span>
          <span>Lagos & Abuja, Nigeria · Global Remote</span>
        </motion.div>
      </div>
    </section>
  );
};
