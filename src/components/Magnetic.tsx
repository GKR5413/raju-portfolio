import { useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  tolerance?: number;
}

const Magnetic = ({
  children,
  className = '',
  speed = 1,
  tolerance = 0.8
}: MagneticProps) => {
  const magneticRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const magnetic = magneticRef.current;
    const child = childRef.current;
    if (!magnetic || !child) return;

    const rect = magnetic.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Calculate distance and apply tolerance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = rect.width / 2;

    if (distance < maxDistance * tolerance) {
      // Move parent container (slower)
      gsap.to(magnetic, {
        x: deltaX * 0.3 * speed,
        y: deltaY * 0.3 * speed,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Move child element (faster) - Creates parallax depth
      gsap.to(child, {
        x: deltaX * 0.5 * speed,
        y: deltaY * 0.5 * speed,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    const magnetic = magneticRef.current;
    const child = childRef.current;
    if (!magnetic || !child) return;

    // Elastic snap-back animation (THE CRUCIAL WOBBLE EFFECT)
    gsap.to(magnetic, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)',
    });

    gsap.to(child, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <div
      ref={magneticRef}
      data-magnetic
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={childRef} className="relative">
        {children}
      </div>
    </div>
  );
};

export default Magnetic;
