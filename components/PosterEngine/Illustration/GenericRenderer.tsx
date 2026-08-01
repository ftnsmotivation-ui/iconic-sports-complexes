import type { IllustrationProps } from "./IllustrationTypes";

export function GenericRenderer({
  venue,
  x,
  y,
  width,
  height,
}: IllustrationProps) {
  return (
    <g>
      <rect
        x={x + 20}
        y={y + 20}
        width={width - 40}
        height={height - 70}
        rx={8}
        fill="#F5F2EB"
        stroke="#CEC7BA"
        strokeWidth={1}
      />

      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="24"
        fill="#777168"
      >
        {venue.toUpperCase()}
      </text>
    </g>
  );
}