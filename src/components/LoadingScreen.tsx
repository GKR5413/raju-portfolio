import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

// --- A component for a single character that resolves with a scroll effect ---
const OdometerCharacter = ({ finalChar, onResolved }) => {
  const scrollChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>_[]{}#@!$%^&*()+=?01234seph";
  const controls = useAnimation();

  const charIndex = scrollChars.indexOf(finalChar.toUpperCase());
  const yOffset = charIndex > -1 ? -charIndex * 36 : 0; // 36px is the height

  useEffect(() => {
    const randomStartDelay = Math.random() * 1200;

    const startTimer = setTimeout(async () => {
      await controls.start({
        y: yOffset,
        transition: { type: "spring", damping: 15, stiffness: 100, mass: 0.5 },
      });
      if (onResolved) {
        onResolved();
      }
    }, randomStartDelay);

    return () => clearTimeout(startTimer);
  }, [controls, yOffset, onResolved]);

  return (
    <div style={{ height: 36, lineHeight: '36px' }} className="overflow-hidden">
      <motion.div initial={{ y: 0 }} animate={controls}>
        {[...scrollChars].map((char, index) => (
          <div key={index} style={{ height: 36 }}>
            {char}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- The main Loading Screen ---
const LoadingScreen = ({ onFinished }) => {
  const name = "Raju Gottumukkala";
  const [resolvedCount, setResolvedCount] = useState(0);

  const handleCharResolved = useCallback(() => {
    setResolvedCount(prev => prev + 1);
  }, []);

  const allResolved = resolvedCount >= name.replace(/ /g, "").length;

  useEffect(() => {
    if (allResolved) {
      const timer = setTimeout(() => {
        onFinished();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [allResolved, onFinished]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background font-mono"
      >
        <div className="text-3xl md:text-4xl font-bold tracking-widest text-primary flex items-center">
          {name.split('').map((char, index) =>
            char === ' ' ? (
              <span key={index} className="w-4 inline-block"></span>
            ) : (
              <OdometerCharacter key={index} finalChar={char} onResolved={handleCharResolved} />
            )
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: allResolved ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg text-foreground/70 tracking-wider"
        >
          Software Engineer & AI Enthusiast
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
