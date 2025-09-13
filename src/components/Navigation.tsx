


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
  const { theme, setTheme } = useCustomTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      "fixed top-0 left-0 right-0 z-[150] transition-all duration-500 ease-out",
      "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
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
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group hover:bg-gray-100 dark:hover:bg-gray-800/50"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 rounded-full"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-xl border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-105"
              onClick={() => setResumeModalOpen(true)}
            >
              <Eye className="h-4 w-4" />
              Resume
            </Button>
            <Button 
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="sm"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="h-4 w-4" />
              Get In Touch
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-500 ease-out overflow-hidden",
          isOpen ? "max-h-80 opacity-100 pb-4" : "max-h-0 opacity-0"
        )}>
          <div className="px-2 pt-4 pb-3 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl mt-2 border border-gray-200/30 dark:border-gray-700/30 shadow-xl">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 w-full text-left"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-200/30 dark:border-gray-700/30 space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2 rounded-xl border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
                onClick={() => setResumeModalOpen(true)}
              >
                <Eye className="h-4 w-4" />
                View Resume
              </Button>
              <Button 
                className="w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                size="sm"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="h-4 w-4" />
                Get In Touch
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