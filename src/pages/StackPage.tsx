import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { TechnologySection } from '../components/TechnologySection';
import { Terminal, Layers, Sparkles, CheckCircle2, Cpu, Code2, Database, Shield, Zap, Globe } from 'lucide-react';

interface StackPageProps {
  onOpenContactModal: () => void;
}

const ARCH_LAYERS = [
  {
    layer: 'Layer 1',
    name: 'Capture & Ingestion Layer',
    tech: 'Sensor Layer · Raw Signals · Input Telemetry · HTTP Webhooks',
    desc: 'Captures raw user interactions, API payloads, client events, and incoming webhooks without latency bottlenecks.',
    details: [
      'Edge event handling with near-instant response times',
      'Payload sanitization & schema validation',
      'Resilient webhook queueing and retry strategies',
    ],
  },
  {
    layer: 'Layer 2',
    name: 'AI Logic & Workflow Orchestration',
    tech: 'N8N Automation · Smartlead AI · Data Transformation · Intent Routing',
    desc: 'Normalizes inbound data structures, executes conditional business logic, and triggers automated AI actions.',
    details: [
      'Multi-step autonomous execution graphs',
      'AI intent classification & contextual data augmentation',
      'Zero-loss transactional synchronization with external CRMs',
    ],
  },
  {
    layer: 'Layer 3',
    name: 'Interface & High-Velocity Delivery',
    tech: 'React 19 · Next.js · Shopify Liquid · Tailwind CSS · Motion',
    desc: 'Renders pixel-perfect, hyper-optimized responsive user interfaces with sub-second page loads and fluid physics.',
    details: [
      'Micro-interactions and fluid layout transitions',
      'Core Web Vitals acceleration & asset optimization',
      'Accessible, WCAG-compliant design tokens',
    ],
  },
];

export const StackPage: React.FC<StackPageProps> = ({ onOpenContactModal }) => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  return (
    <div className="w-full min-h-screen bg-black text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#ff4d5a] mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#b91f2a]" />
            <span>Architecture & Tooling</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
            Technical Systems & Architecture
          </h1>
          <p className="text-sm sm:text-base text-white/70 font-mono leading-relaxed">
            A modular view of how I design scalable full-stack applications, robust backend pipelines,
            and autonomous AI integrations.
          </p>
        </div>

        {/* 1. Interactive 3-Layer System Pipeline */}
        <div className="mb-24">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3">
            01. System Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8">
            3-Tier Execution Pipeline
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ARCH_LAYERS.map((layer, idx) => (
              <motion.div
                key={layer.name}
                onClick={() => setActiveLayer(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeLayer === idx
                    ? 'bg-zinc-900 border-[#b91f2a] shadow-lg shadow-[#b91f2a]/20'
                    : 'bg-zinc-950/80 border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded bg-[#b91f2a]/15 text-[10px] font-mono tracking-widest text-[#ff6b76] border border-[#b91f2a]/30">
                      {layer.layer}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      Phase 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-white mb-2">
                    {layer.name}
                  </h3>

                  <p className="text-xs text-white/60 font-mono leading-relaxed mb-6">
                    {layer.desc}
                  </p>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#ff4d5a] mb-2">
                    Core Specifications:
                  </div>
                  <ul className="space-y-1.5 mb-6">
                    {layer.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-xs font-mono text-white/75 flex items-start gap-2"
                      >
                        <span className="text-[#b91f2a]">▹</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-white/50">
                    {layer.tech}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Core Pillars Component */}
        <div className="mb-24 border-t border-white/10 pt-16">
          <TechnologySection />
        </div>

        {/* 3. Detailed Skills & Categorized Matrix */}
        <div className="border-t border-white/10 pt-16">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3">
            02. Technical Matrix
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8">
            Categorized Technologies & Frameworks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-zinc-950/90 border border-white/10 hover:border-[#b91f2a]/40 transition-all flex flex-col justify-between hover:shadow-[0_0_20px_rgba(185,31,42,0.15)]"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#b91f2a] shadow-[0_0_8px_rgba(185,31,42,0.8)] animate-pulse" />
                    <h3 className="text-base font-medium text-white">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-xs font-mono text-white/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {cat.proficiencyItems && cat.proficiencyItems.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    {cat.proficiencyItems.map((p) => (
                      <div key={p.name} className="flex items-center justify-between text-[11px] font-mono text-white/60">
                        <span>{p.name}</span>
                        <span className="text-[#ff6b76]">{p.level}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-20 p-8 rounded-3xl bg-zinc-950 border border-white/15 text-center flex flex-col items-center">
          <h3 className="text-xl font-light text-white mb-2">
            Interested in integrating these technologies into your stack?
          </h3>
          <p className="text-xs text-white/60 font-mono mb-6 max-w-md">
            Reach out to discuss system architecture, API designs, or custom full-stack builds.
          </p>
          <button
            onClick={onOpenContactModal}
            className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono font-medium tracking-wider uppercase hover:bg-zinc-200 transition-all cursor-pointer shadow"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};
