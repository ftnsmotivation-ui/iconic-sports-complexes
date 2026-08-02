export type ExportFormat = 'svg' | 'png' | 'jpeg' | 'pdf' | 'eps' | 'tiff';
export type ExportDpi = 150 | 300 | 600;
export type ExportSizeId = 'a4' | 'a3' | 'a2' | 'a1' | 'a0' | '18x24' | '24x36' | 'custom';

export interface ExportDimensionsMm {
  width: number;
  height: number;
}

export interface ExportSettings {
  format: ExportFormat;
  sizeId: ExportSizeId;
  dimensionsMm: ExportDimensionsMm;
  dpi: ExportDpi;
  bleedMm: number;
  cropMarks: boolean;
  safeMarginMm: number;
  colour: {
    mode: 'rgb';
    profile: 'srgb';
  };
}

export const exportSizes: Readonly<Record<Exclude<ExportSizeId, 'custom'>, ExportDimensionsMm>> = {
  a4: { width: 210, height: 297 },
  a3: { width: 297, height: 420 },
  a2: { width: 420, height: 594 },
  a1: { width: 594, height: 841 },
  a0: { width: 841, height: 1189 },
  '18x24': { width: 457.2, height: 609.6 },
  '24x36': { width: 609.6, height: 914.4 },
};

export const defaultExportSettings: ExportSettings = {
  format: 'svg',
  sizeId: 'a2',
  dimensionsMm: exportSizes.a2,
  dpi: 300,
  bleedMm: 3,
  cropMarks: true,
  safeMarginMm: 5,
  colour: { mode: 'rgb', profile: 'srgb' },
};

export function selectExportSize(settings: ExportSettings, sizeId: ExportSizeId): ExportSettings {
  return {
    ...settings,
    sizeId,
    dimensionsMm: sizeId === 'custom' ? settings.dimensionsMm : exportSizes[sizeId],
  };
}
