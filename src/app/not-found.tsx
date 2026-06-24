import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "404 — Page not found" };

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-3xl pointer-events-none" />

      {/* Big 404 */}
      <div className="relative mb-8 select-none">
        <span className="text-[clamp(120px,22vw,200px)] font-black leading-none text-white/[0.03] absolute inset-0 flex items-center justify-center pointer-events-none">
          404
        </span>
        <span className="relative text-[clamp(120px,22vw,200px)] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/60 via-brand-400/40 to-transparent not-found-glitch">
          404
        </span>
      </div>

      <div className="relative z-10 space-y-4 mb-10">
        <h1 className="text-2xl font-bold text-neutral-100">Page not found</h1>
        <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Maybe it&apos;s still being engineered.
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm transition-all hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]"
        >
          ← Back to home
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/8 hover:bg-white/8 text-neutral-200 font-medium text-sm transition-all"
        >
          View projects
        </Link>
      </div>

      {/* Fun hint */}
      <p className="relative z-10 mt-12 text-xs text-neutral-700">
        Tip: press <kbd className="font-mono bg-white/6 border border-white/10 px-1.5 py-0.5 rounded text-neutral-500">Ctrl+K</kbd> to navigate anywhere
      </p>
    </div>
  );
}
