import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface CursorAuroraProps {
  className?: string;
  intensity?: number;
  size?: number;
}

const CursorAurora: React.FC<CursorAuroraProps> = ({ 
  className = "", 
  intensity = 0.15,
  size = 300 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Aurora colors that shift over time
  const auroraColors = [
    'hsl(200, 100%, 80%)',
    'hsl(280, 100%, 85%)',
    'hsl(320, 100%, 90%)',
    'hsl(180, 100%, 75%)',
    'hsl(240, 100%, 88%)',
    'hsl(300, 100%, 82%)'
  ];

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
      setIsHovering(true);
    }
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    // Gradually move to center
    const moveToCenter = () => {
      setMousePosition(prev => ({
        x: prev.x + (50 - prev.x) * 0.1,
        y: prev.y + (50 - prev.y) * 0.1
      }));
      
      if (Math.abs(mousePosition.x - 50) > 1 || Math.abs(mousePosition.y - 50) > 1) {
        animationRef.current = requestAnimationFrame(moveToCenter);
      }
    };
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(moveToCenter);
  }, [mousePosition]);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseenter', handleMouseEnter);
      
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

  // Calculate aurora effect based on mouse position and time
  const getAuroraEffect = () => {
    const time = Date.now() * 0.001;
    const baseX = mousePosition.x;
    const baseY = mousePosition.y;
    
    // Create multiple aurora layers with different offsets
    const layers = [
      {
        x: baseX + Math.sin(time * 0.5) * 10,
        y: baseY + Math.cos(time * 0.3) * 8,
        color: auroraColors[0],
        opacity: intensity * 0.8,
        size: size * 0.8
      },
      {
        x: baseX + Math.sin(time * 0.7 + 1) * 15,
        y: baseY + Math.cos(time * 0.4 + 1) * 12,
        color: auroraColors[1],
        opacity: intensity * 0.6,
        size: size * 1.2
      },
      {
        x: baseX + Math.sin(time * 0.3 + 2) * 8,
        y: baseY + Math.cos(time * 0.6 + 2) * 6,
        color: auroraColors[2],
        opacity: intensity * 0.4,
        size: size * 0.6
      },
      {
        x: baseX + Math.sin(time * 0.9 + 3) * 20,
        y: baseY + Math.cos(time * 0.2 + 3) * 15,
        color: auroraColors[3],
        opacity: intensity * 0.3,
        size: size * 1.5
      }
    ];

    return layers.map((layer, index) => 
      `radial-gradient(circle at ${layer.x}% ${layer.y}%, 
        ${layer.color}${Math.floor(layer.opacity * 255).toString(16).padStart(2, '0')} 0%, 
        ${layer.color}${Math.floor(layer.opacity * 128).toString(16).padStart(2, '0')} ${layer.size * 0.3}px, 
        ${layer.color}${Math.floor(layer.opacity * 64).toString(16).padStart(2, '0')} ${layer.size * 0.6}px, 
        transparent ${layer.size}px)`
    ).join(', ');
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    >
      {/* Main Aurora Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          background: getAuroraEffect()
        }}
        transition={{
          duration: 0.1,
          ease: "linear"
        }}
        style={{
          willChange: 'background'
        }}
      />

      {/* Floating Particles */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x + 20}% ${mousePosition.y - 10}%, 
            ${auroraColors[4]}${Math.floor(intensity * 0.3 * 255).toString(16).padStart(2, '0')} 0%, 
            transparent 50%),
            radial-gradient(circle at ${mousePosition.x - 15}% ${mousePosition.y + 20}%, 
            ${auroraColors[5]}${Math.floor(intensity * 0.2 * 255).toString(16).padStart(2, '0')} 0%, 
            transparent 40%),
            radial-gradient(circle at ${mousePosition.x + 30}% ${mousePosition.y + 15}%, 
            ${auroraColors[0]}${Math.floor(intensity * 0.25 * 255).toString(16).padStart(2, '0')} 0%, 
            transparent 35%)`
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
        style={{
          willChange: 'background'
        }}
      />

      {/* Breathing Glow */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          opacity: isHovering ? [0.3, 0.6, 0.3] : [0.1, 0.2, 0.1],
          scale: isHovering ? [1, 1.05, 1] : [1, 1.02, 1]
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            ${auroraColors[1]}${Math.floor(intensity * 0.4 * 255).toString(16).padStart(2, '0')} 0%, 
            transparent 70%)`,
          willChange: 'opacity, transform'
        }}
      />

      {/* Subtle Ripple Effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            ${auroraColors[2]}${Math.floor(intensity * 0.1 * 255).toString(16).padStart(2, '0')} 0%, 
            transparent 80%)`
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        style={{
          willChange: 'background'
        }}
      />
    </div>
  );
};

export default CursorAurora;
