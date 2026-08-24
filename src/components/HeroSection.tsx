import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ScrambleIn } from './ScrambleIn';
import { Magnetic } from './gsap/Magnetic';
import { MousePointer, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  entranceComplete: boolean;
  onExploreClick: () => void;
}

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';
const HERO_LOOP_VIDEO_URL = '/video/hero-loop.mp4';

export const HeroSection: React.FC<HeroSectionProps> = ({
  entranceComplete,
  onExploreClick,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastMouseXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState<string>('00:00.0');

  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isTouchOrSmall =
        window.innerWidth < 768 ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(isTouchOrSmall);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle loaded metadata & initial playback mode
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration || 10);
      if (isMobile) {
        // Native continuous hardware playback at slow, majestic speed (0.55x)
        video.playbackRate = 0.55;
        video.muted = true;
        video.playsInline = true;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  // On mobile: play continuous ping-pong video with smooth time updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isMobile) {
      video.pause();
      return;
    }

    video.muted = true;
    video.playsInline = true;
    video.playbackRate = 0.55;

    const handleTimeUpdate = () => {
      const cur = video.currentTime;
      const mins = Math.floor(cur / 60);
      const secs = (cur % 60).toFixed(1);
      setCurrentTimeDisplay(
        `${mins.toString().padStart(2, '0')}:${secs.padStart(4, '0')}`
      );
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isMobile]);

  // Safe seek chaining using the `seeked` event
  const performNextSeek = useCallback(() => {
    if (!videoRef.current) {
      isSeekingRef.current = false;
      return;
    }
    const dur = videoRef.current.duration;
    if (!dur || isNaN(dur)) {
      isSeekingRef.current = false;
      return;
    }

    // Clamp target time within video duration
    const clampedTime = Math.max(0, Math.min(dur, targetTimeRef.current));

    if (Math.abs(videoRef.current.currentTime - clampedTime) > 0.03) {
      isSeekingRef.current = true;
      videoRef.current.currentTime = clampedTime;
      const mins = Math.floor(clampedTime / 60);
      const secs = (clampedTime % 60).toFixed(1);
      setCurrentTimeDisplay(
        `${mins.toString().padStart(2, '0')}:${secs.padStart(4, '0')}`
      );
    } else {
      isSeekingRef.current = false;
    }
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    performNextSeek();
  }, [performNextSeek]);

  // Mouse scrub handler (delta-based horizontal movement)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!videoRef.current) return;
      const dur = videoRef.current.duration || videoDuration || 10;
      const currentX = e.clientX;

      if (lastMouseXRef.current !== null) {
        const deltaX = currentX - lastMouseXRef.current;
        const sensitivity = 0.8; // Sensitivity factor from specs
        // Calculate time delta relative to screen width
        const timeChange = (deltaX / window.innerWidth) * dur * sensitivity * 2.2;
        targetTimeRef.current = Math.max(
          0,
          Math.min(dur, targetTimeRef.current + timeChange)
        );

        if (!isSeekingRef.current) {
          performNextSeek();
        }
      }
      lastMouseXRef.current = currentX;
    },
    [videoDuration, performNextSeek]
  );

  const handleMouseLeave = () => {
    lastMouseXRef.current = null;
  };

  // Touch scrub handler for mobile
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!videoRef.current || e.touches.length === 0) return;
      const dur = videoRef.current.duration || videoDuration || 10;
      const currentX = e.touches[0].clientX;

      if (lastMouseXRef.current !== null) {
        const deltaX = currentX - lastMouseXRef.current;
        const sensitivity = 1.0;
        const timeChange = (deltaX / window.innerWidth) * dur * sensitivity * 2.0;
        targetTimeRef.current = Math.max(
          0,
          Math.min(dur, targetTimeRef.current + timeChange)
        );

        if (!isSeekingRef.current) {
          performNextSeek();
        }
      }
      lastMouseXRef.current = currentX;
    },
    [videoDuration, performNextSeek]
  );

  const handleTouchEnd = () => {
    lastMouseXRef.current = null;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('seeked', handleSeeked);
      return () => {
        video.removeEventListener('seeked', handleSeeked);
      };
    }
  }, [handleSeeked]);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      className={`relative w-full h-screen h-[100dvh] overflow-hidden bg-black flex flex-col justify-between select-none ${
        isMobile ? 'cursor-default' : 'cursor-ew-resize'
      }`}
    >
      {/* 1. Background Video (paused + scrubbed on desktop, smooth automatic continuous scan on mobile) */}
      <video
        ref={videoRef}
        src={isMobile ? HERO_LOOP_VIDEO_URL : HERO_VIDEO_URL}
        playsInline
        muted
        autoPlay={isMobile}
        loop={isMobile}
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.85] contrast-[1.1]"
      />

      {/* 2. Radial Dot Grid Overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-5 pointer-events-none z-10" />

      {/* 3. Subtle dark vignette / gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none z-10" />

      {/* 4. Large Background Watermark Text ("TRANSCENDENCE") */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
        <span
          className="font-anton uppercase select-none watermark-gradient opacity-10 text-center tracking-[-0.04em] translate-y-[50px] leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(120px, 28vw, 480px)' }}
        >
          TRANSCENDENCE
        </span>
      </div>

      {/* 5. Top Interactive Scrub Indicator Badge (Desktop Only) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : -10 }}
        transition={{ duration: 1.0, delay: 0.4 }}
        className="relative z-20 pt-24 px-4 sm:px-8 hidden sm:flex justify-center pointer-events-none"
      >
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#b91f2a]/30 text-[11px] text-white/80 font-mono tracking-wider uppercase shadow-[0_0_15px_rgba(185,31,42,0.2)]">
          <MousePointer className="w-3 h-3 text-[#ff4d5a] animate-pulse" />
          <span>Move cursor to scrub timeline</span>
          <span className="text-white font-bold pl-1 border-l border-white/20">
            {currentTimeDisplay}
          </span>
        </div>
      </motion.div>

      {/* Spacer to push content to bottom */}
      <div className="flex-1" />

      {/* 6. Bottom Hero Row Layout */}
      <div className="relative z-20 px-4 sm:px-6 md:px-8 pb-6 sm:pb-12 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
          {/* Main Title & Concise Bio */}
          <div className="flex flex-col gap-2 sm:gap-3 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : 10 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#b91f2a] shadow-[0_0_8px_rgba(185,31,42,0.8)] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff6b76]">
                Elijah Ezekiel (Timi)
              </span>
            </motion.div>

            <h1 className="text-white font-light leading-[0.98] sm:leading-[0.96] tracking-[-0.03em] text-[34px] sm:text-[clamp(38px,7.5vw,84px)]">
              <ScrambleIn
                text="AI & Web"
                delay={200}
                triggered={entranceComplete}
                className="block"
              />
              <ScrambleIn
                text="Engineering."
                delay={500}
                triggered={entranceComplete}
                className="block text-white/90"
              />
            </h1>

            {/* Desktop Full Description vs Mobile Clean Minimal 1-liner */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: entranceComplete ? 0 : 20,
                opacity: entranceComplete ? 1 : 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
              className="hidden sm:block text-[13px] sm:text-[15px] text-white/70 leading-relaxed font-mono pt-1 max-w-lg"
            >
              Lead Web Developer at <span className="text-white font-medium underline decoration-[#b91f2a] decoration-2 underline-offset-4">Mirola Enterprises</span>. Specializing in full-stack web platforms, automated AI workflows, and scalable systems.
            </motion.p>

            <p className="sm:hidden text-xs text-white/60 font-mono">
              Lead Web Dev @ Mirola Enterprises
            </p>
          </div>

          {/* Quick Action Button with Magnetic Pull */}
          <div className="flex items-center pt-1 sm:pt-0">
            <Magnetic strength={0.35}>
              <motion.button
                onClick={onExploreClick}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : 10 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white hover:text-white transition-all cursor-pointer py-2 sm:py-2.5 px-4 sm:px-6 rounded-full bg-white/10 hover:bg-[#b91f2a]/20 border border-white/15 hover:border-[#b91f2a]/40 backdrop-blur-md font-mono hover:shadow-[0_0_20px_rgba(185,31,42,0.35)]"
              >
                <span>Explore Work</span>
                <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ff4d5a] animate-bounce" />
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
};
