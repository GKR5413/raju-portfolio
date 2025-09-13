import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp } from "lucide-react";

const Experience = () => {
  const experiences = [
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
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
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