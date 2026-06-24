export default function Loading() {
  return (
    <div className="relative min-h-screen pt-20 overflow-hidden">
      {/* Dot grid */}
      <div className="fixed inset-0 bg-grid-dots pointer-events-none" />

      {/* Hero skeleton */}
      <section className="relative min-h-screen flex items-center">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">

          {/* Profile image skeleton — desktop right */}
          <div className="absolute top-24 right-8 hidden lg:block">
            <div className="w-44 h-44 rounded-full shimmer" />
          </div>

          <div className="max-w-4xl space-y-7">
            {/* Status badge */}
            <div className="shimmer h-7 w-48 rounded-full" />

            {/* Headline lines */}
            <div className="space-y-4">
              <div className="shimmer h-16 w-4/5 rounded-2xl" />
              <div className="shimmer h-16 w-3/5 rounded-2xl" />
              <div className="shimmer h-16 w-2/3 rounded-2xl" />
            </div>

            {/* Sub text */}
            <div className="space-y-2.5 max-w-2xl">
              <div className="shimmer h-5 w-full rounded-lg" />
              <div className="shimmer h-5 w-11/12 rounded-lg" />
              <div className="shimmer h-5 w-3/4 rounded-lg" />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <div className="shimmer h-12 w-44 rounded-xl" />
              <div className="shimmer h-12 w-36 rounded-xl" />
              <div className="shimmer h-12 w-32 rounded-xl" />
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="shimmer w-5 h-5 rounded-full" />
              ))}
              <div className="shimmer h-4 w-px rounded" />
              <div className="shimmer h-4 w-44 rounded-full" />
            </div>

            {/* Core stack badges */}
            <div className="flex flex-wrap gap-2">
              {[80, 110, 100, 75, 90, 60, 85, 105, 115].map((w, i) => (
                <div key={i} className="shimmer h-6 rounded-full" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats row skeleton */}
      <section className="border-y border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="shimmer h-10 w-16 rounded-xl" />
                <div className="shimmer h-4 w-24 rounded-lg" />
                <div className="shimmer h-3 w-32 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cards skeleton */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-3">
            <div className="shimmer h-3 w-24 rounded" />
            <div className="shimmer h-9 w-64 rounded-xl" />
            <div className="shimmer h-5 w-96 rounded-lg" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card p-6 space-y-3">
                <div className="shimmer w-10 h-10 rounded-xl" />
                <div className="shimmer h-5 w-3/4 rounded-lg" />
                <div className="space-y-2">
                  <div className="shimmer h-4 w-full rounded" />
                  <div className="shimmer h-4 w-5/6 rounded" />
                </div>
                <div className="flex gap-2">
                  {[60, 80, 70].map((w, j) => (
                    <div key={j} className="shimmer h-5 rounded-full" style={{ width: `${w}px` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
