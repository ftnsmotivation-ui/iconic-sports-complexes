import type { ExportAdapter, ExportArtifact, ExportRequest } from './ExportService';
import { renderPosterSvg } from './renderPosterSvg';

function safeFilename(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'isc-poster';
}

export class PdfExportAdapter implements ExportAdapter {
  readonly format = 'pdf' as const;

  async export(request: ExportRequest): Promise<ExportArtifact> {
    const svgContent = await renderPosterSvg(request.model, request.settings);
    const response = await fetch('/api/export/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        svgContent,
        filename: request.filename,
        widthMm: request.settings.dimensionsMm.width,
        heightMm: request.settings.dimensionsMm.height,
        dpi: request.settings.dpi,
        bleedMm: request.settings.bleedMm,
        cropMarks: request.settings.cropMarks,
        safeMarginMm: request.settings.safeMarginMm,
      }),
    });
    if (!response.ok) {
      const result: unknown = await response.json().catch(() => null);
      const message = result && typeof result === 'object' && 'error' in result ? String(result.error) : 'PDF export failed.';
      throw new Error(message);
    }
    return { bytes: new Uint8Array(await response.arrayBuffer()), filename: `${safeFilename(request.filename)}.pdf`, mimeType: 'application/pdf' };
  }
}
