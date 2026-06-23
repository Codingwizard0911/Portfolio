import type { BlogIdea } from "@/types";

export const blogIdeas: BlogIdea[] = [
  {
    id: "1",
    title: "Building a Production-Grade ML Pipeline for Transit Analytics",
    description:
      "A deep dive into the architecture decisions behind a real-world transportation recommendation system — from data ingestion to model serving.",
    tags: ["Machine Learning", "Data Engineering", "Python", "PostgreSQL"],
    readTime: "12 min",
    difficulty: "advanced",
  },
  {
    id: "2",
    title: "PostgreSQL Full-Text Search: Kill Your Elasticsearch Dependency at Small Scale",
    description:
      "How I replaced Elasticsearch with native PostgreSQL tsvector for a hiring platform search feature, and the query optimizations that made it fast enough.",
    tags: ["PostgreSQL", "Performance", "Backend"],
    readTime: "8 min",
    difficulty: "intermediate",
  },
  {
    id: "3",
    title: "Designing Database Schemas for Multi-Role Platforms (Hiring Platforms, Marketplaces)",
    description:
      "The exact schema design decisions behind a hiring platform — handling buyer/seller symmetry, avoiding join hell, and indexing for performance.",
    tags: ["Database Design", "PostgreSQL", "Architecture"],
    readTime: "10 min",
    difficulty: "intermediate",
  },
  {
    id: "4",
    title: "FastAPI vs. Node.js for REST API Development: A Python Engineer's Perspective",
    description:
      "A practical comparison from someone who has built production APIs in both ecosystems — performance, DX, ecosystem, and when each wins.",
    tags: ["FastAPI", "Node.js", "Backend", "Python"],
    readTime: "9 min",
    difficulty: "intermediate",
  },
  {
    id: "5",
    title: "Feature Engineering for Behavioral Data: What I Learned from Transit Analytics",
    description:
      "The non-obvious feature engineering decisions that drove model accuracy in my transportation ML project, with reusable patterns for other domains.",
    tags: ["Machine Learning", "Feature Engineering", "Data Science"],
    readTime: "11 min",
    difficulty: "advanced",
  },
  {
    id: "6",
    title: "From Jupyter Notebook to Production: Structuring Python Data Science Projects",
    description:
      "How to graduate from notebook-only workflows to production-grade Python ML codebases — project structure, testing, and deployment patterns.",
    tags: ["Python", "Machine Learning", "Software Engineering", "Data Engineering"],
    readTime: "10 min",
    difficulty: "intermediate",
  },
  {
    id: "7",
    title: "JWT Auth Done Right: Token Refresh, Rotation, and Security Anti-Patterns",
    description:
      "Every JWT implementation mistake I've seen (and made) — and the correct patterns for access/refresh token flows in production REST APIs.",
    tags: ["Security", "Authentication", "Backend", "REST APIs"],
    readTime: "9 min",
    difficulty: "intermediate",
  },
  {
    id: "8",
    title: "Jenkins CI/CD for Full Stack Apps: A Practical Setup Guide",
    description:
      "A complete Jenkins pipeline setup for full-stack applications — build, test, deploy stages with real configuration examples from production.",
    tags: ["CI/CD", "Jenkins", "DevOps"],
    readTime: "12 min",
    difficulty: "intermediate",
  },
  {
    id: "9",
    title: "Vue.js Component Design Patterns I Use in Production",
    description:
      "The specific component composition patterns that have held up best in real Vue.js codebases — prop validation, composables, and state patterns.",
    tags: ["Vue.js", "Frontend", "JavaScript"],
    readTime: "8 min",
    difficulty: "intermediate",
  },
  {
    id: "10",
    title: "Writing Research Papers as a Software Engineer: What I Learned Publishing Two",
    description:
      "How to approach academic publishing as a practitioner — structuring methodology sections, choosing journals, and making research accessible.",
    tags: ["Research", "Academia", "Career"],
    readTime: "7 min",
    difficulty: "beginner",
  },
  {
    id: "11",
    title: "Smart Cities and Transit Data: The Untapped Engineering Opportunity",
    description:
      "Why transit data is one of the richest, most underutilized public datasets — and the engineering problems worth building for in smart city infrastructure.",
    tags: ["Smart Cities", "Data Engineering", "Machine Learning", "Domain Knowledge"],
    readTime: "8 min",
    difficulty: "beginner",
  },
  {
    id: "12",
    title: "Streamlit vs. Dash vs. Gradio: Choosing the Right Dashboard Tool for ML Projects",
    description:
      "A practical comparison of Python dashboard tools based on real project usage — when Streamlit wins, when it loses, and what to watch out for.",
    tags: ["Streamlit", "Python", "Data Visualization", "Machine Learning"],
    readTime: "7 min",
    difficulty: "beginner",
  },
  {
    id: "13",
    title: "Using Claude Code as an Engineering Accelerator: My Daily Workflow",
    description:
      "How I've integrated AI-assisted development into my engineering workflow — what tasks it accelerates, where it introduces noise, and my productivity patterns.",
    tags: ["AI Tools", "Developer Productivity", "Claude", "Engineering"],
    readTime: "8 min",
    difficulty: "beginner",
  },
  {
    id: "14",
    title: "AWS for Full Stack Developers: The Services You Actually Need First",
    description:
      "Cutting through the AWS complexity to the 8 services that cover 90% of full stack deployment needs — with real configuration examples.",
    tags: ["AWS", "Cloud", "DevOps", "Full Stack"],
    readTime: "10 min",
    difficulty: "intermediate",
  },
  {
    id: "15",
    title: "Data Cleaning Patterns for Real-World Datasets (with Pandas Code)",
    description:
      "The recurring data quality issues I've encountered in production datasets and the Pandas patterns that handle them cleanly.",
    tags: ["Pandas", "Data Engineering", "Python", "Data Science"],
    readTime: "9 min",
    difficulty: "intermediate",
  },
  {
    id: "16",
    title: "REST API Design Principles That Have Stood the Test of Time",
    description:
      "Resource naming, versioning, error schemas, pagination — the API design decisions that remain correct years after implementation.",
    tags: ["REST APIs", "Backend", "Software Design"],
    readTime: "8 min",
    difficulty: "intermediate",
  },
  {
    id: "17",
    title: "The Hiring Platform Architecture I Would Build Differently Today",
    description:
      "Retrospective on architectural decisions in my hiring platform project — what held up, what didn't, and the patterns I'd use if starting fresh.",
    tags: ["Architecture", "Full Stack", "Retrospective", "Software Design"],
    readTime: "9 min",
    difficulty: "intermediate",
  },
  {
    id: "18",
    title: "Power BI vs. Tableau for Engineering Analytics: When to Choose Each",
    description:
      "A practitioner's comparison of enterprise BI tools from a data engineering perspective — connected data sources, modeling, and team collaboration.",
    tags: ["Power BI", "Tableau", "Analytics", "Data Visualization"],
    readTime: "7 min",
    difficulty: "beginner",
  },
  {
    id: "19",
    title: "Engineering Your First Publication: Research Methods for Practitioners",
    description:
      "How to take a real engineering project and structure it into a publishable research paper — from problem statement to methodology to results.",
    tags: ["Research", "Academia", "Career", "Machine Learning"],
    readTime: "10 min",
    difficulty: "intermediate",
  },
  {
    id: "20",
    title: "Building a Portfolio That Gets Responses: Lessons from Engineering the Site You're Looking At",
    description:
      "The exact design, content, and technical decisions behind this portfolio — and what I'd measure to know if it's working.",
    tags: ["Career", "Frontend", "Next.js", "Personal Branding"],
    readTime: "8 min",
    difficulty: "beginner",
  },
];
