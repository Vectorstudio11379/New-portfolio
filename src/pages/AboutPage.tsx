import React from 'react';
import { motion } from 'framer-motion';
import { CinematicSection } from '../components/CinematicSection';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Sparkles, User, MapPin, Mail, MessageSquare, ArrowUpRight, CheckCircle2, Shield, Globe, Terminal } from 'lucide-react';

interface AboutPageProps {
  onOpenContactModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenContactModal }) => {
  const principles = [
    {
      title: 'Precision & Clarity Over Complexity',
      desc: 'Writing clean, self-documenting code with clear domain boundaries, low surface area for bugs, and scalable component hierarchies.',
    },
    {
      title: 'Intuitive Micro-Interactions',
      desc: 'Crafting fluid visual feedback and reactive states that guide user intent effortlessly without cognitive friction.',
    },
    {
      title: 'Autonomous System Resilience',
      desc: 'Building fail-safe API webhooks, verified error handling, and robust zero-downtime automation pipelines.',
    },
    {
      title: 'Speed as a First-Class Feature',
      desc: 'Treating performance not as an afterthought, but as the fundamental bedrock of user retention and conversion.',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#ff4d5a] mb-3">
            <User className="w-3.5 h-3.5 text-[#b91f2a]" />
            <span>Profile & Trajectory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
            Engineering Background & Philosophy
          </h1>
          <p className="text-sm sm:text-base text-white/70 font-mono leading-relaxed">
            Lead Web Developer at Mirola Enterprises. Crafting high-conversion digital experiences,
            enterprise portals, and automated AI systems.
          </p>
        </div>

        {/* 1. Cinematic Perspective Statement */}
        <div className="mb-20 rounded-3xl bg-zinc-950/80 border border-white/10 overflow-hidden">
          <CinematicSection />
        </div>

        {/* 2. Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
          {/* Left Column: Biography & Career Journey */}
          <div className="lg:col-span-7 space-y-6 text-sm text-white/80 font-mono leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-light text-white font-sans tracking-tight mb-4">
              The Journey
            </h2>
            <p>
              I began with foundational experiences in teaching, computer operations at{' '}
              <span className="text-white font-medium">Dangote Cement Factory</span>, and
              high-volume customer operations at{' '}
              <span className="text-white font-medium">Unateus Logistics</span>.
            </p>
            <p>
              These diverse disciplines instilled a deep appreciation for operational precision,
              rigorous quality control, and direct user empathy. I transitioned into full-stack web
              engineering at{' '}
              <span className="text-[#ff6b76] font-medium">5th Element Media Group</span>, where I
              engineered interactive, high-conversion websites for international consumer brands.
            </p>
            <p>
              Currently, I serve as the{' '}
              <span className="text-white font-semibold">Lead Web Developer</span> at{' '}
              <span className="text-[#ff6b76] font-medium">Mirola Enterprises</span>. Here, I
              architect scalable web platforms, role-based enterprise portals (like MIRODATA), and
              tiered community ambassador programs.
            </p>
          </div>

          {/* Right Column: Quick Facts & Status Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/15 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#b91f2a] shadow-[0_0_10px_rgba(185,31,42,0.8)] animate-pulse" />
                <span className="text-xs uppercase font-mono tracking-widest text-white/70">
                  Current Status
                </span>
              </div>

              <div>
                <div className="text-base font-medium text-white">Lead Web Developer</div>
                <div className="text-xs font-mono text-[#ff4d5a] mt-0.5">Mirola Enterprises</div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3 text-xs font-mono text-white/70">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Location:</span>
                  <span className="text-white">Lagos & Abuja, Nigeria</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Timezone:</span>
                  <span className="text-white">WAT (UTC+1)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40">Availability:</span>
                  <span className="text-[#ff6b76]">Global Remote & Contracts</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <button
                  onClick={onOpenContactModal}
                  className="w-full py-3 rounded-xl bg-white text-black text-xs font-mono font-medium tracking-wider uppercase hover:bg-zinc-200 transition-all cursor-pointer shadow active:scale-[0.99]"
                >
                  Send Direct Inquiry
                </button>
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 text-xs font-mono flex items-center justify-center gap-2 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>Direct WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Core Principles */}
        <div className="border-t border-white/10 pt-16 mb-20">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 mb-3">
            Core Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8">
            Engineering Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#b91f2a]/40 transition-all"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-xs font-mono text-[#ff4d5a]">0{idx + 1}.</span>
                  <h3 className="text-base font-medium text-white">{p.title}</h3>
                </div>
                <p className="text-xs text-white/65 font-mono leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
