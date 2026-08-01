interface VenueRendererProps {
  venue: string;
  x: number;
  y: number;
}

export function VenueRenderer({
  venue,
  x,
  y,
}: VenueRendererProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="Georgia, serif"
      fontSize="42"
      fontWeight="700"
      fill="#222"
      letterSpacing="1"
    >
      {venue.toUpperCase()}
    </text>
  );
}