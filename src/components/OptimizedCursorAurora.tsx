import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

interface OptimizedCursorAuroraProps {
  className?: string;
  intensity?: number;
  size?: number;
}

const OptimizedCursorAurora: React.FC<OptimizedCursorAuroraProps> = ({ 
  className = "", 
  intensity = 0.1,
  size = 200 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastMouseUpdate = useRef<number>(0);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized mouse movement handler with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMouseUpdate.current < 16) return; // Throttle to 60fps
    
    lastMouseUpdate.current = now;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
      setIsHovering(true);
    }
  }, []);

  // Optimized mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    // Smooth transition to center
    const moveToCenter = () => {
      setMousePosition(prev => ({
        x: prev.x + (50 - prev.x) * 0.05,
        y: prev.y + (50 - prev.y) * 0.05
      }));
      
      if (Math.abs(mousePosition.x - 50) > 0.5 || Math.abs(mousePosition.y - 50) > 0.5) {
        animationRef.current = requestAnimationFrame(moveToCenter);
      }
    };
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(moveToCenter);
  }, [mousePosition]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      container.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseenter', handleMouseEnter);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Simplified aurora colors
  const auroraColors = useMemo(() => [
    'hsl(200, 100%, 80%)',
    'hsl(280, 100%, 85%)',
    'hsl(320, 100%, 90%)',
    'hsl(180, 100%, 75%)'
  ], []);

  // Optimized aurora effect calculation
  const auroraEffect = useMemo(() => {
    if (isReducedMotion) {
      return `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
        ${auroraColors[0]}${Math.floor(intensity * 0.5 * 255).toString(16).padStart(2, '0')} 0%, 
        transparent 50%)`;
    }

    const time = Date.now() * 0.001;
    const baseX = mousePosition.x;
    const baseY = mousePosition.y;
    
    // Simplified layers for better performance
    const layers = [
      {
        x: baseX + Math.sin(time * 0.3) * 5,
        y: baseY + Math.cos(time * 0.2) * 4,
        color: auroraColors[0],
        opacity: intensity * 0.6,
        size: size * 0.8
      },
      {
        x: baseX + Math.sin(time * 0.5 + 1) * 8,
        y: baseY + Math.cos(time * 0.3 + 1) * 6,
        color: auroraColors[1],
        opacity: intensity * 0.4,
        size: size * 1.2
      }
    ];

    return layers.map((layer, index) => 
      `radial-gradient(circle at ${layer.x}% ${layer.y}%, 
        ${layer.color}${Math.floor(layer.opacity * 255).toString(16).padStart(2, '0')} 0%, 
        transparent ${layer.size}px)`
    ).join(', ');
  }, [mousePosition, auroraColors, intensity, size, isReducedMotion]);

  if (isReducedMotion) {
    return (
      <div 
        ref={containerRef}
        className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: auroraEffect,
            willChange: 'auto'
          }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    >
      {/* Main Aurora Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          background: auroraEffect
        }}
        transition={{
          duration: 0.2,
          ease: "linear"
        }}
        style={{
          willChange: 'background'
        }}
      />

      {/* Floating Particles - Simplified */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x + 15}% ${mousePosition.y - 8}%, 
            ${auroraColors[2]}${Math.floor(intensity * 0.2 * 255).toString(16).padStart(2, '0')} 0%, 
            transparent 40%),
            radial-gradient(circle at ${mousePosition.x - 12}% ${mousePosition.y + 15}%, 
            ${auroraColors[3]}${Math.floor(intensity * 0.15 * 255).toString(16).padStart(2, '0')} 0%, 
            transparent 35%)`
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
        style={{
          willChange: 'background'
        }}
      />

      {/* Breathing Glow - Only when hovering */}
      {isHovering && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity
          }}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              ${auroraColors[1]}${Math.floor(intensity * 0.3 * 255).toString(16).padStart(2, '0')} 0%, 
              transparent 60%)`,
            willChange: 'opacity, transform'
          }}
        />
      )}
    </div>
  );
};

export default OptimizedCursorAurora;
