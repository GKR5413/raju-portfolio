import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DepthHoverProps {
  children: React.ReactNode;
  className?: string;
  depth?: 'subtle' | 'medium' | 'dramatic' | 'extreme';
  shadowColor?: 'dark' | 'colored' | 'gradient';
  tiltEffect?: boolean;
  scaleEffect?: boolean;
  glowEffect?: boolean;
  rippleEffect?: boolean;
  floatAnimation?: boolean;
}

const DepthHover = ({
  children,
  className = '',
  depth = 'medium',
  shadowColor = 'dark',
  tiltEffect = true,
  scaleEffect = true,
  glowEffect = false,
  rippleEffect = false,
  floatAnimation = false
}: DepthHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform values based on depth setting
  const depthSettings = {
    subtle: {
      lift: -4,
      scale: 1.02,
      shadowBlur: 20,
      shadowSpread: 5,
      tiltRange: 5
    },
    medium: {
      lift: -8,
      scale: 1.05,
      shadowBlur: 30,
      shadowSpread: 10,
      tiltRange: 8
    },
    dramatic: {
      lift: -16,
      scale: 1.08,
      shadowBlur: 50,
      shadowSpread: 20,
      tiltRange: 12
    },
    extreme: {
      lift: -24,
      scale: 1.12,
      shadowBlur: 70,
      shadowSpread: 30,
      tiltRange: 15
    }
  };

  const settings = depthSettings[depth];

  // Tilt calculations
  const rotateX = useTransform(mouseY, [-200, 200], [settings.tiltRange, -settings.tiltRange]);
  const rotateY = useTransform(mouseX, [-200, 200], [-settings.tiltRange, settings.tiltRange]);

  // Smooth the rotation
  const springRotateX = useSpring(rotateX, { stiffness: 400, damping: 40 });
  const springRotateY = useSpring(rotateY, { stiffness: 400, damping: 40 });

  // Shadow colors
  const shadowColors = {
    dark: 'rgba(0, 0, 0, 0.3)',
    colored: 'rgba(59, 130, 246, 0.3)',
    gradient: 'rgba(147, 51, 234, 0.3)'
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!rippleEffect || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative cursor-pointer select-none', className)}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{
        y: floatAnimation ? [0, -2, 0] : isHovered ? settings.lift : 0,
        scale: isHovered && scaleEffect ? settings.scale : 1,
        rotateX: tiltEffect ? springRotateX : 0,
        rotateY: tiltEffect ? springRotateY : 0,
      }}
      transition={{
        y: floatAnimation
          ? { repeat: Infinity, duration: 3, ease: "easeInOut" }
          : { type: "spring", stiffness: 300, damping: 30 },
        scale: { type: "spring", stiffness: 300, damping: 30 },
        rotateX: { type: "spring", stiffness: 400, damping: 40 },
        rotateY: { type: "spring", stiffness: 400, damping: 40 }
      }}
    >
      {/* Multiple layered shadows for depth */}
      <motion.div
        className="absolute inset-0 -z-20 rounded-[inherit]"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          scale: isHovered ? 1.1 : 1,
          y: isHovered ? settings.shadowSpread : settings.shadowSpread / 2,
        }}
        style={{
          background: shadowColors[shadowColor],
          filter: `blur(${settings.shadowBlur}px)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Secondary shadow for more depth */}
      <motion.div
        className="absolute inset-0 -z-19 rounded-[inherit]"
        animate={{
          opacity: isHovered ? 0.5 : 0.2,
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? settings.shadowSpread / 2 : settings.shadowSpread / 4,
        }}
        style={{
          background: shadowColor === 'gradient'
            ? 'rgba(59, 130, 246, 0.2)'
            : shadowColors[shadowColor],
          filter: `blur(${settings.shadowBlur / 2}px)`,
        }}
        transition={{ duration: 0.3, delay: 0.05 }}
      />

      {/* Glow effect */}
      {glowEffect && isHovered && (
        <motion.div
          className="absolute -inset-2 -z-18 rounded-[inherit]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)',
            filter: 'blur(20px)',
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content container with subtle inner shadow */}
      <div className="relative z-10 rounded-[inherit] overflow-hidden">
        {/* Inner highlight */}
        <div className="absolute inset-0 rounded-[inherit] shadow-inner" style={{
          boxShadow: isHovered
            ? 'inset 0 1px 2px rgba(255,255,255,0.2)'
            : 'inset 0 1px 1px rgba(255,255,255,0.1)'
        }} />

        {children}

        {/* Ripple effects */}
        {rippleEffect && ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-4 h-4 rounded-full bg-white/30" />
          </motion.div>
        ))}

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            }}
            animate={{
              x: isHovered ? ['-100%', '100%'] : '-100%',
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 2
            }}
          />
        </motion.div>
      </div>

      {/* Floating particles effect */}
      {isHovered && glowEffect && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default DepthHover;