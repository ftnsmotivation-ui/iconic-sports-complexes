import type { LayoutProfile } from "../Layouts";
import type { PosterFact } from "./FactTypes";

import { CollectorStripRenderer } from "./CollectorStripRenderer";
import { HeroRenderer } from "./HeroRenderer";
import { InformationRenderer } from "./InformationRenderer";
import { MapRenderer } from "./MapRenderer";

interface LayoutRendererProps {
  layout: LayoutProfile;
  facts: PosterFact[];
  venueName: string;
  sport: string;
}

export function LayoutRenderer({
  layout,
  facts,
  venueName,
  sport,
}: LayoutRendererProps) {
  return (
    <>
      <HeroRenderer
        sport={sport}
        venue={venueName}
        x={layout.hero.x}
        y={layout.hero.y}
        width={layout.hero.width}
        height={layout.hero.height}
      />

      <MapRenderer
        region={layout.map}
        venue={venueName}
      />

      <InformationRenderer
        region={layout.information}
        facts={facts}
      />

      <CollectorStripRenderer
        x={layout.footer.x}
        y={layout.footer.y}
        width={layout.footer.width}
        height={layout.footer.height}
      />
    </>
  );
}