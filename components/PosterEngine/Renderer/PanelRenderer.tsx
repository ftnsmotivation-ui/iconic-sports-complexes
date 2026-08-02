import type { LayoutRegion } from "../Layouts";

interface PanelRendererProps {
  region: LayoutRegion;
  title?: string;
}

export function PanelRenderer({
  region,
  title,
}: PanelRendererProps) {
  return (
    <g>
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

      <rect
        x={region.x + 10}
        y={region.y + 10}
        width={region.width - 20}
        height={region.height - 20}
        rx={6}
        fill="none"
        stroke="#E5E0D6"
        strokeWidth={0.7}
      />

      {title && (
        <>
          <text
            x={region.x + 24}
            y={region.y + 32}
            fontFamily="Arial, sans-serif"
            fontSize="13"
            fontWeight="600"
            letterSpacing="3"
            fill="#777168"
          >
            {title.toUpperCase()}
          </text>

          <line
            x1={region.x + 24}
            y1={region.y + 48}
            x2={region.x + region.width - 24}
            y2={region.y + 48}
            stroke="#DDD7CB"
            strokeWidth={0.8}
          />
        </>
      )}
    </g>
  );
}