import React from 'react';
import { motion } from 'framer-motion';

const SECTION_4_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4';

interface TechItem {
  number: string;
  title: string;
  desc: string;
  tools: string;
}

const TECH_PILLARS: TechItem[] = [
  {
    number: '01',
    title: 'Frontend Systems',
    desc: 'High-performance reactive interfaces with pixel-perfect responsive execution and intuitive micro-interactions.',
    tools: 'React · Next.js · Tailwind · Motion',
  },
  {
    number: '02',
    title: 'AI Workflows & Automations',
    desc: 'Autonomous multi-step business logic, N8N integrations, Smartlead AI pipelines, and webhook synchronizations.',
    tools: 'N8N · Smartlead · APIs · Webhooks',
  },
  {
    number: '03',
    title: 'E-Commerce & Portals',
    desc: 'High-converting store architectures, tiered affiliate platforms, custom CMS themes, and authenticated member portals.',
    tools: 'Shopify · Liquid · WordPress · Node',
  },
  {
    number: '04',
    title: 'Analytics & SEO Telemetry',
    desc: 'Closed-loop tracking, Core Web Vitals optimization, GA4 telemetry, and data-driven conversion rate acceleration.',
    tools: 'GA4 · Search Console · SEO · CWV',
  },
];

export const TechnologySection: React.FC = () => {
  return (
    <section
      id="tech-section"
      className="relative w-full min-h-screen sm:h-screen sm:h-[100dvh] overflow-hidden bg-black flex flex-col justify-between select-none px-4 sm:px-12 md:px-16 py-10 sm:py-16"
    >
      {/* 1. Background Video (Autoplay, Muted, Loop) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src={SECTION_4_VIDEO_URL}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 brightness-[0.70] contrast-[1.1]"
      />

      {/* 2. Dark Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80 pointer-events-none z-10" />

      {/* 3. Top Area */}
      <div className="relative z-20 flex flex-col md:flex-row md:justify-between md:items-start gap-4 sm:gap-6 max-w-7xl mx-auto w-full pt-4 sm:pt-6">
        {/* Left Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 mb-2 sm:mb-3">
            Core Technical Capabilities
          </div>
          <h2 className="text-white font-light text-[32px] sm:text-[clamp(36px,7vw,72px)] leading-[0.98] sm:leading-[0.95] tracking-[-0.03em]">
            Scalable Web<br className="hidden sm:block" /> Architecture
          </h2>
        </motion.div>

        {/* Right Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="max-w-xs md:text-right md:pt-2"
        >
          <p className="text-white/60 text-xs sm:text-[15px] leading-relaxed font-mono">
            Designing resilient web infrastructure, clean APIs, and responsive design systems that scale seamlessly with business demands.
          </p>
        </motion.div>
      </div>

      {/* Spacer to distribute content vertically */}
      <div className="flex-1 min-h-6 sm:min-h-0" />

      {/* 4. Bottom Grid (1 card per row on mobile, 4 columns on md) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pb-4 pt-4 sm:pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {TECH_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: 'easeOut',
              }}
              className="flex flex-col justify-between p-3.5 sm:p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/25 transition-all hover:bg-white/10 group"
            >
              <div>
                <div className="text-[9px] sm:text-[10px] font-mono text-white/40 mb-1 sm:mb-2">
                  {pillar.number} // PILLAR
                </div>
                <h3 className="text-white text-[13px] sm:text-[16px] font-medium sm:font-normal mb-1 sm:mb-2 tracking-tight group-hover:text-white">
                  {pillar.title}
                </h3>
                <p className="text-white/50 text-[11px] sm:text-[13px] leading-relaxed font-mono">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-white/10 text-[9px] sm:text-[10px] font-mono text-[#ff4d5a] tracking-wider">
                {pillar.tools}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
