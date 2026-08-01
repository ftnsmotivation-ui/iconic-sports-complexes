interface MapIllustrationProps {
  venue: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function MapIllustration({
  venue,
  x,
  y,
  width,
  height,
}: MapIllustrationProps) {
  const centreX = x + width / 2;
  const centreY = y + height / 2;
  const normalizedVenue = venue.trim().toLowerCase();

  if (normalizedVenue === "eden gardens") {
    return (
      <g>
        {/* Outer stadium bowl */}
        <ellipse
          cx={centreX}
          cy={centreY}
          rx={width * 0.38}
          ry={height * 0.34}
          fill="#EEE9DE"
          stroke="#716B60"
          strokeWidth={2}
        />

        {/* Inner seating ring */}
        <ellipse
          cx={centreX}
          cy={centreY}
          rx={width * 0.30}
          ry={height * 0.26}
          fill="#FAF9F6"
          stroke="#AAA295"
          strokeWidth={1.2}
        />

        {/* Cricket field */}
        <ellipse
          cx={centreX}
          cy={centreY}
          rx={width * 0.22}
          ry={height * 0.18}
          fill="#E2E8D8"
          stroke="#8D967D"
          strokeWidth={1}
        />

        {/* Cricket pitch */}
        <rect
          x={centreX - width * 0.025}
          y={centreY - height * 0.11}
          width={width * 0.05}
          height={height * 0.22}
          rx={2}
          fill="#D8C9A8"
          stroke="#998A6D"
          strokeWidth={0.8}
        />

        {/* Centre line */}
        <line
          x1={centreX}
          y1={centreY - height * 0.10}
          x2={centreX}
          y2={centreY + height * 0.10}
          stroke="#B3A485"
          strokeWidth={0.6}
        />

        <text
          x={centreX}
          y={y + height - 12}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="11"
          fontWeight="600"
          letterSpacing="2"
          fill="#777168"
        >
          EDEN GARDENS · STADIUM PLAN
        </text>
      </g>
    );
  }

  return (
    <g>
      <ellipse
        cx={centreX}
        cy={centreY}
        rx={width * 0.30}
        ry={height * 0.23}
        fill="none"
        stroke="#777168"
        strokeWidth={2}
      />

      <text
        x={centreX}
        y={y + height - 12}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        letterSpacing="2"
        fill="#777168"
      >
        {venue.toUpperCase()} · VENUE PLAN
      </text>
    </g>
  );
}