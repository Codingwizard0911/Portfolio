"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Filter } from "lucide-react";
import TechBadge from "@/components/shared/TechBadge";
import TiltCard from "@/components/shared/TiltCard";
import type { Project } from "@/types";

// Extract all unique categories from projects
function getCategories(projects: Project[]) {
  const cats = new Set<string>();
  projects.forEach((p) => p.category.forEach((c) => cats.add(c)));
  return ["All", ...Array.from(cats)];
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const categories = useMemo(() => getCategories(projects), [projects]);

  const filtered = useMemo(
    () => active === "All" ? projects : projects.filter((p) => p.category.includes(active)),
    [projects, active]
  );

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Filter className="w-4 h-4 text-neutral-600 self-center mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
              active === cat
                ? "bg-brand-500/15 border-brand-500/40 text-brand-300"
                : "bg-white/3 border-white/8 text-neutral-500 hover:border-white/16 hover:text-neutral-300"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="text-xs text-neutral-600 self-center ml-1">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {/* Featured */}
          {featured.length > 0 && (
            <div className="mb-16">
              <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-6">Featured Projects</div>
              <div className="space-y-6">
                {featured.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <TiltCard intensity={5}>
                      <Link href={`/projects/${project.slug}`} className="block card p-8 group">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex flex-wrap gap-1.5">
                                {project.category.map((cat) => (
                                  <span key={cat} className="badge-neutral text-[10px] px-2 py-0.5">{cat}</span>
                                ))}
                              </div>
                              {project.featured && (
                                <span className="badge-brand">
                                  <Zap className="w-2.5 h-2.5 inline mr-1" />Featured
                                </span>
                              )}
                            </div>
                            <h2 className="text-xl font-bold text-neutral-100 mb-2 group-hover:text-brand-300 transition-colors">{project.title}</h2>
                            <p className="text-sm text-brand-400 mb-3 font-medium">{project.tagline}</p>
                            <p className="text-sm text-neutral-400 leading-relaxed mb-5 max-w-xl">{project.description}</p>
                            <div className="flex flex-wrap gap-1.5 mb-5">
                              {project.technologies.slice(0, 8).map((tech) => <TechBadge key={tech} name={tech} size="sm" />)}
                              {project.technologies.length > 8 && (
                                <span className="text-xs text-neutral-600 self-center">+{project.technologies.length - 8} more</span>
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
                              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                project.status === "live" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : project.status === "completed" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}>{project.status}</span>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-sm text-brand-400 group-hover:gap-2.5 transition-all">
                              View details <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Other projects */}
          {rest.length > 0 && (
            <div>
              {featured.length > 0 && <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-6">Other Projects</div>}
              <div className="grid sm:grid-cols-2 gap-4">
                {rest.map((project, i) => (
                  <motion.div key={project.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                    <TiltCard>
                      <Link href={`/projects/${project.slug}`} className="card p-5 group block">
                        <h3 className="text-sm font-semibold text-neutral-100 mb-2 group-hover:text-brand-300 transition-colors">{project.title}</h3>
                        <p className="text-xs text-neutral-500 mb-3 leading-relaxed line-clamp-2">{project.tagline}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((t) => <TechBadge key={t} name={t} size="sm" />)}
                        </div>
                      </Link>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-neutral-600">
              No projects in this category yet.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
