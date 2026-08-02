export type PosterVariationId = 'cinematic-axis' | 'editorial-offset' | 'cartographic-balance';

export interface PosterVariationPlan {
  id: PosterVariationId;
  ordinal: 0 | 1 | 2;
  heroDelta: number;
  titleScale: number;
  titleAlignment: 'left' | 'center' | 'right';
  mapDelta: number;
  negativeSpaceDelta: number;
}

const variations: readonly Omit<PosterVariationPlan, 'ordinal'>[] = [
  { id: 'cinematic-axis', heroDelta: 24, titleScale: 1.02, titleAlignment: 'left', mapDelta: -.08, negativeSpaceDelta: -.06 },
  { id: 'editorial-offset', heroDelta: -18, titleScale: .9, titleAlignment: 'right', mapDelta: -.04, negativeSpaceDelta: .12 },
  { id: 'cartographic-balance', heroDelta: 0, titleScale: .94, titleAlignment: 'center', mapDelta: .18, negativeSpaceDelta: .02 },
];

function hash(value: string): number {
  return [...value].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 2166136261);
}

export function resolvePosterVariation(venueName: string, variationKey: string): PosterVariationPlan {
  const base = hash(venueName.trim().toLowerCase()) % variations.length;
  const offset = variationKey === 'primary' ? 0 : variationKey === 'alternate' ? 1 : variationKey === 'archive' ? 2 : hash(variationKey) % variations.length;
  const ordinal = ((base + offset) % variations.length) as 0 | 1 | 2;
  return { ...variations[ordinal], ordinal };
}
