interface PavilionProps {
  x: number;
  y: number;
  width: number;
  height: number;

  fill?: string;
  stroke?: string;
  roofFill?: string;
}

export function Pavilion({
  x,
  y,
  width,
  height,

  fill = "#F1EDE4",
  stroke = "#6E685E",
  roofFill = "#D8D0C2",
}: PavilionProps) {
  const roofHeight = height * 0.22;
  const bodyY = y + roofHeight;
  const bodyHeight = height - roofHeight;

  const columnCount = 5;
  const columnSpacing = width / (columnCount + 1);

  return (
    <g>
      {/* Soft pavilion shadow */}
      <ellipse
        cx={x + width / 2}
        cy={y + height + 5}
        rx={width * 0.48}
        ry={height * 0.08}
        fill="#CFC7BA"
        opacity={0.35}
      />

      {/* Main building */}
      <rect
        x={x}
        y={bodyY}
        width={width}
        height={bodyHeight}
        rx={3}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.4}
      />

      {/* Sloping roof */}
      <path
        d={`
          M ${x - width * 0.04} ${bodyY}
          L ${x + width * 0.12} ${y}
          L ${x + width * 0.88} ${y}
          L ${x + width * 1.04} ${bodyY}
          Z
        `}
        fill={roofFill}
        stroke={stroke}
        strokeWidth={1.4}
      />

      {/* Roof ridge */}
      <line
        x1={x + width * 0.12}
        y1={y}
        x2={x + width * 0.88}
        y2={y}
        stroke="#AAA193"
        strokeWidth={0.8}
      />

      {/* Upper gallery */}
      <rect
        x={x + width * 0.08}
        y={bodyY + bodyHeight * 0.12}
        width={width * 0.84}
        height={bodyHeight * 0.26}
        fill="#E7E1D6"
        stroke="#AFA697"
        strokeWidth={0.8}
      />

      {/* Gallery rail */}
      <line
        x1={x + width * 0.08}
        y1={bodyY + bodyHeight * 0.42}
        x2={x + width * 0.92}
        y2={bodyY + bodyHeight * 0.42}
        stroke="#8E8679"
        strokeWidth={1}
      />

      {/* Pavilion columns */}
      {Array.from({ length: columnCount }).map((_, index) => {
        const columnX = x + columnSpacing * (index + 1);

        return (
          <line
            key={index}
            x1={columnX}
            y1={bodyY + bodyHeight * 0.42}
            x2={columnX}
            y2={bodyY + bodyHeight * 0.92}
            stroke="#8E8679"
            strokeWidth={1}
          />
        );
      })}

      {/* Central entrance */}
      <rect
        x={x + width * 0.43}
        y={bodyY + bodyHeight * 0.58}
        width={width * 0.14}
        height={bodyHeight * 0.34}
        rx={2}
        fill="#D8D0C3"
        stroke="#847C70"
        strokeWidth={0.8}
      />

      {/* Base line */}
      <line
        x1={x - width * 0.03}
        y1={y + height}
        x2={x + width * 1.03}
        y2={y + height}
        stroke={stroke}
        strokeWidth={1.2}
      />
    </g>
  );
}