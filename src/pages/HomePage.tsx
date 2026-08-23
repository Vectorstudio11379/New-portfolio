import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/HeroSection';
import { MetricsSection } from '../components/MetricsSection';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ArrowUpRight, Sparkles, ExternalLink, ArrowRight, Layers, Cpu, Code2, Globe } from 'lucide-react';
import { TiltCard } from '../components/gsap/TiltCard';
import { Magnetic } from '../components/gsap/Magnetic';

interface HomePageProps {
  entranceComplete: boolean;
  onNavigate: (page: 'home' | 'works' | 'stack' | 'about') => void;
  onSelectProject: (project: Project) => void;
  onOpenContactModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  entranceComplete,
  onNavigate,
  onSelectProject,
  onOpenContactModal,
}) => {
  // Take the 3 top featured spotlight projects for the concise landing page
  const featuredSpotlights = PROJECTS_DATA.filter((p) => p.featured).slice(0, 3);

  const pillars = [
    {
      icon: Code2,
      title: 'Frontend Systems',
      desc: 'High-performance React & Next.js architectures with fluid responsive execution.',
    },
    {
      icon: Cpu,
      title: 'AI & Automations',
      desc: 'Autonomous N8N webhooks, Smartlead AI pipelines, and seamless CRM synchronizations.',
    },
    {
      icon: Globe,
      title: 'E-Commerce & Portals',
      desc: 'Tiered affiliate engines, Shopify Liquid themes, and secure member hubs.',
    },
    {
      icon: Layers,
      title: 'Performance & SEO',
      desc: 'Sub-second load speeds, Core Web Vitals excellence, and GA4 telemetry.',
    },
  ];

  return (
    <div className="w-full bg-black text-white">
      {/* 1. Hero Section */}
      <HeroSection
        entranceComplete={entranceComplete}
        onExploreClick={() => {
          const spotlightEl = document.getElementById('spotlight-section');
          if (spotlightEl) {
            spotlightEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            onNavigate('works');
          }
        }}
      />

      {/* 2. Spotlight Projects Section (Curated 3 works only) */}
      <section
        id="spotlight-section"
        className="relative py-12 sm:py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#ff4d5a] mb-1.5 sm:mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#b91f2a]" />
              <span>Selected Works</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
              Featured Case Studies
            </h2>
          </div>
          <Magnetic strength={0.3}>
            <button
              onClick={() => onNavigate('works')}
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white group px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 hover:border-[#b91f2a]/50 bg-white/5 hover:bg-[#b91f2a]/10 transition-all self-start md:self-auto cursor-pointer"
            >
              <span>View All Works ({PROJECTS_DATA.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#ff4d5a]" />
            </button>
          </Magnetic>
        </div>

        {/* 3 Bento Cards (1 column on mobile, 3 columns on desktop) with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {featuredSpotlights.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <TiltCard
                maxTilt={6}
                glareOpacity={0.2}
                onClick={() => onSelectProject(project)}
                className="group relative rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#b91f2a]/40 overflow-hidden transition-all duration-300 flex flex-col cursor-pointer h-full hover:shadow-[0_0_25px_rgba(185,31,42,0.2)]"
              >
                {/* Image Preview */}
                <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-zinc-950">
                  {project.images?.[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-xs font-mono">
                      No Preview
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />
                  <span className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#b91f2a]/40 text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-[#ff6b76]">
                    {project.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-mono text-white/50 mb-1">
                      {project.client}
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-[#ff6b76] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/65 mt-1.5 sm:mt-2 line-clamp-2 leading-relaxed font-mono">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white/5 text-[9px] sm:text-[10px] font-mono text-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-mono text-[#ff4d5a] inline-flex items-center gap-1 group-hover:underline">
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* View All Works Banner (Desktop Only to reduce mobile content) */}
        <div className="hidden sm:flex mt-10 p-6 rounded-2xl bg-gradient-to-r from-zinc-900/80 to-zinc-900/40 border border-white/10 flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-medium text-white">
              Looking for client portals, Shopify engines, or automation tools?
            </h4>
            <p className="text-xs text-white/60 mt-0.5 font-mono">
              Explore the complete directory of verified live projects and architecture specs.
            </p>
          </div>
          <button
            onClick={() => onNavigate('works')}
            className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono font-medium tracking-wider uppercase hover:bg-zinc-200 transition-all cursor-pointer whitespace-nowrap shadow"
          >
            Explore All Works ({PROJECTS_DATA.length})
          </button>
        </div>
      </section>

      {/* 3. Core Pillars Summary (1-Card layout on mobile) */}
      <section className="py-12 sm:py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 mb-1.5 sm:mb-2">
              Capabilities
            </div>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
              Engineering Disciplines
            </h2>
          </div>
          <button
            onClick={() => onNavigate('stack')}
            className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white group px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 hover:border-white/30 bg-white/5 transition-all self-start md:self-auto cursor-pointer"
          >
            <span>Inspect System Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 1 column on mobile, 2 on sm, 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-4 sm:p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/20 flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#ff4d5a] mb-3 sm:mb-4 group-hover:bg-[#b91f2a]/15 group-hover:border-[#b91f2a]/40 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-medium text-white mb-1.5 sm:mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed font-mono">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Real Performance Metrics */}
      <MetricsSection />

      {/* 5. Direct Connect CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto text-center">
        <div className="p-6 sm:p-12 rounded-3xl bg-zinc-950/90 border border-white/15 backdrop-blur-xl flex flex-col items-center">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#b91f2a] shadow-[0_0_10px_rgba(185,31,42,0.8)] animate-pulse mb-2 sm:mb-3" />
          <h2 className="text-xl sm:text-4xl font-light text-white tracking-tight mb-2 sm:mb-3">
            Have a project or technical challenge in mind?
          </h2>
          <p className="text-xs sm:text-sm text-white/65 max-w-lg mb-6 sm:mb-8 font-mono leading-relaxed">
            Available for full-time roles, enterprise contracts, and custom web engineering solutions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              onClick={onOpenContactModal}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-black text-xs font-mono font-medium tracking-wider uppercase hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
            >
              Start a Conversation
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hidden sm:inline-block px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-wider uppercase transition-all cursor-pointer border border-white/15"
            >
              Read Full Story
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
