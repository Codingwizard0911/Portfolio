import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "transit-analytics",
    slug: "transit-analytics-recommendation-system",
    title: "Transit Analytics & Recommendation System",
    tagline: "ML-powered transportation intelligence platform for smart city transit optimization",
    description:
      "A production-grade transportation analytics platform that analyzes commuter behavior patterns, models transit demand, and surfaces intelligent recommendations to optimize public transit operations. Built with a full data science pipeline from raw data ingestion to interactive business intelligence dashboards.",
    problem:
      "Public transit authorities lack real-time intelligence about commuter behavior patterns, leading to inefficient route scheduling, poor resource allocation, and declining ridership. Traditional reporting tools offer only lagging indicators — not predictive guidance.",
    solution:
      "Engineered an end-to-end analytics platform that ingests raw transit data, cleans and transforms it through a structured pipeline, applies machine learning models to identify behavioral patterns and predict demand, and presents actionable insights through interactive Streamlit dashboards. The recommendation engine surfaces route optimization opportunities and demand forecasting with measurable accuracy.",
    outcomes: [
      "Built full ML recommendation pipeline with feature engineering and model evaluation",
      "Created interactive dashboards enabling business insights without technical knowledge",
      "Reduced data preprocessing time via automated cleaning pipeline",
      "Published research findings in international peer-reviewed journal (IJIRT)",
    ],
    technologies: [
      "Python", "PostgreSQL", "SQL", "Pandas", "NumPy",
      "Scikit-learn", "Streamlit", "Machine Learning",
      "Data Engineering", "EDA", "Feature Engineering",
    ],
    category: ["Data Science", "Machine Learning", "Analytics", "Full Stack"],
    featured: true,
    status: "completed",
    date: "January 2025",
    links: {},
    architecture: [
      "Data Ingestion Layer → Raw transit CSV/SQL feeds",
      "Preprocessing Pipeline → Cleaning, normalization, feature engineering (Pandas/NumPy)",
      "ML Layer → Classification + regression models (Scikit-learn)",
      "Recommendation Engine → Collaborative filtering for route optimization",
      "Storage Layer → PostgreSQL for structured data, SQL queries for analytics",
      "Presentation Layer → Streamlit interactive dashboards",
    ],
    challenges: [
      "Handling missing and noisy real-world transit data at scale",
      "Feature selection across high-dimensional behavioral datasets",
      "Building interpretable ML models for non-technical stakeholders",
      "Optimizing PostgreSQL queries for large time-series datasets",
    ],
    lessons: [
      "Data quality upstream determines model quality downstream — invest in preprocessing",
      "Domain knowledge (transit operations) is as important as technical skill in analytics",
      "Streamlit provides fast time-to-insight for stakeholder-facing dashboards",
      "Publishing findings validates methodology and builds credibility",
    ],
  },
  {
    id: "hiring-platform",
    slug: "hiring-platform",
    title: "Hiring Platform",
    tagline: "Full-stack job marketplace connecting candidates and employers with intelligent matching",
    description:
      "A web platform that connects job seekers and employers through a responsive, feature-rich interface. Built with Vue.js on the frontend and a REST API backend, it handles the full recruitment lifecycle — from job posting and candidate applications to profile management and tracking.",
    problem:
      "Job seekers struggle with fragmented job discovery experiences, while employers face high friction in posting opportunities and tracking candidates. Existing platforms are feature-bloated and slow, creating poor conversion rates on both sides.",
    solution:
      "Designed a streamlined hiring platform with clean UX that reduces friction at every step. The platform provides employers a dashboard to post and manage jobs, and job seekers tools to discover opportunities, apply, and track their applications — all backed by a performant REST API and optimized PostgreSQL schema.",
    outcomes: [
      "Built complete job marketplace with bidirectional user flows (seeker + employer)",
      "Designed authentication system with JWT-based session management",
      "Optimized PostgreSQL schema for sub-50ms job search queries",
      "Responsive Vue.js UI with mobile-first component architecture",
    ],
    technologies: [
      "Vue.js", "JavaScript", "REST APIs", "PostgreSQL",
      "HTML5", "CSS3", "JWT", "Node.js",
    ],
    category: ["Full Stack", "Web Development", "Product"],
    featured: true,
    status: "completed",
    date: "July 2025",
    links: {},
    architecture: [
      "Frontend → Vue.js SPA with component-based architecture",
      "API Layer → RESTful endpoints for auth, jobs, applications, profiles",
      "Auth → JWT tokens with refresh token rotation",
      "Database → PostgreSQL with normalized schema for jobs, users, applications",
      "Search → Full-text search with PostgreSQL tsvector",
    ],
    challenges: [
      "Designing a database schema that scales to both job seekers and employer views",
      "Implementing secure JWT auth with proper token expiry and refresh flows",
      "Building search that's both fast and relevant across job listings",
      "Maintaining responsive Vue.js UI across device breakpoints",
    ],
    lessons: [
      "Normalized database schema pays dividends when feature scope expands",
      "API-first design makes frontend and backend development parallelizable",
      "PostgreSQL full-text search eliminates need for external search infrastructure at small scale",
    ],
  },
];
