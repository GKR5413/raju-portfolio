import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import { motion } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import SimpleBackground from "./components/SimpleBackground";
import AntigravityStars from './components/AntigravityStars';
import Cursor from "./components/Cursor";
import FloatingNavigation from "./components/FloatingNavigation";
import ThemeTransition from "./components/ThemeTransition";
import SEOHead from "./components/SEOHead";

const queryClient = new QueryClient();

// Custom Theme Context
const ThemeContext = createContext({
  theme: 'light',
  setTheme: (theme: 'light' | 'dark') => {},
  triggerThemeTransition: (x: number, y: number) => {},
});

export const useCustomTheme = () => useContext(ThemeContext);

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Simple loading timeout
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Increased loading time to allow full name animation

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    // Apply theme to document without transition animation
    if (!isTransitioning) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, isTransitioning]);

  const triggerThemeTransition = (x: number, y: number) => {
    setTransitionOrigin({ x, y });
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    // Emergency cleanup - remove any stuck transition elements
    const cleanup = () => {
      document.documentElement.classList.remove('light', 'dark', 'theme-transitioning');
      document.documentElement.classList.add(newTheme);
      const transitionStyles = document.querySelectorAll('style[data-theme-transition]');
      transitionStyles.forEach(style => style.remove());
      const themeRevealElements = document.querySelectorAll('.theme-reveal');
      themeRevealElements.forEach(el => el.remove());
    };

    cleanup();
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    setIsTransitioning(false);

    // Double cleanup after a delay
    setTimeout(cleanup, 100);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={{ theme, setTheme, triggerThemeTransition }}>
          <TooltipProvider>
            <SEOHead />
            <div className={`min-h-screen text-foreground relative ${isTransitioning ? 'theme-transitioning' : ''}`}>
              <SimpleBackground />
              <AntigravityStars />
              <Cursor />
              <Toaster />
              <Sonner />
              {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
              <div
                className="relative h-full"
                style={{
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.5s ease'
                }}
              >
              <main className="relative z-10">
                <HashRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/home" element={<Index />} />
                    <Route path="/about" element={<Index />} />
                    <Route path="/experience" element={<Index />} />
                    <Route path="/projects" element={<Index />} />
                    <Route path="/contact" element={<Index />} />
                    <Route path="/resume" element={<Index />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>

                  {/* Floating Navigation */}
                  <FloatingNavigation />
                </HashRouter>
              </main>
              {/* <CursorAurora /> */}
            </div>

            {/* Theme Transition Effect */}
            <ThemeTransition
              isTransitioning={isTransitioning}
              transitionOrigin={transitionOrigin}
              currentTheme={theme}
              newTheme={theme === 'dark' ? 'light' : 'dark'}
              onComplete={handleTransitionComplete}
            />
          </div>
        </TooltipProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;