import type { LayoutProfile } from "../Layouts";
import { PanelRenderer } from "./PanelRenderer";

interface LayoutRendererProps {
  layout: LayoutProfile;
}

export function LayoutRenderer({
  layout,
}: LayoutRendererProps) {
  return (
    <>
      <PanelRenderer region={layout.hero} />
      <PanelRenderer region={layout.map} />
      <PanelRenderer region={layout.information} />
      <PanelRenderer region={layout.footer} />
    </>
  );
}