import { useEffect, useRef, useState, memo, useMemo, useCallback } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  animationType?: 'fade' | 'slide' | 'wave' | 'typewriter' | 'glitch';
  once?: boolean;
  splitBy?: 'word' | 'char' | 'line';
}

const TextReveal = memo(({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  animationType = 'fade',
  once = true,
  splitBy = 'word'
}: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  const splitText = useCallback((text: string): string[] => {
    switch (splitBy) {
      case 'char':
        return text.split('');
      case 'line':
        return text.split('\n');
      default:
        return text.split(' ');
    }
  }, [splitBy]);

  const getVariants = useCallback((): Variants => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    };

    switch (animationType) {
      case 'slide':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        };
      case 'wave':
        return {
          hidden: { opacity: 0, y: 50, rotateX: 90 },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
              type: "spring",
              damping: 12,
              stiffness: 200
            }
          }
        };
      case 'typewriter':
        return {
          hidden: { width: 0 },
          visible: { width: 'auto' }
        };
      case 'glitch':
        return {
          hidden: {
            opacity: 0,
            x: [-2, 2, -2, 2, 0],
            textShadow: "2px 0 #ff00c1, -2px 0 #00fff9"
          },
          visible: {
            opacity: 1,
            x: 0,
            textShadow: "none"
          }
        };
      default:
        return baseVariants;
    }
  }, [animationType]);

  const words = useMemo(() => splitText(children), [children, splitText]);
  const variants = useMemo(() => getVariants(), [getVariants]);

  if (animationType === 'typewriter') {
    return (
      <div ref={ref} className={className}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          transition={{ duration: duration * words.length, delay, ease: "easeOut" }}
          style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={controls}
        transition={{ staggerChildren: 0.1, delayChildren: delay }}
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={variants}
            transition={{
              duration,
              ease: animationType === 'wave' ? "easeOut" : [0.2, 0.65, 0.3, 0.9]
            }}
            style={{
              display: 'inline-block',
              marginRight: splitBy === 'word' ? '0.25em' : '0',
              willChange: 'transform, opacity'
            }}
          >
            {word === '\n' ? <br /> : word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
});

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export const AnimatedCounter = memo(({
  from,
  to,
  duration = 2,
  className = '',
  suffix = ''
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let rafId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = from + (to - from) * easeOutQuart;

      setCount(currentCount);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {to % 1 !== 0 ? count.toFixed(2) : count}{suffix}
    </span>
  );
});

interface StaggeredFadeProps {
  children: React.ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}

export const StaggeredFade = memo(({
  children,
  className = '',
  delay = 0,
  stagger = 0.1
}: StaggeredFadeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay
          }
        }
      }}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.2, 0.65, 0.3, 0.9]
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
});

export default TextReveal;