import type { PosterModel } from '@/components/PosterGenerator/PosterModel';

import type { ExportFormat, ExportSettings } from './ExportSettings';
import { assertColourConversionAvailable } from './ColourManagement';

export interface ExportRequest {
  model: PosterModel;
  settings: ExportSettings;
  filename: string;
}

export interface ExportArtifact {
  bytes: Uint8Array;
  filename: string;
  mimeType: string;
}

export interface ExportAdapter {
  readonly format: ExportFormat;
  export(request: ExportRequest): Promise<ExportArtifact>;
}

export class UnsupportedExportFormatError extends Error {
  constructor(format: ExportFormat) {
    super(`No production adapter is registered for ${format.toUpperCase()} export.`);
    this.name = 'UnsupportedExportFormatError';
  }
}

export class ExportService {
  private readonly adapters = new Map<ExportFormat, ExportAdapter>();

  register(adapter: ExportAdapter): void {
    this.adapters.set(adapter.format, adapter);
  }

  supports(format: ExportFormat): boolean {
    return this.adapters.has(format);
  }

  async create(request: ExportRequest): Promise<ExportArtifact> {
    assertColourConversionAvailable(request.settings.colour);
    const adapter = this.adapters.get(request.settings.format);
    if (!adapter) throw new UnsupportedExportFormatError(request.settings.format);
    return adapter.export(request);
  }
}
