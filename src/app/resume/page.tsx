import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import TechBadge from "@/components/shared/TechBadge";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Umapathi R — Full Stack Developer and ML Researcher. Available for download.",
};

export default function ResumePage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-4 h-px bg-brand-500" />
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Resume</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-neutral-50 tracking-tight mb-2">
                Umapathi R
              </h1>
              <p className="text-base text-neutral-400">
                Full Stack Developer · ML Researcher · Dharmapuri, Tamil Nadu
              </p>
            </div>
            <a
              href="/Umapathi_R_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </AnimatedSection>

        {/* Contact bar */}
        <AnimatedSection delay={0.05} className="mb-10">
          <div className="card p-4 flex flex-wrap gap-4 text-xs text-neutral-400">
            <a href="mailto:umapathiu0911@gmail.com" className="hover:text-neutral-200 transition-colors">
              umapathiu0911@gmail.com
            </a>
            <span className="text-neutral-700">·</span>
            <span>+91 9042180833</span>
            <span className="text-neutral-700">·</span>
            <a
              href="https://linkedin.com/in/umapathi-ramesh-279289226"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
            >
              LinkedIn <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-neutral-700">·</span>
            <a
              href="https://github.com/Codingwizard0911"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-neutral-200 transition-colors"
            >
              GitHub <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </AnimatedSection>

        {/* Experience */}
        <AnimatedSection delay={0.1} className="mb-10">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
            Professional Experience
          </h2>
          <div className="card p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-100">Full Stack Developer</h3>
                <p className="text-sm text-brand-400">Vaken Technologies, Trichy, Tamil Nadu</p>
              </div>
              <span className="text-xs text-neutral-600 shrink-0">Aug 2025 – Present</span>
            </div>
            <ul className="space-y-1.5 mt-3">
              {[
                "Develop and maintain scalable full-stack applications using modern frontend and backend technologies.",
                "Design and integrate RESTful APIs to support cloud-based business applications.",
                "Work with PostgreSQL and MySQL databases for application development and optimization.",
                "Implement CI/CD pipelines using Jenkins to streamline deployment workflows.",
                "Contribute to AWS-based deployments and cloud-native application development.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-400">
                  <span className="w-1 h-1 rounded-full bg-neutral-600 mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        {/* Projects */}
        <AnimatedSection delay={0.15} className="mb-10">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
            Projects
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Analysis & Recommendation System",
                date: "Jan 2025 – May 2025",
                tech: ["Python", "SQL", "PostgreSQL", "Streamlit", "Pandas", "NumPy", "ML"],
                points: [
                  "Developed a transportation analytics platform to analyze commuter behavior and optimize transit operations.",
                  "Performed data cleaning, preprocessing, exploratory data analysis, and feature engineering.",
                  "Built machine learning recommendation models to improve user engagement and decision-making.",
                  "Created interactive dashboards using Streamlit for business insights and reporting.",
                ],
                link: "/projects/transit-analytics-recommendation-system",
              },
              {
                title: "Hiring Platform",
                date: "Jul 2025",
                tech: ["Vue.js", "JavaScript", "REST APIs", "PostgreSQL"],
                points: [
                  "Designed and developed a web platform connecting job seekers and employers.",
                  "Developed responsive frontend interfaces using Vue.js.",
                  "Integrated REST APIs for authentication, job management, and application tracking.",
                  "Designed PostgreSQL database schemas and optimized query performance.",
                ],
                link: "/projects/hiring-platform",
              },
            ].map((proj) => (
              <div key={proj.title} className="card p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-neutral-100">{proj.title}</h3>
                    <Link href={proj.link} className="text-brand-400 hover:text-brand-300 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <span className="text-xs text-neutral-600">{proj.date}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {proj.tech.map((t) => (
                    <TechBadge key={t} name={t} size="sm" />
                  ))}
                </div>
                <ul className="space-y-1">
                  {proj.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-500">
                      <span className="w-1 h-1 rounded-full bg-neutral-700 mt-2 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Skills */}
        <AnimatedSection delay={0.2} className="mb-10">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
            Technical Skills
          </h2>
          <div className="card p-6 space-y-3">
            {[
              { label: "Languages", value: "Python, Java, SQL, JavaScript" },
              { label: "Frontend", value: "HTML5, CSS3, Vue.js, Next.js, React" },
              { label: "Backend", value: "REST APIs, FastAPI, Node.js" },
              { label: "Databases", value: "MySQL, PostgreSQL" },
              { label: "Data & ML", value: "Pandas, NumPy, Tableau, Power BI, Machine Learning, Data Analysis" },
              { label: "Cloud & DevOps", value: "AWS, Jenkins, Git, GitHub, CI/CD" },
              { label: "Engineering", value: "OOP, SDLC, Agile Methodology, DevSecOps, System Design" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                <span className="text-xs font-semibold text-neutral-500 sm:w-32 shrink-0">{label}:</span>
                <span className="text-sm text-neutral-300">{value}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection delay={0.25} className="mb-10">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
            Education
          </h2>
          <div className="card p-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-sm font-bold text-neutral-100">
                  B.Tech Information Technology
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  R P Sarathy Institute of Technology, Salem, Tamil Nadu
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-lg font-bold text-gradient-brand">8.8</div>
                <div className="text-xs text-neutral-600">CGPA / 10</div>
              </div>
            </div>
            <p className="text-xs text-neutral-600">Nov 2021 – May 2025</p>
          </div>
        </AnimatedSection>

        {/* Publications & Certs */}
        <AnimatedSection delay={0.3} className="mb-10">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">
            Publications
          </h2>
          <div className="card p-5 space-y-3">
            {[
              "ML Driven Predictive Analytics for Bus Transportation System — IJIRT (2025)",
              "Website Traffic Analysis — IJAMEMA (2024)",
            ].map((pub) => (
              <div key={pub} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <span className="text-sm text-neutral-300">{pub}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <div className="text-center">
            <a
              href="/Umapathi_R_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Full Resume (PDF)
            </a>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
