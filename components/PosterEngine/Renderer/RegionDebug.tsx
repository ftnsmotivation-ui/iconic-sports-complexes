import type { LayoutRegion } from "../Layouts";

interface RegionDebugProps {
  region: LayoutRegion;
  label: string;
}

export function RegionDebug({
  region,
  label,
}: RegionDebugProps) {
  return (
    <g>
      <rect
        x={region.x}
        y={region.y}
        width={region.width}
        height={region.height}
        fill="none"
        stroke="#2563eb"
        strokeWidth={2}
      />

      <text
        x={region.x + 10}
        y={region.y + 24}
        fontSize="18"
        fill="#2563eb"
        fontFamily="Arial"
      >
        {label}
      </text>

      <text
        x={region.x + 10}
        y={region.y + 46}
        fontSize="12"
        fill="#666"
        fontFamily="Arial"
      >
        x:{region.x} y:{region.y}
      </text>

      <text
        x={region.x + 10}
        y={region.y + 62}
        fontSize="12"
        fill="#666"
        fontFamily="Arial"
      >
        w:{region.width} h:{region.height}
      </text>
    </g>
  );
}