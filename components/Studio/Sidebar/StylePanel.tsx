import CinematicHeroPoster from "@/components/PosterGenerator/CinematicHeroPoster";
import type { PosterModel } from "@/components/PosterGenerator/PosterModel";
import type { PosterStyleId } from "@/components/PosterGenerator/PosterStyleProfiles";

import { PanelHeading } from "./VenuePanel";

export type StudioStyle = PosterStyleId;

interface StyleOption {
  id: StudioStyle;
  name: string;
  description: string;
}

interface StylePanelProps {
  selectedStyle: StudioStyle;
  posterModel: PosterModel | null;
  onStyleChange: (style: StudioStyle) => void;
}

const styleOptions: readonly StyleOption[] = [
  {
    id: "collector",
    name: "Collector",
    description: "Dark, cinematic and luxurious.",
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Refined typography and calm spacing.",
  },
  {
    id: "atlas",
    name: "Atlas",
    description: "Maps, diagrams and archival detail.",
  },
];

export default function StylePanel({ selectedStyle, posterModel, onStyleChange }: StylePanelProps) {
  return (
    <>
      <div className="my-7 h-px bg-white/10" />
      <PanelHeading number="02" title="Style" description="Select the visual direction." />
      <div className="mt-5 space-y-3">
        {styleOptions.map((style) => (
          <StyleCard
            key={style.id}
            style={style}
            selected={selectedStyle === style.id}
            posterModel={posterModel}
            onSelect={onStyleChange}
          />
        ))}
      </div>
      <button type="button" className="mt-7 w-full rounded-lg bg-amber-300 px-4 py-3 text-sm font-bold text-[#19150b] transition hover:bg-amber-200">
        Generate Poster
      </button>
    </>
  );
}

interface StyleCardProps {
  style: StyleOption;
  selected: boolean;
  posterModel: PosterModel | null;
  onSelect: (style: StudioStyle) => void;
}

function StyleCard({ style, selected, posterModel, onSelect }: StyleCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(style.id)}
      className={[
        "group w-full rounded-xl border p-2.5 text-left transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1014]",
        selected
          ? "border-amber-300/60 bg-amber-300/10 shadow-[0_0_0_1px_rgba(252,211,77,0.08)]"
          : "border-white/8 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.055]",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <StyleThumbnail style={style.id} posterModel={posterModel} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className={selected ? "text-sm font-semibold text-amber-200" : "text-sm font-semibold text-white/80"}>
              {style.name}
            </span>
            <span
              aria-hidden="true"
              className={[
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition",
                selected
                  ? "border-amber-200 bg-amber-300 text-[#19150b]"
                  : "border-white/25 group-hover:border-white/40",
              ].join(" ")}
            >
              {selected && <span className="text-[9px] font-bold leading-none">✓</span>}
            </span>
          </div>
          <p className="mt-1 truncate text-[10px] leading-4 text-white/40">
            {style.description}
          </p>
        </div>
      </div>
    </button>
  );
}

function StyleThumbnail({ style, posterModel }: { style: StudioStyle; posterModel: PosterModel | null }) {
  return (
    <span
      aria-hidden="true"
      className="relative block h-[68px] w-[48px] shrink-0 overflow-hidden rounded-sm border border-white/15 bg-[#080b0c] shadow-lg"
    >
      {posterModel ? (
        <span
          className="pointer-events-none absolute left-0 top-0 block h-[1100px] w-[800px] origin-top-left"
          style={{ transform: "scale(0.06)" }}
        >
          <CinematicHeroPoster model={{ ...posterModel, styleId: style }} />
        </span>
      ) : (
        <span className="absolute inset-2 animate-pulse border border-white/10 bg-white/5" />
      )}
    </span>
  );
}
