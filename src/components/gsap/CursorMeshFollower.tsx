import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CursorMeshFollower: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop/devices with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const setPos = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', setPos);

    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      gsap.set(ring, {
        x: pos.x,
        y: pos.y,
      });
    });

    return () => {
      window.removeEventListener('mousemove', setPos);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-[#b91f2a] shadow-[0_0_8px_rgba(185,31,42,0.9)] mix-blend-screen pointer-events-none"
      />
      {/* Elastic trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#b91f2a]/60 shadow-[0_0_15px_rgba(185,31,42,0.3)] pointer-events-none transition-[opacity,transform] duration-300"
      />
    </div>
  );
};
