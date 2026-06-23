export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
  technologies: string[];
  highlights: string[];
  type: "full-time" | "internship" | "contract";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  outcomes: string[];
  technologies: string[];
  category: string[];
  featured: boolean;
  status: "live" | "completed" | "wip";
  date: string;
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  architecture?: string[];
  challenges?: string[];
  lessons?: string[];
}

export interface Publication {
  id: string;
  title: string;
  journal: string;
  journalFull: string;
  date: string;
  abstract: string;
  problem: string;
  methodology: string[];
  results: string[];
  impact: string;
  keywords: string[];
  link?: string;
  doi?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
  highlighted?: boolean;
}

export interface SkillCategory {
  name: string;
  icon: string;
  description: string;
  skills: Skill[];
}

export interface BlogIdea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  readTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}
