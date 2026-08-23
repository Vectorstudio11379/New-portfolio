import React, { useState, useEffect, useRef } from 'react';

interface ScrambleInProps {
  text: string;
  delay?: number; // ms before start
  triggered?: boolean;
  className?: string;
}

const CHAR_SET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const ScrambleIn: React.FC<ScrambleInProps> = ({
  text,
  delay = 0,
  triggered = true,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>('');
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!triggered) {
      setDisplayText('');
      return;
    }

    const timeoutId = setTimeout(() => {
      hasStartedRef.current = true;
      let frame = 0;
      const revealRate = 0.5; // characters revealed per frame (25ms)
      const targetLength = text.length;

      const intervalId = setInterval(() => {
        frame++;
        const revealedCount = Math.floor(frame * revealRate);

        if (revealedCount >= targetLength) {
          setDisplayText(text);
          clearInterval(intervalId);
          return;
        }

        let result = '';
        for (let i = 0; i < targetLength; i++) {
          if (i < revealedCount) {
            // Already revealed character
            result += text[i];
          } else if (i < revealedCount + 4) {
            // Scrambled random character ahead of the cursor
            if (text[i] === ' ' || text[i] === '\n') {
              result += text[i];
            } else {
              const randChar =
                CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
              result += randChar;
            }
          } else {
            // Beyond reveal window - remain invisible/empty or space
            if (text[i] === ' ' || text[i] === '\n') {
              result += text[i];
            }
          }
        }
        setDisplayText(result);
      }, 25);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, delay, triggered]);

  if (!triggered || !displayText) {
    return <span className={className}>&nbsp;</span>;
  }

  return <span className={className}>{displayText}</span>;
};
