import { useEffect, useRef } from 'react';
import { useCustomTheme } from '../App';

// Simplex noise generator for organic, continuous patterns
const createNoise3D = () => {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256).map((_, i) => i);

  // Shuffle p
  for (let i = 255; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [p[i], p[r]] = [p[r], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[-1,-1,-1]];
  const dot = (g: number[], x: number, y: number, z: number) => g[0]*x + g[1]*y + g[2]*z;

  const mix = (a: number, b: number, t: number) => (1 - t) * a + t * b;

  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = x * x * x * (x * (x * 6 - 15) + 10);
    const v = y * y * y * (y * (y * 6 - 15) + 10);
    const w = z * z * z * (z * (z * 6 - 15) + 10);
    const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;

    return mix(
      mix(
        mix(dot(grad3[perm[AA] % 12], x, y, z), dot(grad3[perm[BA] % 12], x - 1, y, z), u),
        mix(dot(grad3[perm[AB] % 12], x, y - 1, z), dot(grad3[perm[BB] % 12], x - 1, y - 1, z), u),
        v
      ),
      mix(
        mix(dot(grad3[perm[AA + 1] % 12], x, y, z - 1), dot(grad3[perm[BA + 1] % 12], x - 1, y, z - 1), u),
        mix(dot(grad3[perm[AB + 1] % 12], x, y - 1, z - 1), dot(grad3[perm[BB + 1] % 12], x - 1, y - 1, z - 1), u),
        v
      ),
      w
    );
  };
};

const noise = createNoise3D();

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  angle: number;
  radius: number;
  baseRadius: number;
  layerIndex: number;
  color: string;
  lineWidth: number;
  opacity: number;
  baseOpacity: number;
  life: number;
  maxLife: number;

  constructor(index: number, layerIndex: number, particlesPerLayer: number) {
    this.angle = (index / particlesPerLayer) * Math.PI * 2;
    this.baseRadius = 80 + layerIndex * 60;
    this.radius = this.baseRadius;
    this.layerIndex = layerIndex;

    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.vx = 0;
    this.vy = 0;

    this.color = Math.random() < 0.3 ? '#4285F4' : '#ADD8E6'; // Muted blue
    this.lineWidth = Math.random() * 2 + 3; // Increased size

    // Life cycle properties
    this.maxLife = Math.random() * 200 + 150; // Lifespan in frames
    this.life = Math.random() * this.maxLife;
    this.baseOpacity = Math.random() * 0.4 + 0.3; // Base visibility (0.3 to 0.7)
    this.opacity = 0;
  }

  update(mouseX: number, mouseY: number, time: number, cursorVx: number, cursorVy: number) {
    // 1. Life cycle management
    this.life--;
    if (this.life <= 0) {
      this.life = this.maxLife;
    }

    // Fade in and out
    const fadeInDuration = this.maxLife * 0.1;
    const fadeOutDuration = this.maxLife * 0.2;

    if (this.life < fadeInDuration) {
      this.opacity = (this.life / fadeInDuration) * this.baseOpacity;
    } else if (this.life > this.maxLife - fadeOutDuration) {
      this.opacity = ((this.maxLife - this.life) / fadeOutDuration) * this.baseOpacity;
    } else {
      this.opacity = this.baseOpacity;
    }

    // 2. Radius oscillation and dynamic perturbation
    const oscillationSpeed = 0.02 + this.layerIndex * 0.005;
    const amplitude = 15;
    const oscillation = Math.sin(time * oscillationSpeed) * amplitude;
    
    let finalRadius = this.baseRadius + oscillation;

    if (this.layerIndex > 0) {
      const noiseValue = noise(
        Math.cos(this.angle) * (this.layerIndex + 1) * 0.5,
        Math.sin(this.angle) * (this.layerIndex + 1) * 0.5,
        time * 0.002
      );
      const perturbation = (this.layerIndex * 30) * noiseValue;
      finalRadius += perturbation;
    }
    this.radius = finalRadius;

    // 3. Position update
    this.targetX = mouseX + Math.cos(this.angle) * this.radius;
    this.targetY = mouseY + Math.sin(this.angle) * this.radius;

    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;

    // 4. Speed modulation based on cursor direction
    const cursorSpeed = Math.sqrt(cursorVx * cursorVx + cursorVy * cursorVy);
    let springiness = 0.15; // Default springiness

    if (cursorSpeed > 0.1) {
      const cursorDirX = cursorVx / cursorSpeed;
      const cursorDirY = cursorVy / cursorSpeed;
      const particleDirX = Math.cos(this.angle);
      const particleDirY = Math.sin(this.angle);
      const dotProduct = particleDirX * cursorDirX + particleDirY * cursorDirY;
      const speedFactor = 1 + dotProduct * 0.8; // Range ~0.2 to 1.8
      springiness *= speedFactor;
    }

    this.vx = dx * springiness;
    this.vy = dy * springiness;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

    const baseLength = 5; // Increased size
    const stretchFactor = 2; // Reduced stretching
    const length = baseLength + speed * stretchFactor;

    const angle = Math.atan2(this.vy, this.vx);

    const halfLength = length / 2;
    const startX = this.x - Math.cos(angle) * halfLength;
    const startY = this.y - Math.sin(angle) * halfLength;
    const endX = this.x + Math.cos(angle) * halfLength;
    const endY = this.y + Math.sin(angle) * halfLength;

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.globalAlpha = this.opacity;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    ctx.globalAlpha = 1;
  }
}

const AntigravityStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const magneticMouseRef = useRef({ x: -1000, y: -1000 });
  const prevMagneticMouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>();
  const timeRef = useRef(0);
  const { theme } = useCustomTheme();

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
      particlesRef.current = [];

      const layers = [
        { radius: 80, count: 48, offset: 0 },
        { radius: 140, count: 72, offset: 11.25 },
        { radius: 200, count: 96, offset: 5.625 },
        { radius: 260, count: 120, offset: 0 }
      ];

      layers.forEach((layer, layerIndex) => {
        const angleStep = 360 / layer.count;
        for (let i = 0; i < layer.count; i++) {
          const angle = (i * angleStep + layer.offset) * (Math.PI / 180);
          const particle = new Particle(i, layerIndex, layer.count);
          particle.angle = angle;
          particlesRef.current.push(particle);
        }
      });
    };

    const animate = () => {
      timeRef.current += 1;
      
      magneticMouseRef.current.x += (mouseRef.current.x - magneticMouseRef.current.x) * 0.05;
      magneticMouseRef.current.y += (mouseRef.current.y - magneticMouseRef.current.y) * 0.05;

      const cursorVx = magneticMouseRef.current.x - prevMagneticMouseRef.current.x;
      const cursorVy = magneticMouseRef.current.y - prevMagneticMouseRef.current.y;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';

      particlesRef.current.forEach(particle => {
        particle.update(magneticMouseRef.current.x, magneticMouseRef.current.y, timeRef.current, cursorVx, cursorVy);
        particle.draw(ctx);
      });

      prevMagneticMouseRef.current.x = magneticMouseRef.current.x;
      prevMagneticMouseRef.current.y = magneticMouseRef.current.y;

      ctx.globalCompositeOperation = 'source-over';

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
       mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2};
    };

    resizeCanvas();
    initParticles();
    animate();

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
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default AntigravityStars;
