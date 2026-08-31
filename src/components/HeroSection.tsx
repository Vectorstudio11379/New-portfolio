import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ScrambleIn } from './ScrambleIn';
import { Magnetic } from './gsap/Magnetic';
import { MousePointer, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  entranceComplete: boolean;
  onExploreClick: () => void;
}

const CLOUDFRONT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';
const HERO_LOOP_VIDEO_URL = '/video/hero-loop.mp4';
const HERO_LOOP_MOBILE_VIDEO_URL = '/video/hero-loop-mobile.mp4';
const HERO_POSTER_URL = '/video/hero-poster.jpg';

function getIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.innerWidth < 768 ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0
  );
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  entranceComplete,
  onExploreClick,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(8.08);

  const [isMobile, setIsMobile] = useState<boolean>(getIsMobile);
  const [videoSrc, setVideoSrc] = useState<string>(() =>
    getIsMobile() ? HERO_LOOP_MOBILE_VIDEO_URL : HERO_LOOP_VIDEO_URL
  );
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  const targetTimeRef = useRef<number>(2.02);
  const smoothTimeRef = useRef<number>(2.02);
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState<string>('00:02.0');

  // Preload video as Blob to bypass byte-range header issues on iOS Safari and mobile WebKit
  useEffect(() => {
    let isCancelled = false;
    let createdBlobUrl: string | null = null;

    async function loadVideoBlob() {
      const primaryUrl = isMobile ? HERO_LOOP_MOBILE_VIDEO_URL : HERO_LOOP_VIDEO_URL;
      const secondaryUrl = HERO_LOOP_VIDEO_URL;

      try {
        const res = await fetch(primaryUrl);
        if (res.ok) {
          const blob = await res.blob();
          if (!isCancelled && blob.size > 50000) {
            createdBlobUrl = URL.createObjectURL(blob);
            setVideoSrc(createdBlobUrl);
            return;
          }
        }
      } catch {
        // Continue to secondary check
      }

      if (primaryUrl !== secondaryUrl) {
        try {
          const res2 = await fetch(secondaryUrl);
          if (res2.ok) {
            const blob2 = await res2.blob();
            if (!isCancelled && blob2.size > 50000) {
              createdBlobUrl = URL.createObjectURL(blob2);
              setVideoSrc(createdBlobUrl);
              return;
            }
          }
        } catch {
          // Fallback to CloudFront
        }
      }

      if (!isCancelled) {
        setVideoSrc(CLOUDFRONT_VIDEO_URL);
      }
    }

    loadVideoBlob();

    return () => {
      isCancelled = true;
      if (createdBlobUrl) {
        URL.revokeObjectURL(createdBlobUrl);
      }
    };
  }, [isMobile]);

  // Detect mobile device on resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = getIsMobile();
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle video error with fallback cascade
  const handleVideoError = () => {
    if (videoSrc === HERO_LOOP_MOBILE_VIDEO_URL) {
      setVideoSrc(HERO_LOOP_VIDEO_URL);
    } else if (videoSrc !== CLOUDFRONT_VIDEO_URL) {
      setVideoSrc(CLOUDFRONT_VIDEO_URL);
    }
  };

  // Handle loaded metadata & initial setup
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setIsVideoLoaded(true);
      const dur = video.duration || 8.08;
      setVideoDuration(dur);
      video.muted = true;
      video.defaultMuted = true;

      if (isMobile) {
        // Mobile continuous slow ping-pong loop (turns left and right slowly)
        video.playbackRate = 0.5;
        video.playsInline = true;
        video.loop = true;
        video.play().catch(() => {});
      } else {
        // Desktop: paused, start facing center forward
        video.pause();
        const centerTime = dur > 4.5 ? dur / 4 : dur / 2;
        video.currentTime = centerTime;
        targetTimeRef.current = centerTime;
        smoothTimeRef.current = centerTime;
      }
    }
  };

  // 1. MOBILE CONTINUOUS LOOP HANDLING
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isMobile) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.playbackRate = 0.5;

    const startPlay = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };

    startPlay();

    window.addEventListener('touchstart', startPlay, { once: true });
    window.addEventListener('pointerdown', startPlay, { once: true });
    window.addEventListener('scroll', startPlay, { once: true, passive: true });

    return () => {
      window.removeEventListener('touchstart', startPlay);
      window.removeEventListener('pointerdown', startPlay);
      window.removeEventListener('scroll', startPlay);
    };
  }, [isMobile, videoSrc]);

  // 2. DESKTOP SMOOTH CURSOR FOLLOWING VIA rAF & LERP
  useEffect(() => {
    if (isMobile) return;

    let animId: number;

    const updateFrame = () => {
      const video = videoRef.current;
      if (video && !video.seeking) {
        const diff = targetTimeRef.current - smoothTimeRef.current;
        if (Math.abs(diff) > 0.003) {
          smoothTimeRef.current += diff * 0.14; // High-refresh fluid lerp
          const clampedTime = Math.max(0, Math.min(video.duration || 8.08, smoothTimeRef.current));
          if (Math.abs(video.currentTime - clampedTime) > 0.01) {
            video.currentTime = clampedTime;
            const mins = Math.floor(clampedTime / 60);
            const secs = (clampedTime % 60).toFixed(1);
            setCurrentTimeDisplay(
              `${mins.toString().padStart(2, '0')}:${secs.padStart(4, '0')}`
            );
          }
        }
      }
      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);

    // Global window mouse listener so the head tracks anywhere on the page
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      const totalDur = video?.duration || 8.08;
      // In original video, 0.0s is looking Left, ~2.02s is Center, ~4.04s is looking Right
      const maxForwardTime = totalDur > 5 ? totalDur / 2 : totalDur;
      const normalizedX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetTimeRef.current = normalizedX * maxForwardTime;
    };

    const handleGlobalMouseLeave = () => {
      const video = videoRef.current;
      const totalDur = video?.duration || 8.08;
      const centerTime = totalDur > 5 ? totalDur / 4 : totalDur / 2;
      targetTimeRef.current = centerTime; // Gracefully return to center view
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleGlobalMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
    };
  }, [isMobile]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative w-full h-screen h-[100dvh] overflow-hidden bg-black flex flex-col justify-between select-none ${
        isMobile ? 'cursor-default' : 'cursor-default'
      }`}
    >
      {/* 1. Background Video (paused + smooth cursor tracking on desktop, smooth automatic continuous loop on mobile) */}
      <video
        key={videoSrc}
        ref={videoRef}
        src={videoSrc}
        poster={HERO_POSTER_URL}
        playsInline
        muted
        autoPlay={isMobile}
        loop={isMobile}
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleVideoError}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.85] contrast-[1.1] transition-opacity duration-700 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-80'
        }`}
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
          <span>Move cursor to rotate 3D model</span>
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
