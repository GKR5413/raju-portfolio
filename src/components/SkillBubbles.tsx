import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skill } from "@/data/skills";

interface SkillBubblesProps {
  skills: Skill[];
  className?: string;
  interactive?: boolean;
  maxSize?: number;
  minSize?: number;
}

const SkillBubbles = ({
  skills,
  className = "",
  interactive = true,
  maxSize = 120,
  minSize = 60
}: SkillBubblesProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getBubbleSize = (level: number) => {
    return minSize + ((level / 100) * (maxSize - minSize));
  };

  const getCategoryGradient = (category: string) => {
    const gradients = {
      frontend: 'from-blue-400 to-cyan-400',
      backend: 'from-green-400 to-emerald-400',
      database: 'from-purple-400 to-pink-400',
      cloud: 'from-orange-400 to-red-400',
      tools: 'from-yellow-400 to-amber-400',
      ai: 'from-violet-400 to-purple-400',
    };
    return gradients[category as keyof typeof gradients] || 'from-gray-400 to-gray-500';
  };

  const BubbleComponent = ({ skill, index }: { skill: Skill; index: number }) => {
    const size = getBubbleSize(skill.level);
    const isHovered = hoveredSkill === skill.id;
    const isSelected = selectedSkill === skill.id;

    const handleHoverStart = () => {
      if (interactive) setHoveredSkill(skill.id);
    };

    const handleHoverEnd = () => {
      if (interactive) setHoveredSkill(null);
    };

    const handleClick = () => {
      setSelectedSkill(prev => prev === skill.id ? null : skill.id);
    };

    return (
      <Tooltip key={skill.id}>
        <TooltipTrigger asChild>
          <motion.div
            className={`relative cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-br ${getCategoryGradient(skill.category)} shadow-lg select-none`}
            style={{
              width: size,
              height: size,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              y: 50,
            }}
            animate={{
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0,
              y: isVisible ? 0 : 50,
            }}
            transition={{
              delay: isVisible && !animationComplete ? index * 0.05 : 0,
              duration: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            whileHover={interactive ? {
              scale: 1.1,
              rotateZ: 2,
              transition: {
                duration: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 25,
              }
            } : {}}
            whileTap={{ scale: 0.95 }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            onClick={handleClick}
          >
            {/* Skill level indicator ring */}
            <div className="absolute inset-0 rounded-full">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
                <motion.path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{
                    strokeDasharray: "0, 100",
                  }}
                  animate={{
                    strokeDasharray: isVisible ? `${skill.level}, 100` : "0, 100",
                  }}
                  transition={{
                    delay: isVisible && !animationComplete ? index * 0.1 + 0.3 : 0,
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                />
              </svg>
            </div>

            {/* Skill name */}
            <motion.span
              className="text-white font-semibold text-center px-2 text-sm"
              style={{
                fontSize: `${Math.max(10, size / 8)}px`,
              }}
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? (isHovered ? 1.1 : 1) : 0.5,
              }}
              transition={{
                delay: isVisible && !animationComplete ? index * 0.1 + 0.2 : 0,
                duration: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              {skill.name}
            </motion.span>

            {/* Hover glow effect */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.1, scale: 1.2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Skill level percentage */}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-2 py-1 rounded-full text-xs font-bold shadow-md"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{
                opacity: isHovered || isSelected ? 1 : 0,
                y: isHovered || isSelected ? 0 : 10,
                scale: isHovered || isSelected ? 1 : 0.8,
              }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              {skill.level}%
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
          sideOffset={8}
          avoidCollisions={false}
        >
          <div className="space-y-2 pointer-events-none">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{skill.name}</h4>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                {skill.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{skill.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Experience:</span>
              <span className="font-medium text-gray-700 dark:text-gray-200">{skill.experience}</span>
            </div>
            {skill.projects && skill.projects.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Projects:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {skill.projects.map((project, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300"
                    >
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  // Stable one-time animation trigger
  useEffect(() => {
    if (animationComplete) return;

    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationComplete) {
          setIsVisible(true);
          setAnimationComplete(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    observer.observe(currentContainer);
    return () => {
      observer.disconnect();
    };
  }, [animationComplete]);

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        className={`relative flex flex-wrap gap-4 justify-center items-center p-8 ${className}`}
      >
        {skills.map((skill, index) => (
          <BubbleComponent key={skill.id} skill={skill} index={index} />
        ))}

        {/* Category Legend */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.8,
          }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 30,
            scale: isVisible ? 1 : 0.8,
          }}
          transition={{
            delay: isVisible && !animationComplete ? skills.length * 0.1 + 0.8 : 0,
            duration: 0.6,
            type: "spring",
            stiffness: 150,
            damping: 20,
          }}
        >
          {['frontend', 'backend', 'database', 'cloud', 'tools', 'ai'].map((category, idx) => (
            <motion.div
              key={category}
              className="flex items-center gap-1"
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.5,
              }}
              transition={{
                delay: isVisible && !animationComplete ? skills.length * 0.1 + 0.9 + idx * 0.1 : 0,
                duration: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryGradient(category)}`}
                initial={{ scale: 0 }}
                animate={{
                  scale: isVisible ? 1 : 0,
                }}
                transition={{
                  delay: isVisible && !animationComplete ? skills.length * 0.1 + 1.0 + idx * 0.1 : 0,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              />
              <span className="text-xs capitalize text-gray-600 dark:text-gray-300 font-medium">
                {category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </TooltipProvider>
  );
};

export default SkillBubbles;