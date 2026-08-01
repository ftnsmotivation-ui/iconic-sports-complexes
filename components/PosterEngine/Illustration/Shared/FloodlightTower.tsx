interface FloodlightTowerProps {
  x: number;
  y: number;

  height: number;

  colour?: string;
}

export function FloodlightTower({
  x,
  y,

  height,

  colour = "#6D675D",
}: FloodlightTowerProps) {

  const headWidth = height * 0.12;
  const headHeight = height * 0.06;

  return (
    <g>

      {/* Mast */}

      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y - height}
        stroke={colour}
        strokeWidth={2}
      />

      {/* Lamp housing */}

      <rect
        x={x - headWidth / 2}
        y={y - height - headHeight}
        width={headWidth}
        height={headHeight}
        rx={2}
        fill="#F4F2EC"
        stroke={colour}
        strokeWidth={1}
      />

      {/* Lamp grid */}

      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={
              x -
              headWidth / 2 +
              5 +
              col * (headWidth - 10) / 5
            }
            cy={
              y -
              height -
              headHeight +
              4 +
              row * (headHeight - 8) / 3
            }
            r={0.9}
            fill={colour}
          />
        ))
      )}

      {/* Cross brace */}

      <line
        x1={x}
        y1={y - height * 0.45}
        x2={x + 10}
        y2={y - height * 0.58}
        stroke={colour}
        strokeWidth={1}
      />

      <line
        x1={x}
        y1={y - height * 0.62}
        x2={x - 10}
        y2={y - height * 0.75}
        stroke={colour}
        strokeWidth={1}
      />

    </g>
  );
}