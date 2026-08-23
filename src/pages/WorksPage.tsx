import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { Search, ExternalLink, ArrowUpRight, Filter, Sparkles, Layers, Eye } from 'lucide-react';
import { TiltCard } from '../components/gsap/TiltCard';

interface WorksPageProps {
  onSelectProject: (project: Project) => void;
  onOpenContactModal: () => void;
}

type CategoryType = 'all' | 'enterprise' | 'web' | 'ecommerce' | 'corporate';

export const WorksPage: React.FC<WorksPageProps> = ({
  onSelectProject,
  onOpenContactModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { label: string; value: CategoryType; count: number }[] = [
    { label: 'All Works', value: 'all', count: PROJECTS_DATA.length },
    {
      label: 'Enterprise Portals',
      value: 'enterprise',
      count: PROJECTS_DATA.filter((p) => p.category === 'enterprise').length,
    },
    {
      label: 'Web & AI Apps',
      value: 'web',
      count: PROJECTS_DATA.filter((p) => p.category === 'web').length,
    },
    {
      label: 'E-Commerce & Brands',
      value: 'ecommerce',
      count: PROJECTS_DATA.filter((p) => p.category === 'ecommerce').length,
    },
    {
      label: 'Corporate Platforms',
      value: 'corporate',
      count: PROJECTS_DATA.filter((p) => p.category === 'corporate').length,
    },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-black text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Portfolio Roster</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
            Verified Works & Client Deployments
          </h1>
          <p className="text-sm sm:text-base text-white/70 font-mono leading-relaxed">
            A comprehensive catalog of full-stack web applications, e-commerce architectures,
            custom client CMS themes, and autonomous AI automation pipelines.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Filter Pills with Fluid Motion */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 z-10 ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-white/70 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                      }}
                      className="absolute inset-0 bg-white rounded-full shadow -z-10"
                    />
                  )}
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-black/15 text-black'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search by tech or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-[#b91f2a] focus:ring-1 focus:ring-[#b91f2a] focus:outline-none rounded-full pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-white/40 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-zinc-950 border border-white/10">
            <p className="text-white/50 font-mono text-sm">
              No projects found matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-mono hover:bg-white/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="h-full"
                >
                  <TiltCard
                    maxTilt={5}
                    glareOpacity={0.18}
                    onClick={() => onSelectProject(project)}
                    className="group relative rounded-2xl bg-zinc-900/70 border border-white/10 hover:border-[#b91f2a]/40 overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer h-full hover:shadow-[0_0_25px_rgba(185,31,42,0.2)]"
                  >
                    {/* Image Container */}
                    <div className="relative h-52 w-full bg-zinc-950 overflow-hidden">
                      {project.images?.[0] ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/30 text-xs font-mono">
                          Preview Unavailable
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#b91f2a]/40 text-[10px] uppercase font-mono tracking-wider text-[#ff6b76]">
                          {project.category}
                        </span>
                        {project.period && (
                          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-white/60">
                            {project.period}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-1">
                          <span>{project.client}</span>
                          {project.role && <span>{project.role}</span>}
                        </div>

                        <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-[#ff6b76] transition-colors line-clamp-1 mb-2">
                          {project.title}
                        </h3>

                        <p className="text-xs text-white/65 line-clamp-3 leading-relaxed font-mono mb-4">
                          {project.description}
                        </p>

                        {project.impact && (
                          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-[#b91f2a]/20 text-[11px] text-white/75 font-mono mb-4">
                            <span className="text-[#ff4d5a] font-medium">Impact: </span>
                            {project.impact}
                          </div>
                        )}
                      </div>

                      {/* Footer / Tech list */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/60"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/40">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-[#ff4d5a] shrink-0">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Project Inquiries Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-zinc-950 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-light text-white mb-1">
              Need a custom web portal or automated infrastructure?
            </h3>
            <p className="text-xs text-white/60 font-mono">
              Let&apos;s discuss architecture requirements, timelines, and deployment strategies.
            </p>
          </div>
          <button
            onClick={onOpenContactModal}
            className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono font-medium tracking-wider uppercase hover:bg-zinc-200 transition-all cursor-pointer whitespace-nowrap shadow"
          >
            Start a Conversation
          </button>
        </div>
      </div>
    </div>
  );
};
