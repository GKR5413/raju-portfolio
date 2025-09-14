import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface WorkingLivingBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const WorkingLivingBackground: React.FC<WorkingLivingBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isClient, setIsClient] = useState(false);
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Handle mouse movement for cursor-aware effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  }, []);

  // Handle mouse leave to reset position
  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: 50, y: 50 });
  }, []);

  // Animation loop for time-based effects
  useEffect(() => {
    const animate = () => {
      setTime(prev => prev + 0.016); // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('mousemove', handleMouseMove);
          containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, [handleMouseMove, handleMouseLeave]);

  if (!isClient) {
    return (
      <div className={`min-h-screen ${className}`} ref={containerRef}>
        {children}
      </div>
    );
  }

  // Breathing gradient colors that shift over time
  const getBreathingColors = () => {
    const cycle = (time * 0.02) % 4; // 4 color cycles
    const t = cycle - Math.floor(cycle);
    
    const colorSets = [
      { from: 'hsl(220, 70%, 60%)', via: 'hsl(280, 50%, 70%)', to: 'hsl(320, 60%, 80%)' },
      { from: 'hsl(200, 80%, 50%)', via: 'hsl(260, 60%, 65%)', to: 'hsl(300, 70%, 75%)' },
      { from: 'hsl(240, 60%, 70%)', via: 'hsl(300, 50%, 80%)', to: 'hsl(340, 70%, 60%)' },
      { from: 'hsl(180, 70%, 60%)', via: 'hsl(240, 60%, 70%)', to: 'hsl(280, 80%, 50%)' }
    ];

    const currentSet = colorSets[Math.floor(cycle)];
    const nextSet = colorSets[(Math.floor(cycle) + 1) % colorSets.length];

    return {
      from: t < 0.5 ? currentSet.from : nextSet.from,
      via: t < 0.5 ? currentSet.via : nextSet.via,
      to: t < 0.5 ? currentSet.to : nextSet.to
    };
  };

  const colors = getBreathingColors();

  return (
    <div className={`min-h-screen relative ${className}`} ref={containerRef}>
      {/* Background Layers - Behind content */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Primary Breathing Gradient */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            background: [
              `radial-gradient(circle at 20% 30%, ${colors.from} 0%, ${colors.via} 40%, ${colors.to} 100%)`,
              `radial-gradient(circle at 80% 70%, ${colors.via} 0%, ${colors.to} 40%, ${colors.from} 100%)`,
              `radial-gradient(circle at 50% 20%, ${colors.to} 0%, ${colors.from} 40%, ${colors.via} 100%)`,
              `radial-gradient(circle at 20% 30%, ${colors.from} 0%, ${colors.via} 40%, ${colors.to} 100%)`
            ]
          }}
          transition={{
            duration: 30,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />

        {/* Secondary Breathing Layer */}
        <motion.div
          className="absolute inset-0 w-full h-full opacity-40"
          animate={{
            background: [
              `linear-gradient(135deg, ${colors.from}20 0%, ${colors.to}20 100%)`,
              `linear-gradient(225deg, ${colors.via}20 0%, ${colors.from}20 100%)`,
              `linear-gradient(315deg, ${colors.to}20 0%, ${colors.via}20 100%)`,
              `linear-gradient(45deg, ${colors.from}20 0%, ${colors.to}20 100%)`
            ]
          }}
          transition={{
            duration: 45,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
      </div>

      {/* Aurora Effects - Above background but below content */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {/* Cursor-Aware Aurora Effect */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              hsl(200, 100%, 80%)15 0%, 
              hsl(280, 100%, 85%)10 20%, 
              hsl(320, 100%, 90%)08 40%, 
              transparent 80%)`
          }}
          transition={{
            duration: 0.1,
            ease: "linear"
          }}
        />

        {/* Floating Aurora Particles */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            background: `radial-gradient(circle at ${mousePosition.x + 20}% ${mousePosition.y - 10}%, 
              hsl(280, 100%, 85%)08 0%, 
              transparent 30%),
              radial-gradient(circle at ${mousePosition.x - 15}% ${mousePosition.y + 20}%, 
              hsl(320, 100%, 90%)06 0%, 
              transparent 25%),
              radial-gradient(circle at ${mousePosition.x + 30}% ${mousePosition.y + 15}%, 
              hsl(180, 100%, 75%)04 0%, 
              transparent 20%)`
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        />

        {/* Breathing Pulse Effect */}
        <motion.div
          className="absolute inset-0 w-full h-full opacity-20"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity
          }}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors.to}30 0%, transparent 70%)`
          }}
        />
      </div>

      {/* Content - Above all background effects */}
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};

export default WorkingLivingBackground;
