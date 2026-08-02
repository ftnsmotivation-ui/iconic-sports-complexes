import { getVenueTitleStyle } from "../Typography/TypographyDirector";

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

  const style = getVenueTitleStyle();

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily={style.fontFamily}
      fontSize={style.fontSize}
      fontWeight={style.fontWeight}
      letterSpacing={style.letterSpacing}
      fill={style.fill}
    >
      {venue.toUpperCase()}
    </text>
  );
}