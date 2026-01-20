import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'floating' | 'elevated' | 'minimal';
  glowEffect?: boolean;
  hoverable?: boolean;
  shadow?: 'subtle' | 'medium' | 'dramatic';
  className?: string;
}

const GlassmorphismCard = ({
  children,
  variant = 'default',
  glowEffect = false,
  hoverable = true,
  shadow = 'medium',
  className = ''
}: GlassmorphismCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Variant-specific styles
  const variantStyles = {
    default: {
      background: 'bg-white/10',
      backdrop: 'backdrop-blur-md',
      border: 'border border-white/20',
      shadow: 'shadow-lg'
    },
    floating: {
      background: 'bg-white/5',
      backdrop: 'backdrop-blur-lg',
      border: 'border border-white/10',
      shadow: 'shadow-xl'
    },
    elevated: {
      background: 'bg-white/15',
      backdrop: 'backdrop-blur-xl',
      border: 'border border-white/30',
      shadow: 'shadow-2xl'
    },
    minimal: {
      background: 'bg-white/5',
      backdrop: 'backdrop-blur-sm',
      border: 'border border-white/10',
      shadow: 'shadow-md'
    }
  };

  // Shadow styles
  const shadowStyles = {
    subtle: 'shadow-[0_2px_8px_rgba(0,0,0,0.1)]',
    medium: 'shadow-[0_4px_16px_rgba(0,0,0,0.15)]',
    dramatic: 'shadow-[0_8px_32px_rgba(0,0,0,0.2)]'
  };

  const styles = variantStyles[variant];

  return (
    <motion.div
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-300',
        styles.background,
        styles.backdrop,
        styles.border,
        shadowStyles[shadow],
        className
      )}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      animate={
        hoverable
          ? {
              y: isHovered ? -4 : 0,
              scale: isHovered ? 1.02 : 1
            }
          : {}
      }
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
    >
      {/* Glow effect overlay */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-2xl"
          animate={{
            opacity: isHovered ? 0.6 : 0.3,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(6, 182, 212, 0.3))',
            filter: 'blur(20px)'
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Shimmer effect on hover */}
      {hoverable && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
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
              ease: 'easeInOut',
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 2
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default GlassmorphismCard;
