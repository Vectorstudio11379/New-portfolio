import React from 'react';
import { motion } from 'framer-motion';
import { CounterOdometer } from './gsap/CounterOdometer';

const SECTION_3_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4';

interface MetricDisplay {
  value: string;
  label: string;
  subtext: string;
  metricBadge: string;
}

const METRICS_ITEMS: MetricDisplay[] = [
  {
    value: '15+',
    label: 'Production Platforms Deployed',
    subtext: 'Enterprise portals, e-commerce storefronts, and custom client web applications successfully launched.',
    metricBadge: 'WEB ARCHITECTURE',
  },
  {
    value: '< 1.2s',
    label: 'Core Web Vitals & Load Speed',
    subtext: 'Sub-second page speeds and 95+ Google Lighthouse scores engineered through Next.js and optimized assets.',
    metricBadge: 'SPEED & OPTIMIZATION',
  },
  {
    value: '99.9%',
    label: 'Enterprise Portal Uptime',
    subtext: 'High-availability data delivery, wallet provisioning, and referral tracking for MIRODATA and client systems.',
    metricBadge: 'RELIABILITY & APIS',
  },
];

export const MetricsSection: React.FC = () => {
  return (
    <section
      id="metrics-section"
      className="relative min-h-[70vh] sm:min-h-screen w-full overflow-hidden bg-black flex flex-col justify-center items-center select-none py-14 sm:py-36 px-4 sm:px-6"
    >
      {/* 1. Background Video (Autoplay, Muted, Loop) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src={SECTION_3_VIDEO_URL}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.70] contrast-[1.1]"
      />

      {/* 2. Top and Bottom Soft Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/90 pointer-events-none z-10" />

      {/* 3. Main Centered Content */}
      <div className="relative z-20 max-w-6xl w-full mx-auto flex flex-col items-center">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-24"
        >
          <span className="inline-block text-white/40 text-[11px] sm:text-[14px] tracking-[0.25em] uppercase font-mono border-b border-white/10 pb-1.5 sm:pb-2">
            Performance Metrics
          </span>
          <h2 className="text-white/80 text-base sm:text-xl font-light mt-2.5 sm:mt-3 tracking-tight max-w-md sm:max-w-none">
            Measurable impact delivered across real-world client architectures
          </h2>
        </motion.div>

        {/* 3 Columns Metrics Grid (1 card on mobile, 3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 w-full">
          {METRICS_ITEMS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
              className="flex flex-col items-center md:items-start text-center md:text-left group p-4 sm:p-0 rounded-2xl bg-white/[0.03] sm:bg-transparent border border-white/10 sm:border-0"
            >
              {/* Metric Tag */}
              <div className="mb-2.5 px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] uppercase font-mono tracking-widest bg-white/10 text-white/60 border border-white/15">
                {metric.metricBadge}
              </div>

              {/* Big Metric Value with GSAP Odometer Count-up */}
              <div className="text-white text-[38px] sm:text-[clamp(48px,8vw,92px)] font-light tracking-[-0.04em] leading-none font-space group-hover:text-[#ff6b76] transition-colors">
                <CounterOdometer value={metric.value} />
              </div>

              {/* Metric Label */}
              <div className="text-white/75 text-[13px] sm:text-[16px] mt-2.5 sm:mt-4 font-medium tracking-wide">
                {metric.label}
              </div>

              {/* Metric Subtext Description */}
              <div className="text-white/40 text-[11px] sm:text-[13px] mt-1.5 sm:mt-2 leading-relaxed max-w-xs font-mono">
                {metric.subtext}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional verified lead stats bar (Desktop only) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden sm:flex mt-20 w-full max-w-4xl p-5 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#b91f2a] shadow-[0_0_8px_rgba(185,31,42,0.9)] animate-pulse" />
            <span className="text-white">Active Status:</span>
            <span className="text-[#ff6b76]">Available for Full-time Remote Roles & Strategic Contracts</span>
          </div>
          <div className="flex items-center gap-6">
            <span>4+ Years Production Experience</span>
            <span className="text-white/20">|</span>
            <span>100% Cross-Device Responsive</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
