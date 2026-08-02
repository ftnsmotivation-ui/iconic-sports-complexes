import type { ReactNode } from "react";

interface StudioShellProps {
  header: ReactNode;
  sidebar: ReactNode;
  preview: ReactNode;
  inspector: ReactNode;
}

export default function StudioShell({
  header,
  sidebar,
  preview,
  inspector,
}: StudioShellProps) {
  return (
    <main className="min-h-screen bg-[#090b0e] text-[#eee9df]">
      <a href="#studio-preview" className="sr-only z-50 rounded-md bg-amber-300 px-4 py-2 font-semibold text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to poster preview</a>
      {header}
      <section className="flex min-h-[calc(100vh-64px)] flex-col lg:grid lg:grid-cols-[280px_minmax(0,1fr)] xl:h-[calc(100vh-64px)] xl:min-h-0 xl:grid-cols-[280px_minmax(0,1fr)_260px] 2xl:grid-cols-[300px_minmax(0,1fr)_280px]">
        <aside aria-label="Venue and style controls" className="border-b border-white/10 bg-[#0d1014] p-5 lg:border-b-0 lg:border-r xl:overflow-y-auto">
          {sidebar}
        </aside>
        {preview}
        <aside aria-label="Poster settings and export controls" className="border-t border-white/10 bg-[#0d1014] p-5 lg:col-span-2 xl:col-span-1 xl:overflow-y-auto xl:border-l xl:border-t-0">
          {inspector}
        </aside>
      </section>
    </main>
  );
}
