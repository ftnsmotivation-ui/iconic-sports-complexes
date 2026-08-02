import type { PosterCompositionPlan } from './PosterCompositionDirector';
import type { PosterConceptProfile } from './PosterConceptDirector';
import type { PosterLayoutProfile } from './PosterLayoutDirector';
import type { PosterModel } from './PosterModel';
import type { PosterStyleProfile } from './PosterStyleProfiles';

export interface TypographySpec {
  fontFamily: string;
  fontSize: number;
  fontWeight: number | string;
  letterSpacing: string;
  lineHeight: number;
  textTransform?: 'uppercase';
}

export interface PosterTitleLine {
  text: string;
  fontSize: number;
  fontWeight: number | string;
  letterSpacing: string;
  lineHeight: number;
  baselineOffset: number;
}

export interface PosterTypographySystem {
  titleLines: readonly PosterTitleLine[];
  titleTop: string;
  titleAlign: 'left' | 'center' | 'right';
  titleStartSvg: number;
  masthead: TypographySpec;
  collector: TypographySpec;
  subtitle: TypographySpec;
  title: TypographySpec;
  metadata: TypographySpec;
  sectionLabel: TypographySpec;
  quote: TypographySpec;
  body: TypographySpec;
  factLabel: TypographySpec;
  factValue: TypographySpec;
  caption: TypographySpec;
  micro: TypographySpec;
}

function balanceTitle(title: string, preferSingleLine: boolean): string[] {
  const words = title.trim().toUpperCase().split(/\s+/).filter(Boolean);
  if (!words.length) return ['ICONIC'];
  const totalLength = words.join(' ').length;
  if (words.length === 1 || (preferSingleLine && totalLength <= 15)) return [words.join(' ')];
  const target = totalLength / 2;
  let bestIndex = 1;
  let bestDifference = Number.POSITIVE_INFINITY;
  for (let index = 1; index < words.length; index += 1) {
    const difference = Math.abs(words.slice(0, index).join(' ').length - target);
    if (difference < bestDifference) { bestDifference = difference; bestIndex = index; }
  }
  return [words.slice(0, bestIndex).join(' '), words.slice(bestIndex).join(' ')];
}

function headlineSize(longestLine: number, composition: PosterCompositionPlan): number {
  const lengthScale = longestLine > 21 ? .58 : longestLine > 16 ? .68 : longestLine > 12 ? .78 : 1;
  return 72 * lengthScale * composition.titleScale;
}

export function resolvePosterTypography(model: PosterModel, _layout: PosterLayoutProfile, style: PosterStyleProfile, concept: PosterConceptProfile, composition: PosterCompositionPlan): PosterTypographySystem {
  const titleTexts = balanceTitle(model.direction.displayName, composition.dominantHero === 'illustration');
  const longestLine = Math.max(...titleTexts.map((line) => line.length));
  const titleSize = headlineSize(longestLine, composition) * (concept.titleScale / 1.06);
  const tone = model.story.typographyTone;
  const tracking = tone === 'modern' ? '.8px' : tone === 'restrained' ? '2.4px' : titleSize > 62 ? '-1.2px' : '.4px';
  const lineHeight = tone === 'modern' ? .92 : tone === 'restrained' ? 1.02 : .9;
  const lineSizes = titleTexts.map((line, index) => {
    if (titleTexts.length === 1) return titleSize;
    const ratio = line.length / longestLine;
    const editorialContrast = composition.id === 'editorial-air' ? .72 : .84;
    return titleSize * (ratio < .72 ? editorialContrast : index === 0 && tone === 'restrained' ? .88 : 1);
  });
  let baseline = 0;
  const titleLines = titleTexts.map((text, index) => {
    const line = { text, fontSize: lineSizes[index], fontWeight: tone === 'modern' ? 600 : 700, letterSpacing: tracking, lineHeight, baselineOffset: baseline };
    baseline += lineSizes[index] * lineHeight;
    return line;
  });
  const uppercase = { textTransform: 'uppercase' as const };
  const breathing = composition.negativeSpace > .68 ? 1.12 : 1;

  return {
    titleLines,
    titleTop: composition.titleTop,
    titleAlign: composition.titleAlign,
    titleStartSvg: composition.titleStartSvg,
    masthead: { fontFamily: style.bodyFont, fontSize: 9.5, fontWeight: 500, letterSpacing: `${3.2 * breathing}px`, lineHeight: 1.2, ...uppercase },
    collector: { fontFamily: style.bodyFont, fontSize: 9.5, fontWeight: 500, letterSpacing: '1.8px', lineHeight: 1.2, ...uppercase },
    subtitle: { fontFamily: style.bodyFont, fontSize: 11, fontWeight: 600, letterSpacing: `${3.8 * breathing}px`, lineHeight: 1.2, ...uppercase },
    title: { fontFamily: model.direction.titleFont, fontSize: titleSize, fontWeight: tone === 'modern' ? 600 : 700, letterSpacing: tracking, lineHeight, ...uppercase },
    metadata: { fontFamily: style.bodyFont, fontSize: 11.5, fontWeight: 500, letterSpacing: `${3.4 * breathing}px`, lineHeight: 1.2, ...uppercase },
    sectionLabel: { fontFamily: style.bodyFont, fontSize: 9, fontWeight: 600, letterSpacing: '2.7px', lineHeight: 1.2, ...uppercase },
    quote: { fontFamily: model.direction.titleFont, fontSize: composition.negativeSpace > .7 ? 18 : 20, fontWeight: 400, letterSpacing: '.1px', lineHeight: 1.32 },
    body: { fontFamily: style.bodyFont, fontSize: 10.5, fontWeight: 400, letterSpacing: '0', lineHeight: 1.55 },
    factLabel: { fontFamily: style.bodyFont, fontSize: 8, fontWeight: 600, letterSpacing: '2px', lineHeight: 1.2, ...uppercase },
    factValue: { fontFamily: model.direction.titleFont, fontSize: 19, fontWeight: 400, letterSpacing: '0', lineHeight: 1.12 },
    caption: { fontFamily: style.bodyFont, fontSize: 8, fontWeight: 500, letterSpacing: '2.4px', lineHeight: 1.2, ...uppercase },
    micro: { fontFamily: style.bodyFont, fontSize: 7.5, fontWeight: 400, letterSpacing: '1.6px', lineHeight: 1.2, ...uppercase },
  };
}
