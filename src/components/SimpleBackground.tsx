import React from 'react';
import { useCustomTheme } from '../App';

interface SimpleBackgroundProps {
  className?: string;
}

const SimpleBackground: React.FC<SimpleBackgroundProps> = ({ className = "" }) => {
  const { theme } = useCustomTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{
        zIndex: -1,
        opacity: isDark ? 0.6 : 1,
        pointerEvents: 'none', // Critical: Don't block scroll events
        background: isDark
          ? 'linear-gradient(135deg, hsl(220, 20%, 8%) 0%, hsl(240, 15%, 12%) 50%, hsl(220, 25%, 10%) 100%)'
          : 'linear-gradient(135deg, hsl(220, 40%, 98%) 0%, hsl(240, 30%, 96%) 50%, hsl(200, 35%, 97%) 100%)'
      }}
    />
  );
};

export default SimpleBackground;
