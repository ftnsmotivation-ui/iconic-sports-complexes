import CinematicHeroPoster from "@/components/PosterGenerator/CinematicHeroPoster";

import type { StudioStyle } from "../Sidebar/StylePanel";
import type { StudioVenue } from "../Sidebar/VenuePanel";
import PreviewToolbar from "./PreviewToolbar";

interface PreviewCanvasProps {
  selectedVenue: StudioVenue | null;
  selectedStyle: StudioStyle;
  loading: boolean;
}

export default function PreviewCanvas({ selectedVenue, selectedStyle, loading }: PreviewCanvasProps) {
  return (
    <section className="relative flex min-w-0 flex-col bg-[#11151a]">
      <PreviewToolbar venueName={selectedVenue?.venueName} selectedStyle={selectedStyle} />
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
              inscription={selectedVenue.inscription || selectedVenue.nickname || selectedVenue.famousFor || "Where sporting history becomes part of the city."}
              heroImageHref={selectedVenue.heroImageHref || "/venue-assets/eden-gardens/hero-night.svg"}
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
  );
}
