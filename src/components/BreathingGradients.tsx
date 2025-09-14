import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCustomTheme } from '../App';

interface BreathingGradientsProps {
  className?: string;
}

const BreathingGradients: React.FC<BreathingGradientsProps> = ({ className = "" }) => {
  const [time, setTime] = useState(0);
  const { theme } = useCustomTheme();

  // Random position generators
  const [randomPositions, setRandomPositions] = useState({
    base: { x: 50, y: 50 },
    overlay: { x1: 30, y1: 40, x2: 70, y2: 60 },
    depth: [
      { x: 30, y: 40 },
      { x: 70, y: 60 },
      { x: 20, y: 80 },
      { x: 80, y: 20 }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.01);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  // Update random positions periodically
  useEffect(() => {
    const updatePositions = () => {
      setRandomPositions({
        base: {
          x: 20 + Math.random() * 60, // 20-80%
          y: 20 + Math.random() * 60
        },
        overlay: {
          x1: 10 + Math.random() * 40, // 10-50%
          y1: 10 + Math.random() * 40,
          x2: 50 + Math.random() * 40, // 50-90%
          y2: 50 + Math.random() * 40
        },
        depth: [
          { x: Math.random() * 100, y: Math.random() * 100 },
          { x: Math.random() * 100, y: Math.random() * 100 },
          { x: Math.random() * 100, y: Math.random() * 100 },
          { x: Math.random() * 100, y: Math.random() * 100 }
        ]
      });
    };

    // Initial random positions
    updatePositions();

    // Update positions every 5-8 seconds with random interval
    const positionInterval = setInterval(() => {
      updatePositions();
    }, 5000 + Math.random() * 3000);

    return () => clearInterval(positionInterval);
  }, []);

  // Enhanced color palettes with better visibility
  const colorPalettes = [
    // Soft Blue to Lavender
    {
      primary: 'hsl(210, 45%, 80%)',
      secondary: 'hsl(240, 40%, 83%)',
      accent: 'hsl(270, 35%, 86%)',
      primaryDark: 'hsl(210, 20%, 22%)',
      secondaryDark: 'hsl(240, 18%, 25%)',
      accentDark: 'hsl(270, 15%, 28%)'
    },
    // Gentle Teal to Rose
    {
      primary: 'hsl(180, 40%, 80%)',
      secondary: 'hsl(320, 35%, 83%)',
      accent: 'hsl(350, 30%, 86%)',
      primaryDark: 'hsl(180, 18%, 22%)',
      secondaryDark: 'hsl(320, 15%, 25%)',
      accentDark: 'hsl(350, 12%, 28%)'
    },
    // Warm Amber to Cool Blue
    {
      primary: 'hsl(45, 35%, 83%)',
      secondary: 'hsl(200, 40%, 80%)',
      accent: 'hsl(220, 30%, 86%)',
      primaryDark: 'hsl(45, 15%, 24%)',
      secondaryDark: 'hsl(200, 18%, 22%)',
      accentDark: 'hsl(220, 12%, 28%)'
    },
    // Soft Mint to Plum
    {
      primary: 'hsl(150, 35%, 83%)',
      secondary: 'hsl(280, 30%, 80%)',
      accent: 'hsl(310, 25%, 86%)',
      primaryDark: 'hsl(150, 15%, 24%)',
      secondaryDark: 'hsl(280, 12%, 22%)',
      accentDark: 'hsl(310, 10%, 28%)'
    }
  ];


  // Memoize colors based on time and theme to ensure theme changes trigger updates
  const colors = useMemo(() => {
    const cycleSpeed = 0.2;
    const cycle = (time * cycleSpeed) % colorPalettes.length;
    const currentIndex = Math.floor(cycle);
    const nextIndex = (currentIndex + 1) % colorPalettes.length;
    const t = cycle - currentIndex;

    // Ultra-smooth easing function
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const smoothT = easeInOutCubic(t);

    const current = colorPalettes[currentIndex];
    const next = colorPalettes[nextIndex];
    const isDarkMode = theme === 'dark';

    // Simple direct selection based on theme - no interpolation across theme boundary
    const currentColors = {
      primary: isDarkMode ? current.primaryDark : current.primary,
      secondary: isDarkMode ? current.secondaryDark : current.secondary,
      accent: isDarkMode ? current.accentDark : current.accent
    };

    const nextColors = {
      primary: isDarkMode ? next.primaryDark : next.primary,
      secondary: isDarkMode ? next.secondaryDark : next.secondary,
      accent: isDarkMode ? next.accentDark : next.accent
    };

    // Interpolate only between colors of the same theme
    return {
      primary: interpolateHSL(currentColors.primary, nextColors.primary, smoothT),
      secondary: interpolateHSL(currentColors.secondary, nextColors.secondary, smoothT),
      accent: interpolateHSL(currentColors.accent, nextColors.accent, smoothT)
    };

    function interpolateHSL(hsl1: string, hsl2: string, factor: number) {
      if (factor <= 0) return hsl1;
      if (factor >= 1) return hsl2;

      const parseHSL = (hsl: string) => {
        const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!match) return { h: 0, s: 0, l: 0 };
        return {
          h: parseInt(match[1]),
          s: parseInt(match[2]),
          l: parseInt(match[3])
        };
      };

      const color1 = parseHSL(hsl1);
      const color2 = parseHSL(hsl2);

      let h1 = color1.h;
      let h2 = color2.h;
      let hDiff = h2 - h1;

      if (hDiff > 180) {
        h1 += 360;
      } else if (hDiff < -180) {
        h2 += 360;
      }

      const h = Math.round(h1 + (h2 - h1) * factor) % 360;
      const s = Math.round(color1.s + (color2.s - color1.s) * factor);
      const l = Math.round(color1.l + (color2.l - color1.l) * factor);

      return `hsl(${h}, ${s}%, ${l}%)`;
    }
  }, [time, theme]);

  const isDark = theme === 'dark';

  return (
    <div
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{
        zIndex: -1,
        opacity: isDark ? 0.6 : 1
      }}
    >
      {/* Base gradient layer with random positioning */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          background: `radial-gradient(ellipse 150% 120% at ${randomPositions.base.x}% ${randomPositions.base.y}%, ${colors.primary} 0%, ${colors.secondary} 60%, ${colors.accent} 100%)`
        }}
        transition={{
          duration: 6,
          ease: [0.4, 0.0, 0.2, 1]
        }}
      />

      {/* Animated overlay with random gradients */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-60"
        animate={{
          background: [
            `linear-gradient(${45 + Math.random() * 90}deg, ${colors.primary}50 ${randomPositions.overlay.x1}%, ${colors.secondary}40 50%, ${colors.accent}50 ${randomPositions.overlay.x2}%)`,
            `linear-gradient(${135 + Math.random() * 90}deg, ${colors.secondary}45 ${randomPositions.overlay.y1}%, ${colors.accent}50 50%, ${colors.primary}40 ${randomPositions.overlay.y2}%)`,
            `linear-gradient(${225 + Math.random() * 90}deg, ${colors.accent}50 ${randomPositions.overlay.x2}%, ${colors.primary}45 50%, ${colors.secondary}40 ${randomPositions.overlay.x1}%)`,
            `linear-gradient(${315 + Math.random() * 90}deg, ${colors.primary}45 ${randomPositions.overlay.y2}%, ${colors.secondary}50 50%, ${colors.accent}45 ${randomPositions.overlay.y1}%)`
          ]
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />

      {/* Random floating depth spots */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-50"
        animate={{
          background: [
            `radial-gradient(circle at ${randomPositions.depth[0].x}% ${randomPositions.depth[0].y}%, ${colors.accent}25 0%, transparent 50%)`,
            `radial-gradient(circle at ${randomPositions.depth[1].x}% ${randomPositions.depth[1].y}%, ${colors.primary}22 0%, transparent 50%)`,
            `radial-gradient(circle at ${randomPositions.depth[2].x}% ${randomPositions.depth[2].y}%, ${colors.secondary}25 0%, transparent 50%)`,
            `radial-gradient(circle at ${randomPositions.depth[3].x}% ${randomPositions.depth[3].y}%, ${colors.accent}22 0%, transparent 50%)`
          ]
        }}
        transition={{
          duration: 12,
          ease: [0.4, 0.0, 0.2, 1],
          repeat: Infinity
        }}
      />
    </div>
  );
};

export default BreathingGradients;
