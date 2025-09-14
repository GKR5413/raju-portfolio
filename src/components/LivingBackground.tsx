import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface LivingBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const LivingBackground: React.FC<LivingBackgroundProps> = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    setMousePosition({ x: 50, y: 50 }); // Center position
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

  // Breathing gradient colors that shift over time
  const breathingGradients = [
    // Primary breathing gradient
    {
      from: 'hsl(220, 70%, 60%)',
      via: 'hsl(280, 50%, 70%)',
      to: 'hsl(320, 60%, 80%)'
    },
    {
      from: 'hsl(200, 80%, 50%)',
      via: 'hsl(260, 60%, 65%)',
      to: 'hsl(300, 70%, 75%)'
    },
    {
      from: 'hsl(240, 60%, 70%)',
      via: 'hsl(300, 50%, 80%)',
      to: 'hsl(340, 70%, 60%)'
    },
    {
      from: 'hsl(180, 70%, 60%)',
      via: 'hsl(240, 60%, 70%)',
      to: 'hsl(280, 80%, 50%)'
    }
  ];

  // Aurora effect colors
  const auroraColors = [
    'hsl(200, 100%, 80%)',
    'hsl(280, 100%, 85%)',
    'hsl(320, 100%, 90%)',
    'hsl(180, 100%, 75%)'
  ];

  if (!isClient) {
    return (
      <div className={`min-h-screen ${className}`} ref={containerRef}>
        {children}
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`} ref={containerRef}>
      {/* Breathing Gradient Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${breathingGradients[0].from} 0%, ${breathingGradients[0].via} 40%, ${breathingGradients[0].to} 100%)`,
            `radial-gradient(circle at 80% 70%, ${breathingGradients[1].from} 0%, ${breathingGradients[1].via} 40%, ${breathingGradients[1].to} 100%)`,
            `radial-gradient(circle at 50% 20%, ${breathingGradients[2].from} 0%, ${breathingGradients[2].via} 40%, ${breathingGradients[2].to} 100%)`,
            `radial-gradient(circle at 30% 80%, ${breathingGradients[3].from} 0%, ${breathingGradients[3].via} 40%, ${breathingGradients[3].to} 100%)`,
            `radial-gradient(circle at 20% 30%, ${breathingGradients[0].from} 0%, ${breathingGradients[0].via} 40%, ${breathingGradients[0].to} 100%)`
          ]
        }}
        transition={{
          duration: 45, // 45 seconds for full cycle
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          willChange: 'background'
        }}
      />

      {/* Secondary Breathing Layer */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-60"
        animate={{
          background: [
            `linear-gradient(135deg, ${breathingGradients[0].from}20 0%, ${breathingGradients[0].to}20 100%)`,
            `linear-gradient(225deg, ${breathingGradients[1].from}20 0%, ${breathingGradients[1].to}20 100%)`,
            `linear-gradient(315deg, ${breathingGradients[2].from}20 0%, ${breathingGradients[2].to}20 100%)`,
            `linear-gradient(45deg, ${breathingGradients[3].from}20 0%, ${breathingGradients[3].to}20 100%)`,
            `linear-gradient(135deg, ${breathingGradients[0].from}20 0%, ${breathingGradients[0].to}20 100%)`
          ]
        }}
        transition={{
          duration: 60, // 60 seconds for secondary layer
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          willChange: 'background'
        }}
      />

      {/* Cursor-Aware Aurora Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            ${auroraColors[0]}15 0%, 
            ${auroraColors[1]}10 20%, 
            ${auroraColors[2]}08 40%, 
            ${auroraColors[3]}05 60%, 
            transparent 80%)`
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
        style={{
          willChange: 'background'
        }}
      />

      {/* Floating Aurora Particles */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x + 20}% ${mousePosition.y - 10}%, 
            ${auroraColors[1]}08 0%, 
            transparent 30%),
            radial-gradient(circle at ${mousePosition.x - 15}% ${mousePosition.y + 20}%, 
            ${auroraColors[2]}06 0%, 
            transparent 25%),
            radial-gradient(circle at ${mousePosition.x + 30}% ${mousePosition.y + 15}%, 
            ${auroraColors[3]}04 0%, 
            transparent 20%)`
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        style={{
          willChange: 'background'
        }}
      />

      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default LivingBackground;
