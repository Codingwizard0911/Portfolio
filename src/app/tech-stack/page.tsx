"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import {
  Code2, Monitor, Server, Database, Brain, BarChart2,
  Cloud, GitBranch
} from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";
import { skillCategories } from "@/lib/data/skills";

const iconMap: Record<string, React.ElementType> = {
  Code: Code2,
  Monitor,
  Server,
  Database,
  Brain,
  BarChart: BarChart2,
  Cloud,
  GitBranch,
};

function SkillBar({ level, delay = 0 }: { level: number; delay?: number }) {
  return (
    <div className="w-full h-1 bg-white/6 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
      />
    </div>
  );
}

export default function TechStackPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-16">
          <SectionHeader
            label="Tech Stack"
            title="Tools of the trade"
            description="The technologies I reach for when building production systems — categorized by domain, rated by hands-on proficiency."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, ci) => {
            const Icon = iconMap[category.icon] || Code2;
            return (
              <AnimatedSection key={category.name} delay={0.1 + ci * 0.08}>
                <div className="card p-6 h-full">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/15 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-400" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-neutral-100">{category.name}</h2>
                      <p className="text-xs text-neutral-500">{category.description}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-4">
                    {category.skills.map((skill, si) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-medium ${
                                skill.highlighted ? "text-neutral-100" : "text-neutral-300"
                              }`}
                            >
                              {skill.name}
                            </span>
                            {skill.highlighted && (
                              <div className="w-1 h-1 rounded-full bg-brand-500" />
                            )}
                          </div>
                          <span className="text-xs font-mono text-neutral-600">{skill.level}%</span>
                        </div>
                        <SkillBar level={skill.level} delay={0.15 + si * 0.05} />
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Legend */}
        <AnimatedSection delay={0.5} className="mt-12">
          <div className="card p-5 flex flex-wrap items-center gap-6">
            <span className="text-xs text-neutral-500 font-medium">Proficiency scale:</span>
            {[
              { range: "90–100%", label: "Expert / Daily use" },
              { range: "75–89%", label: "Proficient" },
              { range: "60–74%", label: "Working knowledge" },
              { range: "<60%", label: "Familiar" },
            ].map(({ range, label }) => (
              <div key={range} className="flex items-center gap-2">
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
                <span className="text-xs text-neutral-500">
                  <span className="text-neutral-400 font-mono">{range}</span> — {label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Currently learning */}
        <AnimatedSection delay={0.55} className="mt-6">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-neutral-200 mb-3">Currently Exploring</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Next.js 15", "TypeScript", "Docker", "Kubernetes",
                "GraphQL", "Redis", "LangChain", "FastAPI (advanced)"
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-amber-500/8 border border-amber-500/15 text-amber-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
