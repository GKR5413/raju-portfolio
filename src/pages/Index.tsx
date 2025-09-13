import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle scrolling to sections based on route
    const scrollToSection = (sectionId: string) => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };

    switch (location.pathname) {
      case '/home':
        scrollToSection('home');
        break;
      case '/about':
        scrollToSection('about');
        break;
      case '/experience':
        scrollToSection('experience');
        break;
      case '/projects':
        scrollToSection('projects');
        break;
      case '/contact':
        scrollToSection('contact');
        break;
      default:
        // Default to home section
        break;
    }
  }, [location]);

  return (
    <motion.div 
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 2.0, 
        ease: [0.4, 0.0, 0.2, 1],
        delay: 0.5
      }}
    >
      {/* Navigation - Always visible */}
      <Navigation />
      
      {/* Hero with smooth fade entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 2.5, 
          ease: [0.4, 0.0, 0.2, 1],
          delay: 0.8
        }}
      >
        <Hero />
      </motion.div>
      
      {/* About with smooth fade effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 2.5, 
          ease: [0.4, 0.0, 0.2, 1],
          delay: 1.0
        }}
      >
        <About />
      </motion.div>
      
      {/* Experience with smooth fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 2.5, 
          ease: [0.4, 0.0, 0.2, 1],
          delay: 1.2
        }}
      >
        <Experience />
      </motion.div>
      
      {/* Projects with smooth fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 2.5, 
          ease: [0.4, 0.0, 0.2, 1],
          delay: 1.4
        }}
      >
        <Projects />
      </motion.div>
      
      {/* Contact with smooth fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 2.5, 
          ease: [0.4, 0.0, 0.2, 1],
          delay: 1.6
        }}
      >
        <Contact />
      </motion.div>
      
      {/* Footer with smooth fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 2.5, 
          ease: [0.4, 0.0, 0.2, 1],
          delay: 1.8
        }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  );
};

export default Index;
