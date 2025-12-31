
import React from 'react';

interface FloatingPanelProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({ children, className = '', glow = false }) => {
  return (
    <div className={`glass rounded-2xl p-6 transition-all duration-500 hover:bg-white/5 ${glow ? 'orange-glow border-orange-500/20' : ''} ${className}`}>
      {children}
    </div>
  );
};
