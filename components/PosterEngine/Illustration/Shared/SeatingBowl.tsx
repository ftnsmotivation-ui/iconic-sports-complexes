interface SeatingBowlProps {
  x: number;
  y: number;
  width: number;
  height: number;

  tiers?: number;

  outerFill?: string;
  innerFill?: string;

  stroke?: string;
}

export function SeatingBowl({
  x,
  y,
  width,
  height,

  tiers = 4,

  outerFill = "#E7E2D7",
  innerFill = "#F8F5EF",

  stroke = "#6E685E",
}: SeatingBowlProps) {

  const cx = x + width / 2;
  const cy = y + height / 2;

  const rings = [];

  for (let i = 0; i < tiers; i++) {

    const rx =
      width * (0.46 - i * 0.04);

    const ry =
      height * (0.36 - i * 0.035);

    rings.push(
      <ellipse
        key={i}
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke="#BEB7AA"
        strokeWidth={0.9}
      />
    );
  }

  return (
    <g>

      {/* Shadow */}

      <ellipse
        cx={cx}
        cy={cy + height * 0.09}
        rx={width * 0.47}
        ry={height * 0.16}
        fill="#D9D2C7"
        opacity={0.40}
      />

      {/* Outer stadium */}

      <ellipse
        cx={cx}
        cy={cy}
        rx={width * 0.47}
        ry={height * 0.38}
        fill={outerFill}
        stroke={stroke}
        strokeWidth={2}
      />

      {/* Seating rings */}

      {rings}

      {/* Inner seating */}

      <ellipse
        cx={cx}
        cy={cy}
        rx={width * 0.28}
        ry={height * 0.22}
        fill={innerFill}
        stroke="#AAA292"
        strokeWidth={1.2}
      />

      {/* Playing area */}

      <ellipse
        cx={cx}
        cy={cy}
        rx={width * 0.17}
        ry={height * 0.12}
        fill="#ECE8DE"
        stroke="#CFC8BB"
        strokeWidth={0.8}
      />

    </g>
  );
}