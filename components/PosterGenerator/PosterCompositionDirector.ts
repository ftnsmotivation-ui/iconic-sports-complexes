import type { PosterLayoutProfile } from './PosterLayoutDirector';
import type { PosterModel } from './PosterModel';
import type { PosterInformationDensity } from './PosterStyleProfiles';

export type PosterCompositionId = 'hero-led' | 'editorial-air' | 'map-anchored';
export type MapProminence = 'restrained' | 'balanced' | 'feature';

export interface PosterCompositionPlan {
  id: PosterCompositionId;
  dominantHero: 'illustration' | 'title' | 'map';
  heroHeight: string;
  heroHeightSvg: number;
  lowerPanelTop: string;
  lowerPanelTopSvg: number;
  titleTop: string;
  titleStartSvg: number;
  titleScale: number;
  titleAlign: 'left' | 'center' | 'right';
  informationDensity: PosterInformationDensity;
  visualWeight: 'upper' | 'balanced' | 'lower';
  negativeSpace: number;
  mapProminence: MapProminence;
  storyColumns: string;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function density(base: PosterInformationDensity, bias: -1 | 0 | 1): PosterInformationDensity {
  const values: readonly PosterInformationDensity[] = ['minimal', 'balanced', 'rich'];
  return values[clamp(values.indexOf(base) + bias, 0, values.length - 1)];
}

export function resolvePosterComposition(model: PosterModel, layout: PosterLayoutProfile): PosterCompositionPlan {
  const negativeSpace = clamp(model.story.negativeSpace + model.variation.negativeSpaceDelta, .28, .86);
  const mapAffinity = clamp(model.story.mapAffinity + model.variation.mapDelta, .2, 1);
  const heroHeightSvg = Math.round(clamp(610 + model.story.heroEmphasis * 130 + model.variation.heroDelta, 650, 756));
  const lowerPanelTopSvg = Math.round(clamp(heroHeightSvg - 18 + negativeSpace * 22, 690, 748));
  const titleStartSvg = Math.round(clamp(heroHeightSvg * (.57 + negativeSpace * .04), 390, 465));
  const compositionId: PosterCompositionId = mapAffinity > .76
    ? 'map-anchored'
    : negativeSpace > .67 || model.variation.id === 'editorial-offset'
      ? 'editorial-air'
      : 'hero-led';
  const dominantHero = compositionId === 'map-anchored' && model.story.heroEmphasis < .78 ? 'map' : model.story.heroEmphasis > .82 ? 'illustration' : 'title';
  const titleAlign = model.story.typographyTone === 'restrained' && model.variation.id !== 'editorial-offset'
    ? 'center'
    : model.variation.titleAlignment;

  return {
    id: compositionId,
    dominantHero,
    heroHeight: `${(heroHeightSvg / 11).toFixed(1)}%`,
    heroHeightSvg,
    lowerPanelTop: `${(lowerPanelTopSvg / 11).toFixed(1)}%`,
    lowerPanelTopSvg,
    titleTop: `${(titleStartSvg / 11).toFixed(1)}%`,
    titleStartSvg,
    titleScale: model.variation.titleScale * (dominantHero === 'illustration' ? .9 : 1) * layout.titleScale,
    titleAlign,
    informationDensity: density(model.direction.informationDensity, model.story.densityBias),
    visualWeight: heroHeightSvg > 720 ? 'upper' : negativeSpace > .7 ? 'balanced' : 'lower',
    negativeSpace,
    mapProminence: mapAffinity > .78 ? 'feature' : mapAffinity > .5 ? 'balanced' : 'restrained',
    storyColumns: mapAffinity > .78 ? '.9fr 1.1fr' : mapAffinity < .45 ? '1.45fr .55fr' : '1.15fr .85fr',
  };
}

export function formatPosterCoordinates(coordinates: PosterModel['identity']['coordinates']): string {
  if (!coordinates) return '';
  const latitude = `${Math.abs(coordinates.lat).toFixed(2)}°${coordinates.lat >= 0 ? 'N' : 'S'}`;
  const longitude = `${Math.abs(coordinates.lng).toFixed(2)}°${coordinates.lng >= 0 ? 'E' : 'W'}`;
  return `${latitude} · ${longitude}`;
}
