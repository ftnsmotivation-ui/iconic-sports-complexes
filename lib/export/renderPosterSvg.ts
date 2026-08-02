import { resolvePosterColours } from '@/components/PosterGenerator/PosterColourDirector';
import { resolvePosterConcept } from '@/components/PosterGenerator/PosterConceptDirector';
import { resolvePosterLayout } from '@/components/PosterGenerator/PosterLayoutDirector';
import type { PosterModel } from '@/components/PosterGenerator/PosterModel';
import { resolvePosterStyle } from '@/components/PosterGenerator/PosterStyleProfiles';
import { resolvePosterTypography } from '@/components/PosterGenerator/PosterTypographyDirector';

import type { ExportSettings } from './ExportSettings';

function xml(value: string | number): string {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character] || character);
}

function family(value: string): string {
  return value.split(',')[0].replace(/["']/g, '').trim();
}

function text(x: number, y: number, value: string, options: { fill: string; size: number; font: string; weight?: string | number; anchor?: 'start' | 'middle' | 'end'; spacing?: string; italic?: boolean }): string {
  return `<text x="${x}" y="${y}" fill="${xml(options.fill)}" font-family="${xml(family(options.font))}" font-size="${options.size}" font-weight="${options.weight ?? 400}" text-anchor="${options.anchor ?? 'start'}" letter-spacing="${xml(options.spacing ?? '0')}"${options.italic ? ' font-style="italic"' : ''}>${xml(value)}</text>`;
}

function venueMap(model: PosterModel, accent: string, muted: string): string {
  if (!model.content.venueMap && !model.content.compassRose) return '';
  const sport = model.identity.sport.toLowerCase();
  const mark = model.content.venueMap
    ? sport.includes('formula') || sport.includes('motor')
      ? '<path d="M-58 12C-72-9-48-37-19-29 4-23 5-43 29-37 56-30 43-4 62 9 20 15 9 42-15 35-24-8-42 12-55-5Z"/>'
      : sport.includes('golf')
        ? '<path d="M-65 26C-38-18-10 22 18 0 31-10 42-26 60-31"/><circle cx="60" cy="-31" r="5"/><path d="M60-31v-24l16 7-16 7"/>'
        : '<ellipse rx="61" ry="42"/><ellipse rx="49" ry="32"/><rect x="-6" y="-29" width="12" height="58"/>'
    : '';
  const compass = model.content.compassRose ? `<g transform="translate(59 -57) scale(.65)"><circle r="19"/><path d="M0-19V19M-19 0H19M0-15L4 0 0 15-4 0Z"/><text y="-24" fill="${xml(accent)}" stroke="none" text-anchor="middle" font-family="Arial" font-size="9">N</text></g>` : '';
  return `<g transform="translate(650 735)" fill="none" stroke="${xml(accent)}" stroke-width="2"><circle r="83" stroke="${xml(muted)}"/><circle r="76" stroke="${xml(muted)}"/>${mark}${compass}</g>`;
}

export async function renderPosterSvg(model: PosterModel, settings: ExportSettings): Promise<string> {
  const response = await fetch(model.illustration.assetHref);
  if (!response.ok) throw new Error(`Unable to load vector artwork for ${model.identity.venueName}.`);
  const artwork = await response.text();
  const artworkHref = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(artwork)}`;
  const style = resolvePosterStyle(model.styleId);
  const concept = resolvePosterConcept(model.conceptId);
  const layout = resolvePosterLayout(model.styleId, model.direction, concept.layoutId);
  const typography = resolvePosterTypography(model, layout, style, concept);
  const colours = resolvePosterColours(model, style, concept);
  const titleStart = concept.layoutId === 'editorial-column' ? 375 : concept.layoutId === 'atlas-archive' ? 407 : 420;
  const titleLineHeight = typography.title.fontSize * typography.title.lineHeight;
  const metadataY = titleStart + typography.titleLines.length * titleLineHeight + 26;
  const lowerTop = concept.layoutId === 'editorial-column' ? 682 : concept.layoutId === 'atlas-archive' ? 715 : 731;
  const inset = layout.contentInset;
  const right = 800 - inset;
  const heroHeight = concept.layoutId === 'editorial-column' ? 605 : concept.layoutId === 'atlas-archive' ? 660 : 671;
  const factLimit = Math.min(style.factLimit, model.direction.informationDensity === 'rich' ? 4 : model.direction.informationDensity === 'balanced' ? 3 : 2);
  const facts = [['Opened', model.facts.opened], ['Capacity', model.facts.capacity], ['Surface', model.facts.surface], ['Architect', model.facts.architect]].slice(0, factLimit);
  const factTop = 910;
  const factWidth = (right - inset) / Math.max(1, facts.length);
  const story = model.personalisation.enabled
    ? [model.personalisation.occasion || 'I Was There', [model.personalisation.date, model.personalisation.stand && `Stand ${model.personalisation.stand}`, model.personalisation.seat && `Seat ${model.personalisation.seat}`].filter(Boolean).join(' · '), model.personalisation.notes].filter(Boolean)
    : [model.collector.inscription];
  const history = model.content.historicMoments ? model.history.slice(0, 2) : [];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${settings.dimensionsMm.width}mm" height="${settings.dimensionsMm.height}mm" viewBox="0 0 800 1100" preserveAspectRatio="xMidYMid slice" role="img" aria-labelledby="poster-title poster-description">
  <title id="poster-title">${xml(model.identity.venueName)} collector poster</title>
  <desc id="poster-description">Vector artwork prepared by ISC Studio in ${xml(model.styleId)} style.</desc>
  <metadata>format=svg; dpi=${settings.dpi}; colour=rgb/srgb; trim=${settings.dimensionsMm.width}x${settings.dimensionsMm.height}mm</metadata>
  <defs>
    <linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${xml(colours.background)}" stop-opacity="0"/><stop offset=".55" stop-color="${xml(colours.background)}" stop-opacity=".12"/><stop offset="1" stop-color="${xml(colours.background)}" stop-opacity="1"/></linearGradient>
    <radialGradient id="vignette"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".48"/></radialGradient>
    <clipPath id="poster-clip"><rect width="800" height="1100"/></clipPath>
  </defs>
  <g clip-path="url(#poster-clip)">
    <rect width="800" height="1100" fill="${xml(colours.background)}"/>
    <image href="${xml(artworkHref)}" x="0" y="0" width="800" height="${heroHeight}" preserveAspectRatio="xMidYMid slice"/>
    <rect width="800" height="${heroHeight + 120}" fill="url(#hero-fade)"/>
    <rect width="800" height="1100" fill="url(#vignette)"/>
    <rect x="${layout.borderInsets[0]}" y="${layout.borderInsets[0]}" width="${800 - layout.borderInsets[0] * 2}" height="${1100 - layout.borderInsets[0] * 2}" fill="none" stroke="${xml(colours.accent)}" stroke-width="1.5"/>
    ${layout.borderInsets[1] ? `<rect x="${layout.borderInsets[1]}" y="${layout.borderInsets[1]}" width="${800 - layout.borderInsets[1] * 2}" height="${1100 - layout.borderInsets[1] * 2}" fill="none" stroke="${xml(colours.borderSecondary)}"/>` : ''}
    ${text(inset, 71, `${model.direction.moods[0] || 'Iconic'} · ${style.name} Series`.toUpperCase(), { fill: colours.accent, size: 10, font: typography.masthead.fontFamily, weight: 500, spacing: '3.5px' })}
    ${model.content.collectorNumber ? text(right, 71, `NO. ${model.collector.number} / 500`, { fill: colours.accent, size: 10, font: typography.collector.fontFamily, weight: 500, anchor: 'end', spacing: '1.8px' }) : ''}
    ${text(inset, titleStart - 25, model.identity.competition.toUpperCase(), { fill: colours.accent, size: 12, font: typography.subtitle.fontFamily, weight: 600, spacing: '4.2px' })}
    ${typography.titleLines.map((line, index) => text(inset, titleStart + index * titleLineHeight, line, { fill: colours.foreground, size: typography.title.fontSize, font: typography.title.fontFamily, weight: typography.title.fontWeight, spacing: typography.title.letterSpacing })).join('')}
    ${text(inset, metadataY, `${model.content.countryFlag ? `${model.identity.countryFlag} ` : ''}${model.identity.city} · ${model.identity.country}`.toUpperCase(), { fill: colours.accent, size: 13, font: typography.metadata.fontFamily, weight: 500, spacing: '4px' })}
    <line x1="${inset}" y1="${lowerTop}" x2="${right}" y2="${lowerTop}" stroke="${xml(colours.accent)}" stroke-width="2"/>
    ${text(inset, lowerTop + 33, model.personalisation.enabled ? 'I WAS THERE' : 'THE VENUE', { fill: colours.accentMuted, size: 10, font: typography.sectionLabel.fontFamily, weight: 600, spacing: '3px' })}
    ${story.map((line, index) => text(inset, lowerTop + 68 + index * 24, String(line), { fill: index ? colours.muted : colours.foreground, size: index ? 11 : 19, font: index ? typography.body.fontFamily : typography.quote.fontFamily, italic: !model.personalisation.enabled })).join('')}
    ${history.map((item, index) => `${text(470, lowerTop + 33 + index * 50, item.label.toUpperCase(), { fill: colours.accentMuted, size: 8.5, font: typography.factLabel.fontFamily, weight: 600, spacing: '2px' })}${text(470, lowerTop + 51 + index * 50, item.text, { fill: colours.muted, size: 10, font: typography.body.fontFamily })}`).join('')}
    ${venueMap(model, colours.accent, colours.borderSecondary)}
    ${model.content.venueFacts ? `<g>${facts.map(([label, value], index) => `<line x1="${inset + index * factWidth}" y1="${factTop}" x2="${inset + index * factWidth}" y2="1000" stroke="${xml(colours.borderSecondary)}"/>${text(inset + index * factWidth + 13, factTop + 26, label.toUpperCase(), { fill: colours.accentMuted, size: 8.5, font: typography.factLabel.fontFamily, weight: 600, spacing: '2px' })}${text(inset + index * factWidth + 13, factTop + 55, value, { fill: colours.foreground, size: 17, font: typography.factValue.fontFamily })}`).join('')}<line x1="${inset}" y1="${factTop}" x2="${right}" y2="${factTop}" stroke="${xml(colours.borderSecondary)}"/><line x1="${inset}" y1="1000" x2="${right}" y2="1000" stroke="${xml(colours.borderSecondary)}"/></g>` : ''}
    ${text(inset, 1041, model.direction.moods.slice(0, 3).join(' · ').toUpperCase(), { fill: colours.accentMuted, size: 8.5, font: typography.caption.fontFamily, weight: 500, spacing: '2.7px' })}
    ${text(right, 1041, style.editionLabel.toUpperCase(), { fill: colours.accentMuted, size: 8, font: typography.micro.fontFamily, anchor: 'end', spacing: '2.3px' })}
  </g>
</svg>`;
}
