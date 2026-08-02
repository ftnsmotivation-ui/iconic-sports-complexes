interface FactRowProps {
  label: string;
  value: string;
  x: number;
  y: number;
}

export function FactRow({
  label,
  value,
  x,
  y,
}: FactRowProps) {
  return (
    <g>
      <text
        x={x}
        y={y}
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fontWeight="600"
        letterSpacing="2"
        fill="#8A847A"
      >
        {label.toUpperCase()}
      </text>

      <text
        x={x}
        y={y + 22}
        fontFamily="Georgia, serif"
        fontSize="20"
        fill="#222222"
      >
        {value}
      </text>
    </g>
  );
}