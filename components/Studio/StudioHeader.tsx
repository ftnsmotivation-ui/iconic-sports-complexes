export default function StudioHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0d1014] px-6">
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10 font-serif text-sm font-bold text-amber-300">
          ISC
        </div>
        <div>
          <h1 className="font-serif text-lg tracking-[0.18em] text-white">
            ICONIC SPORTS COMPLEXES
          </h1>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">
            Collector Poster Studio
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-emerald-300">
          Engine ready
        </span>
        <button
          type="button"
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          Settings
        </button>
      </div>
    </header>
  );
}
