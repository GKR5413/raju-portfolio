import React, { useEffect, useState } from 'react';

interface SimpleBackgroundProps {
  className?: string;
}

const SimpleBackground: React.FC<SimpleBackgroundProps> = ({ className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Static gradient background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(102, 126, 234, 0.3) 0%, 
              rgba(118, 75, 162, 0.2) 30%, 
              rgba(52, 152, 219, 0.1) 60%, 
              transparent 100%
            ),
            linear-gradient(135deg, 
              #667eea 0%, 
              #764ba2 25%, 
              #667eea 50%, 
              #f093fb 75%, 
              #667eea 100%
            )
          `,
          willChange: 'auto'
        }}
      />
      
      {/* Simple aurora effect */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x + 10}% ${mousePosition.y - 10}%, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 50%
            ),
            radial-gradient(circle at ${mousePosition.x - 20}% ${mousePosition.y + 20}%, 
              rgba(167, 139, 250, 0.15) 0%, 
              transparent 40%
            )
          `,
          transition: 'background 0.3s ease',
          willChange: 'auto'
        }}
      />
    </div>
  );
};

export default SimpleBackground;
