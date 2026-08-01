import type { LayoutRegion } from "../Layouts";

interface TitleRendererProps {
  title: string;
  region: LayoutRegion;
}

export function TitleRenderer({
  title,
  region,
}: TitleRendererProps) {
  return (
    <text
      x={region.x + region.width / 2}
      y={region.y + 45}
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