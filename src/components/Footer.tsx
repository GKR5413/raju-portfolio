import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Github, Linkedin, Mail, ArrowUp, Globe, Instagram, Twitter, Music } from "lucide-react";

// Custom Spotify Icon Component
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.301.3-3.659-2.24-9.239-2.76-13.56-1.5-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.6 10.561 19.8 13.08c.361.181.54.78.161 1.08zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

// Custom Apple Music Icon Component
const AppleMusicIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

// Custom Facebook Icon Component
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/gkr5413" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/gkr5413/" },
    { name: "Email", icon: Mail, href: "mailto:gottumukkala.kanakaraju@gmail.com" },
    { name: "Website", icon: Globe, href: "https://rajugottumukkala.in" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/raju_gottumukkala" },
    { name: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/gkr5413/" },
    { name: "Twitter", icon: Twitter, href: "https://x.com/Raju_twt_" },
    { name: "Apple Music", icon: AppleMusicIcon, href: "https://music.apple.com/profile/spider_myan" },
    { name: "Spotify", icon: SpotifyIcon, href: "https://open.spotify.com/user/lua65lienskjcpvmvaaa3444b?si=G6c6m5f6SCOeMEpH0EAlBg" },
  ];

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Raju Gottumukkala
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Software Engineer passionate about building scalable microservices, 
                  fintech solutions, and AI-powered applications. Always eager to tackle 
                  new challenges and create innovative solutions.
                </p>
              </div>
              
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Button
                      key={social.name}
                      variant="ghost"
                      size="icon"
                      asChild
                      className="rounded-full hover-lift"
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Get In Touch</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Kansas City, MO</p>
                <p>gottumukkala.kanakaraju@gmail.com</p>
                <p>Available for opportunities</p>
              </div>
              
              <div className="mt-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-foreground">
                    Open to work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Section */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Raju Gottumukkala. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>and lots of coffee.</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="gap-2 rounded-full"
          >
            <ArrowUp className="h-4 w-4" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;