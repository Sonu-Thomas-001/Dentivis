import React, { useRef, useState } from 'react';
import { motion, useSpring, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "className" | "children"> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  glowColor?: string;
}

export const MagneticButton = ({ 

  children, 
  strength = 0.5,
  className,
  variant = 'primary',
  glowColor = 'rgba(37,99,235,0.4)',
  ...props 
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useSpring(0, { damping: 15, stiffness: 150, mass: 0.1 });
  const y = useSpring(0, { damping: 15, stiffness: 150, mass: 0.1 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const variants = {
    primary: "bg-white text-black hover:bg-white border text-black font-bold",
    secondary: "bg-[#0F172A]/80 backdrop-blur-md border border-white/10 text-white font-bold hover:bg-white/10",
    ghost: "bg-transparent text-white hover:text-white/80 font-bold"
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      style={{ x, y }}
      className={cn(
        "relative rounded-full px-8 py-4 overflow-hidden group magnetic-target",
        variants[variant],
        className
      )}
      {...props}
    >
      {/* Dynamic Glow Background */}
      {isHovered && (
        <motion.div
          layoutId="button-glow"
          className="absolute inset-0 z-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(120% 120% at 50% 120%, ${glowColor} 0%, transparent 50%)`,
          }}
        />
      )}
      
      {/* Animated Border for primary/secondary */}
      {(variant === 'primary' || variant === 'secondary') && (
        <div className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      )}
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
