import type { PosterModel } from '@/components/PosterGenerator/PosterModel';

import type { ExportArtifact } from './ExportService';
import type { ExportSettings } from './ExportSettings';
import { createZipArchive } from './ZipArchive';
import { renderPosterSvg } from './renderPosterSvg';

type SceneId = 'living-room' | 'office' | 'gallery' | 'frame-closeup' | 'canvas';

const scenes: readonly SceneId[] = ['living-room', 'office', 'gallery', 'frame-closeup', 'canvas'];

function slug(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'isc-poster';
}

function roomContent(scene: SceneId): string {
  if (scene === 'living-room') return '<rect y="870" width="1800" height="330" fill="#554a3f"/><path d="M0 885h1800" stroke="#b29a78" stroke-width="9"/><g fill="#786b5d"><rect x="180" y="800" width="690" height="250" rx="55"/><rect x="130" y="845" width="100" height="190" rx="35"/><rect x="820" y="845" width="100" height="190" rx="35"/></g><g fill="#b6a383"><rect x="970" y="930" width="520" height="30" rx="8"/><path d="M1020 960l-35 160M1440 960l35 160" stroke="#342e29" stroke-width="20"/></g><path d="M1510 330v570M1435 900h150" stroke="#292727" stroke-width="18"/><path d="M1410 335h200l-55-115h-90z" fill="#c7aa71"/>';
  if (scene === 'office') return '<rect y="850" width="1800" height="350" fill="#353b3b"/><rect x="90" y="120" width="520" height="480" fill="#9bb1b4" stroke="#d7dbd4" stroke-width="20"/><path d="M350 120v480M90 360h520" stroke="#d7dbd4" stroke-width="13"/><rect x="190" y="855" width="1410" height="50" rx="8" fill="#7f6047"/><path d="M270 905l-35 250M1520 905l35 250" stroke="#232828" stroke-width="24"/><rect x="1040" y="760" width="310" height="80" rx="12" fill="#1b2225"/><rect x="1100" y="710" width="190" height="50" fill="#283137"/><path d="M700 1110v-190c0-72 58-130 130-130h100c72 0 130 58 130 130v190" fill="#4f5957"/>';
  if (scene === 'gallery') return '<rect y="910" width="1800" height="290" fill="#beb9ae"/><path d="M0 920h1800" stroke="#8f897f" stroke-width="8"/><g fill="#d5c7a7"><path d="M420 0l160 390H260z" opacity=".2"/><path d="M900 0l170 390H730z" opacity=".2"/><path d="M1380 0l160 390h-320z" opacity=".2"/></g><rect x="520" y="1010" width="760" height="55" rx="18" fill="#5b554e"/><path d="M590 1065v95M1210 1065v95" stroke="#4a4540" stroke-width="24"/>';
  if (scene === 'frame-closeup') return '<rect width="1800" height="1200" fill="#302d29"/><path d="M0 0h1800v1200H0z" fill="url(#grain)" opacity=".45"/><rect x="300" y="70" width="1200" height="1060" fill="#65422c" stroke="#2a1912" stroke-width="35"/><rect x="355" y="125" width="1090" height="950" fill="#eee9dd"/><path d="M300 70l55 55M1500 70l-55 55M300 1130l55-55M1500 1130l-55-55" stroke="#bb8b5d" stroke-width="12"/>';
  return '<rect width="1800" height="1200" fill="#404746"/><ellipse cx="920" cy="1090" rx="620" ry="70" fill="#111" opacity=".35"/><path d="M1310 170l120 75v750l-120 85z" fill="#252b2a"/><path d="M380 170l80-55h850v965l-80 55H380z" fill="#d6d0c2"/><path d="M460 115h850v965H460z" fill="#ece7db"/>';
}

function sceneSvg(scene: SceneId, posterSvg: string): string {
  const href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(posterSvg)}`.replace(/&/g, '&amp;');
  const isCloseup = scene === 'frame-closeup';
  const isCanvas = scene === 'canvas';
  const poster = isCloseup
    ? `<image href="${href}" x="525" y="155" width="750" height="890" preserveAspectRatio="xMidYMid meet"/>`
    : isCanvas
      ? `<image href="${href}" x="485" y="140" width="800" height="915" preserveAspectRatio="xMidYMid meet"/>`
      : `<g filter="url(#shadow)"><rect x="${scene === 'gallery' ? 670 : 690}" y="110" width="440" height="650" fill="#171717"/><rect x="${scene === 'gallery' ? 693 : 713}" y="133" width="394" height="604" fill="#eee9df"/><image href="${href}" x="${scene === 'gallery' ? 715 : 735}" y="155" width="350" height="560" preserveAspectRatio="xMidYMid meet"/></g>`;
  return `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1200" viewBox="0 0 1800 1200"><defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${scene === 'gallery' ? '#f1eee7' : '#b7afa2'}"/><stop offset="1" stop-color="${scene === 'gallery' ? '#dcd8cf' : '#8e867b'}"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="24" stdDeviation="20" flood-opacity=".38"/></filter><pattern id="grain" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 10c14-9 25 9 40 0M0 30c12-8 27 8 40 0" fill="none" stroke="#b59a79" stroke-width="2"/></pattern></defs><rect width="1800" height="1200" fill="url(#wall)"/>${roomContent(scene)}${poster}</svg>`;
}

async function rasterize(svgContent: string): Promise<Uint8Array> {
  const response = await fetch('/api/export/raster', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ svgContent, format: 'jpeg', width: 1800, height: 1200, dpi: 150 }) });
  if (!response.ok) throw new Error('Unable to render marketing mockup.');
  return new Uint8Array(await response.arrayBuffer());
}

export async function createMarketingMockups(model: PosterModel, settings: ExportSettings, onProgress?: (message: string) => void): Promise<ExportArtifact> {
  const root = slug(model.identity.venueName);
  const master = await renderPosterSvg(model, { ...settings, format: 'svg', dimensionsMm: { width: 203.2, height: 279.4 }, bleedMm: 0, cropMarks: false, safeMarginMm: 0 });
  const entries: { path: string; bytes: Uint8Array }[] = [];
  for (const scene of scenes) {
    onProgress?.(`Creating ${scene.replace(/-/g, ' ')} mockup…`);
    entries.push({ path: `${root}/marketing/${root}-${scene}-1800x1200.jpg`, bytes: await rasterize(sceneSvg(scene, master)) });
  }
  entries.push({ path: `${root}/marketing/README.txt`, bytes: new TextEncoder().encode('Marketing mockups are presentation images only. They are separate from the master poster and are not suitable as print artwork.\n') });
  return createZipArchive(entries, `${root}-marketing-mockups.zip`);
}
