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

    // Clean up any existing transition styles
    const existingStyles = document.querySelectorAll('style[data-theme-transition]');
    existingStyles.forEach(style => style.remove());

    // Simple fade transition
    const style = document.createElement('style');
    style.setAttribute('data-theme-transition', 'true');
    style.textContent = `
      .theme-fade {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: ${newTheme === 'dark' ? '#0f172a' : '#ffffff'};
        z-index: 9999;
        pointer-events: none;
        opacity: 1;
        transition: opacity 0.3s ease;
      }

      .theme-fade.fade-out {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);

    // Switch theme after brief pause
    const switchTimer = setTimeout(() => {
      onComplete();

      // Fade out overlay
      const overlay = document.querySelector('.theme-fade');
      if (overlay) {
        overlay.classList.add('fade-out');
      }

      // Complete transition
      const completeTimer = setTimeout(() => {
        // Cleanup
        const cleanup = () => {
          const allTransitionStyles = document.querySelectorAll('style[data-theme-transition]');
          allTransitionStyles.forEach(s => s.remove());
        };

        cleanup();
        setTimeout(cleanup, 100);
      }, 300);

      return () => clearTimeout(completeTimer);
    }, 150);

    return () => {
      clearTimeout(switchTimer);
      const allTransitionStyles = document.querySelectorAll('style[data-theme-transition]');
      allTransitionStyles.forEach(s => s.remove());
    };
  }, [isTransitioning, newTheme, onComplete]);

  if (!isTransitioning) return null;

  return <div className="theme-fade" />;
};

export default ThemeTransition;