import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface ThemeTransitionProps {
  isTransitioning: boolean;
  transitionOrigin: { x: number; y: number };
  currentTheme: 'light' | 'dark';
  newTheme: 'light' | 'dark';
  onComplete: () => void;
}

const ThemeTransition = ({
  isTransitioning,
  transitionOrigin,
  currentTheme,
  newTheme,
  onComplete
}: ThemeTransitionProps) => {
  useEffect(() => {
    if (!isTransitioning) return;

    const maxRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);

    // Create clean CSS mask that only changes colors where the circle has passed
    const style = document.createElement('style');
    style.textContent = `
      .theme-spread-clean {
        --spread-x: ${transitionOrigin.x}px;
        --spread-y: ${transitionOrigin.y}px;
        --spread-radius: 0px;
      }

      /* Background color change - only where circle has passed */
      .theme-spread-clean::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${newTheme === 'dark' ? '#0f172a' : '#ffffff'};
        clip-path: circle(var(--spread-radius) at var(--spread-x) var(--spread-y));
        z-index: 1;
        pointer-events: none;
      }

      /* Only apply new theme class where circle has passed */
      .theme-spread-clean::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        clip-path: circle(var(--spread-radius) at var(--spread-x) var(--spread-y));
        z-index: 1000;
        pointer-events: none;
      }

      /* Elements within the spread area get new theme colors */
      .theme-spread-clean::after ~ * {
        position: relative;
        z-index: 1001;
      }
    `;
    document.head.appendChild(style);

    // Apply theme spreading class
    document.documentElement.classList.add('theme-spread-clean');

    // Create a mask element that will apply the new theme
    const themeMask = document.createElement('div');
    themeMask.className = `fixed inset-0 pointer-events-none z-[999] ${newTheme}`;
    themeMask.style.clipPath = `circle(0px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`;
    document.body.appendChild(themeMask);

    // Smooth animation
    let start: number;
    const duration = 1000; // Good balance of speed and visibility

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing function
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentRadius = easeProgress * maxRadius;

      // Update CSS variable and mask element
      document.documentElement.style.setProperty('--spread-radius', `${currentRadius}px`);
      themeMask.style.clipPath = `circle(${currentRadius}px at ${transitionOrigin.x}px ${transitionOrigin.y}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        setTimeout(() => {
          onComplete();

          // Clean up
          document.documentElement.classList.remove('theme-spread-clean');
          if (document.body.contains(themeMask)) {
            document.body.removeChild(themeMask);
          }

          // Clean up styles
          setTimeout(() => {
            if (document.head.contains(style)) document.head.removeChild(style);
            document.documentElement.style.removeProperty('--spread-radius');
          }, 100);
        }, 50);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('theme-spread-clean');
      if (document.body.contains(themeMask)) {
        document.body.removeChild(themeMask);
      }
      if (document.head.contains(style)) document.head.removeChild(style);
      document.documentElement.style.removeProperty('--spread-radius');
    };
  }, [isTransitioning, transitionOrigin, newTheme, onComplete]);

  if (!isTransitioning) return null;

  return null;
};

export default ThemeTransition;