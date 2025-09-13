import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800 pt-28">
      {/* Subtle accent elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-80 h-80 bg-blue-100/40 dark:bg-blue-900/20 rounded-full blur-3xl opacity-70"
          style={{
            left: `${15 + mousePosition.x * 0.01}%`,
            top: `${10 + mousePosition.y * 0.01}%`,
          }}
        />
        <div 
          className="absolute w-60 h-60 bg-purple-100/40 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60"
          style={{
            right: `${15 + mousePosition.x * 0.01}%`,
            bottom: `${15 + mousePosition.y * 0.01}%`,
          }}
        />
      </div>

      <div className="relative z-0 max-w-6xl mx-auto px-6 sm:px-8 text-center">
        {/* Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 text-gray-300 text-sm font-medium tracking-wide">
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-blue-400">Kanakaraju</span>
            <span className="block text-gray-200">Gottumukkala</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            MS Computer Science Student & Software Engineer specializing in{" "}
            <span className="text-blue-400 font-semibold">
              Java Microservices
            </span>,{" "}
            <span className="text-purple-400 font-semibold">
              Fintech Solutions
            </span>, and{" "}
            <span className="text-cyan-400 font-semibold">
              AI/ML Platforms
            </span>
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">4+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">10K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Merchants Served</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">414</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">RPS Performance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">3.82</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">GPA at UMKC</div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-12">
            <MapPin className="h-4 w-4" />
            <span>Kansas City, MO</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button 
            size="lg" 
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="h-5 w-5" />
            Get In Touch
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex justify-center gap-6 mb-16"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={() => window.open('https://github.com/gkr5413', '_blank')}
          >
            <Github className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={() => window.open('https://linkedin.com/in/gkr5413/', '_blank')}
          >
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 tracking-widest uppercase font-medium">
              SCROLL TO EXPLORE
            </span>
            <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-500 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;