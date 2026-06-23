import type { Metadata } from "next";
import { Clock, Tag } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";
import { blogIdeas } from "@/lib/data/blog-ideas";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering articles by Umapathi R — ML pipelines, database design, full stack architecture, and developer productivity.",
};

const difficultyColors = {
  beginner: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  intermediate: "bg-brand-500/10 text-brand-400 border border-brand-500/20",
  advanced: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

export default function BlogPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-6">
          <SectionHeader
            label="Blog"
            title="Writing & ideas"
            description="Engineering articles on ML pipelines, database design, full stack architecture, and developer productivity. Coming soon."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-12">
          <div className="card p-5 flex items-center gap-4 border-brand-500/20">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <p className="text-sm text-neutral-400">
              Articles are in progress. Below are the topics I&apos;m writing about — subscribe to be notified when they publish.
            </p>
          </div>
        </AnimatedSection>

        {/* Article ideas */}
        <div className="space-y-3">
          {blogIdeas.map((idea, i) => (
            <AnimatedSection key={idea.id} delay={0.05 + i * 0.04}>
              <div className="card p-5 group opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${difficultyColors[idea.difficulty]}`}
                      >
                        {idea.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-neutral-600">
                        <Clock className="w-3 h-3" /> {idea.readTime}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-200 mb-1.5 group-hover:text-neutral-50 transition-colors">
                      {idea.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed mb-3">
                      {idea.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {idea.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-white/4 border border-white/6 text-neutral-500"
                        >
                          <Tag className="w-2.5 h-2.5" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 mt-1">
                    <span className="text-xs text-neutral-700 bg-white/3 px-2.5 py-1 rounded-full">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </div>
  );
}
