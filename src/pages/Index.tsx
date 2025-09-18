import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import ContactGitHub from "@/components/ContactGitHub";
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

    // Only handle specific routes, don't interfere with default behavior
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
        // Do nothing for default route - let normal scrolling work
        break;
    }
  }, [location]);

  return (
    <div className="min-h-screen text-foreground">
      {/* Navigation - Always visible */}
      <Navigation />

      {/* Hero */}
      <Hero />

      {/* About */}
      <About />

      {/* Experience */}
      <Experience />

      {/* Projects */}
      <Projects />

      {/* Contact */}
      <ContactGitHub />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
