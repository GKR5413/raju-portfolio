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
      title: "VelocIDE - AI-Based Code Editor",
      category: "AI/ML",
      description: "Built production-ready web IDE integrating Google Gemini 3 Pro, Claude 4.5 Sonnet, and Llama 3 models with autonomous file management where LLMs create, delete, and modify entire codebases with 5ms response.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "TypeScript", "Monaco Editor", "Docker", "gRPC", "OAuth 2.0", "JWT", "Google Gemini 3 Pro", "Claude 4.5 Sonnet", "Llama 3"],
      features: [
        "Multi-model AI integration",
        "Autonomous file management",
        "Multi-tab interface",
        "gRPC powered terminals"
      ],
      metrics: {
        performance: "20+ users",
        latency: "5ms",
        accuracy: "Sub-10ms",
        concurrent: "20+ users",
        system: "6 services"
      },
      links: {
        github: "https://github.com/GKR5413/AI-Code-Editor",
        live: "#",
        demo: "#"
      },
      status: "Production",
      icon: Brain
    },
    {
      id: 2,
      title: "IntelliFlow AI Platform",
      category: "Fintech",
      description: "Designed a fraud detection API with ML + LLM integration, sustaining ~55ms p95 latency at 414 requests per second (RPS) with zero errors on 8-core/16GB infra.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "ML", "LLMs", "Docker", "Kubernetes", "Terraform", "Prometheus", "Grafana", "Ollama", "Mistral"],
      features: [
        "Real-time fraud detection",
        "ML+LLM integration",
        "Containerized deployment",
        "Automated ML pipelines"
      ],
      metrics: {
        performance: "414 RPS",
        latency: "~55ms p95",
        accuracy: "0 errors",
        concurrent: "20+ req",
        system: "8-core/16GB"
      },
      links: {
        github: "https://github.com/GKR5413/intelliflow-ai-platform",
        live: "#",
        demo: "#"
      },
      status: "Production",
      icon: Shield
    }
  ];

  const categories = ["All", "AI/ML", "Fintech"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="group inline-block relative mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x bg-300%">
              Featured Projects
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
                className={`rounded-full transition-all duration-300 hover:scale-105 ${
                  activeFilter === category 
                    ? "shadow-lg shadow-primary/25 bg-gradient-to-r from-primary to-accent" 
                    : "hover:border-primary/50 hover:shadow-md"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project) => (
                          <Card key={project.id} className="group hover-lift shadow-lg overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                {/* Project Header with Enhanced Design */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-3 shadow-2xl mx-auto border border-primary/20 backdrop-blur-sm">
                        {(() => {
                          const IconComponent = project.icon;
                          return <IconComponent className="h-8 w-8 text-primary" />;
                        })()}
                      </div>
                      <p className="text-base text-foreground font-semibold bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">{project.title}</p>
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
                      🚀 {project.metrics.performance}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                      ⚡ {project.metrics.latency}
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                      🎯 {project.metrics.accuracy}
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
                
                <p className="text-foreground leading-relaxed text-base">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="text-center p-3 bg-card rounded-lg border border-border shadow-sm min-h-[80px] flex flex-col justify-center items-center">
                      <div className="text-xl font-bold text-primary mb-1">
                        {project.metrics.performance}
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold leading-tight text-center">
                        RPS
                      </div>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg border border-border shadow-sm min-h-[80px] flex flex-col justify-center items-center">
                      <div className="text-xl font-bold text-primary mb-1">
                        {project.metrics.latency}
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold leading-tight text-center">
                        P95 Latency
                      </div>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg border border-border shadow-sm min-h-[80px] flex flex-col justify-center items-center">
                      <div className="text-xl font-bold text-primary mb-1">
                        {project.metrics.accuracy}
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold leading-tight text-center">
                        Error Rate
                      </div>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg border border-border shadow-sm min-h-[80px] flex flex-col justify-center items-center">
                      <div className="text-xl font-bold text-primary mb-1">
                        {project.metrics.concurrent}
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold leading-tight text-center">
                        Concurrent
                      </div>
                    </div>
                    <div className="text-center p-3 bg-card rounded-lg border border-border shadow-sm min-h-[80px] flex flex-col justify-center items-center">
                      <div className="text-xl font-bold text-primary mb-1">
                        {project.metrics.system}
                      </div>
                      <div className="text-sm text-muted-foreground font-semibold leading-tight text-center">
                        System Specs
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Achievements */}
                {project.title.includes("VelocIDE") && (
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
                          <span className="font-semibold text-foreground">Prepared 6-service Docker microservices architecture</span>
                          <span className="text-muted-foreground"> achieving sub-10ms response times (Auth: 6ms, AI Agent: 5ms, Compiler: 13ms) with 1ms file reads and 8ms writes for real-time workspace synchronization</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-foreground">Built production-ready web IDE with autonomous file management</span>
                          <span className="text-muted-foreground"> where LLMs create, delete, and modify entire codebases with 5ms response</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-foreground">Architected OAuth 2.0/JWT authentication</span>
                          <span className="text-muted-foreground"> supporting 20+ concurrent users with 6ms response times, 50MB memory footprint per service, and automated cleanup with rate limiting</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                          <span className="font-semibold text-foreground">Deployed containerized services on Docker + Kubernetes with Terraform IaC</span>
                          <span className="text-muted-foreground"> standardizing 100% of deployments and reducing environment drift to 0%</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-foreground">Built automated ML pipelines covering feature engineering, retraining, and deployment</span>
                          <span className="text-muted-foreground"> cutting manual intervention by 80% and release cycles by 40%</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-foreground">Integrated Mistral LLMs for intelligent verification</span>
                          <span className="text-muted-foreground"> improving fraud detection accuracy by 15% while reducing false positives by 20%</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-card/50 rounded-lg border border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-foreground">Monitored systems with Prometheus + Grafana</span>
                          <span className="text-muted-foreground"> sustaining sub-100ms latency across all mission-critical APIs under continuous load</span>
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
                    className="w-full gap-2 hover:bg-primary hover:text-white transition-all duration-200 border-primary/30"
                    onClick={() => window.open(project.links.github, '_blank')}
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <h3 className="text-2xl font-bold mb-4">
              Interested in My Work?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              I'm always working on new projects and exploring innovative technologies.
              Let's connect and discuss how we can build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="gap-2">
                <Github className="h-5 w-5" />
                View All Projects
              </Button>
              <Button variant="outline" size="lg" className="gap-2 border-white text-white hover:bg-white/10">
                Get In Touch
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;
