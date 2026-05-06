import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tiltStrength?: number;
  style?: React.CSSProperties;
}

export const TiltCard = ({ 
  children, 
  className,
  glowColor = 'rgba(20,184,166,0.15)',
  tiltStrength = 15,
  style
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position relative to center of card (-1 to 1)
  const mouseX = useSpring(0, { damping: 30, stiffness: 200, mass: 0.5 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 200, mass: 0.5 });
  
  const rotateX = useTransform(mouseY, [-1, 1], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(mouseX, [-1, 1], [-tiltStrength, tiltStrength]);
  
  // Calculate dynamic lighting position based on mouse over the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    // Normalize to -1 to 1
    const nx = ((e.clientX - left) / width) * 2 - 1;
    const ny = ((e.clientY - top) / height) * 2 - 1;
    
    mouseX.set(nx);
    mouseY.set(ny);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Convert -1 to 1 back to percentages for background gradient positioning
  const bgX = useTransform(mouseX, [-1, 1], [0, 100]);
  const bgY = useTransform(mouseY, [-1, 1], [0, 100]);
  
  // A template string mapping the x and y spring values to a gradient syntax
  const backgroundStyle = useTransform(
    [bgX, bgY],
    ([x, y]) => `radial-gradient(800px circle at ${x}% ${y}%, ${glowColor}, transparent 40%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        "relative rounded-3xl bg-[#0F172A]/80 border border-white/5 backdrop-blur-md overflow-hidden",
        className
      )}
    >
      {/* Dynamic Lighting Overlay */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: backgroundStyle as unknown as string,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* Content wrapper with depth */}
      <div 
        className="relative z-10 h-full w-full pointer-events-auto"
        style={{ transform: 'translateZ(30px)' }}
      >
        {children}
      </div>
    </motion.div>
  );
};
