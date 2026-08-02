import type { PosterModel } from '@/components/PosterGenerator/PosterModel';

import type { ExportArtifact, ExportService } from './ExportService';
import { selectExportSize, type ExportFormat, type ExportSettings, type ExportSizeId } from './ExportSettings';
import { createZipArchive } from './ZipArchive';

const sizes: readonly Exclude<ExportSizeId, 'custom' | '18x24' | '24x36'>[] = ['a4', 'a3', 'a2', 'a1', 'a0'];
const formats: readonly Extract<ExportFormat, 'svg' | 'png' | 'jpeg' | 'pdf'>[] = ['svg', 'png', 'jpeg', 'pdf'];

function slug(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'isc-poster';
}

export async function createPrintPackage(service: ExportService, model: PosterModel, baseSettings: ExportSettings, onProgress?: (message: string) => void): Promise<ExportArtifact> {
  const root = slug(model.identity.venueName);
  const entries: { path: string; bytes: Uint8Array }[] = [];
  for (const sizeId of sizes) {
    for (const format of formats) {
      onProgress?.(`Creating ${sizeId.toUpperCase()} ${format.toUpperCase()}…`);
      const settings = { ...selectExportSize(baseSettings, sizeId), format };
      const artifact = await service.create({ model, settings, filename: `${root}-${sizeId}` });
      const extension = format === 'jpeg' ? 'jpg' : format;
      entries.push({ path: `${root}/print/${sizeId.toUpperCase()}/${root}-${sizeId}.${extension}`, bytes: artifact.bytes });
    }
  }
  const manifest = { product: 'ISC Studio Print Package', venue: model.identity.venueName, sizes, formats, dpi: baseSettings.dpi, colour: baseSettings.colour, bleedMm: baseSettings.bleedMm, cropMarks: baseSettings.cropMarks, generatedAt: new Date().toISOString() };
  entries.push({ path: `${root}/manifest.json`, bytes: new TextEncoder().encode(JSON.stringify(manifest, null, 2)) });
  onProgress?.('Packaging files…');
  return createZipArchive(entries, `${root}-print-package.zip`);
}
