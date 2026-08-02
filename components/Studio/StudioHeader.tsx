export default function StudioHeader() {
  return (
    <header className="flex min-h-16 items-center justify-between gap-4 border-b border-white/10 bg-[#0d1014] px-4 py-3 sm:px-6 sm:py-0">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/10 font-serif text-sm font-bold text-amber-300">
          ISC
        </div>
        <div className="min-w-0">
          <h1 className="truncate font-serif text-sm tracking-[0.12em] text-white sm:text-lg sm:tracking-[0.18em]">
            ICONIC SPORTS COMPLEXES
          </h1>
          <p className="hidden text-[10px] uppercase tracking-[0.28em] text-white/40 sm:block">
            Collector Poster Studio
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-xs sm:gap-3">
        <span role="status" className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-emerald-300 sm:inline-flex">
          Engine ready
        </span>
        <button
          type="button"
          disabled
          title="Settings are not available in this version"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/70 opacity-60 sm:px-4"
        >
          Settings
        </button>
      </div>
    </header>
  );
}
