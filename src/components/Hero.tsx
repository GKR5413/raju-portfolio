import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import ParallaxSection from "./ParallaxSection";
import TextReveal, { AnimatedCounter } from "./TextReveal";
import Magnetic from "./Magnetic";

// Character scrolling animation like loading screen
const StatCharacter = ({ finalChar, onResolved, isVisible }) => {
  const scrollChars = "ZYXWVUTSRQPONMLKJIHGFEDCBA0987654321.+K";
  const controls = useAnimation();

  const charIndex = scrollChars.indexOf(finalChar);
  const yOffset = charIndex > -1 ? -charIndex * 36 : 0;

  useEffect(() => {
    if (!isVisible) return;

    const randomStartDelay = Math.random() * 800 + 300;

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
  }, [controls, yOffset, onResolved, isVisible]);

  return (
    <div style={{ height: 36, lineHeight: '36px' }} className="overflow-hidden">
      <motion.div initial={{ y: 0 }} animate={controls}>
        {[...scrollChars].map((char, index) => (
          <div key={index} style={{ height: 36 }} className="text-2xl sm:text-3xl font-bold">
            {char}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Scrolling Counter Animation (like loading screen)
const ScrollingCounter = ({ finalValue, suffix = "", label, onResolved }) => {
  const [resolvedCount, setResolvedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const valueString = finalValue.toString() + suffix;
  const totalChars = valueString.length;

  const handleCharResolved = useCallback(() => {
    setResolvedCount(prev => prev + 1);
  }, []);

  const allResolved = resolvedCount >= totalChars;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, Math.random() * 500 + 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (allResolved && onResolved) {
      const timer = setTimeout(() => {
        onResolved();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [allResolved, onResolved]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 flex justify-center">
        {valueString.split('').map((char, index) => (
          <StatCharacter key={index} finalChar={char} onResolved={handleCharResolved} isVisible={isVisible} />
        ))}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {label}
      </div>
    </motion.div>
  );
};


const Hero = () => {
  const statsRef = useRef(null);
  const [isStatsInView, setIsStatsInView] = useState(false);
  const [resolvedCount, setResolvedCount] = useState(0);

  const handleMetricResolved = useCallback(() => {
    setResolvedCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    // Trigger animation after loading screen is complete (4 seconds + buffer)
    const timer = setTimeout(() => {
      setIsStatsInView(true);
    }, 5000); // 5 second delay to ensure loading screen is done

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28" itemScope itemType="https://schema.org/Person">


      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium tracking-wide">
            <span className="text-lg">👋</span>
            <span>Hello, I'm</span>
          </div>
        </motion.div>

        {/* Clean Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" itemProp="name">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block text-blue-600 dark:text-blue-400"
              itemProp="givenName"
            >
              Kanakaraju
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="block text-gray-800 dark:text-gray-200"
              itemProp="familyName"
            >
              Gottumukkala
            </motion.span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed" itemProp="description">
            <span itemProp="jobTitle">MS Computer Science Student & Software Engineer</span> specializing in{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold" itemProp="knowsAbout">
              Java Microservices
            </span>,{" "}
            <span className="text-purple-600 dark:text-purple-400 font-semibold" itemProp="knowsAbout">
              Fintech Solutions
            </span>, and{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold" itemProp="knowsAbout">
              AI/ML Platforms
            </span>
          </p>
        </motion.div>

        {/* Stats with Odometer Animation */}
        <div className="mb-16">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isStatsInView ? 1 : 0, y: isStatsInView ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {isStatsInView && (
              <>
                <ScrollingCounter
                  finalValue={5}
                  suffix="+"
                  label="Years Experience"
                  onResolved={handleMetricResolved}
                />
                <ScrollingCounter
                  finalValue={10}
                  suffix="K+"
                  label="Merchants Served"
                  onResolved={handleMetricResolved}
                />
                <ScrollingCounter
                  finalValue={414}
                  suffix=""
                  label="RPS Performance"
                  onResolved={handleMetricResolved}
                />
                <ScrollingCounter
                  finalValue={3.82}
                  suffix=""
                  label="GPA at UMKC"
                  onResolved={handleMetricResolved}
                />
              </>
            )}
          </motion.div>
        </div>

        {/* Location */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-8" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <MapPin className="h-4 w-4" />
            <span><span itemProp="addressLocality">Kansas City</span>, <span itemProp="addressRegion">MO</span></span>
          </div>
          
          {/* Domain mention for SEO */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mb-12"
          >
            <div className="text-sm text-gray-500 dark:text-gray-500 font-mono">
              rajugottumukkala.com
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Magnetic speed={0.3}>
            <Button
              size="lg"
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="h-5 w-5" />
              Get In Touch
            </Button>
          </Magnetic>
          <Magnetic speed={0.25}>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
          </Magnetic>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex justify-center gap-6 mb-16"
        >
          <Magnetic speed={0.4}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => window.open('https://github.com/gkr5413', '_blank')}
            >
              <Github className="h-5 w-5" />
            </Button>
          </Magnetic>
          <Magnetic speed={0.4}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => window.open('https://linkedin.com/in/gkr5413/', '_blank')}
            >
              <Linkedin className="h-5 w-5" />
            </Button>
          </Magnetic>
          <Magnetic speed={0.4}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="h-5 w-5" />
            </Button>
          </Magnetic>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-600 dark:text-gray-400 tracking-widest uppercase font-medium">
              SCROLL TO EXPLORE
            </span>
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-500 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;