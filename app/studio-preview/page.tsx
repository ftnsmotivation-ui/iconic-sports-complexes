"use client";

import { useEffect, useState } from "react";

import CinematicHeroPoster from "@/components/PosterGenerator/CinematicHeroPoster";

type StudioStyle = "collector" | "editorial" | "atlas";

interface StudioVenue {
  sport?: string;
  competition: string;
  venueName: string;
  city: string;
  country: string;
  opened: number | string;
  capacity: number | string;
  surface?: string;
  architect?: string;
  collectorNumber?: number;
  nickname?: string;
  famousFor?: string;
  iconicMoments?: string;
  inscription?: string;
  heroImageHref?: string;
  [key: string]: unknown;
}

const sports = [
  "Formula 1",
  "Football",
  "Cricket",
  "Tennis",
  "Golf",
  "Rugby",
  "Olympic Venues",
  "Boxing",
];

const posterParameters = [
  "Venue facts",
  "Venue map",
  "Country flag",
  "Compass rose",
  "Historic moments",
  "Collector number",
];

export default function StudioPreviewPage() {
  const [selectedSport, setSelectedSport] = useState("Cricket");
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<StudioVenue | null>(null);
  const [competitions, setCompetitions] = useState<string[]>([]);
  const [venues, setVenues] = useState<StudioVenue[]>([]);
  const [selectedStyle, setSelectedStyle] =
    useState<StudioStyle>("collector");
  const [selectedParameters, setSelectedParameters] = useState<string[]>([
    "Venue facts",
    "Venue map",
    "Collector number",
  ]);
  const [loading, setLoading] = useState(false);
  const [catalogueError, setCatalogueError] = useState("");

  useEffect(() => {
    async function loadCompetitions() {
      setLoading(true);
      setCatalogueError("");
      setSelectedCompetition("");
      setSelectedVenue(null);
      setVenues([]);
      try {
        const response = await fetch(
          `/api/competitions?sport=${encodeURIComponent(selectedSport)}`
        );
        if (!response.ok) throw new Error("Unable to load competitions.");
        const data = await response.json();
        const items: string[] = data.competitions ?? [];
        setCompetitions(items);
        setSelectedCompetition(items[0] ?? "");
      } catch (error) {
        setCatalogueError(
          error instanceof Error ? error.message : "Unable to load competitions."
        );
      } finally {
        setLoading(false);
      }
    }
    void loadCompetitions();
  }, [selectedSport]);

  useEffect(() => {
    if (!selectedCompetition) return;
    async function loadVenues() {
      setLoading(true);
      setCatalogueError("");
      setSelectedVenue(null);
      try {
        const response = await fetch(
          `/api/venues?sport=${encodeURIComponent(selectedSport)}&competition=${encodeURIComponent(selectedCompetition)}`
        );
        if (!response.ok) throw new Error("Unable to load venues.");
        const data = await response.json();
        const items: StudioVenue[] = data.venues ?? [];
        setVenues(items);
        setSelectedVenue(items[0] ?? null);
      } catch (error) {
        setCatalogueError(
          error instanceof Error ? error.message : "Unable to load venues."
        );
      } finally {
        setLoading(false);
      }
    }
    void loadVenues();
  }, [selectedCompetition, selectedSport]);

  const toggleParameter = (parameter: string) => {
    setSelectedParameters((current) =>
      current.includes(parameter)
        ? current.filter((item) => item !== parameter)
        : [...current, parameter]
    );
  };

  return (
    <main className="min-h-screen bg-[#090b0e] text-[#eee9df]">
      {/* Top application bar */}
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

      {/* Three-column studio workspace */}
      <section className="grid min-h-[calc(100vh-64px)] grid-cols-[300px_minmax(500px,1fr)_280px]">
        {/* Left control panel */}
        <aside className="border-r border-white/10 bg-[#0d1014] p-5">
          <PanelHeading
            number="01"
            title="Venue"
            description="Choose the sporting landmark."
          />

          <label className="mt-6 block">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Sport</span>
            <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none transition focus:border-amber-400/60">
              {sports.map((sport) => <option key={sport} value={sport}>{sport}</option>)}
            </select>
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Competition</span>
            <select value={selectedCompetition} disabled={loading || competitions.length === 0}
              onChange={(e) => setSelectedCompetition(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none transition focus:border-amber-400/60 disabled:opacity-50">
              {competitions.length === 0 ? <option value="">No competitions available</option> :
                competitions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Venue</span>
            <select value={selectedVenue?.venueName ?? ""} disabled={loading || venues.length === 0}
              onChange={(e) => setSelectedVenue(venues.find((v) => v.venueName === e.target.value) ?? null)}
              className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none transition focus:border-amber-400/60 disabled:opacity-50">
              {venues.length === 0 ? <option value="">No venues available</option> :
                venues.map((venue) => <option key={venue.venueName} value={venue.venueName}>{venue.venueName}</option>)}
            </select>
          </label>

          {catalogueError && (
            <p className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-xs text-red-200">{catalogueError}</p>
          )}

          {selectedVenue && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <ReadOnlyField label="City" value={selectedVenue.city} />
              <ReadOnlyField label="Country" value={selectedVenue.country} />
            </div>
          )}

          <div className="my-7 h-px bg-white/10" />

          <PanelHeading
            number="02"
            title="Style"
            description="Select the visual direction."
          />

          <div className="mt-5 space-y-3">
            <StyleButton
              title="Collector"
              description="Dark, cinematic and luxurious."
              active={selectedStyle === "collector"}
              onClick={() => setSelectedStyle("collector")}
            />

            <StyleButton
              title="Editorial"
              description="Refined typography and calm spacing."
              active={selectedStyle === "editorial"}
              onClick={() => setSelectedStyle("editorial")}
            />

            <StyleButton
              title="Atlas"
              description="Maps, diagrams and archival detail."
              active={selectedStyle === "atlas"}
              onClick={() => setSelectedStyle("atlas")}
            />
          </div>

          <button
            type="button"
            className="mt-7 w-full rounded-lg bg-amber-300 px-4 py-3 text-sm font-bold text-[#19150b] transition hover:bg-amber-200"
          >
            Generate Poster
          </button>
        </aside>

        {/* Central live preview */}
        <section className="relative flex min-w-0 flex-col bg-[#11151a]">
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-6">
            <div>
              <p className="text-xs font-semibold text-white">
                Live poster preview
              </p>

              <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/35">
                {selectedVenue?.venueName ?? "No venue selected"} · {selectedStyle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <ToolbarButton label="Fit" />
              <ToolbarButton label="50%" />
              <ToolbarButton label="Grid" />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-auto bg-[radial-gradient(circle_at_center,#252b33_0%,#15191e_55%,#0e1115_100%)] p-10">
            <div className="w-full max-w-[610px]">
              {selectedVenue ? (
                <CinematicHeroPoster
                  venueName={selectedVenue.venueName}
                  city={selectedVenue.city}
                  country={selectedVenue.country}
                  opened={selectedVenue.opened}
                  capacity={selectedVenue.capacity}
                  competition={selectedVenue.competition}
                  collectorNumber={selectedVenue.collectorNumber ?? 12}
                  inscription={
                    selectedVenue.inscription ||
                    selectedVenue.nickname ||
                    selectedVenue.famousFor ||
                    "Where sporting history becomes part of the city."
                  }
                  heroImageHref={
                    selectedVenue.heroImageHref ||
                    "/venue-assets/eden-gardens/hero-night.svg"
                  }
                  surface={selectedVenue.surface || "International standard"}
                  architect={selectedVenue.architect || "Historic development"}
                  styleId={selectedStyle}
                />
              ) : (
                <div className="flex aspect-[8/11] w-full items-center justify-center border border-white/10 bg-[#0b0e11] text-sm text-white/35">
                  {loading ? "Preparing poster…" : "Select an available venue"}
                </div>
              )}
            </div>
          </div>

          <div className="flex h-10 items-center justify-between border-t border-white/10 bg-[#0d1014] px-5 text-[10px] text-white/35">
            <span>1000 × 1600 master artwork</span>
            <span>RGB preview · Vector master</span>
          </div>
        </section>

        {/* Right inspector */}
        <aside className="border-l border-white/10 bg-[#0d1014] p-5">
          <PanelHeading
            number="03"
            title="Poster Content"
            description="Control what appears in the artwork."
          />

          <div className="mt-5 space-y-2">
            {posterParameters.map((parameter) => {
              const selected =
                selectedParameters.includes(parameter);

              return (
                <label
                  key={parameter}
                  className="flex cursor-pointer items-center justify-between rounded-lg border border-white/8 bg-white/[0.025] px-3 py-3 transition hover:bg-white/[0.05]"
                >
                  <span className="text-xs text-white/70">
                    {parameter}
                  </span>

                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleParameter(parameter)}
                    className="h-4 w-4 accent-amber-300"
                  />
                </label>
              );
            })}
          </div>

          <div className="my-7 h-px bg-white/10" />

          <PanelHeading
            number="04"
            title="Output"
            description="Prepare the commercial artwork."
          />

          <label className="mt-5 block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/35">
              Print size
            </span>

            <select className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none">
              <option>A2 Portrait</option>
              <option>A3 Portrait</option>
              <option>A1 Portrait</option>
              <option>18 × 24 inch</option>
              <option>24 × 36 inch</option>
            </select>
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/35">
              Resolution
            </span>

            <select className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none">
              <option>300 DPI</option>
              <option>600 DPI</option>
              <option>150 DPI</option>
            </select>
          </label>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-xs text-white/65 transition hover:bg-white/10"
            >
              Save Draft
            </button>

            <button
              type="button"
              className="rounded-lg border border-amber-300/40 bg-amber-300/10 px-3 py-3 text-xs font-semibold text-amber-200 transition hover:bg-amber-300/20"
            >
              Export
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}

interface PanelHeadingProps {
  number: string;
  title: string;
  description: string;
}

function PanelHeading({
  number,
  title,
  description,
}: PanelHeadingProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-serif text-xs text-amber-300">
          {number}
        </span>

        <h2 className="text-sm font-semibold tracking-wide text-white">
          {title}
        </h2>
      </div>

      <p className="mt-2 text-xs leading-5 text-white/35">
        {description}
      </p>
    </div>
  );
}

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

function ReadOnlyField({
  label,
  value,
}: ReadOnlyFieldProps) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.025] p-3">
      <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
        {label}
      </p>

      <p className="mt-1 truncate text-xs text-white/70">
        {value}
      </p>
    </div>
  );
}

interface StyleButtonProps {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

function StyleButton({
  title,
  description,
  active,
  onClick,
}: StyleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-lg border p-3 text-left transition",
        active
          ? "border-amber-300/60 bg-amber-300/10"
          : "border-white/8 bg-white/[0.025] hover:bg-white/[0.05]",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span
          className={
            active
              ? "text-sm font-semibold text-amber-200"
              : "text-sm font-semibold text-white/75"
          }
        >
          {title}
        </span>

        <span
          className={[
            "h-2.5 w-2.5 rounded-full border",
            active
              ? "border-amber-200 bg-amber-300"
              : "border-white/25",
          ].join(" ")}
        />
      </div>

      <p className="mt-1 text-[11px] leading-4 text-white/35">
        {description}
      </p>
    </button>
  );
}

function ToolbarButton({
  label,
}: {
  label: string;
}) {
  return (
    <button
      type="button"
      className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] text-white/50 transition hover:bg-white/10 hover:text-white"
    >
      {label}
    </button>
  );
}