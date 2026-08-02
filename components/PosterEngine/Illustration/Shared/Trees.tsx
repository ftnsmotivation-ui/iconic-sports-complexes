interface TreesProps {
  x: number;
  y: number;
  scale?: number;
}

export function Trees({
  x,
  y,
  scale = 1,
}: TreesProps) {
  return (
    <g>

      <rect
        x={x - 2 * scale}
        y={y}
        width={4 * scale}
        height={14 * scale}
        fill="#8A7B62"
      />

      <circle
        cx={x}
        cy={y - 8 * scale}
        r={9 * scale}
        fill="#AEB88B"
        stroke="#8C9574"
        strokeWidth={0.8}
      />

      <circle
        cx={x - 6 * scale}
        cy={y - 2 * scale}
        r={6 * scale}
        fill="#B9C39A"
      />

      <circle
        cx={x + 6 * scale}
        cy={y - 3 * scale}
        r={6 * scale}
        fill="#B4BE94"
      />

    </g>
  );
}