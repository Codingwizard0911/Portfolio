import type { Metadata } from "next";
import { Globe, Server, Database, Cloud, GitBranch, Layers } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Technical architecture of this portfolio — Next.js 15, FastAPI, PostgreSQL, and the deployment pipeline.",
};

const layers = [
  {
    icon: Globe,
    label: "Frontend Layer",
    color: "text-brand-400",
    bg: "bg-brand-500/10 border-brand-500/20",
    items: [
      { name: "Next.js 15 (App Router)", detail: "React Server Components + Streaming" },
      { name: "TypeScript", detail: "Full type safety end-to-end" },
      { name: "Tailwind CSS v4", detail: "CSS-first design system" },
      { name: "Framer Motion", detail: "Scroll-driven animations" },
      { name: "Geist / Inter fonts", detail: "Premium typographic system" },
    ],
  },
  {
    icon: Server,
    label: "API Layer",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    items: [
      { name: "FastAPI (Python)", detail: "Async REST API backend" },
      { name: "Pydantic v2", detail: "Request/response validation" },
      { name: "SQLAlchemy", detail: "ORM + migration management" },
      { name: "Alembic", detail: "Schema versioning" },
    ],
  },
  {
    icon: Database,
    label: "Data Layer",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    items: [
      { name: "Neon (PostgreSQL)", detail: "Serverless PostgreSQL with connection pooling" },
      { name: "contact_submissions", detail: "Name, email, message, timestamp" },
      { name: "page_views", detail: "Analytics — page, referrer, session hash" },
      { name: "resume_downloads", detail: "Download tracking with referrer" },
    ],
  },
  {
    icon: Cloud,
    label: "Infrastructure",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    items: [
      { name: "Vercel", detail: "Frontend hosting — Edge Runtime + ISR" },
      { name: "Railway", detail: "FastAPI backend via Docker" },
      { name: "Neon", detail: "Serverless PostgreSQL" },
      { name: "Cloudflare", detail: "DNS + CDN + DDoS protection" },
    ],
  },
  {
    icon: GitBranch,
    label: "CI/CD Pipeline",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
    items: [
      { name: "GitHub Actions", detail: "Trigger: push to main branch" },
      { name: "Type check + lint", detail: "tsc + ESLint must pass" },
      { name: "Vercel Deploy", detail: "Automatic preview + production deploy" },
      { name: "Railway Deploy", detail: "Docker build + container deploy" },
    ],
  },
  {
    icon: Layers,
    label: "Observability",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    items: [
      { name: "PostHog", detail: "Product analytics + session replay" },
      { name: "Vercel Analytics", detail: "Core Web Vitals + real user metrics" },
      { name: "Sentry", detail: "Error tracking (frontend + backend)" },
    ],
  },
];

const adrs = [
  {
    id: "ADR-001",
    title: "Next.js 15 App Router over Pages Router",
    status: "Accepted",
    rationale: "React Server Components reduce client JavaScript payload. Streaming + Suspense enable better perceived performance. App Router is the strategic direction from Vercel.",
  },
  {
    id: "ADR-002",
    title: "FastAPI over Node.js/Express for backend",
    status: "Accepted",
    rationale: "Python is the primary language — keeping backend in Python eliminates context switching. FastAPI provides async-first design, automatic OpenAPI docs, and Pydantic validation out of the box.",
  },
  {
    id: "ADR-003",
    title: "Neon (serverless PostgreSQL) over PlanetScale / Supabase",
    status: "Accepted",
    rationale: "PostgreSQL is the preferred database — Neon provides serverless branching, cold starts are acceptable for this use case, and the free tier covers expected traffic.",
  },
  {
    id: "ADR-004",
    title: "Static data files over CMS",
    status: "Accepted",
    rationale: "Portfolio content changes infrequently. TypeScript data files provide compile-time type safety, zero runtime overhead, and no external dependency. A CMS adds complexity without measurable benefit at this scale.",
  },
];

export default function ArchitecturePage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="mb-16">
          <SectionHeader
            label="Architecture"
            title="How this site is built"
            description="The technical architecture behind this portfolio — technology choices, deployment pipeline, and the reasoning behind each decision."
          />
        </AnimatedSection>

        {/* Diagram */}
        <AnimatedSection delay={0.1} className="mb-16">
          <div className="card p-8">
            <h2 className="text-sm font-semibold text-neutral-300 mb-6 uppercase tracking-wider">
              System Overview
            </h2>
            <div className="font-mono text-xs leading-loose text-neutral-400 overflow-x-auto">
              <pre className="whitespace-pre">{`
  ┌─────────────────────────────────────────────────────┐
  │                   USER / BROWSER                    │
  └────────────────────────┬────────────────────────────┘
                           │  HTTPS
                           ▼
  ┌─────────────────────────────────────────────────────┐
  │            CLOUDFLARE  (DNS + CDN + WAF)            │
  └────────────────────────┬────────────────────────────┘
                           │
           ┌───────────────┴──────────────────┐
           ▼                                  ▼
  ┌─────────────────┐               ┌─────────────────────┐
  │   VERCEL EDGE   │               │   RAILWAY (Docker)  │
  │  Next.js 15     │  REST API     │   FastAPI (Python)  │
  │  App Router     │◄─────────────►│   /api/v1/*         │
  │  RSC + ISR      │               │                     │
  └─────────────────┘               └─────────┬───────────┘
                                              │
                                              ▼
                                   ┌─────────────────────┐
                                   │   NEON (PostgreSQL) │
                                   │   Serverless        │
                                   │   contact_subs      │
                                   │   page_views        │
                                   └─────────────────────┘
              `}</pre>
            </div>
          </div>
        </AnimatedSection>

        {/* Layer breakdown */}
        <AnimatedSection delay={0.15} className="mb-16">
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-6">
            Stack Layers
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {layers.map((layer, i) => (
              <AnimatedSection key={layer.label} delay={0.1 + i * 0.07}>
                <div className="card p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${layer.bg}`}>
                      <layer.icon className={`w-4 h-4 ${layer.color}`} />
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-200">{layer.label}</h3>
                  </div>
                  <div className="space-y-2.5">
                    {layer.items.map((item) => (
                      <div key={item.name} className="flex items-start justify-between gap-3">
                        <span className="text-sm text-neutral-300 font-medium shrink-0">{item.name}</span>
                        <span className="text-xs text-neutral-600 text-right">{item.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* ADRs */}
        <AnimatedSection delay={0.4} className="mb-16">
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-6">
            Architecture Decision Records
          </h2>
          <div className="space-y-4">
            {adrs.map((adr, i) => (
              <AnimatedSection key={adr.id} delay={0.1 + i * 0.08}>
                <div className="card p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-neutral-600">{adr.id}</span>
                      <h3 className="text-sm font-semibold text-neutral-200">{adr.title}</h3>
                    </div>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
                      {adr.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">{adr.rationale}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Performance targets */}
        <AnimatedSection delay={0.55}>
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-neutral-200 mb-4">Performance Targets</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { metric: "Lighthouse Score", target: "95+" },
                { metric: "LCP", target: "< 2.5s" },
                { metric: "CLS", target: "< 0.1" },
                { metric: "TTI (4G)", target: "< 3s" },
              ].map((t) => (
                <div key={t.metric} className="text-center p-3 rounded-xl bg-white/3 border border-white/6">
                  <div className="text-xl font-bold text-gradient-brand mb-1">{t.target}</div>
                  <div className="text-xs text-neutral-500">{t.metric}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
