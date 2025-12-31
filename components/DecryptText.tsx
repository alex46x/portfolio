
import React, { useState, useEffect, useRef } from 'react';

interface DecryptTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const DecryptText: React.FC<DecryptTextProps> = ({ text, className = '', delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const observerRef = useRef<HTMLSpanElement>(null);
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isAnimating) {
          setTimeout(() => startAnimation(), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [text, isAnimating]);

  const startAnimation = () => {
    setIsAnimating(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span ref={observerRef} className={className}>
      {displayText || text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('')}
    </span>
  );
};
