import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// --- Particle Class (Now with GSAP) ---
class Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  angle: number;
  radius: number;
  baseRadius: number;
  color: string;
  lineWidth: number;
  
  // GSAP quick-setter functions for smooth movement
  quickX: (value: number, duration: number, ease: string) => void;
  quickY: (value: number, duration: number, ease: string) => void;

  constructor(angle: number, ringRadius: number) {
    this.angle = angle;
    this.baseRadius = ringRadius;
    this.radius = this.baseRadius;
    
    const initialX = window.innerWidth / 2 + Math.cos(angle) * ringRadius;
    const initialY = window.innerHeight / 2 + Math.sin(angle) * ringRadius;

    this.x = initialX;
    this.y = initialY;
    this.prevX = initialX;
    this.prevY = initialY;

    this.color = Math.random() < 0.3 ? '#4285F4' : '#FFFFFF';
    this.lineWidth = 2;
    
    // Initialize GSAP quick-setters
    this.quickX = gsap.quickTo(this, "x", { duration: 1.2, ease: "power3.out" });
    this.quickY = gsap.quickTo(this, "y", { duration: 1.2, ease: "power3.out" });
  }

  update(mouseX: number, mouseY: number, time: number, waveAmplitude: number) {
    // 1. Wavy Ring Motion
    const wave = Math.sin(this.angle * 5 + time * 0.01) * waveAmplitude;
    this.radius = this.baseRadius + wave;

    // 2. Calculate Target Position
    const targetX = mouseX + Math.cos(this.angle) * this.radius;
    const targetY = mouseY + Math.sin(this.angle) * this.radius;
    
    // 3. Use GSAP to smoothly move the particle to the target
    this.quickX(targetX, 1.2, "power3.out");
    this.quickY(targetY, 1.2, "power3.out");
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Calculate velocity for stretching based on position change
    const vx = this.x - this.prevX;
    const vy = this.y - this.prevY;
    
    const speed = Math.sqrt(vx * vx + vy * vy);
    const stretchFactor = 5;
    const length = this.lineWidth + speed * stretchFactor;
    const angle = Math.atan2(vy, vx);

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(this.x - Math.cos(angle) * length / 2, this.y - Math.sin(angle) * length / 2);
    ctx.lineTo(this.x + Math.cos(angle) * length / 2, this.y + Math.sin(angle) * length / 2);
    ctx.stroke();

    // Update previous positions for the next frame's velocity calculation
    this.prevX = this.x;
    this.prevY = this.y;
  }
}

// --- Antigravity Component (GSAP Implementation) ---
const Antigravity = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const magneticMouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const timeRef = useRef(0);

  // Configuration from spec
  const ringRadius = 120;
  const waveAmplitude = 20;
  const viscosity = 0.02; // Heavy, slow fluid movement

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      const pixelArea = window.innerWidth * window.innerHeight;
      const desiredCount = Math.floor(pixelArea / 6000);
      const count = Math.min(desiredCount, 350);

      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        particlesRef.current.push(new Particle(angle, ringRadius));
      }
    };

    const animate = () => {
      timeRef.current += 1;

      // Apply viscosity using GSAP's interpolation for a smoother effect
      magneticMouseRef.current.x = gsap.utils.interpolate(magneticMouseRef.current.x, mouseRef.current.x, viscosity);
      magneticMouseRef.current.y = gsap.utils.interpolate(magneticMouseRef.current.y, mouseRef.current.y, viscosity);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      particlesRef.current.forEach(particle => {
        particle.update(magneticMouseRef.current.x, magneticMouseRef.current.y, timeRef.current, waveAmplitude);
        particle.draw(ctx);
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resizeCanvas();
    initParticles();
    
    // Use GSAP's ticker for the animation loop
    gsap.ticker.add(animate);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [viscosity, waveAmplitude]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default Antigravity;