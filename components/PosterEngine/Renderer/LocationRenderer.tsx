interface LocationRendererProps {
  city: string;
  country: string;
  x: number;
  y: number;
}

export function LocationRenderer({
  city,
  country,
  x,
  y,
}: LocationRendererProps) {
  return (
    <text
  x={x}
  y={y}
  textAnchor="middle"
  fontFamily="Arial, sans-serif"
  fontSize="16"
  fontWeight="400"
  fill="#777777"
  letterSpacing="3"
>
  {`${city.toUpperCase()} • ${country.toUpperCase()}`}
</text>
  );
}