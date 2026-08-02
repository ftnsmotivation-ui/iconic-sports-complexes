interface CollectorStripRendererProps {
  x: number;
  y: number;
  width: number;
  height: number;

  collectorNumber?: number;
}

export function CollectorStripRenderer({
  x,
  y,
  width,
  height,
  collectorNumber,
}: CollectorStripRendererProps) {
  const number =
    collectorNumber
      ?.toString()
      .padStart(6, "0") ?? "000001";

  return (
    <g>
      <line
        x1={x}
        y1={y}
        x2={x + width}
        y2={y}
        stroke="#BDB7AB"
        strokeWidth={1}
      />

      <text
        x={x}
        y={y + 26}
        fontFamily="Arial"
        fontSize="11"
        letterSpacing="3"
        fill="#7D776C"
      >
        ICONIC SPORTS COMPLEXES
      </text>

      <text
        x={x + width}
        y={y + 26}
        textAnchor="end"
        fontFamily="Georgia"
        fontSize="12"
        fill="#4A463E"
      >
        No. {number}
      </text>
    </g>
  );
}