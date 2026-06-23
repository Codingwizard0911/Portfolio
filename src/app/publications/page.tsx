import type { Metadata } from "next";
import { BookOpen, CheckCircle2, FlaskConical } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";
import TechBadge from "@/components/shared/TechBadge";
import { publications } from "@/lib/data/publications";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Research publications by Umapathi R — ML-driven predictive analytics and web traffic analysis in international journals.",
};

export default function PublicationsPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-16">
          <SectionHeader
            label="Research"
            title="Published work"
            description="Peer-reviewed research in machine learning, data analytics, and intelligent systems — published in international journals."
          />
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/4 border border-white/6">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-neutral-300">2 Publications</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/4 border border-white/6">
              <FlaskConical className="w-4 h-4 text-brand-400" />
              <span className="text-sm text-neutral-300">International Journals</span>
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-10">
          {publications.map((pub, i) => (
            <AnimatedSection key={pub.id} delay={0.1 + i * 0.15}>
              <article className="card p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-neutral-50 leading-tight mb-2">
                      {pub.title}
                    </h2>
                    <p className="text-sm text-indigo-400 font-medium italic mb-1">
                      {pub.journalFull}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-neutral-600">
                      <span>{pub.journal}</span>
                      <span>·</span>
                      <span>{pub.date}</span>
                    </div>
                  </div>
                </div>

                {/* Abstract */}
                <div className="mb-6">
                  <h3 className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-2">Abstract</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">{pub.abstract}</p>
                </div>

                {/* Problem */}
                <div className="mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <h3 className="text-xs text-amber-500 uppercase tracking-wider font-medium mb-2">Research Problem</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{pub.problem}</p>
                </div>

                {/* Methodology */}
                <div className="mb-6">
                  <h3 className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-3">Methodology</h3>
                  <div className="space-y-2">
                    {pub.methodology.map((step, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] text-brand-400 font-bold">{j + 1}</span>
                        </div>
                        <span className="text-sm text-neutral-400">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h3 className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-3">Key Results</h3>
                  <div className="space-y-2">
                    {pub.results.map((r, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-neutral-300">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div className="mb-6 p-4 rounded-xl bg-brand-500/5 border border-brand-500/10">
                  <h3 className="text-xs text-brand-500 uppercase tracking-wider font-medium mb-2">Impact</h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">{pub.impact}</p>
                </div>

                {/* Keywords */}
                <div>
                  <h3 className="text-xs text-neutral-500 uppercase tracking-wider font-medium mb-2">Keywords</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {pub.keywords.map((kw) => (
                      <TechBadge key={kw} name={kw} size="sm" variant="purple" />
                    ))}
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </div>
  );
}
