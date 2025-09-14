import ErrorBoundary from "./ErrorBoundary";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import ParallaxSection from "./ParallaxSection";
import TextReveal, { AnimatedCounter } from "./TextReveal";
import MagneticElement from "./MagneticElement";

// Individual Character Scroller - exactly like loading screen
const OdometerCharacter = ({ finalChar, onResolved, delay = 0 }) => {
  const scrollChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>_[]{}#@!$%^&*()+=?.-*K%abcdefghijklmnopqrstuvwxyz";
  const controls = useAnimation();
  const [isResolved, setIsResolved] = useState(false);

  const charIndex = scrollChars.indexOf(finalChar.toUpperCase());
  const yOffset = charIndex > -1 ? -charIndex * 36 : 0;

  useEffect(() => {
    const randomDelay = Math.random() * 1500 + delay; // Extended animation time

    const startTimer = setTimeout(async () => {
      setIsResolved(true);
      await controls.start({
        y: yOffset,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 80,
          mass: 0.8,
          duration: 1.2, // Longer duration for smoother effect
        },
      });
      if (onResolved) onResolved();
    }, randomDelay);

    return () => clearTimeout(startTimer);
  }, [controls, yOffset, onResolved, delay]);

  return (
    <div
      className="overflow-hidden inline-block"
      style={{ height: 36, lineHeight: '36px', width: '1em', textAlign: 'center' }}
    >
      <motion.div
        initial={{ y: Math.random() * -scrollChars.length * 36 }} // Start at random position
        animate={controls}
        style={{ willChange: 'transform' }}
      >
        {[...scrollChars].map((char, index) => (
          <div
            key={index}
            style={{
              height: 36,
              lineHeight: '36px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            {char}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Odometer-style metric component with enhanced fluid animation
const OdometerMetric = ({ finalValue, suffix = "", label, onResolved }) => {
  const [resolvedCount, setResolvedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Convert final value to string for character-by-character animation
  const finalString = finalValue.toString() + suffix;
  const totalChars = finalString.replace(/ /g, "").length;

  const handleCharResolved = useCallback(() => {
    setResolvedCount(prev => prev + 1);
  }, []);

  const allResolved = resolvedCount >= totalChars;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, Math.random() * 800 + 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (allResolved && onResolved) {
      const timer = setTimeout(() => {
        onResolved();
      }, 300);
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
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
    >
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 font-mono flex justify-center items-center">
        {isVisible && finalString.split('').map((char, index) =>
          char === ' ' ? (
            <span key={index} className="inline-block w-2"></span>
          ) : (
            <OdometerCharacter
              key={index}
              finalChar={char}
              onResolved={handleCharResolved}
              delay={index * 150} // Staggered start times
            />
          )
        )}
      </div>
      <motion.div
        className="text-sm text-gray-600 dark:text-gray-400 mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: allResolved ? 1 : 0,
          y: allResolved ? 0 : 10
        }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {label}
      </motion.div>
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
    // Trigger animation after a delay when component mounts
    const timer = setTimeout(() => {
      setIsStatsInView(true);
    }, 2000); // 2 second delay

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
        <ParallaxSection speed={0.2} className="mb-16">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isStatsInView ? 1 : 0, y: isStatsInView ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {isStatsInView && (
              <>
                <OdometerMetric
                  finalValue={4}
                  suffix="+"
                  label="Years Experience"
                  onResolved={handleMetricResolved}
                />
                <OdometerMetric
                  finalValue={10}
                  suffix="K+"
                  label="Merchants Served"
                  onResolved={handleMetricResolved}
                />
                <OdometerMetric
                  finalValue={414}
                  suffix=""
                  label="RPS Performance"
                  onResolved={handleMetricResolved}
                />
                <OdometerMetric
                  finalValue={3.82}
                  suffix=""
                  label="GPA at UMKC"
                  onResolved={handleMetricResolved}
                />
              </>
            )}
          </motion.div>
        </ParallaxSection>

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
              rajugottumukkala.in
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
          <MagneticElement strength={0.3}>
            <Button
              size="lg"
              className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="h-5 w-5" />
              Get In Touch
            </Button>
          </MagneticElement>
          <MagneticElement strength={0.25}>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
          </MagneticElement>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex justify-center gap-6 mb-16"
        >
          <MagneticElement strength={0.4}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => window.open('https://github.com/gkr5413', '_blank')}
            >
              <Github className="h-5 w-5" />
            </Button>
          </MagneticElement>
          <MagneticElement strength={0.4}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => window.open('https://linkedin.com/in/gkr5413/', '_blank')}
            >
              <Linkedin className="h-5 w-5" />
            </Button>
          </MagneticElement>
          <MagneticElement strength={0.4}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="h-5 w-5" />
            </Button>
          </MagneticElement>
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