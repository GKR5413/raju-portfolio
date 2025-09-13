import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar to fill over 3 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3.33; // Fill 3.33% every 100ms = 100% in 3 seconds
      });
    }, 100); // Update every 100ms

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <AnimatePresence>
      {true && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0
          }}
          transition={{ 
            duration: 2.0, 
            ease: [0.4, 0.0, 0.2, 1]
          }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
        >
          {/* Dynamic animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900" />
          
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/15 to-slate-600/10"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(37, 99, 235, 0.1), rgba(79, 70, 229, 0.15), rgba(71, 85, 105, 0.1))",
                "linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(71, 85, 105, 0.1), rgba(37, 99, 235, 0.1))",
                "linear-gradient(225deg, rgba(71, 85, 105, 0.1), rgba(37, 99, 235, 0.1), rgba(79, 70, 229, 0.15))",
                "linear-gradient(315deg, rgba(37, 99, 235, 0.1), rgba(79, 70, 229, 0.15), rgba(71, 85, 105, 0.1))"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating geometric shapes */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/5 to-indigo-500/5"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 12}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 20, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Animated border */}
          <motion.div 
            className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-500 bg-clip-border"
            animate={{
              background: [
                "linear-gradient(0deg, transparent, rgba(37, 99, 235, 0.3), transparent)",
                "linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.3), transparent)",
                "linear-gradient(180deg, transparent, rgba(71, 85, 105, 0.3), transparent)",
                "linear-gradient(270deg, transparent, rgba(37, 99, 235, 0.3), transparent)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Main content */}
          <div className="relative z-10 text-center max-w-lg mx-auto px-8">
            {/* Logo with 3D rotation and glow effect */}
            <motion.div
              initial={{ 
                scale: 0.5, 
                opacity: 0,
                rotateX: -90,
                rotateY: -45
              }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotateX: 0,
                rotateY: 0
              }}
              transition={{ 
                duration: 1.2, 
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.3
              }}
              className="mb-12"
            >
              <motion.div 
                className="relative w-24 h-24 mx-auto"
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 15,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* Main logo - Modern Design */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-slate-500 rounded-full flex items-center justify-center shadow-2xl">
                  {/* Inner circle */}
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full flex items-center justify-center"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.span 
                        className="text-lg font-bold text-blue-900"
                        animate={{
                          textShadow: [
                            "0 0 0px rgba(255,255,255,0.3)",
                            "0 0 8px rgba(255,255,255,0.6)",
                            "0 0 0px rgba(255,255,255,0.3)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        R
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Name with typewriter effect */}
            <motion.h1
              initial={{ 
                y: 50, 
                opacity: 0,
                filter: "blur(20px)"
              }}
              animate={{ 
                y: 0, 
                opacity: 1,
                filter: "blur(0px)"
              }}
              transition={{ 
                duration: 1, 
                delay: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-5xl font-bold text-white mb-4 tracking-tight"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                className="inline-block overflow-hidden"
              >
                Raju Gottumukkala
              </motion.span>
            </motion.h1>

            {/* Subtitle with wave animation */}
            <motion.p
              initial={{ 
                y: 30, 
                opacity: 0,
                filter: "blur(10px)"
              }}
              animate={{ 
                y: 0, 
                opacity: 1,
                filter: "blur(0px)"
              }}
              transition={{ 
                duration: 0.8, 
                delay: 1.5, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-xl text-gray-300 mb-16 font-medium"
            >
              Software Engineer & AI Enthusiast
            </motion.p>

            {/* Creative progress bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="w-full max-w-sm mx-auto"
            >
              <div className="relative">
                {/* Background bar */}
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-500 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
                
                {/* Progress text */}
                <motion.div
                  className="flex justify-between items-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  <span className="text-sm text-gray-300 font-medium">
                    Loading Portfolio
                  </span>
                  <motion.span 
                    className="text-sm font-bold text-white"
                    key={progress}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Math.round(progress)}%
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Creative loading animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex justify-center items-center space-x-3 mt-8"
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Floating particles with trails */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
