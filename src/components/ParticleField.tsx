import { useEffect, useRef } from 'react';
import { useCustomTheme } from '../App';

// Particle class with physics
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  density: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    // Random initial position
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;

    // Soft varying sizes (1px to 4px)
    this.size = Math.random() * 3 + 1;

    // Base drifting speed (very slow floating)
    this.baseX = (Math.random() * 0.6) - 0.3;
    this.baseY = (Math.random() * 0.6) - 0.3;

    // Initial velocity
    this.vx = this.baseX;
    this.vy = this.baseY;

    // Density affects how much force moves it
    this.density = (Math.random() * 30) + 1;

    // Varying opacity (0.1 to 0.5)
    this.opacity = Math.random() * 0.4 + 0.1;
  }

  draw(ctx: CanvasRenderingContext2D, isDark: boolean) {
    // Dark particles for light mode, white particles for dark mode
    const color = isDark ? '255, 255, 255' : '30, 30, 30';
    ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(mouseX: number, mouseY: number, canvasWidth: number, canvasHeight: number) {
    // 1. Calculate distance between particle and mouse
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 2. Define the interaction radius
    const maxDistance = 150;

    // 3. Apply repulsion force when mouse is near
    if (distance < maxDistance && distance > 0) {
      const force = (maxDistance - distance) / maxDistance;
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;

      // Apply repulsion (negative = push away)
      const directionX = forceDirectionX * force * this.density;
      const directionY = forceDirectionY * force * this.density;

      this.vx -= directionX;
      this.vy -= directionY;
    } else {
      // When mouse is far, gradually return to base drift speed
      this.vx += (this.baseX - this.vx) * 0.05;
      this.vy += (this.baseY - this.vy) * 0.05;
    }

    // 4. Apply friction/damping (the "glide")
    this.vx *= 0.95;
    this.vy *= 0.95;

    // 5. Update position
    this.x += this.vx;
    this.y += this.vy;

    // 6. Screen wrapping (infinite field effect)
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }
}

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>();
  const { theme } = useCustomTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles (100-150 range)
    const initParticles = () => {
      const numberOfParticles = 120; // Sweet spot for performance
      particlesRef.current = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesRef.current.push(new Particle(canvas.width, canvas.height));
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.update(
          mouseRef.current.x,
          mouseRef.current.y,
          canvas.width,
          canvas.height
        );
        particle.draw(ctx, isDark);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleField;
