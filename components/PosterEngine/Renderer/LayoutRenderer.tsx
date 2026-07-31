import type { LayoutProfile } from "../Layouts";

interface LayoutRendererProps {
  layout: LayoutProfile;
}

export function LayoutRenderer({
  layout,
}: LayoutRendererProps) {
  return (
    <>
      <rect
        x={layout.hero.x}
        y={layout.hero.y}
        width={layout.hero.width}
        height={layout.hero.height}
        fill="none"
        stroke="black"
        strokeWidth={2}
      />

      <rect
        x={layout.map.x}
        y={layout.map.y}
        width={layout.map.width}
        height={layout.map.height}
        fill="none"
        stroke="black"
        strokeWidth={2}
      />

      <rect
        x={layout.information.x}
        y={layout.information.y}
        width={layout.information.width}
        height={layout.information.height}
        fill="none"
        stroke="black"
        strokeWidth={2}
      />

      <rect
        x={layout.footer.x}
        y={layout.footer.y}
        width={layout.footer.width}
        height={layout.footer.height}
        fill="none"
        stroke="black"
        strokeWidth={2}
      />
    </>
  );
}