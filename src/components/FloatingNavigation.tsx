import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Code, Mail, ChevronUp, Moon, Sun } from 'lucide-react';
import { useCustomTheme } from '@/App';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  section: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, section: 'home' },
  { id: 'about', label: 'About', icon: User, section: 'about' },
  { id: 'experience', label: 'Experience', icon: Briefcase, section: 'experience' },
  { id: 'projects', label: 'Projects', icon: Code, section: 'projects' },
  { id: 'contact', label: 'Contact', icon: Mail, section: 'contact' },
];

const FloatingNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const { theme, setTheme } = useCustomTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // iOS Liquid Glass effects with live refraction and mouse tracking
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .perspective-container {
        perspective: 1000px;
      }

      /* iOS Style Liquid Glass - Ultra Clear with Micro Frost */
      .ios-liquid-glass {
        position: relative;
        overflow: hidden;
        border-radius: 9999px;
        /* Very light blur for subtle glass effect */
        -webkit-backdrop-filter: blur(1.5px) saturate(150%) brightness(110%);
        backdrop-filter: blur(1.5px) saturate(150%) brightness(110%);
      }

      /* Dark Theme Styles - Ultra transparent */
      .dark .ios-liquid-glass {
        background-color: rgba(24, 24, 27, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.12),
          inset 0 -1px 2px 0 rgba(0, 0, 0, 0.08),
          0 15px 30px rgba(0, 0, 0, 0.2);
      }

      /* Light Theme Styles - Ultra transparent */
      .light .ios-liquid-glass {
        background-color: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(0, 0, 0, 0.03);
        box-shadow:
          inset 0 1px 1px 0 rgba(255, 255, 255, 0.3),
          inset 0 -1px 2px 0 rgba(0, 0, 0, 0.03),
          0 15px 30px rgba(0, 0, 0, 0.08);
      }

      /* Live Glossy Sheen (Highlight that follows the mouse) */
      .ios-liquid-glass::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        border-radius: 9999px;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
      }

      .dark .ios-liquid-glass::before {
        background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.2), transparent 50%);
      }

      .light .ios-liquid-glass::before {
        background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.4), transparent 50%);
      }

      .ios-liquid-glass:hover::before {
        opacity: 1;
      }

      /* Active pill indicator */
      .active-pill {
        position: absolute;
        top: 8px;
        height: 56px;
        border-radius: 9999px;
        z-index: 0;
        transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      .dark .active-pill {
        background-color: rgba(255, 255, 255, 0.04);
        box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.08);
      }

      .light .active-pill {
        background-color: rgba(255, 255, 255, 0.1);
        box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.2);
      }

      /* Button styles */
      .nav-button {
        position: relative;
        z-index: 1;
        transition:
          transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1),
          color 0.3s ease;
        width: 4rem;
        height: 3.5rem;
        border-radius: 9999px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        cursor: pointer;
      }

      /* Dark theme button colors */
      .dark .nav-button {
        color: rgba(255, 255, 255, 0.7);
      }

      .dark .nav-button.active {
        color: white;
      }

      /* Light theme button colors */
      .light .nav-button {
        color: rgba(0, 0, 0, 0.6);
      }

      .light .nav-button.active {
        color: rgba(0, 0, 0, 0.9);
      }

      /* Illumination effect on click */
      .nav-button .illumination {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        border-radius: 9999px;
        opacity: 0;
        transition: opacity 0.5s;
        pointer-events: none;
      }

      .dark .nav-button .illumination {
        background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.3), transparent 40%);
      }

      .light .nav-button .illumination {
        background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.6), transparent 40%);
      }

      .nav-button:active .illumination {
        opacity: 1;
        transition: opacity 0s;
      }

      /* 3D Hover effect */
      .ios-liquid-glass-container {
        transition: transform 0.1s ease-out;
        transform-style: preserve-3d;
        will-change: transform;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // 3D Parallax and Live Sheen Effect (from reference)
  useEffect(() => {
    const nav = document.getElementById('liquid-nav');
    const pill = document.getElementById('active-pill');
    const buttons = nav?.querySelectorAll('.nav-button');

    if (!nav || !pill || !buttons) return;

    let currentActive = buttons[0] as HTMLElement;

    // Function to move the pill
    const movePill = (targetButton: HTMLElement) => {
      const targetIndex = parseInt(targetButton.dataset.index || '0');
      pill.style.width = `${targetButton.offsetWidth}px`;
      pill.style.left = `${targetButton.offsetLeft}px`;
      currentActive = targetButton;

      // Update text colors
      buttons.forEach((btn, index) => {
        const button = btn as HTMLElement;
        if (button === targetButton) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    };

    // Set initial pill position
    setTimeout(() => {
      const activeButton = Array.from(buttons).find(btn =>
        (btn as HTMLElement).dataset.section === activeSection
      ) as HTMLElement || currentActive;
      movePill(activeButton);
    }, 100);

    // Mouse tracking and tilt effects
    const tiltFactor = 0.4;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set mouse position for the glossy sheen
      nav.style.setProperty('--mouse-x', `${x}px`);
      nav.style.setProperty('--mouse-y', `${y}px`);

      // 3D tilt calculation
      const rotateX = (y - rect.height / 2) * -1 * tiltFactor / 10;
      const rotateY = (x - rect.width / 2) * tiltFactor / 10;
      nav.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      nav.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      // Return pill to active section
      const activeButton = Array.from(buttons).find(btn =>
        (btn as HTMLElement).dataset.section === activeSection
      ) as HTMLElement || currentActive;
      movePill(activeButton);
    };

    const handleButtonHover = (e: Event) => {
      const button = e.currentTarget as HTMLElement;
      movePill(button);
    };

    const handleButtonClick = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLElement;
      const section = button.dataset.section;

      if (section) {
        // Immediately update active section and move pill
        setActiveSection(section);
        movePill(button);
      }

      // Handle illumination effect
      const illumination = button.querySelector('.illumination') as HTMLElement;
      if (illumination) {
        const rect = illumination.getBoundingClientRect();
        illumination.style.setProperty('--x', e.clientX - rect.left + 'px');
        illumination.style.setProperty('--y', e.clientY - rect.top + 'px');
      }
    };

    nav.addEventListener('mousemove', handleMouseMove);
    nav.addEventListener('mouseleave', handleMouseLeave);

    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleButtonHover);
      button.addEventListener('click', handleButtonClick);
      button.addEventListener('mousedown', handleButtonClick);
    });

    return () => {
      nav.removeEventListener('mousemove', handleMouseMove);
      nav.removeEventListener('mouseleave', handleMouseLeave);
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleButtonHover);
        button.removeEventListener('click', handleButtonClick);
        button.removeEventListener('mousedown', handleButtonClick);
      });
    };
  }, [activeSection]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show floating nav after scrolling 300px
      setIsVisible(scrollY > 300);

      // Calculate scroll progress
      const progress = (scrollY / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Simple, stable section detection
      const sections = navItems.map(item => item.section);
      let currentSection = activeSection; // Start with current to avoid unnecessary changes

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;
          const elementBottom = rect.bottom;

          // Check if section is prominently in view (large threshold for stability)
          if (elementTop <= windowHeight * 0.4 && elementBottom >= windowHeight * 0.6) {
            currentSection = section;
            break;
          }
        }
      }

      // Only update if there's a real change and we're not programmatically scrolling
      if (currentSection !== activeSection && !isScrolling) {
        setActiveSection(currentSection);
        setPendingSection(null);
      }

      ticking = false;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollState(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, isScrolling, pendingSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Set scrolling state to prevent automatic section switching
      setIsScrolling(true);
      setPendingSection(null);

      // Immediately update active section for visual feedback
      setActiveSection(sectionId);

      // Custom smooth scrolling with consistent speed
      const targetPosition = element.offsetTop - 80; // Offset for fixed header
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 800; // Fixed duration for consistent speed
      let start: number | null = null;

      function animation(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Linear easing for constant speed throughout
        const ease = progress;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          // Clear scrolling state after animation completes
          setTimeout(() => {
            setIsScrolling(false);
          }, 100);
        }
      }

      requestAnimationFrame(animation);
    }
  };

  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const duration = 800; // Fixed duration for consistent speed
    let start: number | null = null;

    function animation(currentTime: number) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      // Linear easing for constant speed throughout
      const ease = progress;

      window.scrollTo(0, startPosition * (1 - ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  };

  return (
    <>
      {/* Main Floating Navigation - iOS Liquid Glass Style */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="fixed bottom-4 sm:bottom-8 left-0 right-0 z-50 flex justify-center px-4 sm:px-0"
          >
            <nav
              id="liquid-nav"
              className="ios-liquid-glass ios-liquid-glass-container flex items-center justify-center gap-2 p-2"
            >
              {/* Active pill indicator */}
              <div id="active-pill" className="active-pill"></div>

              {/* Navigation buttons */}
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.section;

                return (
                  <div
                    key={item.id}
                    className={`nav-button ${isActive ? 'active' : ''}`}
                    data-index={index}
                    data-section={item.section}
                    onClick={() => scrollToSection(item.section)}
                  >
                    {/* Click illumination effect */}
                    <div className="illumination"></div>

                    {/* Icon */}
                    <Icon size={20} className="mb-1" />

                    {/* Label */}
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Theme Toggle Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 20 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: 0.2
            }}
            className="fixed bottom-4 sm:bottom-8 right-4 sm:right-6 z-50 md:hidden"
          >
            <button
              className="ios-liquid-glass ios-liquid-glass-container w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-white" strokeWidth={1.5} />
              ) : (
                <Moon size={20} className="text-gray-800" strokeWidth={1.5} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Progress Indicator */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="w-1 h-32 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-full"
            initial={{ height: 0 }}
            animate={{ height: `${scrollProgress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>
      </div>
    </>
  );
};

export default FloatingNavigation;