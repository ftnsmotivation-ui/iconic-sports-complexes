import { resolveVenueDNA } from "@/components/PosterEngine/DNA";

import type { PosterInformationDensity } from "./PosterStyleProfiles";

export interface PosterDirection {
  moods: readonly string[];
  colourPalette: readonly string[];
  titleFont: string;
  informationDensity: PosterInformationDensity;
  illustrationPriority: string;
  heroFocus: string;
  atmosphere: string;
  preferredLayouts: readonly string[];
}

const typographyFonts = {
  Classic: "Georgia, 'Times New Roman', serif",
  Modern: "Arial, Helvetica, sans-serif",
  Luxury: "Georgia, 'Times New Roman', serif",
} as const;

const densityMap = {
  Minimal: "minimal",
  Balanced: "balanced",
  Rich: "rich",
} as const satisfies Record<string, PosterInformationDensity>;

export function resolvePosterDirection(venueName: string): PosterDirection {
  const dna = resolveVenueDNA(venueName);

  return {
    moods: dna.moods,
    colourPalette: dna.colourPalette,
    titleFont: typographyFonts[dna.typography],
    informationDensity: densityMap[dna.informationDensity],
    illustrationPriority: dna.illustrationPriority,
    heroFocus: dna.heroFocus,
    atmosphere: dna.atmosphere,
    preferredLayouts: dna.preferredLayouts,
  };
}
