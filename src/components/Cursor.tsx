import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Linear Interpolation function
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Animation loop with lerp for smooth following
    const animateCursor = () => {
      // Lerp factor 0.1 for smooth delay
      cursorPosRef.current.x = lerp(cursorPosRef.current.x, mouseRef.current.x, 0.1);
      cursorPosRef.current.y = lerp(cursorPosRef.current.y, mouseRef.current.y, 0.1);

      gsap.set(cursor, {
        x: cursorPosRef.current.x,
        y: cursorPosRef.current.y,
        xPercent: -50,
        yPercent: -50,
      });

      gsap.set(cursorDot, {
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        xPercent: -50,
        yPercent: -50,
      });

      requestAnimationFrame(animateCursor);
    };

    // Check for magnetic elements
    const handleMagneticHover = () => {
      const magneticElements = document.querySelectorAll('[data-magnetic]');

      magneticElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    handleMagneticHover();
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scale cursor when hovering magnetic elements
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.to(cursor, {
      scale: isHovering ? 2 : 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [isHovering]);

  return (
    <>
      {/* Main cursor with lerp delay */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white pointer-events-none z-[9999]"
        style={{
          mixBlendMode: 'difference',
        }}
      />
      {/* Instant dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999]"
        style={{
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
};

export default Cursor;
