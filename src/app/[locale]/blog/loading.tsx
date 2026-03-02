export default function BlogLoading() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero skeleton */}
      <section className="py-24 relative overflow-hidden bg-[#111111]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="h-6 w-40 bg-white/8 rounded-full mx-auto animate-pulse" />
          <div className="h-10 w-72 bg-white/8 rounded-xl mx-auto animate-pulse" />
          <div className="h-5 w-96 bg-white/5 rounded-lg mx-auto animate-pulse" />
        </div>
      </section>

      {/* Category tabs skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-3 flex-wrap">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-9 w-28 bg-white/8 rounded-xl animate-pulse" />
        ))}
      </div>

      {/* Cards skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#1C1C1C] border border-white/8 rounded-2xl overflow-hidden animate-pulse">
              <div className="h-44 bg-white/8" />
              <div className="p-6 space-y-3">
                <div className="h-3 w-24 bg-white/8 rounded" />
                <div className="h-5 w-full bg-white/10 rounded" />
                <div className="h-5 w-3/4 bg-white/8 rounded" />
                <div className="h-4 w-full bg-white/5 rounded" />
                <div className="h-4 w-2/3 bg-white/5 rounded" />
                <div className="h-4 w-16 bg-[#F47920]/20 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
