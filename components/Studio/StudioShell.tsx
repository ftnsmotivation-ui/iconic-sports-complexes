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
      {header}
      <section className="grid min-h-[calc(100vh-64px)] grid-cols-[300px_minmax(500px,1fr)_280px]">
        <aside className="border-r border-white/10 bg-[#0d1014] p-5">
          {sidebar}
        </aside>
        {preview}
        <aside className="border-l border-white/10 bg-[#0d1014] p-5">
          {inspector}
        </aside>
      </section>
    </main>
  );
}
