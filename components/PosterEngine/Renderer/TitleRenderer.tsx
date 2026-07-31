interface TitleRendererProps {
  title: string;
}

export function TitleRenderer({
  title,
}: TitleRendererProps) {
  return (
    <text
      x="500"
      y="90"
      textAnchor="middle"
      fontSize="44"
      fontWeight="700"
      fontFamily="Georgia"
      fill="#111"
    >
      {title}
    </text>
  );
}