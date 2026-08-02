import type { StudioStyle } from "../Sidebar/StylePanel";

interface PreviewToolbarProps {
  venueName: string | undefined;
  selectedStyle: StudioStyle;
}

export default function PreviewToolbar({ venueName, selectedStyle }: PreviewToolbarProps) {
  return (
    <div className="flex h-14 items-center justify-between border-b border-white/10 px-6">
      <div>
        <p className="text-xs font-semibold text-white">Live poster preview</p>
        <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/35">
          {venueName ?? "No venue selected"} · {selectedStyle}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ToolbarButton label="Fit" />
        <ToolbarButton label="50%" />
        <ToolbarButton label="Grid" />
      </div>
    </div>
  );
}

function ToolbarButton({ label }: { label: string }) {
  return (
    <button type="button" className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-white/50 transition hover:bg-white/10 hover:text-white">
      {label}
    </button>
  );
}
