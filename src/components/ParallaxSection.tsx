import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
  offset?: number;
}

const ParallaxSection = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = 0
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [offset, offset + (multiplier * speed * 200)]
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxElementProps {
  children: ReactNode;
  speed: number;
  className?: string;
  rotateOnScroll?: boolean;
  scaleOnScroll?: boolean;
}

export const ParallaxElement = ({
  children,
  speed,
  className = '',
  rotateOnScroll = false,
  scaleOnScroll = false
}: ParallaxElementProps) => {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  const rotate = rotateOnScroll ? useTransform(scrollYProgress, [0, 1], [0, 360]) : 0;
  const scale = scaleOnScroll ? useTransform(scrollYProgress, [0, 1], [1, 1.2]) : 1;

  return (
    <motion.div
      style={{ y, rotate, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxLayerProps {
  children: ReactNode;
  speed: number;
  className?: string;
  zIndex?: number;
}

export const ParallaxLayer = ({
  children,
  speed,
  className = '',
  zIndex = 0
}: ParallaxLayerProps) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * speed);

  return (
    <motion.div
      style={{ y, zIndex }}
      className={`fixed inset-0 will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
}

export const ParallaxContainer = ({ children, className = '' }: ParallaxContainerProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxSection;