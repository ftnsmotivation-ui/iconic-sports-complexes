import type { ExportAdapter, ExportArtifact, ExportRequest } from './ExportService';
import { MAX_RASTER_DIMENSION, MAX_RASTER_PIXELS, rasterPixelDimensions } from './ExportSettings';
import { renderPosterSvg } from './renderPosterSvg';

type RasterFormat = 'png' | 'jpeg' | 'tiff';

function safeFilename(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'isc-poster';
}

export class RasterExportAdapter implements ExportAdapter {
  constructor(readonly format: RasterFormat) {}

  async export(request: ExportRequest): Promise<ExportArtifact> {
    const dimensions = rasterPixelDimensions(request.settings);
    if (dimensions.width > MAX_RASTER_DIMENSION || dimensions.height > MAX_RASTER_DIMENSION || dimensions.pixels > MAX_RASTER_PIXELS) {
      throw new Error(`Requested raster is ${dimensions.width} × ${dimensions.height}px and exceeds the safe canvas limit.`);
    }
    const svgContent = await renderPosterSvg(request.model, request.settings);
    const response = await fetch('/api/export/raster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ svgContent, format: this.format, width: dimensions.width, height: dimensions.height, dpi: request.settings.dpi }),
    });
    if (!response.ok) {
      const result: unknown = await response.json().catch(() => null);
      const message = result && typeof result === 'object' && 'error' in result ? String(result.error) : 'Raster export failed.';
      throw new Error(message);
    }
    return {
      bytes: new Uint8Array(await response.arrayBuffer()),
      filename: `${safeFilename(request.filename)}-${request.settings.dpi}dpi.${this.format === 'jpeg' ? 'jpg' : this.format === 'tiff' ? 'tif' : 'png'}`,
      mimeType: this.format === 'jpeg' ? 'image/jpeg' : this.format === 'tiff' ? 'image/tiff' : 'image/png',
    };
  }
}
