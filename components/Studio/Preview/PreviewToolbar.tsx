import type { StudioStyle } from "../Sidebar/StylePanel";

export type PreviewZoom = "fit" | 0.25 | 0.5 | 0.75 | 1;

interface PreviewToolbarProps {
  venueName: string | undefined;
  selectedStyle: StudioStyle;
  zoom: PreviewZoom;
  showGrid: boolean;
  showSafeMargin: boolean;
  showGuides: boolean;
  onZoomChange: (zoom: PreviewZoom) => void;
  onGridToggle: () => void;
  onSafeMarginToggle: () => void;
  onGuidesToggle: () => void;
}

const zoomPresets: readonly Exclude<PreviewZoom, "fit">[] = [0.25, 0.5, 0.75, 1];

export default function PreviewToolbar({
  venueName,
  selectedStyle,
  zoom,
  showGrid,
  showSafeMargin,
  showGuides,
  onZoomChange,
  onGridToggle,
  onSafeMarginToggle,
  onGuidesToggle,
}: PreviewToolbarProps) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 overflow-x-auto border-b border-white/10 px-4 py-2 2xl:px-6">
      <div className="shrink-0">
        <p className="text-xs font-semibold text-white">Live poster preview</p>
        <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/35">
          {venueName ?? "No venue selected"} · {selectedStyle}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5" role="toolbar" aria-label="Preview display controls">
        <ToolbarButton label="Fit" active={zoom === "fit"} onClick={() => onZoomChange("fit")} />
        {zoomPresets.map((preset) => (
          <ToolbarButton
            key={preset}
            label={`${preset * 100}%`}
            active={zoom === preset}
            onClick={() => onZoomChange(preset)}
          />
        ))}
        <span className="mx-1 h-5 w-px bg-white/10" aria-hidden="true" />
        <ToolbarButton label="Grid" accessibleLabel="Toggle layout grid" active={showGrid} onClick={onGridToggle} />
        <ToolbarButton label="Safe" accessibleLabel="Toggle safe margin" active={showSafeMargin} onClick={onSafeMarginToggle} />
        <ToolbarButton label="Guides" active={showGuides} onClick={onGuidesToggle} />
      </div>
    </div>
  );
}

interface ToolbarButtonProps {
  label: string;
  accessibleLabel?: string;
  active: boolean;
  onClick: () => void;
}

function ToolbarButton({ label, accessibleLabel, active, onClick }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={accessibleLabel ?? label}
      onClick={onClick}
      className={[
        "rounded-md border px-2.5 py-1.5 text-[10px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300",
        active
          ? "border-amber-300/45 bg-amber-300/12 text-amber-200"
          : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
