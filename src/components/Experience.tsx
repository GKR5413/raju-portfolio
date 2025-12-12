import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, TrendingUp, Code2 } from "lucide-react";
import { AchievementCard, achievements } from "./AnimatedProgress";

const Experience = () => {
  const experiences = [
    {
      company: "DXC Technology",
      logo: "/logos/dxc-technology.png",
      position: "Software Engineer",
      location: "Plano, TX",
      duration: "May 2025 - present",
      type: "Full-time",
      description: "Delivered a workflow management platform with Spring Boot, Node.js, and React, deployed via AWS Elastic Beanstalk and RDS, which accelerated team project.",
      achievements: [
        "Automated subscription workflows through Stripe webhooks, removing 40% of manual tasks and cutting customer support resolution time by 25%",
        "Increased transaction success rate by 5% through refined Stripe API flows, reducing charge failures and saving the business $5K monthly",
        "Coordinated with product managers and QA under Agile sprints, ensuring 100% on-time feature releases aligned with stakeholder expectations",
        "Expanded test coverage from 55% to 80% by implementing JUnit, Mockito, and Jest test suites, lowering production issues by 30%",
        "Containerized services using Docker and streamlined deployments with CI/CD pipelines in GitHub Actions, reducing deployment time from 30 minutes to under 10 minutes"
      ],
      technologies: ["Java", "Spring Boot", "Node.js", "React", "AWS Elastic Beanstalk", "AWS RDS", "Stripe API", "Docker", "GitHub Actions", "JUnit", "Mockito", "Jest"],
      impact: {
        metric: "40%",
        description: "Manual Task Reduction"
      }
    },
    {
      company: "Fidelity National Information Services (FIS Global)",
      logo: "/logos/fis-global.png",
      position: "Software Engineer",
      location: "India",
      duration: "Jun 2022 - Jul 2023",
      type: "Full-time",
      description: "Designed and scaled merchant payment modules supporting 10,000+ global merchants, embedding fault-tolerant error handling and proactive monitoring to maintain 99.99% uptime during peak load.",
      achievements: [
        "Implemented 20+ Spring Boot microservices with efficient database queries and caching layers, cutting API latency by 25% and handling 30% YoY growth without system strain",
        "Orchestrated deployment pipelines with Jenkins, Docker, AWS CodePipeline, Terraform, compressing release cycles to 3 days and enabling 50% faster go-lives with safe rollbacks",
        "Introduced 15+ modular React/Material-UI components with lazy loading and smarter state handling, driving a 25% boost in frontend performance and smoother merchant onboarding",
        "Guided and coached 4 junior engineers via pair programming, reviews, and mentoring sessions, accelerating their ramp-up and improving team throughput by 30%",
        "Expanded automated testing with JUnit, Mockito, Selenium, raising test coverage from 55% → 85%, cutting post-release defects by 40%, and strengthening compliance"
      ],
      technologies: ["Java", "Spring Boot", "React", "Material-UI", "Jenkins", "Docker", "AWS", "PostgreSQL", "Redis", "Terraform"],
      impact: {
        metric: "25%",
        description: "Performance Improvement"
      }
    },
    {
      company: "L&T Finance Limited",
      logo: "/logos/lt-finance.png",
      position: "Software Developer",
      location: "India",
      duration: "Oct 2020 - Jun 2022",
      type: "Full-time",
      description: "Delivered full-stack loan management/payment modules using Spring Boot, Java, React, and PostgreSQL for 50,000+ active customers, ensuring frictionless transactions.",
      achievements: [
        "Published and tuned REST APIs with auth + rate limiting, trimming API response times by 30% and strengthening security posture",
        "Built 15+ React components with Redux state flows, standardizing UI patterns and trimming dev effort by 25%",
        "Deployed automated CI/CD pipelines (Jenkins + Docker), shrinking release cycles from 2 weeks → 1 week and enabling zero-downtime rollouts",
        "Integrated with payment gateways and credit bureaus to deliver real-time loan approvals and verifications, accelerating customer decisioning",
        "Refactored SQL queries and applied caching, shrinking reporting runtime from 10s+ to <3s, boosting analyst output"
      ],
      technologies: ["Java", "Spring Boot", "React", "Redux", "PostgreSQL", "Jenkins", "Docker", "REST APIs"],
      impact: {
        metric: "30%",
        description: "API Performance"
      }
    },
    {
      company: "KPMG",
      logo: "/logos/kpmg.png",
      position: "Jr. Software Developer",
      location: "India",
      duration: "Apr 2019 - Sep 2020",
      type: "Full-time",
      description: "Contributed to internal audit & compliance applications built on Java, Spring Boot, Angular, and MySQL, serving over 5,000 users across multiple business units.",
      achievements: [
        "Delivered 10+ secure APIs with validation and logging, enhancing data reliability and reducing integration issues by 15%",
        "Applied RBAC and security patches, adhering to ISO 27001 + GDPR standards",
        "Tuned SQL queries and backend logic, reducing report generation time from 12 seconds to 4 seconds, providing faster access to insights for auditors",
        "Helped migrate Excel/VBA workflows into dashboards, cutting manual reporting by 40%",
        "Developed 5+ Angular components for dashboards and forms, unifying UI design and reducing front-end defects by 20%"
      ],
      technologies: ["Java", "Spring Boot", "Angular", "MySQL", "Jenkins", "JUnit", "Mockito"],
      impact: {
        metric: "40%",
        description: "Manual Work Reduction"
      }
    },
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="group inline-block relative mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x bg-300%">
              Professional Experience
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A journey through challenging projects, innovative solutions, and continuous growth 
            in the world of software engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1 md:left-1/2 w-4 h-4 bg-primary rounded-full md:transform md:-translate-x-2 z-10 shadow-lg">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full absolute top-1 left-1"></div>
                </div>

                {/* Content card */}
                <div className={`ml-8 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:pr-8'
                }`}>
                  <Card className="hover-lift shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-2 gap-3 sm:gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span className="text-xs sm:text-sm">{exp.duration}</span>
                          </div>
                          <Badge variant="outline" className="w-fit text-xs whitespace-nowrap">
                            {exp.type}
                          </Badge>
                        </div>
                        <div className="text-center sm:text-right">
                          <div className="text-xl sm:text-2xl font-bold text-primary">
                            {exp.impact.metric}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {exp.impact.description}
                          </div>
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg sm:text-xl text-foreground mb-2">
                        {exp.position}
                      </CardTitle>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <img 
                            src={exp.logo} 
                            alt={`${exp.company} logo`}
                            className="h-6 w-auto object-contain"
                          />
                          <span className="text-xs sm:text-sm">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-xs sm:text-sm">{exp.location}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Key Achievements
                          </h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-1.5">•</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="text-xs px-2 py-1">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VelocIDE Project Showcase */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="group inline-block relative mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Featured Project: VelocIDE
              </h3>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI-powered code editor with autonomous file management • Live on GitHub
            </p>
          </div>

          {/* VelocIDE GitHub Stats & Repository */}
          <div className="space-y-8">
            {/* GitHub Repository Card */}
            <Card className="overflow-hidden border-primary/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Code2 className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">AI-Code-Editor</CardTitle>
                      <p className="text-sm text-muted-foreground">Production-ready AI-powered IDE with multi-model support</p>
                    </div>
                  </div>
                  <a
                    href="https://github.com/GKR5413/AI-Code-Editor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Repository
                    </Button>
                  </a>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* GitHub Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">⭐</div>
                    <div className="text-sm text-muted-foreground">Open Source</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">6</div>
                    <div className="text-sm text-muted-foreground">Microservices</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">5ms</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">20+</div>
                    <div className="text-sm text-muted-foreground">Concurrent Users</div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Monaco Editor</Badge>
                    <Badge variant="secondary">Docker</Badge>
                    <Badge variant="secondary">gRPC</Badge>
                    <Badge variant="secondary">OAuth 2.0</Badge>
                    <Badge variant="secondary">Gemini 3 Pro</Badge>
                    <Badge variant="secondary">Claude 4.5</Badge>
                    <Badge variant="secondary">Llama 3</Badge>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm text-muted-foreground">Multi-model AI integration (Gemini, Claude, Llama)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm text-muted-foreground">Autonomous file creation & modification</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm text-muted-foreground">Real-time workspace synchronization (1ms reads, 8ms writes)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm text-muted-foreground">OAuth 2.0/JWT authentication with rate limiting</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GitHub Activity & Repository Links */}
            <div className="space-y-6">
              {/* VelocIDE Repository Direct Access */}
              <Card className="hover-lift border-purple-500/20 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">VelocIDE Repository</CardTitle>
                      <p className="text-sm text-muted-foreground">Full commit history, versions, and development activity</p>
                    </div>
                    <svg className="h-12 w-12 text-purple-500/50" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Commits & History */}
                    <a
                      href="https://github.com/GKR5413/AI-Code-Editor/commits/main"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg bg-card">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-500/10 rounded-lg">
                            <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Commit History</h4>
                            <p className="text-xs text-muted-foreground">All commits with messages</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">View complete development timeline →</p>
                      </div>
                    </a>

                    {/* Releases & Versions */}
                    <a
                      href="https://github.com/GKR5413/AI-Code-Editor/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg bg-card">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-green-500/10 rounded-lg">
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Releases & Tags</h4>
                            <p className="text-xs text-muted-foreground">Version history and changelogs</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">View all releases →</p>
                      </div>
                    </a>

                    {/* Code Frequency */}
                    <a
                      href="https://github.com/GKR5413/AI-Code-Editor/graphs/code-frequency"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg bg-card">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-purple-500/10 rounded-lg">
                            <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Code Frequency</h4>
                            <p className="text-xs text-muted-foreground">Additions and deletions over time</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">View activity graphs →</p>
                      </div>
                    </a>

                    {/* Contributors */}
                    <a
                      href="https://github.com/GKR5413/AI-Code-Editor/graphs/contributors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg bg-card">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-cyan-500/10 rounded-lg">
                            <svg className="h-5 w-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">Contributors</h4>
                            <p className="text-xs text-muted-foreground">Contribution stats and graphs</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">View contributor insights →</p>
                      </div>
                    </a>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">Public</div>
                        <div className="text-xs text-muted-foreground">Open Source</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">TypeScript</div>
                        <div className="text-xs text-muted-foreground">Primary Language</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">Active</div>
                        <div className="text-xs text-muted-foreground">Development Status</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">2025</div>
                        <div className="text-xs text-muted-foreground">Latest Updates</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* GitHub Profile Link */}
              <Card className="hover-lift bg-gradient-to-r from-blue-500/5 to-purple-500/5">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg mb-1">View Complete GitHub Profile</h4>
                        <p className="text-sm text-muted-foreground">See all repositories, contributions, and activity</p>
                      </div>
                    </div>
                    <a
                      href="https://github.com/GKR5413"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="lg" className="gap-2">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Visit GitHub Profile
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Repository Links */}
            <Card className="bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Explore the Full Project</h4>
                    <p className="text-sm text-muted-foreground">Check out the complete source code, documentation, and live demos</p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com/GKR5413/AI-Code-Editor"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="default" className="gap-2">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View Source Code
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievement Cards */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Key Achievements
            </h3>
            <p className="text-muted-foreground">
              Measurable impact across different domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                {...achievement}
                animationDelay={index * 0.2}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-6 py-3 shadow-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">
              Currently open to new opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;