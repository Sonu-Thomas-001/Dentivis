import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailXSpring = useSpring(cursorX, { damping: 40, stiffness: 150, mass: 0.8 });
  const trailYSpring = useSpring(cursorY, { damping: 40, stiffness: 150, mass: 0.8 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      if (isHidden) setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, .magnetic-target');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    addHoverListeners();

    // Re-attach listeners on mutations (if needed, simplified for now)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
      const interactiveElements = document.querySelectorAll('a, button, .magnetic-target');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [cursorX, cursorY, isHidden]);

  if (typeof window === 'undefined') return null;

  // On touch devices we shouldn't show this
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer blurred glow */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none mix-blend-screen z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(20, 184, 166, 0) 70%)',
          scale: isHovered ? 1.5 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[9999]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '10px', // Center offset based on 20px dot width
          translateY: '10px',
          scale: isHovered ? 1.8 : 1,
          opacity: isHidden ? 0 : isHovered ? 0.3 : 0.8,
        }}
      />
      
      {/* Inner sharp dot */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[10000] flex items-center justify-center backdrop-blur-sm shadow-[0_0_10px_rgba(37,99,235,0.8)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'white',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.5)' : 'none',
          scale: isHovered ? 2.5 : 0.6,
          opacity: isHidden ? 0 : 1,
        }}
      >
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-1 h-1 rounded-full bg-white"
          />
        )}
      </motion.div>
      <style>{`
        body {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: none;
        }
      `}</style>
    </>
  );
};
