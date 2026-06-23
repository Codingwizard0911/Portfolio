import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";
import TechBadge from "@/components/shared/TechBadge";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering projects by Umapathi R — Transit analytics ML platform, hiring marketplace, and more.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-16">
          <SectionHeader
            label="Projects"
            title="Things I've built"
            description="Production systems, research platforms, and engineering experiments — each one solving a real problem."
          />
        </AnimatedSection>

        {/* Featured */}
        <AnimatedSection delay={0.1}>
          <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-6">
            Featured Projects
          </div>
          <div className="space-y-6 mb-16">
            {featured.map((project, i) => (
              <AnimatedSection key={project.id} delay={0.1 + i * 0.1}>
                <Link href={`/projects/${project.slug}`} className="block card p-8 group">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex flex-wrap gap-1.5">
                          {project.category.map((cat) => (
                            <span key={cat} className="badge-neutral text-[10px] px-2 py-0.5">
                              {cat}
                            </span>
                          ))}
                        </div>
                        {project.featured && (
                          <span className="badge-brand">
                            <Zap className="w-2.5 h-2.5 inline mr-1" />
                            Featured
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-bold text-neutral-100 mb-2 group-hover:text-brand-300 transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-brand-400 mb-3 font-medium">{project.tagline}</p>
                      <p className="text-sm text-neutral-400 leading-relaxed mb-5 max-w-xl">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.slice(0, 8).map((tech) => (
                          <TechBadge key={tech} name={tech} size="sm" />
                        ))}
                        {project.technologies.length > 8 && (
                          <span className="text-xs text-neutral-600 self-center">
                            +{project.technologies.length - 8} more
                          </span>
                        )}
                      </div>

                      {project.outcomes.length > 0 && (
                        <div className="space-y-1.5">
                          {project.outcomes.slice(0, 2).map((o, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full bg-brand-500 mt-2 shrink-0" />
                              <span className="text-xs text-neutral-500">{o}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-neutral-600 mb-1">{project.date}</div>
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            project.status === "live"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : project.status === "completed"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm text-brand-400 group-hover:gap-2.5 transition-all">
                        View details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {rest.length > 0 && (
          <AnimatedSection delay={0.3}>
            <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-6">
              Other Projects
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {rest.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="card p-5 group block">
                  <h3 className="text-sm font-semibold text-neutral-100 mb-2 group-hover:text-brand-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mb-3 leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((t) => (
                      <TechBadge key={t} name={t} size="sm" />
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        )}

      </div>
    </div>
  );
}
