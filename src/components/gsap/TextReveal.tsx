import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface TextRevealProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  charClassName = '',
  delay = 0.1,
  stagger = 0.02,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.gsap-char');

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 20,
        filter: 'blur(6px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger,
        delay,
        ease: 'power3.out',
      }
    );
  }, [text, delay, stagger]);

  return (
    <span ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`gsap-char inline-block ${char === ' ' ? 'w-2' : ''} ${charClassName}`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};
