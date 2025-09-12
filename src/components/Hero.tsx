import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh animate-mesh-move opacity-40" />
      
      {/* Simplified Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-primary rounded-full blur-3xl animate-float-slow opacity-20"
          style={{
            left: `${15 + mousePosition.x * 0.05}%`,
            top: `${10 + mousePosition.y * 0.05}%`,
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-accent rounded-full blur-3xl animate-float-slow opacity-15"
          style={{
            right: `${10 + mousePosition.x * 0.03}%`,
            bottom: `${15 + mousePosition.y * 0.03}%`,
            animationDelay: '-10s'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-center">
        {/* Greeting */}
        <div className="animate-fade-up mb-6" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-3 bg-surface/60 backdrop-blur-sm border border-surface-variant/30 rounded-full px-6 py-3">
            <span className="text-2xl">👋</span>
            <p className="text-primary font-medium text-lg tracking-wide">
              Hello, I'm
            </p>
          </div>
        </div>

        {/* Name */}
        <div className="animate-fade-up mb-6 sm:mb-8" style={{ animationDelay: '0.4s' }}>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Kanakaraju
            </span>
            <br />
            <span className="text-foreground/80">
              Gottumukkala
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Software Engineer with 4+ years developing{" "}
            <span className="text-primary font-semibold">Scalable Fintech Solutions</span>,{" "}
            <span className="text-accent font-semibold">AI Platforms</span>, and{" "}
            <span className="text-secondary font-semibold">Cloud-Native Applications</span>
          </p>
        </div>

        {/* Stats */}
        <div className="animate-fade-up grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10" style={{ animationDelay: '0.8s' }}>
          <div className="text-center p-3 sm:p-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-1">4+</div>
            <div className="text-xs sm:text-sm text-muted-foreground leading-tight">Years Experience</div>
          </div>
          <div className="text-center p-3 sm:p-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-1">10K+</div>
            <div className="text-xs sm:text-sm text-muted-foreground leading-tight">Merchants Served</div>
          </div>
          <div className="text-center p-3 sm:p-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-1">414</div>
            <div className="text-xs sm:text-sm text-muted-foreground leading-tight">RPS Performance</div>
          </div>
          <div className="text-center p-3 sm:p-0">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-1">3.82</div>
            <div className="text-xs sm:text-sm text-muted-foreground leading-tight">GPA at UMKC</div>
          </div>
        </div>

        {/* Location */}
        <div className="animate-fade-up" style={{ animationDelay: '1.0s' }}>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <MapPin className="h-4 w-4" />
            <span>Kansas City, MO</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{ animationDelay: '1.2s' }}>
          <Button 
            variant="hero" 
            size="lg" 
            className="gap-2"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="h-5 w-5" />
            Get In Touch
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2 border-surface-variant/50 hover:bg-surface-variant/20"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </Button>
        </div>

        {/* Social Links */}
        <div className="animate-fade-up flex justify-center gap-6 mb-12" style={{ animationDelay: '1.4s' }}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover-lift"
            onClick={() => window.open('https://github.com/gkr5413', '_blank')}
          >
            <Github className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover-lift"
            onClick={() => window.open('https://linkedin.com/in/gkr5413/', '_blank')}
          >
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover-lift"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="h-5 w-5" />
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-up" style={{ animationDelay: '1.6s' }}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Scroll to explore
            </span>
            <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;