import { VenueRenderer } from "./VenueRenderer";

interface HeaderRendererProps {
  venue: string;
}

export function HeaderRenderer({
  venue,
}: HeaderRendererProps) {
  return (
    <>
      <VenueRenderer
        venue={venue}
        x={500}
        y={110}
      />
    </>
  );
}