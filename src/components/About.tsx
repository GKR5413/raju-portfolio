import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Database, Cloud, Brain, Shield, Users, GraduationCap, Award, Server, Layers, Zap, Eye } from "lucide-react";
import SkillBubbles from "./SkillBubbles";
import { sampleSkills } from "@/data/skills";
import { SkillMeter, technicalSkills, CircularProgress } from "./AnimatedProgress";

const About = () => {
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
    "Java", "Spring Boot", "Spring Cloud", "Spring Security", "Spring Data JPA", "Python", "JavaScript", "TypeScript", "React", "Node.js", "Vue", "Angular",
    "PostgreSQL", "MongoDB", "MySQL", "Redis", "DuckDB", "Apache Kafka", "Elasticsearch",
    "AWS (EKS, EC2, S3, Lambda, RDS)", "Azure", "Docker", "Kubernetes", "Terraform", "Helm",
    "Jenkins", "GitHub Actions", "GitLab CI/CD", "Git", "Maven", "Gradle",
    "Prometheus", "Grafana", "ELK Stack", "Jaeger",
    "JUnit", "Mockito", "Selenium", "Postman", "Swagger", "REST APIs", "GraphQL", "gRPC", "SOAP", "OAuth 2.0", "JWT Authentication",
    "nginx", "Memcached", "Tailwind CSS",
    "Machine Learning", "TensorFlow", "Scikit-learn", "Pandas", "NumPy", "Jupyter", "Google Gemini 3 Pro", "Claude 4.5", "Llama 3", "Ollama",
    "Monaco Editor", "IntelliJ IDEA", "Visual Studio Code",
    "Microservices", "API Gateway", "Circuit Breaker", "CQRS", "Event Sourcing", "Google Maps API"
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="group inline-block relative mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x bg-300%">
              About Me
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl group">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-in-out group-hover:scale-105"
                style={{
                  backgroundImage: 'url(/profile-2.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                role="img"
                aria-label="Kanakaraju Gottumukkala - Professional Headshot - Software Engineer specializing in Java, Fintech, and AI/ML"
              />
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Software engineer with 5 years of experience designing, building, and scaling enterprise-grade applications across fintech,
            payments, and consulting domains. Deliver high-availability backend systems, modern frontend interfaces, and cloud-native
            platforms supporting thousands of users and high-volume transactions. Strong expertise in Java, Spring Boot, React, Node.js,
            AWS, and Microservices, with hands-on experience automating CI/CD pipelines and improving system reliability.
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
                  With 5 years of hands-on experience in software development, I specialize in
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
                  Graduated with my Master's in Computer Science from the University of Missouri-Kansas City
                  (May 2025) with a 3.82 GPA, expanding my expertise in advanced algorithms, distributed systems,
                  and cloud computing architecture while continuing to build innovative solutions.
                </p>
              </div>
            </div>

            {/* Education Highlight */}
            <Card className="hover-lift border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-foreground">Education</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="font-medium text-foreground">MS in Computer Science (Aug 2023 - May 2025)</div>
                  <div>University of Missouri-Kansas City</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-xs">GPA: 3.82</span>
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

          {/* Skills with Animation */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Technical Expertise
            </h3>

            <SkillMeter skills={technicalSkills} />

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

        {/* Interactive Skills Bubbles */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Core Technologies
            </h3>
            <p className="text-muted-foreground">
              Hover over skills to see details and experience level
            </p>
          </div>
          <SkillBubbles skills={sampleSkills} className="min-h-[400px]" />
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