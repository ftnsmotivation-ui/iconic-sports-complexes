import type { PosterModel } from '@/components/PosterGenerator/PosterModel';

import type { ExportArtifact, ExportService } from './ExportService';
import type { ExportDimensionsMm, ExportSettings } from './ExportSettings';
import { createZipArchive } from './ZipArchive';

interface EtsyMetadata {
  title: string;
  description: string;
  tags: string[];
  keywords: string[];
  altText: string;
}

const commonSizes = [
  { id: '5x7', widthIn: 5, heightIn: 7 }, { id: '8x10', widthIn: 8, heightIn: 10 }, { id: '11x14', widthIn: 11, heightIn: 14 },
  { id: '16x20', widthIn: 16, heightIn: 20 }, { id: '18x24', widthIn: 18, heightIn: 24 }, { id: '24x36', widthIn: 24, heightIn: 36 },
] as const;

function slug(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'isc-poster';
}

function mm(widthIn: number, heightIn: number): ExportDimensionsMm {
  return { width: widthIn * 25.4, height: heightIn * 25.4 };
}

function metadataFor(model: PosterModel): EtsyMetadata {
  const venue = model.identity.venueName;
  const location = `${model.identity.city}, ${model.identity.country}`;
  const title = `${venue} Poster, ${model.identity.sport} Venue Art, Premium Collector Print, ${model.identity.city} Wall Decor`.slice(0, 140);
  const keywords = [venue, model.identity.sport, model.identity.city, model.identity.country, 'sports venue poster', 'collector wall art', 'digital download', 'stadium art', 'travel poster'];
  const tags = [venue, model.identity.sport, `${model.identity.city} art`, 'sports poster', 'venue wall art', 'collector print', 'digital poster', 'stadium decor', 'gift for fans', 'printable art', model.styleId, 'museum poster', model.identity.country].map((tag) => tag.slice(0, 20)).slice(0, 13);
  return {
    title,
    description: `Premium digital collector poster celebrating ${venue} in ${location}. Original vector-first ISC Studio artwork with carefully structured venue details. Package includes high-resolution 300 DPI JPG files in popular print ratios plus listing preview and thumbnail. Frame and physical print are not included. Colours may vary by monitor and printer.`,
    tags,
    keywords,
    altText: `Collector-style poster of ${venue}, an iconic ${model.identity.sport} venue in ${location}, with architectural artwork and venue details.`,
  };
}

function csv(metadata: EtsyMetadata): string {
  const quote = (value: string) => `"${value.replace(/"/g, '""')}"`;
  return `title,description,tags,keywords,alt_text\n${[metadata.title, metadata.description, metadata.tags.join('|'), metadata.keywords.join('|'), metadata.altText].map(quote).join(',')}\n`;
}

export async function createEtsyPackage(service: ExportService, model: PosterModel, baseSettings: ExportSettings, onProgress?: (message: string) => void): Promise<ExportArtifact> {
  const root = slug(model.identity.venueName);
  const entries: { path: string; bytes: Uint8Array }[] = [];
  const createJpeg = async (name: string, dimensionsMm: ExportDimensionsMm, dpi: 150 | 300) => {
    onProgress?.(`Creating ${name}…`);
    const artifact = await service.create({ model, filename: `${root}-${name}`, settings: { ...baseSettings, format: 'jpeg', sizeId: 'custom', dimensionsMm, dpi, bleedMm: 0, cropMarks: false, safeMarginMm: 0 } });
    entries.push({ path: `${root}/artwork/${name}.jpg`, bytes: artifact.bytes });
  };

  await createJpeg('listing-preview-2000px', mm(13.333, 18.333), 150);
  await createJpeg('thumbnail-square-1000px', mm(6.667, 6.667), 150);
  for (const size of commonSizes) await createJpeg(`print-${size.id}-300dpi`, mm(size.widthIn, size.heightIn), 300);

  const metadata = metadataFor(model);
  entries.push({ path: `${root}/metadata/listing.json`, bytes: new TextEncoder().encode(JSON.stringify(metadata, null, 2)) });
  entries.push({ path: `${root}/metadata/listing.csv`, bytes: new TextEncoder().encode(csv(metadata)) });
  entries.push({ path: `${root}/README.txt`, bytes: new TextEncoder().encode('ISC Studio Etsy Digital Package\n\nArtwork files are RGB JPG exports. Print at the size shown in each filename. No physical item or frame is included.\n') });
  onProgress?.('Packaging Etsy files…');
  return createZipArchive(entries, `${root}-etsy-package.zip`);
}
