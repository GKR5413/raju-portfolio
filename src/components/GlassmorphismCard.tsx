
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'floating' | 'elevated' | 'minimal';
  hoverable?: boolean;
  glowEffect?: boolean;
  blurIntensity?: 'light' | 'medium' | 'heavy';
  shadow?: 'none' | 'soft' | 'medium' | 'dramatic';
}

const GlassmorphismCard = ({
  children,
  className = '',
  variant = 'default',
  hoverable = true,
  glowEffect = false,
  blurIntensity = 'medium',
  shadow = 'medium'
}: GlassmorphismCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const blurClasses = {
    light: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
    heavy: 'backdrop-blur-lg'
  };

  const shadowClasses = {
    none: '',
    soft: 'shadow-lg shadow-black/5',
    medium: 'shadow-xl shadow-black/10',
    dramatic: 'shadow-2xl shadow-black/20'
  };

  const variantClasses = {
    default: 'bg-white/10 border border-white/20',
    floating: 'bg-white/15 border border-white/30',
    elevated: 'bg-white/20 border border-white/40',
    minimal: 'bg-white/5 border border-white/10'
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        blurClasses[blurIntensity],
        shadowClasses[shadow],
        variantClasses[variant],
        'transition-all duration-500 ease-out',
        hoverable && 'cursor-pointer',
        className
      )}
      initial={false}
      animate={{
        scale: isHovered && hoverable ? 1.02 : 1,
        y: isHovered && hoverable ? -8 : 0,
        rotateX: isHovered && hoverable ? 5 : 0,
        rotateY: isHovered && hoverable ? 2 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Simple background overlay */}
      <div className="absolute inset-0 bg-white/10 dark:bg-white/5" />

      {/* Simple glow effect */}
      {glowEffect && isHovered && (
        <motion.div
          className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Enhanced shadow on hover */}
      {isHovered && hoverable && (
        <motion.div
          className="absolute -inset-2 -z-10 rounded-3xl bg-black/10 blur-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Highlight border on top edge */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </motion.div>
  );
};

export default GlassmorphismCard;