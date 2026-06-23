import type { Metadata } from "next";
import { Bot, Zap, Code2, Bug, BookOpen, FileCode, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "AI Lab",
  description:
    "How Umapathi R integrates AI tools like Claude Code and ChatGPT into the engineering workflow.",
};

const workflows = [
  {
    icon: Code2,
    title: "Development Workflow",
    description:
      "Claude Code handles boilerplate generation, component scaffolding, and first-draft implementations — freeing me to focus on architecture decisions and business logic. I use Claude for greenfield setup and ChatGPT for quick syntax lookups.",
    tools: ["Claude Code", "ChatGPT"],
    gains: [
      "Component generation in seconds not minutes",
      "Consistent code patterns across large files",
      "Faster API integration with type-safe contracts",
    ],
  },
  {
    icon: Bug,
    title: "Debugging Workflow",
    description:
      "When I hit a wall, I use Claude to reason through error traces — especially for complex multi-layer issues (e.g., ML pipeline failures, database query edge cases). The model's ability to hold context across a long trace outperforms documentation search.",
    tools: ["Claude Code", "Claude.ai"],
    gains: [
      "Faster error root-cause identification",
      "Cross-layer debugging (DB → API → Frontend)",
      "Better Python stack trace interpretation",
    ],
  },
  {
    icon: Bot,
    title: "Architecture Workflow",
    description:
      "Before committing to a design, I use Claude as a sounding board — describing the constraints and asking it to surface trade-offs I might miss. I treat the output as a peer review, not a final answer.",
    tools: ["Claude.ai", "Claude Code /architect"],
    gains: [
      "Trade-off analysis for database schema decisions",
      "API design review before implementation",
      "Infrastructure option comparison",
    ],
  },
  {
    icon: FileCode,
    title: "Documentation Workflow",
    description:
      "I use AI to draft READMEs, API docs, and research paper sections from my notes and code. I always review and edit — AI produces the structure, I provide the judgment.",
    tools: ["Claude.ai", "ChatGPT"],
    gains: [
      "README drafts from code context",
      "API endpoint documentation from type definitions",
      "Research methodology section drafts",
    ],
  },
  {
    icon: BookOpen,
    title: "Learning & Research Workflow",
    description:
      "When entering a new domain (e.g., transit analytics, DevSecOps), I use Claude to build an initial mental model — then verify with primary sources. It reduces the time-to-understanding for new concepts significantly.",
    tools: ["Claude.ai", "Perplexity"],
    gains: [
      "Faster domain orientation",
      "Concept clarification with worked examples",
      "Literature summarization for research papers",
    ],
  },
  {
    icon: Zap,
    title: "Code Review & Refactoring",
    description:
      "I paste code blocks into Claude for pre-commit review — it reliably catches type inconsistencies, missing edge cases, and naming issues. It's become a lightweight second pair of eyes before PRs.",
    tools: ["Claude Code /code-review", "Claude.ai"],
    gains: [
      "Catches obvious bugs before review",
      "Naming and readability suggestions",
      "Security anti-pattern detection",
    ],
  },
];

const metrics = [
  { label: "Faster feature scaffolding", value: "3–5×" },
  { label: "Reduction in boilerplate time", value: "~60%" },
  { label: "Debug session length", value: "↓ 40%" },
  { label: "Documentation quality", value: "↑ significantly" },
];

export default function AILabPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-6">
          <SectionHeader
            label="AI Lab"
            title="AI-augmented engineering"
            description="How I integrate Claude Code, ChatGPT, and other AI tools into my daily engineering workflow — not as shortcuts, but as force multipliers."
          />
        </AnimatedSection>

        {/* Philosophy */}
        <AnimatedSection delay={0.1} className="mb-12">
          <div className="card p-6 border-l-2 border-brand-500">
            <p className="text-base text-neutral-300 leading-relaxed">
              <span className="text-neutral-100 font-medium">My principle:</span>{" "}
              AI handles the mechanical, I handle the meaningful. I never let AI make architectural decisions or commit without review — but I let it handle anything repetitive, generative, or research-oriented so I can spend more time on judgment-intensive work.
            </p>
          </div>
        </AnimatedSection>

        {/* Workflows */}
        <AnimatedSection delay={0.15} className="mb-16">
          <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-6">
            Workflows
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {workflows.map((wf, i) => (
              <AnimatedSection key={wf.title} delay={0.1 + i * 0.08}>
                <div className="card p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/15 flex items-center justify-center shrink-0">
                      <wf.icon className="w-4.5 h-4.5 text-brand-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-100">{wf.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4">{wf.description}</p>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {wf.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Gains */}
                  <div className="space-y-1.5">
                    {wf.gains.map((gain, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-brand-500 mt-0.5 shrink-0" />
                        <span className="text-xs text-neutral-500">{gain}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Metrics */}
        <AnimatedSection delay={0.4} className="mb-16">
          <div className="text-xs text-neutral-500 uppercase tracking-widest font-medium mb-6">
            Productivity Impact (Estimated)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((m, i) => (
              <AnimatedSection key={m.label} delay={0.1 + i * 0.07}>
                <div className="card p-5 text-center">
                  <div className="text-2xl font-bold text-gradient-brand mb-2">{m.value}</div>
                  <div className="text-xs text-neutral-500 leading-relaxed">{m.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Tools used */}
        <AnimatedSection delay={0.5}>
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-neutral-200 mb-4">Tools in the stack</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  name: "Claude Code",
                  description: "Primary AI pair programmer — architecture, code review, debugging",
                  tag: "Daily driver",
                },
                {
                  name: "ChatGPT",
                  description: "Quick lookups, syntax clarification, documentation drafts",
                  tag: "Secondary",
                },
                {
                  name: "Perplexity",
                  description: "Research and domain exploration with source verification",
                  tag: "Research",
                },
              ].map((tool) => (
                <div key={tool.name} className="p-4 rounded-xl bg-white/3 border border-white/6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-200">{tool.name}</span>
                    <span className="text-[10px] text-neutral-600 bg-white/4 px-2 py-0.5 rounded-full">
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
