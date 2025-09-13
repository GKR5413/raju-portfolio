import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface GradientStop {
  color: string;
  position: number;
}

interface GradientTheme {
  name: string;
  gradients: {
    primary: GradientStop[];
    secondary: GradientStop[];
  };
}

const gradientThemes: GradientTheme[] = [
  {
    name: 'dawn',
    gradients: {
      primary: [
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 100 },
      ],
      secondary: [
        { color: '#f093fb', position: 0 },
        { color: '#f5576c', position: 100 },
      ],
    },
  },
  {
    name: 'day',
    gradients: {
      primary: [
        { color: '#4facfe', position: 0 },
        { color: '#00f2fe', position: 100 },
      ],
      secondary: [
        { color: '#43e97b', position: 0 },
        { color: '#38f9d7', position: 100 },
      ],
    },
  },
  {
    name: 'dusk',
    gradients: {
      primary: [
        { color: '#fa709a', position: 0 },
        { color: '#fee140', position: 100 },
      ],
      secondary: [
        { color: '#a8edea', position: 0 },
        { color: '#fed6e3', position: 100 },
      ],
    },
  },
  {
    name: 'night',
    gradients: {
      primary: [
        { color: '#d299c2', position: 0 },
        { color: '#fef9d7', position: 100 },
      ],
      secondary: [
        { color: '#89f7fe', position: 0 },
        { color: '#66a6ff', position: 100 },
      ],
    },
  },
];

const MorphingBackground = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [timeBasedTheme, setTimeBasedTheme] = useState(0);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to theme index
  const scrollBasedTheme = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [0, 1, 2, 3]
  );

  // Time-based gradient shifting
  useEffect(() => {
    const getTimeBasedTheme = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return 0; // dawn
      if (hour >= 12 && hour < 17) return 1; // day
      if (hour >= 17 && hour < 21) return 2; // dusk
      return 3; // night
    };

    setTimeBasedTheme(getTimeBasedTheme());

    const interval = setInterval(() => {
      setTimeBasedTheme(getTimeBasedTheme());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Combine time and scroll for theme selection
  useEffect(() => {
    const unsubscribe = scrollBasedTheme.onChange((value) => {
      const scrollWeight = 0.7;
      const timeWeight = 0.3;
      const combinedIndex = Math.round(
        (value * scrollWeight + timeBasedTheme * timeWeight) % gradientThemes.length
      );
      setCurrentThemeIndex(combinedIndex);
    });

    return unsubscribe;
  }, [scrollBasedTheme, timeBasedTheme]);

  const currentTheme = gradientThemes[currentThemeIndex];
  const nextTheme = gradientThemes[(currentThemeIndex + 1) % gradientThemes.length];

  const createGradientString = (stops: GradientStop[]) => {
    return stops
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Primary morphing gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${createGradientString(currentTheme.gradients.primary)})`,
          opacity: 0.6,
        }}
        animate={{
          background: [
            `linear-gradient(135deg, ${createGradientString(currentTheme.gradients.primary)})`,
            `linear-gradient(135deg, ${createGradientString(nextTheme.gradients.primary)})`,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Secondary overlay gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${createGradientString(currentTheme.gradients.secondary)})`,
          opacity: 0.3,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 30% 70%, ${createGradientString(currentTheme.gradients.secondary)})`,
            `radial-gradient(circle at 70% 30%, ${createGradientString(nextTheme.gradients.secondary)})`,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Animated mesh overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.1) 50%),
            linear-gradient(0deg, transparent 50%, rgba(255,255,255,0.1) 50%)
          `,
          backgroundSize: '2px 2px',
        }}
      />
    </div>
  );
};

export default MorphingBackground;