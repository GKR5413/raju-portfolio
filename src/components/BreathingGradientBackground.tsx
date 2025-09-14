import React, { useEffect, useState } from 'react';

interface BreathingGradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const BreathingGradientBackground: React.FC<BreathingGradientBackgroundProps> = ({ 
  children, 
  className = "" 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`}>
      {/* Breathing Gradient Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(102, 126, 234, 0.6) 0%, 
              rgba(118, 75, 162, 0.5) 30%, 
              rgba(52, 152, 219, 0.4) 60%, 
              rgba(155, 89, 182, 0.3) 100%
            ),
            linear-gradient(135deg, 
              #667eea 0%, 
              #764ba2 25%, 
              #667eea 50%, 
              #f093fb 75%, 
              #667eea 100%
            )
          `,
          animation: 'breathe 8s ease-in-out infinite, gradientShift 20s ease infinite',
          backgroundSize: '400% 400%',
          zIndex: 0
        }}
      />
      
      {/* Subtle Aurora Effect */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x + 10}% ${mousePosition.y - 10}%, 
              rgba(255, 255, 255, 0.2) 0%, 
              transparent 50%
            ),
            radial-gradient(circle at ${mousePosition.x - 20}% ${mousePosition.y + 20}%, 
              rgba(167, 139, 250, 0.3) 0%, 
              transparent 40%
            )
          `,
          transition: 'all 0.3s ease',
          zIndex: 1
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
    </div>
  );
};

export default BreathingGradientBackground;