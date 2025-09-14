import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SimpleLivingBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const SimpleLivingBackground: React.FC<SimpleLivingBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
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
    setMousePosition({ x: 50, y: 50 });
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

  return (
    <div className={`min-h-screen relative ${className}`} ref={containerRef}>
      {/* Simple Breathing Gradient */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, hsl(220, 70%, 60%) 0%, hsl(280, 50%, 70%) 40%, hsl(320, 60%, 80%) 100%)',
            'radial-gradient(circle at 80% 70%, hsl(280, 50%, 70%) 0%, hsl(320, 60%, 80%) 40%, hsl(220, 70%, 60%) 100%)',
            'radial-gradient(circle at 50% 20%, hsl(320, 60%, 80%) 0%, hsl(220, 70%, 60%) 40%, hsl(280, 50%, 70%) 100%)',
            'radial-gradient(circle at 20% 30%, hsl(220, 70%, 60%) 0%, hsl(280, 50%, 70%) 40%, hsl(320, 60%, 80%) 100%)'
          ]
        }}
        transition={{
          duration: 30,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />

      {/* Simple Aurora Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
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

      {/* Content */}
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};

export default SimpleLivingBackground;
