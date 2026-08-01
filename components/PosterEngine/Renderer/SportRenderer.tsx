interface SportRendererProps {
  sport: string;
  x: number;
  y: number;
}

export function SportRenderer({
  sport,
  x,
  y,
}: SportRendererProps) {
  return (
    <text
  x={x}
  y={y}
  textAnchor="middle"
  fontFamily="Arial, sans-serif"
  fontSize="18"
  fontWeight="500"
  fill="#6B6B6B"
  letterSpacing="8"
>
  {sport.toUpperCase()}
</text>
  );
}