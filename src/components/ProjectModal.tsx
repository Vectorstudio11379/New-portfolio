import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, CheckCircle2, ChevronRight, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { ProjectImage } from './ProjectImage';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!project) return null;

  const images = project.images && project.images.length > 0 ? project.images : [];

  const handleNextImage = () => {
    if (images.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevImage = () => {
    if (images.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-lg overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-zinc-950 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-zinc-900/60 sticky top-0 z-20">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff6b76]">
                  {project.category} · {project.client}
                </span>
                {project.period && (
                  <span className="text-white/40 text-[10px]">
                    · {project.period}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
            {/* Visual Screenshot Showcase */}
            {images.length > 0 && (
              <div className="space-y-3">
                <div className="relative w-full aspect-[16/9] bg-zinc-900 rounded-xl overflow-hidden border border-white/10">
                  <ProjectImage
                    src={images[activeImageIndex]}
                    alt={`${project.title} Preview ${activeImageIndex + 1}`}
                    category={project.category}
                    client={project.client}
                    className="w-full h-full object-cover object-top"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md cursor-pointer transition-all"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md cursor-pointer transition-all"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] bg-black/70 backdrop-blur-md text-white border border-white/20">
                        {activeImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails if multiple images */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
                          activeImageIndex === i
                            ? 'border-[#b91f2a] ring-2 ring-[#b91f2a]/40'
                            : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <ProjectImage
                          src={img}
                          alt="Thumbnail"
                          category={project.category}
                          client={project.client}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Impact Highlight Callout */}
            <div className="p-4 rounded-xl bg-[#b91f2a]/10 border border-[#b91f2a]/30 text-xs text-white/90 space-y-1">
              <div className="flex items-center gap-2 text-[#ff6b76] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#ff4d5a]" />
                <span>Verified Business Result & Delivery</span>
              </div>
              <p className="text-white/80 pl-6 leading-relaxed">
                {project.impact}
              </p>
            </div>

            {/* Description & Overview */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-white/40">
                System Overview
              </h4>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-mono">
                {project.fullDetails?.overview || project.description}
              </p>
            </div>

            {/* Key Features if available */}
            {project.fullDetails?.keyFeatures && (
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-white/40">
                  Key Architectural Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.fullDetails.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1"
                    >
                      <div className="flex items-center gap-2 text-white font-medium text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ff4d5a] shrink-0" />
                        <span>{feat.title}</span>
                      </div>
                      <p className="text-[11px] text-white/60 pl-5.5 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges & Learnings if available */}
            {project.fullDetails?.challengesAndLearnings && (
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-white/40">
                  Engineering Challenges & Solutions
                </h4>
                <p className="text-xs text-white/70 leading-relaxed font-mono p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  {project.fullDetails.challengesAndLearnings}
                </p>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-white/40">
                Technologies & Architecture Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/85 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b91f2a]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between sticky bottom-0 z-20">
            <div className="text-xs text-white/50 hidden sm:block">
              Role: <span className="text-white">{project.role || 'Lead Web Developer'}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl hover:bg-white/10 text-white/70 text-xs font-mono transition-colors cursor-pointer"
              >
                Close
              </button>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  <span>Visit Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
