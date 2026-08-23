import React, { useState } from 'react';
import { SynapseXLogo } from './SynapseXLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Magnetic } from './gsap/Magnetic';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Globe, Copy, Check, ArrowUp, Github, Linkedin, ExternalLink } from 'lucide-react';

const FOOTER_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4';

interface FooterSectionProps {
  onOpenContactModal: () => void;
  onNavigate?: (page: 'home' | 'works' | 'stack' | 'about') => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenContactModal,
  onNavigate,
}) => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact-section"
      className="relative bg-black text-white overflow-hidden border-t border-white/10 select-none"
    >
      <div className="flex flex-col md:flex-row min-h-[480px]">
        {/* Left Column: Video */}
        <div className="relative w-full md:w-1/2 h-[320px] md:h-auto overflow-hidden bg-zinc-950">
          <video
            autoPlay
            muted
            loop
            playsInline
            src={FOOTER_VIDEO_URL}
            className="w-full h-full object-cover pointer-events-none brightness-[0.7] contrast-[1.15]"
          />
          {/* Dark gradient blend on right side */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-black" />

          <div className="absolute bottom-6 left-6 z-10 space-y-2">
            <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/80 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#b91f2a] shadow-[0_0_8px_rgba(185,31,42,0.9)] animate-pulse" />
              <span>Global Remote Ready · Lagos / Abuja (UTC+1)</span>
            </div>
            <div className="text-[11px] text-[#ff6b76] font-mono pl-1">
              Lead Web Developer @ Mirola Enterprises
            </div>
          </div>
        </div>

        {/* Right Column: Content & Contact Details */}
        <div className="w-full md:w-1/2 p-5 sm:p-10 md:p-16 flex flex-col justify-between bg-black">
          <div>
            {/* Logo + Brand */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <SynapseXLogo size={18} className="text-[#ff4d5a]" />
                <span className="text-[15px] font-medium text-white/90 tracking-tight">
                  Elijah Ezekiel (Timi)
                </span>
                <span className="text-[10px] font-mono text-[#ff6b76] border border-[#b91f2a]/40 bg-[#b91f2a]/10 px-1.5 py-0.5 rounded">
                  LEAD WEB DEV
                </span>
              </div>

              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#b91f2a]/20 border border-white/10 hover:border-[#b91f2a]/40 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Navigation Pills */}
            {onNavigate && (
              <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs">
                <button
                  onClick={() => {
                    onNavigate('home');
                    scrollToTop();
                  }}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    onNavigate('works');
                    scrollToTop();
                  }}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white cursor-pointer"
                >
                  Works
                </button>
                <button
                  onClick={() => {
                    onNavigate('stack');
                    scrollToTop();
                  }}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white cursor-pointer"
                >
                  Stack
                </button>
                <button
                  onClick={() => {
                    onNavigate('about');
                    scrollToTop();
                  }}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white cursor-pointer"
                >
                  About
                </button>
              </div>
            )}

            {/* Ethos Paragraph */}
            <p className="text-white/50 text-[13px] sm:text-[14px] leading-relaxed max-w-md font-mono mb-6">
              {PERSONAL_INFO.bio}
            </p>

            {/* Direct Contact Grid - Fully Responsive */}
            <div className="space-y-2.5 font-mono text-xs">
              {/* 1. Email Box */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#b91f2a]/40 transition-colors gap-2 min-w-0">
                <div className="flex items-center gap-2.5 text-white/80 min-w-0 flex-1">
                  <Mail className="w-4 h-4 text-[#ff4d5a] shrink-0" />
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="hover:text-white truncate min-w-0 text-xs sm:text-xs"
                    title={PERSONAL_INFO.email}
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-white/60 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer shrink-0 px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* 2. WhatsApp Direct Action */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors gap-2 min-w-0">
                <div className="flex items-center gap-2.5 text-white/80 min-w-0 flex-1">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white truncate text-xs"
                  >
                    WhatsApp Chat
                  </a>
                </div>
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider shrink-0 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/25 hover:bg-emerald-400/20 transition-colors"
                >
                  Open
                </a>
              </div>

              {/* 3. Location & Availability */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/60 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.location}</span>
                </div>
                <span className="text-[10px] font-mono text-white/40 shrink-0 pl-2">UTC+1</span>
              </div>

              {/* 4. Social Link Badges (3-column responsive grid with guaranteed no-wrap) */}
              <div className="grid grid-cols-3 gap-2 pt-1.5">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Github className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Linkedin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white text-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Live Site</span>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Magnetic strength={0.25} className="w-full sm:w-auto">
                <button
                  onClick={onOpenContactModal}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-medium text-xs font-mono tracking-wider uppercase hover:bg-zinc-200 transition-colors cursor-pointer shadow text-center"
                >
                  Send Direct Message
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-white/10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/30 text-[11px] font-mono">
            <span>&copy; {new Date().getFullYear()} Elijah Ezekiel (Timi). All rights reserved.</span>
            <span>Mirola Enterprises · SynapseX Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
