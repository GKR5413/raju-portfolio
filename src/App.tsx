import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import { motion } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import BreathingGradients from "./components/BreathingGradients";
import CursorAurora from "./components/CursorAurora";
import FloatingNavigation from "./components/FloatingNavigation";

const queryClient = new QueryClient();

// Custom Theme Context
const ThemeContext = createContext({
  theme: 'light',
  setTheme: (theme: 'light' | 'dark') => {},
});

export const useCustomTheme = () => useContext(ThemeContext);

const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Only reset scroll position on fresh page load (not navigation)
    const isInitialLoad = !sessionStorage.getItem('app_loaded');
    if (isInitialLoad) {
      sessionStorage.setItem('app_loaded', 'true');

      // Temporarily disable scroll restoration for initial load
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Ensure we start at the top of the page
      window.scrollTo(0, 0);

      // Re-enable scroll restoration after initial load
      const timer = setTimeout(() => {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'auto';
        }
        setIsInitialLoad(false);
      }, 1000);

      // Set a maximum loading time to prevent stuck loading
      const maxLoadingTime = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 3000); // Maximum 3 seconds loading

      return () => {
        clearTimeout(timer);
        clearTimeout(maxLoadingTime);
      };
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <TooltipProvider>
          <div className="min-h-screen text-foreground relative">
            <BreathingGradients />
            <Toaster />
            <Sonner />
            {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isLoading ? 0 : 1
              }}
              transition={{
                duration: 2.0,
                ease: [0.4, 0.0, 0.2, 1],
                delay: isLoading ? 0 : 0.3
              }}
              className="relative h-full"
            >
              <CursorAurora />
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
              <CursorAurora />
            </motion.div>
          </div>
        </TooltipProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;