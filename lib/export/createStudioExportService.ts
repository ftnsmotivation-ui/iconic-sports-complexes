import { ExportService } from './ExportService';
import { PdfExportAdapter } from './PdfExportAdapter';
import { RasterExportAdapter } from './RasterExportAdapter';
import { SvgExportAdapter } from './SvgExportAdapter';

export function createStudioExportService(): ExportService {
  const service = new ExportService();
  service.register(new SvgExportAdapter());
  service.register(new RasterExportAdapter('png'));
  service.register(new RasterExportAdapter('jpeg'));
  service.register(new RasterExportAdapter('tiff'));
  service.register(new PdfExportAdapter());
  return service;
}
