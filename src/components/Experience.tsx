import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, TrendingUp } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "Fidelity National Information Services (FIS Global)",
      position: "Software Engineer",
      location: "India",
      duration: "Jun 2022 - Jul 2023",
      type: "Full-time",
      description: "Developed and maintained merchant payment modules within enterprise platform serving 10,000+ global merchants, implementing robust error handling and monitoring to ensure system reliability during peak traffic periods.",
      achievements: [
        "Built high-performance microservices with Spring Boot and Java, optimizing database queries and implementing caching strategies that improved API response times by 25%",
        "Optimized deployment processes through CI/CD automation using Jenkins pipelines, Docker containerization, and AWS CodePipeline, reducing deployment time by 50%",
        "Designed 10+ dynamic, reusable UI components using React and Material-UI, implementing lazy loading and state optimization techniques that achieved 25% improvement in frontend performance",
        "Led Agile ceremonies including sprint planning and retrospectives, conducted thorough code reviews focusing on best practices and security"
      ],
      technologies: ["Java", "Spring Boot", "React", "Material-UI", "Jenkins", "Docker", "AWS", "PostgreSQL", "Redis"],
      impact: {
        metric: "25%",
        description: "Performance Improvement"
      }
    },
    {
      company: "Cognizant Technology Solutions Corp (CTS)",
      position: "Programmer Analyst",
      location: "India",
      duration: "Jan 2022 - Jun 2022",
      type: "Full-time",
      description: "Coordinated transition from Salesforce Classic to Lightning by redesigning custom objects, page layouts, and workflows, improving system usability and performance for U.S.-based business operations.",
      achievements: [
        "Developed and implemented 30 workflow rules and 15 approval processes, leading to a 25% increase in operational efficiency",
        "Ensured 100% data consistency across millions of records by sequencing parent-child relationships and executing bulk data uploads with Data Loader",
        "Implemented complex REST/SOAP API integrations using MuleSoft middleware, along with OAuth for secure authentication between systems",
        "Designed and optimized large-scale data models, wrote advanced SOQL/SOSL queries, and managed Salesforce Shield encryption for data security"
      ],
      technologies: ["Salesforce", "MuleSoft", "REST/SOAP APIs", "OAuth", "SOQL/SOSL", "Data Loader", "Salesforce Shield"],
      impact: {
        metric: "25%",
        description: "Efficiency Increase"
      }
    },
    {
      company: "E-Box",
      position: "Software Development Intern",
      location: "India",
      duration: "Apr 2020 - Jun 2020",
      type: "Internship",
      description: "Developed campus navigation web application for university with 2,000+ active users using Spring MVC and PostgreSQL, implementing shortest path algorithms for route optimization between 30+ campus buildings.",
      achievements: [
        "Built RESTful APIs with basic authentication and input validation, integrated Google Maps API for location services",
        "Achieved consistent sub-second response times for route calculations using optimized algorithms",
        "Participated in agile development practices including daily standups and sprint retrospectives",
        "Delivered assigned features on schedule while learning best practices for version control and testing"
      ],
      technologies: ["Java", "Spring MVC", "PostgreSQL", "REST APIs", "Google Maps API", "Algorithms", "Git"],
      impact: {
        metric: "2,000+",
        description: "Active Users"
      }
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A journey through challenging projects, innovative solutions, and continuous growth 
            in the world of software engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-1/2 w-4 h-4 bg-primary rounded-full md:transform md:-translate-x-2 z-10 shadow-lg">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full absolute top-1 left-1"></div>
                </div>

                {/* Content card */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:pr-8'
                }`}>
                  <Card className="hover-lift shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.duration}</span>
                          <Badge variant="outline" className="ml-2 whitespace-nowrap">
                            {exp.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            {exp.impact.metric}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {exp.impact.description}
                          </div>
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl text-foreground mb-2">
                        {exp.position}
                      </CardTitle>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
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
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="text-xs">
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