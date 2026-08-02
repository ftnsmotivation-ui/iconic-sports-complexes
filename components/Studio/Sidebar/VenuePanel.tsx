export interface StudioVenue {
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

interface VenuePanelProps {
  sports: readonly string[];
  selectedSport: string;
  selectedCompetition: string;
  selectedVenue: StudioVenue | null;
  competitions: string[];
  venues: StudioVenue[];
  loading: boolean;
  catalogueError: string;
  onSportChange: (sport: string) => void;
  onCompetitionChange: (competition: string) => void;
  onVenueChange: (venue: StudioVenue | null) => void;
}

export function PanelHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-serif text-xs text-amber-300">{number}</span>
        <h2 className="text-sm font-semibold tracking-wide text-white">{title}</h2>
      </div>
      <p className="mt-2 text-xs leading-5 text-white/35">{description}</p>
    </div>
  );
}

export default function VenuePanel({
  sports,
  selectedSport,
  selectedCompetition,
  selectedVenue,
  competitions,
  venues,
  loading,
  catalogueError,
  onSportChange,
  onCompetitionChange,
  onVenueChange,
}: VenuePanelProps) {
  return (
    <>
      <PanelHeading number="01" title="Venue" description="Choose the sporting landmark." />
      <label className="mt-6 block">
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Sport</span>
        <select value={selectedSport} onChange={(event) => onSportChange(event.target.value)} className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none transition focus:border-amber-400/60">
          {sports.map((sport) => <option key={sport} value={sport}>{sport}</option>)}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Competition</span>
        <select value={selectedCompetition} disabled={loading || competitions.length === 0} onChange={(event) => onCompetitionChange(event.target.value)} className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none transition focus:border-amber-400/60 disabled:opacity-50">
          {competitions.length === 0 ? <option value="">No competitions available</option> : competitions.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">Venue</span>
        <select value={selectedVenue?.venueName ?? ""} disabled={loading || venues.length === 0} onChange={(event) => onVenueChange(venues.find((venue) => venue.venueName === event.target.value) ?? null)} className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none transition focus:border-amber-400/60 disabled:opacity-50">
          {venues.length === 0 ? <option value="">No venues available</option> : venues.map((venue) => <option key={venue.venueName} value={venue.venueName}>{venue.venueName}</option>)}
        </select>
      </label>
      {catalogueError && <p className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-xs text-red-200">{catalogueError}</p>}
      {selectedVenue && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <ReadOnlyField label="City" value={selectedVenue.city} />
          <ReadOnlyField label="Country" value={selectedVenue.country} />
        </div>
      )}
    </>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.025] p-3">
      <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">{label}</p>
      <p className="mt-1 truncate text-xs text-white/70">{value}</p>
    </div>
  );
}
