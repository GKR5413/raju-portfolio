import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  particleSize?: number;
  speed?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  particleCount = 50,
  particleSize = 2,
  speed = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * particleSize + 1;
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;

        // Fade in and out
        const lifeFraction = this.life / this.maxLife;
        if (lifeFraction < 0.1) {
          this.opacity = lifeFraction * 10 * 0.7;
        } else if (lifeFraction > 0.9) {
          this.opacity = (1 - lifeFraction) * 10 * 0.7;
        }

        // Reset particle if it goes out of bounds or dies
        if (this.x < 0 || this.x > canvas.width || 
            this.y < 0 || this.y > canvas.height || 
            this.life > this.maxLife) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.life = 0;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#3b82f6'; // Primary color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [particleCount, particleSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;