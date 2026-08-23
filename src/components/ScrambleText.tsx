import React, { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

const CHAR_SET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  isHovered,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const framesPerChar = 4; // reveals 1 char every 4 frames (100ms)
    const targetLength = text.length;

    intervalRef.current = setInterval(() => {
      frame++;
      const revealedCount = Math.floor(frame / framesPerChar);

      if (revealedCount >= targetLength) {
        setDisplayText(text);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      let result = '';
      for (let i = 0; i < targetLength; i++) {
        if (i < revealedCount) {
          result += text[i];
        } else if (text[i] === ' ' || text[i] === '\n') {
          result += text[i];
        } else {
          result += CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
        }
      }
      setDisplayText(result);
    }, 25);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, text]);

  return <span className={className}>{displayText}</span>;
};
