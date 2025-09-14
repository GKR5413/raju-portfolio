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
    <>
      {/* Main Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ease-out",
        scrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-sm border-b border-gray-200/20 dark:border-gray-700/20" : "bg-transparent",
        shouldHide ? "opacity-0 pointer-events-none transform -translate-y-full" : "opacity-100 pointer-events-auto transform translate-y-0"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 hover:scale-105"
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

            {/* Mobile Actions - Right side */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                {mounted && theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={cn(
            "md:hidden transition-all duration-300 ease-out overflow-hidden w-full",
            isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          )}>
            <div className="px-2 pt-4 pb-4 space-y-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl mt-2 border border-gray-200/20 dark:border-gray-700/20 shadow-xl mx-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 w-full text-left border-l-2 border-transparent hover:border-blue-500"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-3">
                <Button
                  variant="outline"
                  size="default"
                  className="w-full gap-3 rounded-xl border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 py-3 text-base"
                  onClick={() => setResumeModalOpen(true)}
                >
                  <Eye className="h-5 w-5" />
                  View Resume
                </Button>
                <Button
                  variant="default"
                  size="default"
                  className="w-full gap-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 py-3 text-base"
                  onClick={() => window.open('mailto:raju.gottumukkala@gmail.com', '_blank')}
                >
                  <Mail className="h-5 w-5" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Theme Toggle - Shows when main nav is hidden */}
      <div className={cn(
        "fixed top-4 right-4 z-[160] transition-all duration-300 ease-out hidden md:block",
        shouldHide ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="w-12 h-12 rounded-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-gray-200/20 dark:border-gray-700/20 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-200 shadow-lg"
        >
          {mounted && theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
};

export default Navigation;