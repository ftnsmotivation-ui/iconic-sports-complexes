import type { LayoutRegion } from "../Layouts";

interface PanelRendererProps {
  region: LayoutRegion;
}

export function PanelRenderer({
  region,
}: PanelRendererProps) {
  return (
    <g>
      <rect
        x={region.x}
        y={region.y}
        width={region.width}
        height={region.height}
        fill="#fcfbf8"
        stroke="#999"
        strokeWidth={1.2}
        rx={8}
      />

      <rect
        x={region.x + 6}
        y={region.y + 6}
        width={region.width - 12}
        height={region.height - 12}
        fill="none"
        stroke="#d6d2ca"
        strokeWidth={0.8}
        rx={6}
      />
    </g>
  );
}