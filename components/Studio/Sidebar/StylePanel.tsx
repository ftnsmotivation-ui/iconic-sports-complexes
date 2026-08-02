import { PanelHeading } from "./VenuePanel";

export type StudioStyle = "collector" | "editorial" | "atlas";

interface StyleOption {
  id: StudioStyle;
  name: string;
  description: string;
}

interface StylePanelProps {
  selectedStyle: StudioStyle;
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

export default function StylePanel({ selectedStyle, onStyleChange }: StylePanelProps) {
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
  onSelect: (style: StudioStyle) => void;
}

function StyleCard({ style, selected, onSelect }: StyleCardProps) {
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
        <StyleThumbnail style={style.id} />
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

function StyleThumbnail({ style }: { style: StudioStyle }) {
  if (style === "collector") {
    return (
      <span aria-hidden="true" className="relative block h-[68px] w-[48px] shrink-0 overflow-hidden rounded-sm border border-[#b89450]/70 bg-[#111419] shadow-lg">
        <span className="absolute inset-[4px] border border-[#9b783e]/45" />
        <span className="absolute left-[8px] right-[8px] top-[11px] h-px bg-[#d1ad63]/55" />
        <span className="absolute left-[8px] top-[17px] h-[3px] w-[25px] bg-[#eee3c9]/90" />
        <span className="absolute left-[8px] top-[23px] h-px w-[16px] bg-[#d1ad63]/70" />
        <span className="absolute bottom-[10px] left-[8px] right-[8px] h-[20px] bg-gradient-to-t from-[#06080b] to-[#29303a]" />
        <span className="absolute bottom-[14px] left-[13px] h-[7px] w-[22px] border-t border-[#d1ad63]/45" />
      </span>
    );
  }

  if (style === "editorial") {
    return (
      <span aria-hidden="true" className="relative block h-[68px] w-[48px] shrink-0 overflow-hidden rounded-sm border border-[#d9d0bc] bg-[#eee9dd] shadow-lg">
        <span className="absolute left-[7px] top-[8px] text-[4px] font-bold uppercase tracking-[0.16em] text-[#a36d48]">Studio</span>
        <span className="absolute left-[7px] top-[17px] h-[4px] w-[29px] bg-[#202326]" />
        <span className="absolute left-[7px] top-[24px] h-[2px] w-[20px] bg-[#202326]/80" />
        <span className="absolute left-[7px] top-[31px] h-px w-[33px] bg-[#202326]/25" />
        <span className="absolute bottom-[10px] left-[7px] h-[17px] w-[20px] bg-[#b9b3a8]" />
        <span className="absolute bottom-[10px] right-[7px] h-[12px] w-[9px] border-l border-[#202326]/35" />
      </span>
    );
  }

  return (
    <span aria-hidden="true" className="relative block h-[68px] w-[48px] shrink-0 overflow-hidden rounded-sm border border-[#9b8d73] bg-[#aaa087] shadow-lg">
      <span className="absolute inset-0 bg-[linear-gradient(rgba(45,53,54,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(45,53,54,0.14)_1px,transparent_1px)] bg-[size:8px_8px]" />
      <span className="absolute left-[6px] top-[6px] font-mono text-[3px] uppercase tracking-wider text-[#303a3a]">51.50° N</span>
      <span className="absolute left-[7px] top-[20px] h-[25px] w-[31px] rotate-[-8deg] rounded-[50%] border border-[#344140]/65" />
      <span className="absolute left-[12px] top-[25px] h-[14px] w-[21px] rotate-[13deg] border-y border-[#344140]/45" />
      <span className="absolute bottom-[7px] right-[6px] font-mono text-[3px] tracking-wider text-[#303a3a]">ARCHIVE 03</span>
    </span>
  );
}
