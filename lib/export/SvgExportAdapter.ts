import type { ExportAdapter, ExportArtifact, ExportRequest } from './ExportService';
import { renderPosterSvg } from './renderPosterSvg';

function safeFilename(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'isc-poster';
}

export class SvgExportAdapter implements ExportAdapter {
  readonly format = 'svg' as const;

  async export(request: ExportRequest): Promise<ExportArtifact> {
    const svg = await renderPosterSvg(request.model, request.settings);
    return {
      bytes: new TextEncoder().encode(svg),
      filename: `${safeFilename(request.filename)}.svg`,
      mimeType: 'image/svg+xml;charset=utf-8',
    };
  }
}
