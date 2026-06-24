import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, GraduationCap, Award, Users, BookOpen } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";
import TechBadge from "@/components/shared/TechBadge";
import ProfileImage from "@/components/shared/ProfileImage";
import FunFacts from "@/components/shared/FunFacts";
import SkillRadar from "@/components/shared/SkillRadar";
import GitHubStats from "@/components/shared/GitHubStats";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Umapathi R — Full Stack Developer and Published ML Researcher based in Tamil Nadu, India.",
};

const timeline = [
  {
    year: "2019",
    title: "Secondary School",
    subtitle: "Government Boys Higher Secondary School, Dharmapuri",
    detail: "79% — Early foundation in mathematics and science",
    icon: GraduationCap,
  },
  {
    year: "2021",
    title: "Higher Secondary",
    subtitle: "Government Boys Higher Secondary School, Dharmapuri",
    detail: "85% — Strong academic performance in science stream",
    icon: GraduationCap,
  },
  {
    year: "2021–2025",
    title: "B.Tech Information Technology",
    subtitle: "R P Sarathy Institute of Technology, Salem",
    detail: "CGPA 8.8 / 10 — Data Structures, DBMS, ML, Cloud Computing",
    icon: GraduationCap,
    highlight: true,
  },
  {
    year: "2024",
    title: "First Research Publication",
    subtitle: "IJAMEMA — Website Traffic Analysis",
    detail: "First peer-reviewed paper applying ML to web analytics",
    icon: BookOpen,
  },
  {
    year: "Feb 2025",
    title: "Head of Department Events",
    subtitle: "National Level Technical Symposium, R P Sarathy Institute",
    detail: "Led event coordination and student volunteer management",
    icon: Users,
  },
  {
    year: "2025",
    title: "Second Research Publication",
    subtitle: "IJIRT — ML Driven Predictive Analytics for Bus Transportation System",
    detail: "ML recommendation system for transit optimization — international publication",
    icon: BookOpen,
    highlight: true,
  },
  {
    year: "Aug 2025",
    title: "Full Stack Developer",
    subtitle: "Vaken Technologies, Trichy",
    detail: "Building scalable full-stack applications with REST APIs and AWS deployments",
    icon: Award,
    highlight: true,
    current: true,
  },
];

const values = [
  {
    title: "Research-Informed Engineering",
    description:
      "I approach engineering problems with the rigor of a researcher — forming hypotheses, measuring outcomes, and iterating based on data rather than intuition alone.",
  },
  {
    title: "Full Stack Ownership",
    description:
      "I build end-to-end. From database schema to API design to frontend — I prefer owning the whole problem rather than just a slice of it.",
  },
  {
    title: "Data as a First-Class Citizen",
    description:
      "Every system I build treats data seriously — correct schemas, meaningful analytics, and well-designed pipelines that make insights accessible.",
  },
  {
    title: "Continuous Learning",
    description:
      "I published research while building production systems and studying. The habit of learning in parallel with shipping is something I don't plan to stop.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <AnimatedSection className="mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-4 h-px bg-brand-500" />
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">About</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-8 mb-8">
            <ProfileImage size="md" />
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-neutral-50 tracking-tight mb-3">
                The engineer behind the work.
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-neutral-500">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="text-sm">Dharmapuri, Tamil Nadu, India</span>
                <span className="text-neutral-700">·</span>
                <span className="text-sm text-emerald-400">Open to remote</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xl text-neutral-300 leading-relaxed">
              I&apos;m Umapathi R — a Full Stack Developer and published ML researcher. I graduated with an 8.8 CGPA in Information Technology and currently work at Vaken Technologies building cloud-based business applications.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed">
              What makes me different isn&apos;t just the combination of skills — it&apos;s the fact that I published two international research papers <em>while</em> completing my degree and building production projects. That parallel track of academic rigor and engineering practice shapes how I approach every system I build.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed">
              My transportation analytics project wasn&apos;t just a college project — it became a published research paper in IJIRT. My web analytics work became a paper in IJAMEMA. I don&apos;t separate research from engineering; I treat them as the same discipline operating at different abstraction levels.
            </p>
          </div>
        </AnimatedSection>

        {/* Values + Fun Facts + Skill Radar */}
        <AnimatedSection delay={0.1} className="mb-20">
          <SectionHeader label="Engineering Philosophy" title="How I think about building" />
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {values.map((v) => (
              <div key={v.title} className="card p-6">
                <h3 className="text-sm font-semibold text-neutral-100 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>

          {/* Fun fact + Skill radar side by side */}
          <div className="grid sm:grid-cols-2 gap-4">
            <FunFacts />
            <SkillRadar />
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection delay={0.15} className="mb-20">
          <SectionHeader
            label="Journey"
            title="From school to engineering"
          />
          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/6" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex gap-6 pl-12">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 w-8 h-8 rounded-full border flex items-center justify-center ${
                      item.current
                        ? "bg-brand-500/20 border-brand-500/40"
                        : item.highlight
                        ? "bg-white/8 border-white/15"
                        : "bg-white/4 border-white/8"
                    }`}
                  >
                    <item.icon
                      className={`w-3.5 h-3.5 ${
                        item.current ? "text-brand-400" : "text-neutral-500"
                      }`}
                    />
                  </div>

                  <div className="flex-1 pb-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`text-sm font-semibold ${item.current ? "text-brand-300" : "text-neutral-200"}`}>
                            {item.title}
                          </h3>
                          {item.current && (
                            <span className="badge-brand text-[10px]">Current</span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mb-1">{item.subtitle}</p>
                        <p className="text-xs text-neutral-600">{item.detail}</p>
                      </div>
                      <span className="text-xs text-neutral-600 shrink-0 pt-0.5">{item.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Education detail */}
        <AnimatedSection delay={0.2} className="mb-20">
          <SectionHeader label="Education" title="Academic background" />
          <div className="card p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-semibold text-neutral-100">
                  Bachelor of Technology — Information Technology
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  R P Sarathy Institute of Technology, Salem, Tamil Nadu
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl font-bold text-gradient-brand">8.8</div>
                <div className="text-xs text-neutral-500">/ 10.0 CGPA</div>
              </div>
            </div>
            <div className="text-xs text-neutral-500 mb-4">Nov 2021 – May 2025</div>
            <div>
              <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wider font-medium">Relevant Coursework</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Data Structures & Algorithms",
                  "Database Management Systems",
                  "Software Engineering",
                  "Machine Learning",
                  "Data Analysis",
                  "Cloud Computing",
                ].map((course) => (
                  <TechBadge key={course} name={course} size="sm" />
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Languages */}
        <AnimatedSection delay={0.25} className="mb-20">
          <SectionHeader label="Languages" title="Communication" />
          <div className="flex flex-wrap gap-3">
            {[
              { lang: "English", level: "Professional" },
              { lang: "Tamil", level: "Native" },
              { lang: "Telugu", level: "Conversational" },
            ].map(({ lang, level }) => (
              <div key={lang} className="card px-5 py-3 flex items-center gap-3">
                <span className="text-sm font-medium text-neutral-200">{lang}</span>
                <span className="text-xs text-neutral-500">{level}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* GitHub live stats */}
        <AnimatedSection delay={0.28} className="mb-10">
          <GitHubStats />
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={0.3}>
          <div className="card p-8 text-center">
            <h3 className="text-xl font-bold text-neutral-100 mb-3">Want to work together?</h3>
            <p className="text-sm text-neutral-400 mb-6 max-w-sm mx-auto">
              I&apos;m open to full-time roles in Full Stack, Backend, AI/ML Engineering, and Data Engineering.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium transition-colors"
              >
                Get in touch <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/5 border border-white/8 hover:bg-white/8 text-neutral-200 text-sm font-medium transition-colors"
              >
                View Resume
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
