import { motion } from "framer-motion";

const CreativeBackground = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Dynamic base with visible animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-slate-900 dark:via-gray-900 dark:to-blue-900/30"
        animate={{
          background: [
            "linear-gradient(135deg, rgb(248, 250, 252), rgb(255, 255, 255), rgba(59, 130, 246, 0.2))",
            "linear-gradient(225deg, rgb(248, 250, 252), rgb(255, 255, 255), rgba(147, 51, 234, 0.2))",
            "linear-gradient(315deg, rgb(248, 250, 252), rgb(255, 255, 255), rgba(6, 182, 212, 0.2))",
            "linear-gradient(45deg, rgb(248, 250, 252), rgb(255, 255, 255), rgba(59, 130, 246, 0.2))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-cyan-500/10"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Dynamic accent elements */}
      <div className="absolute inset-0">
        {/* Animated top accent line */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Animated bottom accent line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        
        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 dark:from-blue-500/20 dark:to-purple-500/20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + i * 10}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
        
        {/* Corner accent with glow */}
        <motion.div
          className="absolute top-8 right-8 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-8 left-8 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.4, 0.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
      
      {/* Animated grid pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        animate={{
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </motion.div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/40 dark:bg-blue-300/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CreativeBackground;
