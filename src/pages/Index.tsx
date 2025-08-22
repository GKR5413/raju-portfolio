import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
