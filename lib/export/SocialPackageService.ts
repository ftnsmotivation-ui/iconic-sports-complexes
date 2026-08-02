import { resolvePosterColours } from '@/components/PosterGenerator/PosterColourDirector';
import { resolvePosterConcept } from '@/components/PosterGenerator/PosterConceptDirector';
import { resolvePosterComposition } from '@/components/PosterGenerator/PosterCompositionDirector';
import { resolvePosterLayout } from '@/components/PosterGenerator/PosterLayoutDirector';
import type { PosterModel } from '@/components/PosterGenerator/PosterModel';
import { resolvePosterStyle } from '@/components/PosterGenerator/PosterStyleProfiles';

import type { ExportArtifact } from './ExportService';
import type { ExportSettings } from './ExportSettings';
import { createZipArchive } from './ZipArchive';
import { renderPosterSvg } from './renderPosterSvg';

interface PublishingProfile { id: string; folder: 'social' | 'website'; width: number; height: number; safeInset: number }

const profiles: readonly PublishingProfile[] = [
  { id: 'instagram-square', folder: 'social', width: 1080, height: 1080, safeInset: .08 },
  { id: 'instagram-story', folder: 'social', width: 1080, height: 1920, safeInset: .1 },
  { id: 'pinterest-pin', folder: 'social', width: 1000, height: 1500, safeInset: .08 },
  { id: 'facebook-post', folder: 'social', width: 1200, height: 630, safeInset: .08 },
  { id: 'x-post', folder: 'social', width: 1600, height: 900, safeInset: .08 },
  { id: 'linkedin-post', folder: 'social', width: 1200, height: 627, safeInset: .08 },
  { id: 'web-standard', folder: 'website', width: 1200, height: 1650, safeInset: .04 },
  { id: 'web-retina', folder: 'website', width: 2400, height: 3300, safeInset: .04 },
];

function slug(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'isc-poster';
}

function publishingSvg(posterSvg: string, profile: PublishingProfile, background: string, accent: string): string {
  const insetX = profile.width * profile.safeInset;
  const insetY = profile.height * profile.safeInset;
  const availableWidth = profile.width - insetX * 2;
  const availableHeight = profile.height - insetY * 2;
  const scale = Math.min(availableWidth / 800, availableHeight / 1100);
  const posterWidth = 800 * scale;
  const posterHeight = 1100 * scale;
  const x = (profile.width - posterWidth) / 2;
  const y = (profile.height - posterHeight) / 2;
  const href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(posterSvg)}`;
  return `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${profile.width}" height="${profile.height}" viewBox="0 0 ${profile.width} ${profile.height}"><defs><radialGradient id="back"><stop stop-color="${accent}" stop-opacity=".2"/><stop offset="1" stop-color="${background}"/></radialGradient></defs><rect width="100%" height="100%" fill="${background}"/><rect width="100%" height="100%" fill="url(#back)"/><image href="${href.replace(/&/g, '&amp;')}" x="${x}" y="${y}" width="${posterWidth}" height="${posterHeight}"/><rect x="${x}" y="${y}" width="${posterWidth}" height="${posterHeight}" fill="none" stroke="${accent}" stroke-width="${Math.max(1, scale)}"/></svg>`;
}

async function rasterize(svgContent: string, profile: PublishingProfile): Promise<Uint8Array> {
  const response = await fetch('/api/export/raster', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ svgContent, format: 'jpeg', width: profile.width, height: profile.height, dpi: 150 }) });
  if (!response.ok) {
    const result: unknown = await response.json().catch(() => null);
    throw new Error(result && typeof result === 'object' && 'error' in result ? String(result.error) : `Unable to create ${profile.id}.`);
  }
  return new Uint8Array(await response.arrayBuffer());
}

export async function createSocialPackage(model: PosterModel, settings: ExportSettings, onProgress?: (message: string) => void): Promise<ExportArtifact> {
  const root = slug(model.identity.venueName);
  const style = resolvePosterStyle(model.styleId);
  const concept = resolvePosterConcept(model.conceptId);
  const layout = resolvePosterLayout(model.styleId, model.direction, concept.layoutId);
  const composition = resolvePosterComposition(model, layout);
  const colours = resolvePosterColours(model, style, concept, composition);
  const master = await renderPosterSvg(model, { ...settings, format: 'svg', dimensionsMm: { width: 203.2, height: 279.4 }, bleedMm: 0, cropMarks: false, safeMarginMm: 0 });
  const entries: { path: string; bytes: Uint8Array }[] = [];
  for (const profile of profiles) {
    onProgress?.(`Creating ${profile.id.replace(/-/g, ' ')}…`);
    const bytes = await rasterize(publishingSvg(master, profile, colours.background, colours.accent), profile);
    entries.push({ path: `${root}/${profile.folder}/${root}-${profile.id}-${profile.width}x${profile.height}.jpg`, bytes });
  }
  const manifest = profiles.map(({ id, folder, width, height, safeInset }) => ({ id, folder, width, height, safeInsetPercent: safeInset * 100, crop: 'full-poster-contained' }));
  entries.push({ path: `${root}/publishing-manifest.json`, bytes: new TextEncoder().encode(JSON.stringify(manifest, null, 2)) });
  return createZipArchive(entries, `${root}-social-web-package.zip`);
}
