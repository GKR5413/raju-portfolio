import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Database, Cloud, Brain, Shield, Users, GraduationCap, Award, Server, Layers, Zap, Eye } from "lucide-react";
import { useState, useEffect } from "react";

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({ img1: false, img2: false });

  // Auto-switch images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Check if any images are loaded
  const hasImages = imagesLoaded.img1 || imagesLoaded.img2;
  const skills = [
    { name: "Java & Spring Boot", level: 95, icon: Code },
    { name: "Microservices & Cloud", level: 90, icon: Cloud },
    { name: "Database & Messaging", level: 85, icon: Database },
    { name: "AI/ML & LLMs", level: 80, icon: Brain },
    { name: "DevOps & CI/CD", level: 90, icon: Shield },
    { name: "Frontend Development", level: 80, icon: Users },
    { name: "Python & Data Science", level: 85, icon: Server },
    { name: "Kubernetes & Docker", level: 88, icon: Layers },
    { name: "AWS & Cloud Infrastructure", level: 85, icon: Cloud },
    { name: "API Design & REST", level: 90, icon: Code },
    { name: "Performance Optimization", level: 87, icon: Zap },
    { name: "Monitoring & Observability", level: 83, icon: Eye },
  ];

  const technologies = [
    "Java", "Spring Boot", "Spring Cloud", "Spring Security", "Spring Data JPA", "Python", "JavaScript", "TypeScript", "React", "Node.js", "Express.js",
    "PostgreSQL", "MongoDB", "MySQL", "Redis", "Apache Kafka", "RabbitMQ", "Elasticsearch", "InfluxDB", "Cassandra",
    "AWS (EKS, EC2, S3, Lambda, RDS, CloudFormation, IAM, VPC)", "Azure", "Google Cloud Platform", "Docker", "Kubernetes", "Terraform", "Helm", "Istio",
    "Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD", "Linux", "Nginx", "Apache", "Ansible", "Puppet", "Chef", "Git", "Maven", "Gradle", "SonarQube",
    "Prometheus", "Grafana", "ELK Stack", "Jaeger", "Zipkin", "HashiCorp Vault", "Consul", "Nomad", "OpenTelemetry", "Splunk", "Datadog",
    "JUnit", "Mockito", "TestNG", "Cucumber", "Selenium", "Postman", "Swagger", "OpenAPI", "GraphQL", "gRPC", "WebSocket", "REST APIs",
    "Machine Learning", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Jupyter", "MLflow", "Kubeflow", "Apache Spark", "Hadoop",
    "Microservices", "Service Mesh", "API Gateway", "Load Balancing", "Circuit Breaker", "Retry Patterns", "CQRS", "Event Sourcing", "Saga Pattern"
  ];

  const highlights = [
    {
      title: "Enterprise Scale",
      description: "Built systems serving 10,000+ global merchants",
      metric: "10K+ Merchants"
    },
    {
      title: "Performance Optimization",
      description: "Improved API response times by 25%",
      metric: "25% Faster"
    },
    {
      title: "Deployment Efficiency",
      description: "Reduced release cycles by 50%",
      metric: "50% Faster"
    },
    {
      title: "AI Innovation",
      description: "Built VelocIDE supporting 20+ concurrent users",
      metric: "5ms Response"
    }
  ];

  return (
    <section id="about" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="group inline-block relative mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x bg-300%">
              About Me
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Animated Profile Picture Switcher */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl group">
              {/* Loading Indicator */}
              {!hasImages && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
              <div className="relative w-full h-full">
                {/* First Profile Picture */}
                <img
                  src="/profile-1.jpg"
                  alt="Raju Gottumukkala - Professional Headshot 1"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                    currentImage === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                  }`}
                  onLoad={() => setImagesLoaded(prev => ({ ...prev, img1: true }))}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    setImagesLoaded(prev => ({ ...prev, img1: false }));
                  }}
                />
                {/* Second Profile Picture */}
                <img
                  src="/profile-2.jpg"
                  alt="Raju Gottumukkala - Professional Headshot 2"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                    currentImage === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                  }`}
                  onLoad={() => setImagesLoaded(prev => ({ ...prev, img2: true }))}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    setImagesLoaded(prev => ({ ...prev, img2: false }));
                  }}
                />
                
                {/* Fallback Avatar if images don't load */}
                {!hasImages && (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary">RG</div>
                  </div>
                )}
              </div>
              
              {/* Animated Border Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 animate-spin-slow opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Software engineer with 4+ years of experience developing and deploying scalable fintech solutions and AI platforms. 
            Expertise includes cloud-native deployment (AWS, Docker, Kubernetes, Terraform), CI/CD automation, and secure API integrations, 
            leading to increased API response times by 25% and cutting release cycles in half. Led the construction of a web IDE integrating 
            Gemini, Claude, and Llama 3 models, which can handle concurrent loads response times.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Personal Story */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                My Journey
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over 4 years of hands-on experience in software development, I specialize in 
                  creating robust, scalable fintech solutions and AI platforms using Java, Spring Boot, 
                  and cloud-native technologies. My passion lies in solving complex problems and building 
                  systems that can handle real-world scale.
                </p>
                <p>
                  I've had the privilege of working on enterprise fintech platforms where precision, security, 
                  and performance are paramount. From implementing secure payment processing systems 
                  to building AI-powered code editors and fraud detection platforms, I enjoy the challenge 
                  of building software that makes a meaningful impact.
                </p>
                <p>
                  Currently pursuing my Master's in Computer Science at the University of Missouri-Kansas City 
                  with a 3.82 GPA, I'm expanding my expertise in advanced algorithms, distributed systems, 
                  and cloud computing architecture while continuing to build innovative solutions.
                </p>
              </div>
            </div>

            {/* Education Highlight */}
            <Card className="hover-lift border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">Current Education</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium text-foreground">MS in Computer Science</div>
                  <div>University of Missouri-Kansas City</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-xs">Dean's International Scholar - $16,000 scholarship</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {highlights.map((highlight, index) => (
                <Card key={index} className="group hover-lift relative overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-3 sm:p-4 relative z-10">
                    <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                      {highlight.metric}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-foreground mb-1">
                      {highlight.title}
                    </div>
                    <div className="text-xs text-muted-foreground leading-tight">
                      {highlight.description}
                    </div>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Technical Expertise
            </h3>
            
            <div className="space-y-6">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground ml-auto">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                );
              })}
            </div>

            {/* Specialized Skills */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-foreground mb-4">Specialized Areas</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Brain className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">GenAI & LLMs, Prompt Engineering, AI Model Integration, Machine Learning Pipelines</span>
                </div>
                <div className="flex items-start gap-3">
                  <Cloud className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Cloud-Native Architecture, Kubernetes, Infrastructure as Code, Multi-Cloud Strategy</span>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">Security Best Practices, OAuth, JWT, Rate Limiting, Zero-Trust Architecture</span>
                </div>
                <div className="flex items-start gap-3">
                  <Database className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">High-Performance Databases, Data Modeling, Caching Strategies, Event Streaming</span>
                </div>
                <div className="flex items-start gap-3">
                  <Code className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">API Design, Microservices Patterns, Performance Optimization, Scalable Architecture</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">DevOps Culture, CI/CD Automation, Monitoring & Observability, Site Reliability Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium hover-lift"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;