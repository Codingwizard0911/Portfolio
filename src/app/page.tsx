"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, ExternalLink, Mail,
  Brain, Server, Database, Code2, BookOpen, Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/SocialIcons";
import AnimatedSection from "@/components/shared/AnimatedSection";
import TechBadge from "@/components/shared/TechBadge";

const stats = [
  { value: "2+", label: "Publications", sublabel: "International Journals" },
  { value: "8.8", label: "CGPA", sublabel: "B.Tech Information Technology" },
  { value: "2+", label: "Projects", sublabel: "Production Systems" },
  { value: "1+", label: "Year", sublabel: "Industry Experience" },
];

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Engineering",
    description: "Building scalable web applications with modern frameworks, REST APIs, and cloud deployments.",
    tags: ["Vue.js", "Python", "PostgreSQL", "AWS"],
  },
  {
    icon: Brain,
    title: "Machine Learning Research",
    description: "Published ML researcher — from raw transit data to production recommendation systems.",
    tags: ["Scikit-learn", "Pandas", "Feature Engineering"],
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Designing data pipelines, optimizing query performance, and delivering analytics that drive decisions.",
    tags: ["PostgreSQL", "SQL", "Streamlit", "NumPy"],
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description: "RESTful API design, database schema architecture, and CI/CD pipeline implementation.",
    tags: ["REST APIs", "FastAPI", "Jenkins", "CI/CD"],
  },
];

const featuredProjects = [
  {
    slug: "transit-analytics-recommendation-system",
    label: "Research Project",
    title: "Transit Analytics & Recommendation System",
    description:
      "ML-powered transportation intelligence platform — from data ingestion through feature engineering to interactive dashboards. Research published in IJIRT.",
    tags: ["Python", "ML", "PostgreSQL", "Streamlit"],
    status: "Published Research",
    highlight: true,
  },
  {
    slug: "hiring-platform",
    label: "Web Platform",
    title: "Hiring Platform",
    description:
      "Full-stack job marketplace connecting candidates and employers with authentication, job management, and application tracking.",
    tags: ["Vue.js", "REST APIs", "PostgreSQL", "JWT"],
    status: "Completed",
    highlight: false,
  },
];

const coreStack = [
  "Python", "JavaScript", "PostgreSQL", "Vue.js",
  "FastAPI", "AWS", "Jenkins", "Pandas", "Scikit-learn",
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background grid */}
      <div className="fixed inset-0 bg-grid-dots pointer-events-none" />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-100 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">
                Available for opportunities
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              <span className="text-neutral-50">Engineering at the</span>
              <br />
              <span className="text-gradient-brand">
                intersection of data
              </span>
              <br />
              <span className="text-neutral-50">and software.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl text-neutral-400 max-w-2xl leading-relaxed mb-10"
            >
              I&apos;m{" "}
              <span className="text-neutral-200 font-medium">Umapathi R</span> — Full Stack Developer
              at Vaken Technologies and published ML researcher. I build production systems that span from
              raw data pipelines to intelligent web applications.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm transition-all hover:shadow-[0_0_24px_rgba(59,130,246,0.3)]"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/publications"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/14 text-neutral-200 font-medium text-sm transition-all"
              >
                <BookOpen className="w-4 h-4" />
                Research
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-neutral-400 hover:text-neutral-200 font-medium text-sm transition-colors"
              >
                Get in touch
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/umapathiu0911"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-neutral-500 hover:text-neutral-200 transition-colors"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/umapathi-r"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-neutral-500 hover:text-neutral-200 transition-colors"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:umapathiu0911@gmail.com"
                aria-label="Send email"
                className="text-neutral-500 hover:text-neutral-200 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <div className="w-px h-4 bg-white/10" />
              <span className="text-xs text-neutral-600">
                umapathiu0911@gmail.com
              </span>
            </motion.div>
          </div>

          {/* Core Stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute bottom-12 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 hidden md:flex items-center gap-4"
          >
            <span className="text-xs text-neutral-600 shrink-0">Core stack</span>
            <div className="flex-1 h-px bg-white/5" />
            <div className="flex flex-wrap gap-2">
              {coreStack.map((tech) => (
                <TechBadge key={tech} name={tech} size="sm" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <AnimatedSection>
        <section className="py-16 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-gradient-brand mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-neutral-200">{stat.label}</div>
                  <div className="text-xs text-neutral-500 mt-0.5">{stat.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* What I Do */}
      <AnimatedSection>
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="w-4 h-px bg-brand-500" />
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">
                  What I Do
                </span>
              </div>
              <h2 className="text-3xl font-bold text-neutral-50 tracking-tight">
                End-to-end engineering
              </h2>
              <p className="mt-3 text-neutral-400 max-w-lg">
                From raw datasets to production web platforms — I work across the full stack with a research-informed perspective.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="card p-6 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center mb-4 group-hover:bg-brand-500/15 transition-colors">
                    <item.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <TechBadge key={tag} name={tag} size="sm" variant="brand" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Featured Projects */}
      <AnimatedSection>
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-4 h-px bg-brand-500" />
                  <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">
                    Featured Work
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-neutral-50 tracking-tight">
                  Selected projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block card p-6 h-full group relative overflow-hidden"
                  >
                    {project.highlight && (
                      <div className="absolute top-4 right-4">
                        <span className="badge-brand">
                          <Zap className="w-2.5 h-2.5 inline mr-1" />
                          Featured
                        </span>
                      </div>
                    )}
                    <div className="mb-2">
                      <span className="text-xs text-neutral-500 font-medium">{project.label}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-100 mb-3 group-hover:text-brand-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <TechBadge key={tag} name={tag} size="sm" />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-600">{project.status}</span>
                      <span className="text-brand-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                View all projects <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Publications Highlight */}
      <AnimatedSection>
        <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-4 h-px bg-brand-500" />
                  <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">
                    Research
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-neutral-50 tracking-tight">
                  Published research
                </h2>
                <p className="mt-2 text-neutral-400">
                  Peer-reviewed work in machine learning and data analytics.
                </p>
              </div>
              <Link
                href="/publications"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                Read papers <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "ML Driven Predictive Analytics for Bus Transportation System",
                  journal: "International Journal of Innovative Research in Technology (IJIRT)",
                  year: "2025",
                  tags: ["Machine Learning", "Transit Analytics", "Recommendation Systems"],
                },
                {
                  title: "Website Traffic Analysis",
                  journal: "International Journal of Advanced Mathematics, Engineering & Management Applications (IJAMEMA)",
                  year: "2024",
                  tags: ["Web Analytics", "Data Science", "User Behavior"],
                },
              ].map((pub, i) => (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-6 group"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="text-xs text-neutral-500 pt-1.5">{pub.year}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-100 mb-2 leading-relaxed">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-4 italic">{pub.journal}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pub.tags.map((tag) => (
                      <TechBadge key={tag} name={tag} size="sm" variant="purple" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection>
        <section className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-brand-400" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-neutral-50 tracking-tight mb-4">
              Let&apos;s build something
              <br />
              <span className="text-gradient-brand">worth talking about.</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-xl mx-auto mb-10">
              Open to full-time roles in Full Stack, Backend, AI/ML Engineering, and Data Engineering. Based in Tamil Nadu, open to remote.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition-all hover:shadow-[0_0_32px_rgba(59,130,246,0.35)]"
              >
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://linkedin.com/in/umapathi-r"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/8 text-neutral-200 font-medium transition-all"
              >
                <LinkedinIcon className="w-4 h-4" />
                LinkedIn
                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
