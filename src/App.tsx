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
import BreathingGradients from "./components/BreathingGradients";
import CursorAurora from "./components/CursorAurora";
import FloatingNavigation from "./components/FloatingNavigation";
import SEOHead from "./components/SEOHead";

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

  useEffect(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Simple loading timeout
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Increased loading time to accommodate longer animation

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <TooltipProvider>
            <SEOHead />
            <div className="min-h-screen text-foreground relative">
              <BreathingGradients />
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
              <CursorAurora />
            </div>
          </div>
        </TooltipProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;