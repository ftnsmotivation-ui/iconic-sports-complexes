import type { ExportAdapter, ExportArtifact, ExportRequest } from './ExportService';
import { renderPosterSvg } from './renderPosterSvg';

export interface EpsConverter {
  convert(svgContent: string, request: ExportRequest): Promise<ExportArtifact>;
}

export class EpsConverterUnavailableError extends Error {
  constructor() {
    super('EPS export requires a trusted server-side PostScript converter; none is installed in this runtime. Use production SVG or PDF instead.');
    this.name = 'EpsConverterUnavailableError';
  }
}

export class EpsExportAdapter implements ExportAdapter {
  readonly format = 'eps' as const;

  constructor(private readonly converter?: EpsConverter) {}

  async export(request: ExportRequest): Promise<ExportArtifact> {
    if (!this.converter) throw new EpsConverterUnavailableError();
    const svgContent = await renderPosterSvg(request.model, request.settings);
    return this.converter.convert(svgContent, request);
  }
}
