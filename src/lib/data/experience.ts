import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    id: "vaken-technologies",
    company: "Vaken Technologies",
    role: "Full Stack Developer",
    location: "Trichy, Tamil Nadu",
    startDate: "August 2025",
    endDate: "Present",
    type: "full-time",
    description: [
      "Develop and maintain scalable full-stack applications using modern frontend and backend technologies, serving cloud-based business clients across enterprise verticals.",
      "Design and integrate RESTful APIs to support cloud-based business applications, ensuring reliability, performance, and secure data transport.",
      "Work with PostgreSQL and MySQL databases — writing complex queries, designing schemas, and optimizing performance for high-throughput workloads.",
      "Implement CI/CD pipelines using Jenkins to streamline deployment workflows, reducing manual release overhead and improving delivery confidence.",
      "Collaborate cross-functionally with development, QA, and business teams to deliver reliable software solutions on time and within scope.",
      "Contribute to AWS-based deployments and cloud-native application development on EC2, S3, and RDS infrastructure.",
    ],
    technologies: [
      "JavaScript", "Vue.js", "PostgreSQL", "MySQL",
      "REST APIs", "AWS", "Jenkins", "Git", "CI/CD",
    ],
    highlights: [
      "Architected RESTful API layer supporting core business workflows for cloud clients",
      "Built and maintained Jenkins CI/CD pipelines reducing deployment friction",
      "Contributed to AWS infrastructure for production application hosting",
      "Collaborated across backend, frontend, and QA teams in Agile sprints",
    ],
  },
];
