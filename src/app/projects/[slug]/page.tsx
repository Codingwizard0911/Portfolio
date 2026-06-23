import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertCircle, Lightbulb, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/SocialIcons";
import AnimatedSection from "@/components/shared/AnimatedSection";
import TechBadge from "@/components/shared/TechBadge";
import { projects } from "@/lib/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <AnimatedSection className="mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to projects
          </Link>
        </AnimatedSection>

        {/* Header */}
        <AnimatedSection delay={0.05} className="mb-10">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.category.map((cat) => (
              <span key={cat} className="badge-neutral text-xs">{cat}</span>
            ))}
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                project.status === "completed"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              }`}
            >
              {project.status}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-neutral-50 tracking-tight mb-3">
            {project.title}
          </h1>
          <p className="text-xl text-brand-400 font-medium mb-4">{project.tagline}</p>
          <p className="text-sm text-neutral-500">{project.date}</p>

          {/* External links */}
          {(project.links.github || project.links.live) && (
            <div className="flex gap-3 mt-6">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/8 text-sm text-neutral-300 hover:text-white hover:bg-white/8 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-sm text-white hover:bg-brand-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Site
                </a>
              )}
            </div>
          )}
        </AnimatedSection>

        {/* Overview */}
        <AnimatedSection delay={0.1} className="mb-10">
          <div className="card p-8">
            <h2 className="text-lg font-semibold text-neutral-100 mb-4">Overview</h2>
            <p className="text-base text-neutral-300 leading-relaxed">{project.description}</p>
          </div>
        </AnimatedSection>

        {/* Problem & Solution */}
        <AnimatedSection delay={0.15} className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-neutral-200">Problem</h3>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">{project.problem}</p>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-neutral-200">Solution</h3>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">{project.solution}</p>
          </div>
        </AnimatedSection>

        {/* Outcomes */}
        <AnimatedSection delay={0.2} className="mb-10">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-neutral-200 mb-4">Key Outcomes</h2>
            <div className="space-y-2.5">
              {project.outcomes.map((o, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-neutral-300">{o}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Architecture */}
        {project.architecture && (
          <AnimatedSection delay={0.25} className="mb-10">
            <div className="card p-6">
              <h2 className="text-sm font-semibold text-neutral-200 mb-4">System Architecture</h2>
              <div className="space-y-2">
                {project.architecture.map((layer, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] text-brand-400 font-mono font-bold">{i + 1}</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">{layer}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Tech Stack */}
        <AnimatedSection delay={0.3} className="mb-10">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-neutral-200 mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} name={tech} variant="brand" />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Challenges & Lessons */}
        {project.challenges && project.lessons && (
          <AnimatedSection delay={0.35} className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-neutral-200 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Engineering Challenges
              </h3>
              <ul className="space-y-2.5">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span className="text-xs text-neutral-400 leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-sm font-semibold text-neutral-200 mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-brand-400" />
                Lessons Learned
              </h3>
              <ul className="space-y-2.5">
                {project.lessons.map((l, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <span className="text-xs text-neutral-400 leading-relaxed">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        )}

        {/* Nav to next project */}
        <AnimatedSection delay={0.4}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All projects
          </Link>
        </AnimatedSection>

      </div>
    </div>
  );
}
