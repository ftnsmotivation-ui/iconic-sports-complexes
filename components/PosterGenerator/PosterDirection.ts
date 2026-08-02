import { resolveVenueDNA } from "@/components/PosterEngine/DNA";

import type { PosterInformationDensity } from "./PosterStyleProfiles";

export interface PosterDirection {
  displayName: string;
  moods: readonly string[];
  colourPalette: readonly string[];
  titleFont: string;
  informationDensity: PosterInformationDensity;
  illustrationPriority: string;
  heroFocus: string;
  atmosphere: string;
  preferredLayouts: readonly string[];
  signatureElements: readonly string[];
  typographyStyle: 'Classic' | 'Modern' | 'Luxury';
  mapStyle: string;
  borderStyle: string;
  footerStyle: string;
}

const typographyFonts = {
  Classic: "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif",
  Modern: "'Avenir Next', 'Helvetica Neue', Arial, sans-serif",
  Luxury: "Didot, 'Bodoni 72', 'Bodoni MT', Georgia, serif",
} as const;

const densityMap = {
  Minimal: "minimal",
  Balanced: "balanced",
  Rich: "rich",
} as const satisfies Record<string, PosterInformationDensity>;

export function resolvePosterDirection(venueName: string): PosterDirection {
  const dna = resolveVenueDNA(venueName);

  return {
    displayName: dna.venue,
    moods: dna.moods,
    colourPalette: dna.colourPalette,
    titleFont: typographyFonts[dna.typography],
    informationDensity: densityMap[dna.informationDensity],
    illustrationPriority: dna.illustrationPriority,
    heroFocus: dna.heroFocus,
    atmosphere: dna.atmosphere,
    preferredLayouts: dna.preferredLayouts,
    signatureElements: dna.signatureElements,
    typographyStyle: dna.typography,
    mapStyle: dna.mapStyle ?? 'Atlas',
    borderStyle: dna.borderStyle ?? 'Museum',
    footerStyle: dna.footerStyle ?? 'Collector',
  };
}
