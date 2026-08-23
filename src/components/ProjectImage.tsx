import React, { useState } from 'react';
import { Layers, ShieldCheck, Sparkles, Database, ShoppingBag, Globe, Cpu, Wrench } from 'lucide-react';

interface ProjectImageProps {
  src?: string;
  alt: string;
  className?: string;
  category?: string;
  client?: string;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  className = '',
  category = 'web',
  client = '',
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Derive theme colors & icons based on category / title
  const getThematicDetails = () => {
    const lower = (category + ' ' + alt + ' ' + client).toLowerCase();
    if (lower.includes('cyber') || lower.includes('security') || lower.includes('resilient')) {
      return {
        accent: '#00d2ff',
        bgGradient: 'from-cyan-950/80 via-zinc-900 to-black',
        icon: ShieldCheck,
        tag: 'CYBER RESILIENCE',
      };
    }
    if (lower.includes('mirodata') || lower.includes('auth') || lower.includes('data')) {
      return {
        accent: '#ff8a00',
        bgGradient: 'from-amber-950/80 via-zinc-900 to-black',
        icon: Database,
        tag: 'DATA & AUTH HUB',
      };
    }
    if (lower.includes('e-commerce') || lower.includes('brand') || lower.includes('twist') || lower.includes('shop') || lower.includes('fashion')) {
      return {
        accent: '#ec4899',
        bgGradient: 'from-pink-950/80 via-zinc-900 to-black',
        icon: ShoppingBag,
        tag: 'E-COMMERCE SYSTEM',
      };
    }
    if (lower.includes('cleaner') || lower.includes('service')) {
      return {
        accent: '#10b981',
        bgGradient: 'from-emerald-950/80 via-zinc-900 to-black',
        icon: Globe,
        tag: 'SERVICE PORTAL',
      };
    }
    if (lower.includes('dan') || lower.includes('quality') || lower.includes('cement')) {
      return {
        accent: '#eab308',
        bgGradient: 'from-yellow-950/80 via-zinc-900 to-black',
        icon: Wrench,
        tag: 'QUALITY PROTOCOL',
      };
    }
    if (lower.includes('ai') || lower.includes('automation')) {
      return {
        accent: '#a855f7',
        bgGradient: 'from-purple-950/80 via-zinc-900 to-black',
        icon: Cpu,
        tag: 'AI AUTOMATION',
      };
    }
    return {
      accent: '#ff4d5a',
      bgGradient: 'from-rose-950/80 via-zinc-900 to-black',
      icon: Sparkles,
      tag: 'ENTERPRISE ARCHITECTURE',
    };
  };

  const theme = getThematicDetails();
  const IconComponent = theme.icon;

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full relative overflow-hidden bg-gradient-to-br ${theme.bgGradient} flex flex-col justify-between p-6 select-none border border-white/5 ${className}`}
      >
        {/* Subtle decorative grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Ambient Top Glow */}
        <div
          className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: theme.accent }}
        />

        {/* Top Header Mockup */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-[10px] font-mono text-white/40 tracking-wider">
              {client || 'PRODUCTION PLATFORM'}
            </span>
          </div>
          <span
            className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border bg-black/40"
            style={{
              borderColor: `${theme.accent}40`,
              color: theme.accent,
            }}
          >
            {theme.tag}
          </span>
        </div>

        {/* Center UI Showcase */}
        <div className="relative z-10 my-auto py-2">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-2.5 rounded-xl border bg-black/50"
              style={{ borderColor: `${theme.accent}30` }}
            >
              <IconComponent className="w-5 h-5" style={{ color: theme.accent }} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white line-clamp-1">{alt}</h4>
              <p className="text-[11px] font-mono text-white/50">{client || 'Elijah Ezekiel Portfolio'}</p>
            </div>
          </div>

          {/* Mini Mock Dashboard Widgets */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10">
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-[9px] font-mono text-white/40 block">STATUS</span>
              <span className="text-xs font-mono font-medium" style={{ color: theme.accent }}>
                ● Deployed & Live
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-[9px] font-mono text-white/40 block">PERFORMANCE</span>
              <span className="text-xs font-mono font-medium text-white/80">99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/40 pt-2 border-t border-white/5">
          <span>React • Next.js • Tailwind</span>
          <span className="text-white/60">Live Architecture</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-zinc-950 ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover object-top transition-all duration-500 ${
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      />
    </div>
  );
};
