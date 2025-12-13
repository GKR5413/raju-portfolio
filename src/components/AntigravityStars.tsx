import { useEffect, useRef } from 'react';
import { useCustomTheme } from '../App';



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
  baseR: number;
  baseG: number;
  baseB: number;
  lineWidth: number;
  opacity: number;
  baseOpacity: number;
  life: number;
  maxLife: number;
  currentActivity: number;

  constructor(index: number, layerIndex: number, particlesPerLayer: number, baseRadius: number) {
    this.angle = (index / particlesPerLayer) * Math.PI * 2;
    this.baseRadius = baseRadius;
    this.radius = this.baseRadius;
    this.layerIndex = layerIndex;

    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.vx = 0;
    this.vy = 0;

    // Radial color gradient: bright inner rings → deep outer rings
    const totalLayers = 10;
    const t = this.layerIndex / (totalLayers - 1); // Interpolation factor (0 to 1)

    // Inner rings: Bright blue #3B82F6 (59, 130, 246)
    const innerR = 59, innerG = 130, innerB = 246;
    // Outer rings: Deep purple-blue #1E40AF (30, 64, 175)
    const outerR = 30, outerG = 64, outerB = 175;

    // Interpolate colors
    const r = Math.round(innerR + (outerR - innerR) * t);
    const g = Math.round(innerG + (outerG - innerG) * t);
    const b = Math.round(innerB + (outerB - innerB) * t);

    // Store base color components for dynamic color shifting
    this.baseR = r;
    this.baseG = g;
    this.baseB = b;
    this.color = `rgb(${r}, ${g}, ${b})`;
    // Particle size variation with smooth curve: tiny inner → large outer
    const easedT = t * t; // Quadratic easing for smooth, mesmerizing transition
    this.lineWidth = 1.5 + easedT * 4.2; // 1.5px (inner) → 5.7px (outer)

    // Life cycle properties
    this.maxLife = Math.random() * 200 + 150; // Lifespan in frames
    this.life = Math.random() * this.maxLife;
    this.baseOpacity = Math.random() * 0.4 + 0.3; // Base visibility (0.3 to 0.7)
    this.opacity = 0;
    this.currentActivity = 0;
  }

  update(
    mouse: { magnetic: { x: number, y: number }, real: { x: number, y: number } },
    time: number,
    cursorVx: number,
    cursorVy: number,
    activity: number
  ) {
    // --- MOVEMENT ---
    this.life--;
    if (this.life <= 0) {
      this.life = this.maxLife;
    }

    // Subtle anti-clockwise rotation
    this.angle -= 0.0003; // Very minimal rotation

    const { x: magneticX, y: magneticY } = mouse.magnetic;
    // Multi-frequency wave pattern for complex, organic movement
    const phaseOffset = this.angle * 2; // Creates wave pattern around each ring
    const baseWave = Math.sin(time * 0.02 + phaseOffset) * 20; // Slow, large wave
    const ripple = Math.sin(time * 0.08 + phaseOffset * 3) * 8; // Fast, small ripple
    const oscillation = baseWave + ripple; // Combine for complex movement
    let finalRadius = this.baseRadius + oscillation;
    
    this.radius = finalRadius;
    this.targetX = magneticX + Math.cos(this.angle) * this.radius;
    this.targetY = magneticY + Math.sin(this.angle) * this.radius;
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const cursorSpeed = Math.sqrt(cursorVx * cursorVx + cursorVy * cursorVy);
    let springiness = 0.15;
    if (cursorSpeed > 0.1) {
      const cursorDirX = cursorVx / cursorSpeed;
      const cursorDirY = cursorVy / cursorSpeed;
      const particleDirX = Math.cos(this.angle);
      const particleDirY = Math.sin(this.angle);
      const dotProduct = particleDirX * cursorDirX + particleDirY * cursorDirY;
      const speedFactor = 1 + dotProduct * 0.8;
      springiness *= speedFactor;
    }
    this.vx = dx * springiness;
    this.vy = dy * springiness;
    this.x += this.vx;
    this.y += this.vy;

    // --- OPACITY (Interpolated) ---
    // 1. Calculate target opacity based on life cycle and proximity
    let targetOpacityFactor = 1.0;
    
    const fadeInDuration = this.maxLife * 0.1;
    const fadeOutDuration = this.maxLife * 0.2;
    if (this.life < fadeInDuration) {
      targetOpacityFactor = Math.min(targetOpacityFactor, this.life / fadeInDuration);
    } else if (this.life > this.maxLife - fadeOutDuration) {
      targetOpacityFactor = Math.min(targetOpacityFactor, (this.maxLife - this.life) / fadeOutDuration);
    }

    const { x: realX, y: realY } = mouse.real;
    const dxMouse = this.x - realX;
    const dyMouse = this.y - realY;
    const distToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
    const vanishRadius = 60;
    if (distToMouse < vanishRadius) {
      targetOpacityFactor = Math.min(targetOpacityFactor, distToMouse / vanishRadius);
    }
    
    let targetOpacity = this.baseOpacity * targetOpacityFactor;

    // Layer-based opacity: inner rings MUCH MORE visible with strong contrast
    const layerOpacityFactor = 1.2 - (this.layerIndex / 9) * 0.6; // 1.2 (inner) to 0.6 (outer)

    // During cursor movement, dramatically boost inner ring opacity
    const activityBoost = activity * (1 - this.layerIndex / 9) * 1.2; // Max 1.2 boost for innermost

    targetOpacity *= (layerOpacityFactor + activityBoost);

    // 2. Determine final target based on activity
    const minIdleOpacity = 0.15; // A clearly visible minimum
    if (activity < 0.1) { // If idle
        // When idle, the target is the *lesser* of its natural opacity and the idle opacity
        targetOpacity = Math.min(targetOpacity, minIdleOpacity);
    }

    // 3. Smoothly interpolate current opacity towards the target
    this.opacity += (targetOpacity - this.opacity) * 0.1;

    // Store current activity for color calculation in draw
    this.currentActivity = activity;
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

    // Dynamic color shifting: inner rings become almost white-blue during cursor movement
    const colorShiftFactor = this.currentActivity * (1 - this.layerIndex / 9); // 0 to 1 for inner rings

    // Target color for active state: Almost white-blue
    const whiteBlueR = 220;
    const whiteBlueG = 240;
    const whiteBlueB = 255;

    // Interpolate between base color and white-blue based on activity
    const r = Math.round(this.baseR + (whiteBlueR - this.baseR) * colorShiftFactor);
    const g = Math.round(this.baseG + (whiteBlueG - this.baseG) * colorShiftFactor);
    const b = Math.round(this.baseB + (whiteBlueB - this.baseB) * colorShiftFactor);

    ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
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
  const activityRef = useRef(0); // For idle fade effect
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
        { radius: 159, count: 78, offset: 0 },
        { radius: 204, count: 88, offset: 11.25 },
        { radius: 249, count: 98, offset: 5.625 },
        { radius: 294, count: 108, offset: 0 },
        { radius: 339, count: 118, offset: 11.25 },
        { radius: 384, count: 128, offset: 5.625 },
        { radius: 429, count: 138, offset: 0 },
        { radius: 474, count: 148, offset: 11.25 },
        { radius: 519, count: 158, offset: 5.625 },
        { radius: 564, count: 168, offset: 0 }
      ];

      layers.forEach((layer, layerIndex) => {
        const angleStep = 360 / layer.count;
        for (let i = 0; i < layer.count; i++) {
          const angle = (i * angleStep + layer.offset) * (Math.PI / 180);
          const particle = new Particle(i, layerIndex, layer.count, layer.radius);
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
      const cursorSpeed = Math.sqrt(cursorVx * cursorVx + cursorVy * cursorVy);

      // Update activity level
      if (cursorSpeed > 1) {
        activityRef.current = 1;
      } else {
        activityRef.current *= 0.95; // Decay activity
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      particlesRef.current.forEach(particle => {
        particle.update(
          { magnetic: magneticMouseRef.current, real: mouseRef.current },
          timeRef.current,
          cursorVx,
          cursorVy,
          activityRef.current
        );
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
