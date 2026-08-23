import React from 'react';

interface SynapseXLogoProps {
  className?: string;
  size?: number;
}

export const SynapseXLogo: React.FC<SynapseXLogoProps> = ({ className = 'w-5 h-5', size }) => {
  const pathD =
    'M 1.5,23 L 1.5,33 C 1.5,38.5 6,43 11.5,43 L 16.5,43 C 22,43 26.5,38.5 26.5,33 Q 28,28 33,26.5 C 38.5,26.5 43,22 43,16.5 L 43,11.5 C 43,6 38.5,1.5 33,1.5 L 23,1.5 Q 12,12 1.5,23 Z';

  return (
    <svg
      viewBox="-50 -50 100 100"
      className={`fill-current inline-block shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
      aria-label="SynapseX Neural Geometric Monogram"
    >
      <g>
        {/* 0 deg quadrant */}
        <path d={pathD} />
        {/* 90 deg quadrant */}
        <path d={pathD} transform="rotate(90)" />
        {/* 180 deg quadrant */}
        <path d={pathD} transform="rotate(180)" />
        {/* 270 deg quadrant */}
        <path d={pathD} transform="rotate(270)" />
      </g>
    </svg>
  );
};
