import { defaultLayout, layoutProfiles } from "./LayoutProfiles";

import type { PosterLayout } from "./LayoutTypes";
import type { VenueDNA } from "../DNA";

export function resolveLayout(
  dna: VenueDNA,
): PosterLayout {
  switch (dna.primaryStyle) {
    case "Collector":
      return layoutProfiles.collector;

    case "Heritage":
      return layoutProfiles.collector;

    case "Blueprint":
      return layoutProfiles.collector;

    case "Gallery":
      return layoutProfiles.collector;

    case "Atlas":
      return layoutProfiles.collector;

    case "Editorial":
      return layoutProfiles.collector;

    default:
      return defaultLayout;
  }
}