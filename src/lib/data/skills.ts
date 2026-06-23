import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: "Code",
    description: "Core languages powering backend logic, data pipelines, and tooling",
    skills: [
      { name: "Python", level: 90, category: "Languages", highlighted: true },
      { name: "JavaScript", level: 80, category: "Languages", highlighted: true },
      { name: "SQL", level: 85, category: "Languages", highlighted: true },
      { name: "Java", level: 65, category: "Languages" },
    ],
  },
  {
    name: "Frontend",
    icon: "Monitor",
    description: "Building responsive, accessible, performant user interfaces",
    skills: [
      { name: "Vue.js", level: 80, category: "Frontend", highlighted: true },
      { name: "HTML5", level: 90, category: "Frontend" },
      { name: "CSS3", level: 85, category: "Frontend" },
      { name: "Next.js", level: 70, category: "Frontend", highlighted: true },
      { name: "React", level: 70, category: "Frontend" },
      { name: "TypeScript", level: 68, category: "Frontend" },
    ],
  },
  {
    name: "Backend & APIs",
    icon: "Server",
    description: "Server-side architecture, API design, and business logic",
    skills: [
      { name: "REST APIs", level: 88, category: "Backend", highlighted: true },
      { name: "FastAPI", level: 72, category: "Backend", highlighted: true },
      { name: "Node.js", level: 65, category: "Backend" },
      { name: "OOP", level: 85, category: "Backend" },
    ],
  },
  {
    name: "Databases",
    icon: "Database",
    description: "Relational databases, schema design, and query optimization",
    skills: [
      { name: "PostgreSQL", level: 85, category: "Database", highlighted: true },
      { name: "MySQL", level: 80, category: "Database" },
      { name: "SQL Query Optimization", level: 78, category: "Database" },
      { name: "Schema Design", level: 80, category: "Database" },
    ],
  },
  {
    name: "Data Science & ML",
    icon: "Brain",
    description: "Machine learning, data engineering, and analytics pipelines",
    skills: [
      { name: "Machine Learning", level: 80, category: "ML", highlighted: true },
      { name: "Pandas", level: 88, category: "ML", highlighted: true },
      { name: "NumPy", level: 85, category: "ML" },
      { name: "Scikit-learn", level: 75, category: "ML" },
      { name: "Data Analysis", level: 85, category: "ML" },
      { name: "Feature Engineering", level: 78, category: "ML" },
      { name: "Streamlit", level: 80, category: "ML" },
    ],
  },
  {
    name: "Analytics & BI",
    icon: "BarChart",
    description: "Business intelligence, visualization, and reporting",
    skills: [
      { name: "Tableau", level: 72, category: "Analytics" },
      { name: "Power BI", level: 70, category: "Analytics" },
      { name: "EDA", level: 85, category: "Analytics" },
      { name: "Data Visualization", level: 80, category: "Analytics" },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: "Cloud",
    description: "Cloud infrastructure, CI/CD, and deployment pipelines",
    skills: [
      { name: "AWS", level: 68, category: "DevOps", highlighted: true },
      { name: "Jenkins", level: 72, category: "DevOps" },
      { name: "Git / GitHub", level: 88, category: "DevOps" },
      { name: "CI/CD", level: 72, category: "DevOps" },
      { name: "DevSecOps", level: 60, category: "DevOps" },
    ],
  },
  {
    name: "Engineering Practices",
    icon: "GitBranch",
    description: "Software engineering fundamentals and delivery methodologies",
    skills: [
      { name: "Agile / Scrum", level: 80, category: "Process" },
      { name: "SDLC", level: 82, category: "Process" },
      { name: "System Design", level: 70, category: "Process" },
      { name: "Code Review", level: 75, category: "Process" },
    ],
  },
];
