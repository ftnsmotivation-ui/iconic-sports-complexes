import { getIllustrationRenderer } from "../Illustration/IllustrationDirector";

interface HeroRendererProps {
  sport: string;
  venue: string;

  x: number;
  y: number;

  width: number;
  height: number;
}

export function HeroRenderer({
  sport,
  venue,

  x,
  y,

  width,
  height,
}: HeroRendererProps) {

  const Illustration =
    getIllustrationRenderer(
      sport,
      venue,
    );

  return (
    <g>

      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={12}
        fill="#F8F5EF"
        stroke="#C7C0B5"
        strokeWidth={1.2}
      />

      <Illustration
        venue={venue}
        x={x}
        y={y}
        width={width}
        height={height}
      />

    </g>
  );
}