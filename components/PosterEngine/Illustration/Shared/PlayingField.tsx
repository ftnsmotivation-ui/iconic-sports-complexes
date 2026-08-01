interface PlayingFieldProps {
  x: number;
  y: number;
  width: number;
  height: number;

  fill?: string;
  stroke?: string;
}

export function PlayingField({
  x,
  y,
  width,
  height,

  fill = "#E5EAD8",
  stroke = "#9DA58C",
}: PlayingFieldProps) {

  const cx = x + width / 2;
  const cy = y + height / 2;

  return (
    <g>

      {/* Grass */}

      <ellipse
        cx={cx}
        cy={cy}
        rx={width * 0.50}
        ry={height * 0.50}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />

      {/* Inner mowing ring */}

      <ellipse
        cx={cx}
        cy={cy}
        rx={width * 0.39}
        ry={height * 0.39}
        fill="none"
        stroke="#CBD3BC"
        strokeWidth={0.8}
      />

      {/* Centre strip */}

      <rect
        x={cx - width * 0.03}
        y={cy - height * 0.16}
        width={width * 0.06}
        height={height * 0.32}
        rx={2}
        fill="#D8C8A5"
        stroke="#AE9D7B"
        strokeWidth={0.6}
      />

    </g>
  );
}