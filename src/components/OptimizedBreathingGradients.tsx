import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface OptimizedBreathingGradientsProps {
  className?: string;
}

const OptimizedBreathingGradients: React.FC<OptimizedBreathingGradientsProps> = ({ className = "" }) => {
  const [time, setTime] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized animation loop with requestAnimationFrame
  useEffect(() => {
    if (isReducedMotion) return;
    
    let animationId: number;
    let lastTime = 0;
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= 16) { // ~60fps
        setTime(prev => prev + 0.01);
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isReducedMotion]);

  // Simplified color palettes for better performance
  const colorPalettes = useMemo(() => [
    {
      primary: 'hsl(210, 35%, 85%)',
      secondary: 'hsl(240, 25%, 88%)',
      accent: 'hsl(270, 20%, 90%)'
    },
    {
      primary: 'hsl(180, 30%, 85%)',
      secondary: 'hsl(320, 20%, 88%)',
      accent: 'hsl(350, 15%, 90%)'
    },
    {
      primary: 'hsl(45, 25%, 88%)',
      secondary: 'hsl(200, 30%, 85%)',
      accent: 'hsl(220, 20%, 90%)'
    },
    {
      primary: 'hsl(150, 25%, 88%)',
      secondary: 'hsl(280, 20%, 85%)',
      accent: 'hsl(310, 15%, 90%)'
    }
  ], []);

  // Memoized color calculation
  const colors = useMemo(() => {
    if (isReducedMotion) {
      return colorPalettes[0]; // Static colors for reduced motion
    }

    const cycleSpeed = 0.1; // Slower for better performance
    const cycle = (time * cycleSpeed) % colorPalettes.length;
    const currentIndex = Math.floor(cycle);
    const nextIndex = (currentIndex + 1) % colorPalettes.length;
    const t = cycle - currentIndex;

    const current = colorPalettes[currentIndex];
    const next = colorPalettes[nextIndex];

    // Simple linear interpolation for better performance
    return {
      primary: t < 0.5 ? current.primary : next.primary,
      secondary: t < 0.5 ? current.secondary : next.secondary,
      accent: t < 0.5 ? current.accent : next.accent
    };
  }, [time, colorPalettes, isReducedMotion]);

  // Optimized gradient styles
  const gradientStyles = useMemo(() => ({
    primary: {
      background: `radial-gradient(ellipse at 25% 35%, ${colors.primary}40 0%, ${colors.secondary}20 45%, ${colors.accent}15 100%)`,
      willChange: isReducedMotion ? 'auto' : 'background'
    },
    secondary: {
      background: `linear-gradient(125deg, ${colors.primary}08 0%, transparent 35%, ${colors.accent}05 100%)`,
      willChange: isReducedMotion ? 'auto' : 'background'
    },
    tertiary: {
      background: `conic-gradient(from 0deg at 30% 40%, ${colors.primary}03, ${colors.secondary}02, ${colors.accent}04, transparent, ${colors.primary}03)`,
      willChange: isReducedMotion ? 'auto' : 'background'
    }
  }), [colors, isReducedMotion]);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Primary Gradient Layer */}
      <div
        className="absolute inset-0 w-full h-full"
        style={gradientStyles.primary}
      />

      {/* Secondary Mesh Overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={gradientStyles.secondary}
      />

      {/* Tertiary Ambient Layer - Only if motion is not reduced */}
      {!isReducedMotion && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={gradientStyles.tertiary}
          animate={{
            background: [
              `conic-gradient(from 0deg at 30% 40%, ${colors.primary}03, ${colors.secondary}02, ${colors.accent}04, transparent, ${colors.primary}03)`,
              `conic-gradient(from 90deg at 70% 60%, ${colors.secondary}02, ${colors.accent}03, ${colors.primary}04, transparent, ${colors.secondary}02)`,
              `conic-gradient(from 180deg at 40% 20%, ${colors.accent}03, ${colors.primary}02, ${colors.secondary}03, transparent, ${colors.accent}03)`,
              `conic-gradient(from 270deg at 30% 40%, ${colors.primary}03, ${colors.secondary}02, ${colors.accent}04, transparent, ${colors.primary}03)`
            ]
          }}
          transition={{
            duration: 60,
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
      )}

      {/* Subtle Breathing Pulse - Only if motion is not reduced */}
      {!isReducedMotion && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            scale: [1, 1.01, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity
          }}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors.accent}15 0%, ${colors.primary}08 40%, transparent 70%)`,
            willChange: 'transform, opacity'
          }}
        />
      )}
    </div>
  );
};

export default OptimizedBreathingGradients;
