import type { LayoutRegion } from "../Layouts";
import { PanelRenderer } from "./PanelRenderer";
import { FactRow } from "./FactRow";
import type { PosterFact } from "./FactTypes";

interface InformationRendererProps {
  region: LayoutRegion;
  facts: PosterFact[];
}

export function InformationRenderer({
  region,
  facts,
}: InformationRendererProps) {
  return (
    <>
      <PanelRenderer
        region={region}
        title="Venue Facts"
      />

      {facts.map((fact, index) => (
        <FactRow
          key={fact.label}
          label={fact.label}
          value={fact.value}
          x={region.x + 24}
          y={region.y + 80 + index * 70}
        />
      ))}
    </>
  );
}