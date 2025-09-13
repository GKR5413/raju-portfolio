import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useAnimation, AnimatePresence } from 'framer-motion';

interface Shape {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'hexagon';
  x: number;
  y: number;
  size: number;
  rotation: number;
  velocity: { x: number; y: number };
  color: string;
  opacity: number;
}

interface FloatingShapesProps {
  shapeCount?: number;
  interactive?: boolean;
  className?: string;
}

const FloatingShapes = ({
  shapeCount = 8,
  interactive = true,
  className = ""
}: FloatingShapesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrame = useRef<number>();

  const colors = [
    'rgba(59, 130, 246, 0.6)', // blue
    'rgba(147, 51, 234, 0.6)', // purple
    'rgba(236, 72, 153, 0.6)', // pink
    'rgba(34, 197, 94, 0.6)',  // green
    'rgba(251, 146, 60, 0.6)', // orange
    'rgba(14, 165, 233, 0.6)', // sky
  ];

  const createShape = (index: number): Shape => {
    const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const containerHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    return {
      id: `shape-${index}`,
      type: ['circle', 'square', 'triangle', 'hexagon'][Math.floor(Math.random() * 4)] as Shape['type'],
      x: Math.random() * containerWidth,
      y: Math.random() * containerHeight,
      size: 20 + Math.random() * 60,
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      },
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.3 + Math.random() * 0.4,
    };
  };

  useEffect(() => {
    const initialShapes = Array.from({ length: shapeCount }, (_, i) => createShape(i));
    setShapes(initialShapes);
  }, [shapeCount]);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  useEffect(() => {
    const animate = () => {
      setShapes(prevShapes =>
        prevShapes.map(shape => {
          const containerWidth = window.innerWidth;
          const containerHeight = window.innerHeight;

          let newX = shape.x + shape.velocity.x;
          let newY = shape.y + shape.velocity.y;
          let newVelocityX = shape.velocity.x;
          let newVelocityY = shape.velocity.y;

          // Boundary collision
          if (newX <= 0 || newX >= containerWidth - shape.size) {
            newVelocityX = -newVelocityX * 0.8;
            newX = Math.max(0, Math.min(containerWidth - shape.size, newX));
          }
          if (newY <= 0 || newY >= containerHeight - shape.size) {
            newVelocityY = -newVelocityY * 0.8;
            newY = Math.max(0, Math.min(containerHeight - shape.size, newY));
          }

          // Mouse interaction
          if (interactive) {
            const distanceToMouse = Math.sqrt(
              Math.pow(mousePosition.x - (newX + shape.size / 2), 2) +
              Math.pow(mousePosition.y - (newY + shape.size / 2), 2)
            );

            if (distanceToMouse < 150) {
              const force = (150 - distanceToMouse) / 150;
              const angle = Math.atan2(
                (newY + shape.size / 2) - mousePosition.y,
                (newX + shape.size / 2) - mousePosition.x
              );
              newVelocityX += Math.cos(angle) * force * 0.5;
              newVelocityY += Math.sin(angle) * force * 0.5;
            }
          }

          // Friction
          newVelocityX *= 0.995;
          newVelocityY *= 0.995;

          return {
            ...shape,
            x: newX,
            y: newY,
            velocity: { x: newVelocityX, y: newVelocityY },
            rotation: shape.rotation + 1,
          };
        })
      );

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [mousePosition, interactive]);

  const renderShape = (shape: Shape) => {
    const shapeStyle = {
      position: 'absolute' as const,
      left: shape.x,
      top: shape.y,
      width: shape.size,
      height: shape.size,
      opacity: shape.opacity,
      transform: `rotate(${shape.rotation}deg)`,
      pointerEvents: 'none' as const,
    };

    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            style={{
              ...shapeStyle,
              backgroundColor: shape.color,
              borderRadius: '50%',
              filter: 'blur(0.5px)',
            }}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            style={{
              ...shapeStyle,
              backgroundColor: shape.color,
              borderRadius: '8px',
              filter: 'blur(0.5px)',
            }}
          />
        );
      case 'triangle':
        return (
          <div
            key={shape.id}
            style={{
              ...shapeStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
              filter: 'blur(0.5px)',
            }}
          />
        );
      case 'hexagon':
        return (
          <div
            key={shape.id}
            style={{
              ...shapeStyle,
              backgroundColor: shape.color,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              filter: 'blur(0.5px)',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-[1] ${className}`}
    >
      <AnimatePresence>
        {shapes.map(renderShape)}
      </AnimatePresence>
    </div>
  );
};

export default FloatingShapes;