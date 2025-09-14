import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, Moon, Sun, Eye, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCustomTheme } from "@/App";
import ResumeModal from "./ResumeModal";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const { theme, setTheme } = useCustomTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShouldHide(scrollY > 300); // Hide when floating nav appears
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu
  };

  const navItems = [
    { name: "Home", sectionId: "home" },
    { name: "About", sectionId: "about" },
    { name: "Experience", sectionId: "experience" },
    { name: "Projects", sectionId: "projects" },
    { name: "Contact", sectionId: "contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ease-out",
      scrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-sm border-b border-gray-200/20 dark:border-gray-700/20" : "bg-transparent",
      shouldHide ? "opacity-0 pointer-events-none transform -translate-y-full" : "opacity-100 pointer-events-auto transform translate-y-0"
    )}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-3xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 hover:scale-105"
            >
              Raju.
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 relative group hover:bg-gray-100 dark:hover:bg-gray-800/50"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-200 rounded-full"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              {mounted && theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-lg border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
              onClick={() => setResumeModalOpen(true)}
            >
              <Eye className="h-4 w-4" />
              View Resume
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
              onClick={() => window.open('mailto:raju.gottumukkala@gmail.com', '_blank')}
            >
              <Mail className="h-4 w-4" />
              Contact
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-out overflow-hidden",
          isOpen ? "max-h-80 opacity-100 pb-4" : "max-h-0 opacity-0"
        )}>
          <div className="px-2 pt-4 pb-3 space-y-1 bg-white dark:bg-gray-900 rounded-2xl mt-2 border border-gray-200 dark:border-gray-700 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 w-full text-left"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2 rounded-lg border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
                onClick={() => setResumeModalOpen(true)}
              >
                <Eye className="h-4 w-4" />
                View Resume
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                onClick={() => window.open('mailto:raju.gottumukkala@gmail.com', '_blank')}
              >
                <Mail className="h-4 w-4" />
                Contact
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="w-full gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                {mounted && theme === 'dark' ? (
                  <>
                    <Sun className="h-4 w-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    Dark Mode
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal 
        isOpen={resumeModalOpen} 
        onClose={() => setResumeModalOpen(false)} 
      />
    </nav>
  );
};

export default Navigation;