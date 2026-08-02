import { defaultPosterTheme, themeProfiles } from "./ThemeProfiles";

import type { PosterTheme } from "./ThemeTypes";
import type { VenueDNA } from "../DNA";

export function resolveTheme(
  dna: VenueDNA,
): PosterTheme {
  switch (dna.primaryStyle) {
    case "Collector":
      return themeProfiles["collector-noir"];

    case "Heritage":
      return themeProfiles["heritage-parchment"];

    case "Blueprint":
      return themeProfiles["technical-blueprint"];

    case "Gallery":
      return themeProfiles["museum-gallery"];

    case "Atlas":
      return themeProfiles["technical-blueprint"];

    case "Editorial":
      return themeProfiles["museum-gallery"];

    default:
      return defaultPosterTheme;
  }
}