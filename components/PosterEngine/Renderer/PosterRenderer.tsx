import { HeaderRenderer } from "./HeaderRenderer";
import { BackgroundRenderer } from "./BackgroundRenderer";
import { SvgCanvas } from "./SvgCanvas";
import { LayoutRenderer } from "./LayoutRenderer";
import type { PosterRendererProps } from "./RenderTypes";
import { GridRenderer } from "./GridRenderer";

export function PosterRenderer({
  model,
}: PosterRendererProps) {
  const designMode = false;
  
  return (
    <SvgCanvas
      width={1000}
      height={1600}
    >
      <BackgroundRenderer />

      <HeaderRenderer
  sport={model.dna.sport}
  venue={model.venueName}
  city={model.city}
  country={model.country}
/>
      <LayoutRenderer
  layout={model.layout}
  facts={model.facts}
  venueName={model.venueName}
  sport={model.dna.sport}
/>
    </SvgCanvas>
  );
}