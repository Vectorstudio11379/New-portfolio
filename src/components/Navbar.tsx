import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SynapseXLogo } from './SynapseXLogo';
import { SquashHamburger } from './SquashHamburger';
import { ScrambleText } from './ScrambleText';
import { Magnetic } from './gsap/Magnetic';
import { ArrowUpRight, Briefcase, Cpu, Mail, Send, Home, User, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';

export type PageId = 'home' | 'works' | 'stack' | 'about';

interface NavbarProps {
  entranceComplete: boolean;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenContactModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  entranceComplete,
  activePage,
  onNavigate,
  onOpenContactModal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isContactHovered, setIsContactHovered] = useState<boolean>(false);
  const [isLogoHovered, setIsLogoHovered] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  // Dynamic scroll listener to drive backdrop blur intensification
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Compute dynamic Tailwind classes based on scroll depth
  const getHeaderBlurClass = () => {
    if (scrollY < 20) {
      return 'pt-4 sm:pt-6 pb-2 bg-transparent backdrop-blur-none border-b border-transparent shadow-none';
    } else if (scrollY < 120) {
      return 'pt-3 sm:pt-4 pb-3 bg-black/40 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20';
    } else if (scrollY < 280) {
      return 'pt-2.5 sm:pt-3.5 pb-2.5 sm:pb-3.5 bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/50';
    } else {
      return 'pt-2 sm:pt-3 pb-2 sm:pb-3 bg-black/85 backdrop-blur-2xl border-b border-white/15 shadow-2xl shadow-black/80';
    }
  };

  const getPillBlurClass = () => {
    if (scrollY < 20) {
      return 'bg-white/15 backdrop-blur-md border-white/10';
    } else if (scrollY < 120) {
      return 'bg-white/10 backdrop-blur-lg border-white/15';
    } else {
      return 'bg-zinc-900/80 backdrop-blur-2xl border-white/20 shadow-lg';
    }
  };

  const navLinks: { label: string; page: PageId; icon: React.ElementType; badge?: string }[] = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'Works', page: 'works', icon: Briefcase, badge: `${PROJECTS_DATA.length}` },
    { label: 'Stack', page: 'stack', icon: Cpu },
    { label: 'About', page: 'about', icon: User },
  ];

  const handlePageClick = (page: PageId) => {
    setIsMenuOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const springConfig = {
    type: 'spring' as const,
    stiffness: 350,
    damping: 28,
  };

  return (
    <motion.header
      id="main-navbar"
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: entranceComplete ? 1 : 0,
        y: entranceComplete ? 0 : -10,
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 pointer-events-none select-none transition-all duration-300 ${getHeaderBlurClass()}`}
    >
      {/* ----------------- DESKTOP NAV (SM & UP) ----------------- */}
      <div className="hidden sm:grid sm:grid-cols-3 items-center w-full max-w-7xl mx-auto pointer-events-auto">
        {/* Left: Logo Pill */}
        <div className="flex items-center justify-start">
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick('home');
            }}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            whileHover={{
              scale: 1.02,
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
            }}
            whileTap={{ scale: 0.98 }}
            className={`h-11 px-4 rounded-[14px] flex items-center gap-2 text-white border shadow-lg cursor-pointer transition-all duration-300 ${getPillBlurClass()} ${
              activePage === 'home'
                ? 'border-[#b91f2a]/60 shadow-[0_0_15px_rgba(185,31,42,0.25)]'
                : ''
            }`}
          >
            <SynapseXLogo size={16} className="text-white" />
            <span className="text-[14px] font-medium tracking-tight text-white">
              <ScrambleText text="Timi" isHovered={isLogoHovered} />
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#ff4d5a] border border-[#b91f2a]/40 bg-[#b91f2a]/10 px-1 py-0.5 rounded font-mono">
              DEV
            </span>
          </motion.a>
        </div>

        {/* Center: Centered Desktop Navigation Capsule */}
        <div className="flex items-center justify-center">
          <div
            className={`h-11 px-2 rounded-[14px] border shadow-lg flex items-center gap-1 relative transition-all duration-300 ${getPillBlurClass()} ${
              scrollY > 100 ? 'shadow-[0_4px_20px_rgba(0,0,0,0.6)]' : ''
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handlePageClick(link.page)}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-3.5 py-1.5 rounded-[10px] text-[13px] font-mono transition-colors flex items-center gap-1.5 cursor-pointer z-10 ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-white/75 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDesktopNavPill"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                      }}
                      className="absolute inset-0 bg-white rounded-[10px] shadow-sm -z-10"
                    />
                  )}
                  <span>
                    <ScrambleText
                      text={link.label}
                      isHovered={hoveredLink === link.label && !isActive}
                    />
                  </span>
                  {link.badge && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/60">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Direct Contact Button */}
        <div className="flex items-center justify-end">
          <Magnetic strength={0.35}>
            <motion.button
              onClick={onOpenContactModal}
              onMouseEnter={() => setIsContactHovered(true)}
              onMouseLeave={() => setIsContactHovered(false)}
              whileHover={{ scale: 1.03, backgroundColor: '#ffffff' }}
              whileTap={{ scale: 0.97 }}
              className="h-11 px-5 bg-white rounded-full text-black flex items-center gap-2 font-medium text-[13px] tracking-tight shadow-lg cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(185,31,42,0.35)]"
            >
              <Send className="w-3.5 h-3.5 text-[#b91f2a]" />
              <span>
                <ScrambleText text="Get in Touch" isHovered={isContactHovered} />
              </span>
            </motion.button>
          </Magnetic>
        </div>
      </div>

      {/* ----------------- MOBILE NAV (< SM) ----------------- */}
      <div className="sm:hidden flex flex-col pointer-events-auto">
        {/* Top bar on Mobile */}
        <div className="flex items-center justify-between w-full">
          {/* Mobile Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick('home');
            }}
            whileTap={{ scale: 0.95 }}
            className={`h-10 px-3.5 rounded-full flex items-center gap-2 text-white border shadow-lg shrink-0 transition-all duration-300 ${
              scrollY > 50
                ? 'backdrop-blur-2xl bg-zinc-950/90 border-white/20'
                : 'backdrop-blur-xl bg-black/60 border-white/15'
            } ${
              activePage === 'home'
                ? 'border-[#b91f2a]/60 shadow-[0_0_12px_rgba(185,31,42,0.3)]'
                : ''
            }`}
          >
            <SynapseXLogo size={14} className="text-white" />
            <span className="text-[13px] font-medium">Timi</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#b91f2a] animate-pulse" />
          </motion.a>

          {/* Right Mobile Controls: Contact CTA + Vertical Menu Toggle */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onOpenContactModal}
              whileTap={{ scale: 0.95 }}
              className="h-10 px-3.5 bg-white rounded-full text-black flex items-center gap-1.5 font-medium text-[12px] shadow cursor-pointer font-mono"
            >
              <Mail className="w-3 h-3 text-[#b91f2a]" />
              <span>Contact</span>
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.92 }}
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Navigation'}
              className={`w-10 h-10 rounded-full border text-white flex items-center justify-center shadow cursor-pointer transition-all duration-300 ${
                scrollY > 50
                  ? 'backdrop-blur-2xl bg-zinc-950/90 border-white/20'
                  : 'backdrop-blur-xl bg-black/60 border-white/15'
              }`}
            >
              <SquashHamburger isOpen={isMenuOpen} size="mobile" />
            </motion.button>
          </div>
        </div>

        {/* Vertical Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2.5 p-2 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-white/15 shadow-2xl flex flex-col gap-1 w-full overflow-hidden"
            >
              {/* Vertical Navigation Links */}
              {navLinks.map((link, idx) => {
                const IconComponent = link.icon;
                const isActive = activePage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handlePageClick(link.page)}
                    className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl transition-colors group cursor-pointer text-left ${
                      isActive
                        ? 'bg-white text-black font-semibold'
                        : 'hover:bg-white/10 text-white/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-mono ${
                          isActive ? 'text-black/50' : 'text-white/40 group-hover:text-[#ff4d5a]'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-[14px] font-medium tracking-tight">
                        {link.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {link.badge && !isActive && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/60 font-mono">
                          {link.badge}
                        </span>
                      )}
                      <IconComponent
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-black' : 'text-white/40 group-hover:text-white'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}

              {/* Direct Contact Modal Trigger in Vertical Menu */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenContactModal();
                }}
                className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-[#b91f2a]/10 hover:bg-[#b91f2a]/20 border border-[#b91f2a]/30 text-[#ff6b76] transition-colors group cursor-pointer text-left mt-1"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-[#ff4d5a]">05</span>
                  <span className="text-[14px] font-medium tracking-tight">Contact</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#ff808b]">
                  <Mail className="w-3.5 h-3.5" />
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>

              {/* Status Footer in Vertical Menu */}
              <div className="pt-2 mt-1 border-t border-white/10 px-3.5 pb-1 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b91f2a] animate-pulse" />
                  <span>Available for work</span>
                </span>
                <span className="text-white/40">Lagos / Abuja</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
