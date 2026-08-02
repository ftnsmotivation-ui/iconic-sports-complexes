import { resolveVenueDNA } from "@/components/PosterEngine/DNA";

import type { PosterInformationDensity } from "./PosterStyleProfiles";

export interface PosterDirection {
  moods: readonly string[];
  colourPalette: readonly string[];
  titleFont: string;
  informationDensity: PosterInformationDensity;
  illustrationPriority: string;
  heroObjectPosition: string;
  heroFocus: string;
  atmosphere: string;
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

const heroPositions: Record<string, string> = {
  Venue: "center 46%",
  Track: "center 40%",
  Architecture: "center 46%",
  Crowd: "center 58%",
  Landscape: "center 36%",
};

export function resolvePosterDirection(venueName: string): PosterDirection {
  const dna = resolveVenueDNA(venueName);

  return {
    moods: dna.moods,
    colourPalette: dna.colourPalette,
    titleFont: typographyFonts[dna.typography],
    informationDensity: densityMap[dna.informationDensity],
    illustrationPriority: dna.illustrationPriority,
    heroObjectPosition: heroPositions[dna.illustrationPriority] ?? "center 46%",
    heroFocus: dna.heroFocus,
    atmosphere: dna.atmosphere,
  };
}
