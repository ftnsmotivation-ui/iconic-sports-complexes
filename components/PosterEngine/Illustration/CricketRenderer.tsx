import type { IllustrationProps } from "./IllustrationTypes";

export function CricketRenderer({
  venue,
  x,
  y,
  width,
  height,
}: IllustrationProps) {
  const centreX = x + width / 2;
  const groundY = y + height * 0.72;

  return (
    <g>
      {/* Ground shadow */}
      <ellipse
        cx={centreX}
        cy={groundY}
        rx={width * 0.32}
        ry={height * 0.07}
        fill="#DED8CC"
      />

      {/* Stadium seating bowl */}
      <path
        d={`
          M ${x + width * 0.16} ${groundY}
          Q ${centreX} ${y + height * 0.28}
            ${x + width * 0.84} ${groundY}
          Q ${centreX} ${y + height * 0.90}
            ${x + width * 0.16} ${groundY}
          Z
        `}
        fill="#F4F1EA"
        stroke="#6E685E"
        strokeWidth={2}
      />

      {/* Playing field */}
      <ellipse
        cx={centreX}
        cy={groundY}
        rx={width * 0.23}
        ry={height * 0.095}
        fill="#E3E8D9"
        stroke="#8C927D"
        strokeWidth={1}
      />

      {/* Cricket pitch */}
      <rect
        x={centreX - width * 0.025}
        y={groundY - height * 0.065}
        width={width * 0.05}
        height={height * 0.13}
        rx={2}
        fill="#D8C7A4"
        stroke="#9B8968"
        strokeWidth={0.8}
      />

      {/* Floodlight towers */}
      <line
        x1={x + width * 0.20}
        y1={groundY - height * 0.04}
        x2={x + width * 0.16}
        y2={y + height * 0.18}
        stroke="#716B60"
        strokeWidth={2}
      />

      <line
        x1={x + width * 0.80}
        y1={groundY - height * 0.04}
        x2={x + width * 0.84}
        y2={y + height * 0.18}
        stroke="#716B60"
        strokeWidth={2}
      />

      <rect
        x={x + width * 0.125}
        y={y + height * 0.15}
        width={width * 0.07}
        height={height * 0.035}
        fill="#716B60"
      />

      <rect
        x={x + width * 0.805}
        y={y + height * 0.15}
        width={width * 0.07}
        height={height * 0.035}
        fill="#716B60"
      />

      {/* Caption */}
      <text
        x={centreX}
        y={y + height - 14}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        fontWeight="600"
        letterSpacing="3"
        fill="#777168"
      >
        {venue.toUpperCase()}
      </text>
    </g>
  );
}