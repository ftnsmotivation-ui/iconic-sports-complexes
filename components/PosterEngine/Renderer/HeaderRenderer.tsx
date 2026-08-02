import { SportRenderer } from "./SportRenderer";
import { VenueRenderer } from "./VenueRenderer";
import { LocationRenderer } from "./LocationRenderer";

interface HeaderRendererProps {
  sport: string;
  venue: string;
  city: string;
  country: string;
}

export function HeaderRenderer({
  sport,
  venue,
  city,
  country,
}: HeaderRendererProps) {
  return (
    <>
      <SportRenderer
        sport={sport}
        x={500}
        y={60}
      />

      <VenueRenderer
        venue={venue}
        x={500}
        y={110}
      />

      <LocationRenderer
        city={city}
        country={country}
        x={500}
        y={150}
      />

      {/* Editorial divider */}

      <line
        x1={80}
        y1={185}
        x2={920}
        y2={185}
        stroke="#D2CDC2"
        strokeWidth={1}
      />

      {/* Left ornament */}

      <circle
        cx={80}
        cy={185}
        r={2}
        fill="#A8A08F"
      />

      {/* Right ornament */}

      <circle
        cx={920}
        cy={185}
        r={2}
        fill="#A8A08F"
      />
    </>
  );
}