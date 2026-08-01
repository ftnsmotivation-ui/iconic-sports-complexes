import { HeaderRenderer } from "./HeaderRenderer";
import { BackgroundRenderer } from "./BackgroundRenderer";
import { SvgCanvas } from "./SvgCanvas";
import { LayoutRenderer } from "./LayoutRenderer";
import type { PosterRendererProps } from "./RenderTypes";

export function PosterRenderer({
  model,
}: PosterRendererProps) {
  return (
    <SvgCanvas
      width={1000}
      height={1600}
    >
      <BackgroundRenderer />

      <HeaderRenderer
  venue={model.venueName}
/>

      <LayoutRenderer
        layout={model.layout}
      />
    </SvgCanvas>
  );
}