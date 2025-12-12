import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useSpring } from 'framer-motion';
import { Star, TrendingUp, Award, Target } from 'lucide-react';

interface ProgressBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  icon?: React.ReactNode;
  description?: string;
  animationDelay?: number;
  showPercentage?: boolean;
  gradient?: {
    from: string;
    to: string;
  };
}

const AnimatedProgressBar = ({
  label,
  value,
  maxValue = 100,
  color = '#3B82F6',
  icon,
  description,
  animationDelay = 0,
  showPercentage = true,
  gradient
}: ProgressBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = start + (value - start) * easeOutQuart;

        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [isInView, value, animationDelay]);

  const gradientStyle = gradient
    ? `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`
    : color;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: animationDelay }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-gray-600 dark:text-gray-400">{icon}</span>}
          <span className="font-medium text-gray-800 dark:text-gray-200">{label}</span>
        </div>
        {showPercentage && (
          <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
            {Math.round(displayValue)}{maxValue === 100 ? '%' : `/${maxValue}`}
          </span>
        )}
      </div>

      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            background: gradientStyle,
            width: `${(displayValue / maxValue) * 100}%`,
          }}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${percentage}%` : '0%' }}
          transition={{ duration: 2, delay: animationDelay, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
        </motion.div>
      </div>

      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      )}
    </motion.div>
  );
};

interface CircularProgressProps {
  label: string;
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  animationDelay?: number;
  icon?: React.ReactNode;
  centerContent?: React.ReactNode;
}

const CircularProgress = ({
  label,
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  color = '#3B82F6',
  backgroundColor = '#E5E7EB',
  animationDelay = 0,
  icon,
  centerContent
}: CircularProgressProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = start + (value - start) * easeOutQuart;

        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [isInView, value, animationDelay]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.8, delay: animationDelay }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="transparent"
            initial={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
            }}
            animate={{
              strokeDashoffset: isInView ? circumference - (percentage / 100) * circumference : circumference,
            }}
            transition={{ duration: 2.5, delay: animationDelay, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {icon && <div className="text-2xl mb-1">{icon}</div>}
          {centerContent || (
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
              {Math.round(displayValue)}%
            </span>
          )}
        </div>
      </div>

      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 text-center">
        {label}
      </p>
    </motion.div>
  );
};

interface SkillMeterProps {
  skills: Array<{
    name: string;
    level: number;
    color?: string;
    icon?: React.ReactNode;
  }>;
  title?: string;
  className?: string;
}

const SkillMeter = ({ skills, title, className = "" }: SkillMeterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {title && (
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {title}
        </h3>
      )}

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <AnimatedProgressBar
            key={skill.name}
            label={skill.name}
            value={skill.level}
            color={skill.color}
            icon={skill.icon}
            animationDelay={index * 0.2}
            gradient={skill.color ? undefined : {
              from: '#3B82F6',
              to: '#8B5CF6'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

interface AchievementCardProps {
  title: string;
  value: number;
  target: number;
  unit?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  animationDelay?: number;
}

const AchievementCard = ({
  title,
  value,
  target,
  unit = "",
  description,
  icon,
  color,
  animationDelay = 0
}: AchievementCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const percentage = Math.min((value / target) * 100, 100);

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: animationDelay }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
            <span style={{ color }}>{icon}</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 2, delay: animationDelay }}
            >
              {value}{unit}
            </motion.span>
          </div>
          <div className="text-xs text-gray-500">of {target}{unit}</div>
        </div>
      </div>

      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${percentage}%` } : { width: "0%" }}
          transition={{ duration: 2, delay: animationDelay + 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
        <span>Progress</span>
        <span>{Math.round(percentage)}%</span>
      </div>
    </motion.div>
  );
};

// Sample data for your portfolio
export const technicalSkills = [
  { name: 'Java & Spring Boot', level: 95, color: '#F89820', icon: <Star className="h-4 w-4" /> },
  { name: 'React & TypeScript', level: 85, color: '#61DAFB', icon: <TrendingUp className="h-4 w-4" /> },
  { name: 'Kubernetes & Docker', level: 80, color: '#326CE5', icon: <Target className="h-4 w-4" /> },
  { name: 'PostgreSQL & MongoDB', level: 88, color: '#336791', icon: <Award className="h-4 w-4" /> },
  { name: 'AWS & Cloud Architecture', level: 82, color: '#FF9900', icon: <Star className="h-4 w-4" /> },
];

export const achievements = [
  {
    title: 'System Performance',
    value: 414,
    target: 500,
    unit: ' RPS',
    description: 'Peak requests per second handled',
    icon: <TrendingUp className="h-5 w-5" />,
    color: '#10B981'
  },
  {
    title: 'System Uptime',
    value: 99.9,
    target: 100,
    unit: '%',
    description: 'Production system availability',
    icon: <Target className="h-5 w-5" />,
    color: '#3B82F6'
  },
  {
    title: 'Code Quality',
    value: 98,
    target: 100,
    unit: '%',
    description: 'Test coverage maintained',
    icon: <Award className="h-5 w-5" />,
    color: '#8B5CF6'
  }
];

export { AnimatedProgressBar, CircularProgress, SkillMeter, AchievementCard };