import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Play, Filter, Zap, Shield, Brain } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "IntelliFlow AI Platform",
      category: "AI/ML",
      description: "Enterprise-grade fintech infrastructure with real-time fraud detection using ML+LLM APIs, achieving ~55ms p95 latency under 20 concurrent requests.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "ML", "LLMs", "Docker", "Kubernetes", "Terraform", "Prometheus", "Grafana", "Ollama", "Mistral"],
      features: [
        "Real-time fraud detection",
        "ML+LLM fraud API",
        "Containerized deployment",
        "Comprehensive monitoring"
      ],
      metrics: {
        performance: "414 RPS",
        latency: "~55ms p95",
        accuracy: "0 errors",
        concurrent: "20 req",
        system: "8-core/16GB"
      },
      links: {
        github: "https://github.com/GKR5413/intelliflow-ai-platform",
        live: "#",
        demo: "#"
      },
      status: "Production",
      icon: Brain
    }
  ];

  const categories = ["All", "AI/ML"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative solutions I've built, from high-performance fintech platforms 
            to AI-powered applications that solve real-world problems.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Filter className="h-4 w-4" />
            <span>Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {filteredProjects.map((project) => (
                          <Card key={project.id} className="group hover-lift shadow-lg overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                {/* Project Header with Enhanced Design */}
                <div className="relative h-52 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center mb-4 shadow-2xl mx-auto border border-primary/20 backdrop-blur-sm">
                        {(() => {
                          const IconComponent = project.icon;
                          return <IconComponent className="h-10 w-10 text-primary" />;
                        })()}
                      </div>
                      <p className="text-lg text-foreground font-semibold bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">{project.title}</p>
                    </div>
                  </div>
                  
                  {/* Enhanced Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={project.status === "Production" ? "default" : "secondary"}
                      className="shadow-lg bg-primary/90 text-white border-0 px-3 py-1"
                    >
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      {project.status}
                    </Badge>
                  </div>
                  
                  {/* Achievement Highlights */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-xs">
                      🚀 414 RPS
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                      ⚡ ~55ms
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                      🎯 0 Errors
                    </Badge>
                  </div>
                </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {project.category}
                      </Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        🏆 Production Ready
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <p className="text-foreground leading-relaxed text-lg font-medium">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Performance Metrics */}
                <div className="bg-surface-variant rounded-xl p-6 border border-border">
                  <h4 className="font-bold text-foreground mb-4 flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-primary" />
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-5 gap-4">
                    <div className="text-center p-3 bg-card rounded-lg border border-border shadow-sm" style={{minHeight: '80px', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box'}}>
                      <div className="text-xl font-bold text-primary mb-1">
                        {project.metrics.performance}
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold" style={{lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        RPS
                      </div>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg border border-border shadow-sm" style={{minHeight: '80px', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box'}}>
                      <div className="text-xl font-bold text-primary mb-1">
                        {project.metrics.latency}
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold" style={{lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        P95 Latency
                      </div>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg border border-border shadow-sm" style={{minHeight: '80px', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box'}}>
                      <div className="text-xl font-bold text-primary mb-1">
                        {project.metrics.accuracy}
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold" style={{lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        Error Rate
                      </div>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg border border-border shadow-sm" style={{minHeight: '80px', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box'}}>
                      <div className="text-xl font-bold text-primary mb-1">
                        {project.metrics.concurrent}
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold" style={{lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        Concurrent
                      </div>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg border border-border shadow-sm" style={{minHeight: '80px', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box'}}>
                      <div className="text-xl font-bold text-primary mb-1">
                        {project.metrics.system}
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold" style={{lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        System Specs
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Achievements */}
                {project.title.includes("IntelliFlow") && (
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 mb-6 border border-primary/20">
                    <h5 className="font-bold text-foreground mb-4 flex items-center gap-3 text-lg">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      🚀 Technical Achievements
                    </h5>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-foreground">Benchmarked ML+LLM fraud API</span>
                          <span className="text-muted-foreground"> to ~55ms p95 latency under 20 concurrent requests and sustained 414 RPS (0 errors) on an 8-core/16GB system</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-foreground">Deployed containerized services</span>
                          <span className="text-muted-foreground"> via Docker/Kubernetes with Terraform IaC, establishing comprehensive monitoring and alerting (Prometheus/Grafana)</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-foreground">Built real-time fraud detection platform</span>
                          <span className="text-muted-foreground"> with automated ML pipelines, integrating security best practices (JWT, rate limiting) and automated CI/CD workflows</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-foreground">Advanced fraud detection</span>
                          <span className="text-muted-foreground"> using Ollama-hosted Mistral LLMs for intelligent multi-factor verification, reducing false positives while maintaining real-time processing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2 hover:bg-primary hover:text-white transition-all duration-200 border-primary/30"
                    onClick={() => window.open(project.links.github, '_blank')}
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => window.open(project.links.demo, '_blank')}
                  >
                    <Play className="h-4 w-4" />
                    Explore Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-surface-container rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Interested in My Work?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I'm always working on new projects and exploring innovative technologies. 
              Let's connect and discuss how we can build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View All Projects
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
