import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Brain, Music, MapPin } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Now",
  description: "What Umapathi R is currently working on, learning, and thinking about.",
};

const NOW_DATA = {
  updatedAt: "June 2026",
  building: [
    {
      icon: Code2,
      title: "This Portfolio",
      detail: "Continuously improving this portfolio with new interactive features, better performance, and richer content.",
    },
    {
      icon: Brain,
      title: "AI-Powered Features",
      detail: "Experimenting with integrating LLM capabilities into web applications — smarter chatbots, content generation, and intelligent search.",
    },
  ],
  learning: [
    "Next.js App Router patterns and React Server Components",
    "Advanced PostgreSQL — window functions, CTEs, query optimization",
    "Machine Learning model deployment with FastAPI + Docker",
    "System design at scale — distributed systems, caching, queues",
  ],
  reading: [
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
    { title: "Clean Architecture", author: "Robert C. Martin" },
  ],
  listening: [
    "Lo-fi hip hop while coding",
    "Lex Fridman Podcast",
    "Pragmatic Engineer",
  ],
  location: "Dharmapuri, Tamil Nadu, India",
  openTo: [
    "Full Stack Engineering roles (remote or hybrid)",
    "Backend / API Engineering positions",
    "AI / ML Engineering opportunities",
    "Data Engineering and Analytics roles",
  ],
};

export default function NowPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">Live · Updated {NOW_DATA.updatedAt}</span>
          </div>
          <SectionHeader
            label="Now"
            title="What I'm up to"
            description={`A snapshot of what I'm working on, learning, and thinking about right now. Inspired by nownownow.com.`}
          />
        </AnimatedSection>

        <div className="space-y-10">

          {/* Location + status */}
          <AnimatedSection delay={0.05}>
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-4 h-4 text-brand-400" />
                <h2 className="text-sm font-semibold text-neutral-100">Where I am</h2>
              </div>
              <p className="text-sm text-neutral-400">{NOW_DATA.location}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400">Open to remote opportunities globally</span>
              </div>
            </div>
          </AnimatedSection>

          {/* Building */}
          <AnimatedSection delay={0.1}>
            <h2 className="text-sm font-semibold text-neutral-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-brand-400" /> Building
            </h2>
            <div className="space-y-3">
              {NOW_DATA.building.map((item) => (
                <div key={item.title} className="card p-5 flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/15 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-200 mb-1">{item.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Learning */}
          <AnimatedSection delay={0.15}>
            <h2 className="text-sm font-semibold text-neutral-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" /> Learning
            </h2>
            <div className="card p-5">
              <ul className="space-y-2.5">
                {NOW_DATA.learning.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-400">
                    <div className="w-1 h-1 rounded-full bg-purple-400 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Reading */}
          <AnimatedSection delay={0.2}>
            <h2 className="text-sm font-semibold text-neutral-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" /> Reading
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {NOW_DATA.reading.map((book) => (
                <div key={book.title} className="card p-4">
                  <div className="text-sm font-medium text-neutral-200 mb-1">{book.title}</div>
                  <div className="text-xs text-neutral-600">{book.author}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Listening */}
          <AnimatedSection delay={0.22}>
            <h2 className="text-sm font-semibold text-neutral-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Music className="w-4 h-4 text-orange-400" /> Listening to
            </h2>
            <div className="card p-5">
              <ul className="space-y-2.5">
                {NOW_DATA.listening.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-400">
                    <div className="w-1 h-1 rounded-full bg-orange-400 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Open to */}
          <AnimatedSection delay={0.25}>
            <div className="card p-6 border-brand-500/20 bg-brand-500/5">
              <h2 className="text-sm font-semibold text-brand-300 mb-3">Open to</h2>
              <ul className="space-y-2">
                {NOW_DATA.openTo.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-400">
                    <div className="w-1 h-1 rounded-full bg-brand-400 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-white/5 flex gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Get in touch <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  View resume <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  );
}
