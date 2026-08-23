import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CounterOdometerProps {
  value: string;
  className?: string;
}

export const CounterOdometer: React.FC<CounterOdometerProps> = ({
  value,
  className = '',
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<string>(value);

  useEffect(() => {
    if (!containerRef.current) return;

    // Parse the numeric part and non-numeric prefix/suffix
    const match = value.match(/([^0-9.]*)([0-9.]+)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const numericTarget = parseFloat(match[2]);
    const suffix = match[3] || '';
    const isDecimal = match[2].includes('.');
    const decimalPlaces = isDecimal ? match[2].split('.')[1].length : 0;

    const counterObj = { val: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counterObj, {
            val: numericTarget,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              const formattedNum = decimalPlaces > 0
                ? counterObj.val.toFixed(decimalPlaces)
                : Math.floor(counterObj.val).toString();
              setDisplayValue(`${prefix}${formattedNum}${suffix}`);
            },
            onComplete: () => {
              setDisplayValue(value);
            }
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={containerRef} className={`inline-block tabular-nums ${className}`}>
      {displayValue}
    </span>
  );
};
