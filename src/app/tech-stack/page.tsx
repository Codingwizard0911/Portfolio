"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Monitor, Server, Database, Brain, BarChart2,
  Cloud, GitBranch, Sparkles, ChevronRight,
} from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";
import { skillCategories } from "@/lib/data/skills";
import { techIconMap } from "@/components/shared/TechBrandIcons";

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

const LEARNING = [
  "Next.js 15", "TypeScript", "Docker", "Kubernetes",
  "GraphQL", "Redis", "LangChain", "FastAPI (advanced)",
];

function SkillBar({ level, delay = 0, visible }: { level: number; delay?: number; visible: boolean }) {
  return (
    <div className="relative w-full h-1.5 bg-white/6 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: visible ? `${level}%` : 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: `linear-gradient(90deg, #3b82f6 0%, #6366f1 ${Math.min(level * 1.2, 100)}%, #8b5cf6 100%)`,
        }}
      />
    </div>
  );
}

function SkillIconBadge({ name }: { name: string }) {
  const Icon = techIconMap[name];
  if (!Icon) return null;
  return (
    <div className="w-6 h-6 flex items-center justify-center rounded-md bg-white/5 shrink-0">
      <Icon size={14} />
    </div>
  );
}

function CategoryCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[category.icon] || Code2;

  const displaySkills = expanded ? category.skills : category.skills.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onViewportEnter={() => setIsVisible(true)}
    >
      <div className="card p-6 h-full flex flex-col group hover:border-brand-500/25 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 transition-colors">
            <Icon className="w-4.5 h-4.5 text-brand-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-neutral-100">{category.name}</h2>
            <p className="text-xs text-neutral-600 mt-0.5">{category.description}</p>
          </div>
        </div>

        {/* Skill rows */}
        <div className="space-y-4 flex-1">
          <AnimatePresence initial={false}>
            {displaySkills.map((skill, si) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <SkillIconBadge name={skill.name} />
                    <span
                      className={`text-sm truncate ${
                        skill.highlighted
                          ? "font-semibold text-neutral-100"
                          : "font-medium text-neutral-300"
                      }`}
                    >
                      {skill.name}
                    </span>
                    {skill.highlighted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + si * 0.05 }}
                        className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"
                      />
                    )}
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ delay: 0.5 + si * 0.06 }}
                    className="text-xs font-mono text-neutral-600 shrink-0"
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <SkillBar
                  level={skill.level}
                  delay={0.15 + si * 0.07}
                  visible={isVisible}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Expand toggle */}
        {category.skills.length > 4 && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-4 flex items-center gap-1.5 text-xs text-neutral-600 hover:text-brand-400 transition-colors"
          >
            <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.div>
            {expanded ? "Show less" : `+${category.skills.length - 4} more`}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Floating tech bubbles for hero
const BUBBLE_TECHS = [
  { name: "Python", x: "8%", y: "20%", delay: 0 },
  { name: "Vue.js", x: "75%", y: "12%", delay: 0.1 },
  { name: "PostgreSQL", x: "88%", y: "55%", delay: 0.2 },
  { name: "AWS", x: "5%", y: "65%", delay: 0.3 },
  { name: "FastAPI", x: "60%", y: "80%", delay: 0.15 },
  { name: "ML", x: "30%", y: "88%", delay: 0.25 },
];

export default function TechStackPage() {
  return (
    <div className="pt-24 pb-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/4 rounded-full blur-3xl pointer-events-none" />

      {/* Floating tech labels */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none hidden lg:block">
        {BUBBLE_TECHS.map((t) => (
          <motion.div
            key={t.name}
            style={{ left: t.x, top: t.y, position: "absolute" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.06, 0.1, 0.06],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              delay: t.delay + 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-xs font-mono text-neutral-600 border border-white/5 px-2.5 py-1 rounded-full bg-white/2"
          >
            {t.name}
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-16">
          <SectionHeader
            label="Tech Stack"
            title="Tools of the trade"
            description="Technologies I reach for when building production systems — rated by hands-on proficiency. Core skills are highlighted."
          />

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { label: "Languages", count: "4" },
              { label: "Frameworks", count: "8+" },
              { label: "Databases", count: "2" },
              { label: "Cloud & DevOps", count: "5+" },
              { label: "ML Tools", count: "7+" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/4 border border-white/6"
              >
                <span className="text-sm font-bold text-brand-400">{s.count}</span>
                <span className="text-xs text-neutral-500">{s.label}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* All skill category cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {skillCategories.map((category, i) => (
            <CategoryCard key={category.name} category={category} index={i} />
          ))}
        </div>

        {/* Visual icon showcase */}
        <AnimatedSection delay={0.4} className="mb-8">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <h3 className="text-sm font-semibold text-neutral-200">Technology Ecosystem</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(techIconMap).map(([name, IconComp], i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.12, y: -2 }}
                  title={name}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/3 border border-white/6 hover:border-brand-500/25 hover:bg-white/5 transition-all cursor-default group"
                >
                  <IconComp size={24} />
                  <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Legend */}
        <AnimatedSection delay={0.5} className="mb-6">
          <div className="card p-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <span className="text-xs text-neutral-500">Core / highlighted skill</span>
            </div>
            {[
              { range: "90–100%", label: "Expert" },
              { range: "75–89%", label: "Proficient" },
              { range: "60–74%", label: "Working knowledge" },
            ].map(({ range, label }) => (
              <div key={range} className="flex items-center gap-2">
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
                <span className="text-xs text-neutral-600">
                  <span className="font-mono text-neutral-400">{range}</span> — {label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Currently learning */}
        <AnimatedSection delay={0.55}>
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
              </motion.div>
              <h3 className="text-sm font-semibold text-neutral-200">Currently Exploring</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {LEARNING.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="text-xs px-3 py-1.5 rounded-full bg-amber-500/8 border border-amber-500/15 text-amber-400 font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
