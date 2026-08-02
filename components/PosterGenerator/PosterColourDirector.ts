import type { PosterCompositionPlan } from './PosterCompositionDirector';
import type { PosterConceptProfile } from './PosterConceptDirector';
import type { PosterModel } from './PosterModel';
import type { PosterStyleProfile } from './PosterStyleProfiles';

export interface PosterColourSystem {
  background: string;
  foreground: string;
  accent: string;
  accentMuted: string;
  muted: string;
  subtle: string;
  borderSecondary: string;
  map: string;
  rule: string;
  paper: string;
  heroOverlay: string;
  heroFade: { middle: number; solid: number; middleOpacity: number };
  vignette: string;
  gridLine: string;
  imageFilter: string;
  palette: readonly string[];
}

function hex(value: string, fallback: string): string {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function channels(value: string): readonly [number, number, number] {
  const normalized = hex(value, '#808080').slice(1);
  return [0, 2, 4].map((index) => Number.parseInt(normalized.slice(index, index + 2), 16)) as unknown as readonly [number, number, number];
}

function mix(left: string, right: string, rightWeight: number): string {
  const a = channels(left);
  const b = channels(right);
  const values = a.map((value, index) => Math.round(value * (1 - rightWeight) + b[index] * rightWeight));
  return `#${values.map((value) => value.toString(16).padStart(2, '0')).join('')}`;
}

function withAlpha(value: string, alpha: number): string {
  const [red, green, blue] = channels(value);
  return `rgba(${red},${green},${blue},${alpha})`;
}

export function resolvePosterColours(model: PosterModel, style: PosterStyleProfile, concept: PosterConceptProfile, composition: PosterCompositionPlan): PosterColourSystem {
  const [dnaBase, dnaAccent, dnaPaper, dnaSignal] = [
    hex(model.direction.colourPalette[0] ?? '', style.background),
    hex(model.direction.colourPalette[1] ?? '', style.accent),
    hex(model.direction.colourPalette[2] ?? '', style.foreground),
    hex(model.direction.colourPalette[3] ?? '', style.accent),
  ];
  const background = concept.id === 'gallery' ? mix(dnaPaper, '#e7e0d2', .58) : concept.id === 'survey' ? mix(dnaBase, '#252e2d', .34) : dnaBase;
  const foreground = concept.id === 'gallery' ? mix(dnaBase, '#201f1b', .62) : dnaPaper;
  const accent = concept.id === 'gallery' ? mix(dnaSignal, dnaAccent, .45) : dnaAccent;
  const muted = concept.id === 'gallery' ? mix(foreground, background, .48) : mix(dnaPaper, dnaBase, .48);
  const subtle = mix(accent, background, .58);
  const fadeMiddle = composition.dominantHero === 'illustration' ? .62 : composition.negativeSpace > .7 ? .48 : .56;
  const fadeSolid = composition.dominantHero === 'illustration' ? .84 : composition.negativeSpace > .7 ? .68 : .76;
  const lightingBrightness = model.story.lighting === 'natural' ? 1.06 : model.story.lighting === 'architectural' ? 1.02 : .96;
  const saturation = model.story.lighting === 'ceremonial' ? .82 : model.story.lighting === 'floodlit' ? .92 : .88;

  return {
    background,
    foreground,
    accent,
    accentMuted: withAlpha(accent, .78),
    muted,
    subtle,
    borderSecondary: withAlpha(accent, concept.id === 'gallery' ? .2 : .36),
    map: mix(accent, dnaPaper, .16),
    rule: withAlpha(accent, composition.negativeSpace > .7 ? .52 : .72),
    paper: dnaPaper,
    heroOverlay: `linear-gradient(180deg,${withAlpha(background, .02)} 0%,${withAlpha(background, .08)} ${Math.round(fadeMiddle * 100 - 10)}%,${withAlpha(background, .72)} ${Math.round(fadeSolid * 100 - 7)}%,${background} ${Math.round(fadeSolid * 100)}%,${background} 100%)`,
    heroFade: { middle: fadeMiddle, solid: fadeSolid, middleOpacity: composition.dominantHero === 'illustration' ? .08 : .24 },
    vignette: `radial-gradient(circle at 50% 32%,transparent 34%,${withAlpha(background, concept.id === 'gallery' ? .18 : .62)} 100%)`,
    gridLine: withAlpha(accent, .24),
    imageFilter: `saturate(${saturation}) brightness(${lightingBrightness}) contrast(${model.story.lighting === 'architectural' ? 1.1 : 1.04})`,
    palette: [background, foreground, accent, muted, subtle, dnaSignal],
  };
}
