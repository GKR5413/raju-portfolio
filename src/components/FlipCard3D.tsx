import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import GlassmorphismCard from './GlassmorphismCard';

interface FlipCard3DProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  triggerOnHover?: boolean;
  autoFlip?: boolean;
  autoFlipDelay?: number;
  tiltEffect?: boolean;
  glowOnHover?: boolean;
}

const FlipCard3D = ({
  frontContent,
  backContent,
  className = '',
  triggerOnHover = true,
  autoFlip = false,
  autoFlipDelay = 3000,
  tiltEffect = true,
  glowOnHover = true
}: FlipCard3DProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking for tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  // Smooth the rotation with springs
  const springRotateX = useSpring(rotateX, { stiffness: 400, damping: 40 });
  const springRotateY = useSpring(rotateY, { stiffness: 400, damping: 40 });

  // Auto-flip functionality
  useEffect(() => {
    if (autoFlip) {
      const interval = setInterval(() => {
        setIsFlipped(prev => !prev);
      }, autoFlipDelay);

      return () => clearInterval(interval);
    }
  }, [autoFlip, autoFlipDelay]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tiltEffect) {
      mouseX.set(0);
      mouseY.set(0);
    }
    if (triggerOnHover && !autoFlip) {
      setIsFlipped(false);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (triggerOnHover && !autoFlip) {
      setIsFlipped(true);
    }
  };

  const handleClick = () => {
    if (!triggerOnHover) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative w-full h-80 cursor-pointer select-none',
        className
      )}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX: tiltEffect ? springRotateX : 0,
        rotateY: tiltEffect ? springRotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{
        scale: 1.02,
        y: -8,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      {/* Glow effect */}
      {glowOnHover && isHovered && (
        <motion.div
          className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Enhanced shadow */}
      <motion.div
        className="absolute -inset-2 -z-20 rounded-3xl bg-black/10 blur-xl"
        animate={{
          opacity: isHovered ? 1 : 0.5,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 200,
          damping: 25
        }}
      >
        {/* Front face */}
        <motion.div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d',
          }}
        >
          <GlassmorphismCard
            variant="elevated"
            shadow="dramatic"
            hoverable={false}
            className="w-full h-full p-6"
          >
            {frontContent}
          </GlassmorphismCard>
        </motion.div>

        {/* Back face */}
        <motion.div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <GlassmorphismCard
            variant="floating"
            shadow="dramatic"
            hoverable={false}
            className="w-full h-full p-6 bg-gradient-to-br from-purple-500/20 to-blue-500/20"
          >
            {backContent}
          </GlassmorphismCard>
        </motion.div>
      </motion.div>

      {/* Flip indicator */}
      {!autoFlip && (
        <motion.div
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center"
          animate={{
            opacity: isHovered ? 1 : 0.6,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-4 h-4 text-white/80"
            animate={{
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={{ duration: 0.8 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? ['-100%', '100%'] : '-100%',
        }}
        transition={{
          opacity: { duration: 0.3 },
          x: { duration: 1.5, ease: "easeInOut", repeat: isHovered ? Infinity : 0, repeatDelay: 2 }
        }}
      />
    </motion.div>
  );
};

export default FlipCard3D;