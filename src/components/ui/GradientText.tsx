import React from 'react';

export const GradientText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#14B8A6] to-[#6366F1] ${className}`}>
    {children}
  </span>
);
