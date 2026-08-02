import type { LayoutRegion } from "../Layouts";
import { MapIllustration } from "./MapIllustration";

interface MapRendererProps {
  region: LayoutRegion;
  venue: string;
}

export function MapRenderer({
  region,
  venue,
}: MapRendererProps) {
  return (
    <>
      <rect
        x={region.x}
        y={region.y}
        width={region.width}
        height={region.height}
        rx={10}
        fill="#FAF9F6"
        stroke="#C8C2B6"
        strokeWidth={1}
      />

      
        <MapIllustration
  venue={venue}
  x={region.x + 20}
  y={region.y + 20}
  width={region.width - 40}
  height={region.height - 40}
/>
      
    </>
  );
}