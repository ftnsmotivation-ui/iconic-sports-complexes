export type CmykProfileId = 'fogra39' | 'gracol2006';

export type ExportColourSettings =
  | { mode: 'rgb'; profile: 'srgb'; conversion: 'native' }
  | { mode: 'cmyk'; profile: CmykProfileId; conversion: 'external-required' };

export interface PrintColourProfile {
  id: CmykProfileId;
  name: string;
  region: string;
  iccAsset: null;
  available: false;
}

export const printColourProfiles: Readonly<Record<CmykProfileId, PrintColourProfile>> = {
  fogra39: { id: 'fogra39', name: 'FOGRA39 / ISO Coated v2', region: 'Europe', iccAsset: null, available: false },
  gracol2006: { id: 'gracol2006', name: 'GRACoL 2006 Coated', region: 'North America', iccAsset: null, available: false },
};

export class ColourConversionUnavailableError extends Error {
  constructor(profile: CmykProfileId) {
    super(`${printColourProfiles[profile].name} is configured, but no licensed ICC transform is installed. Export remains blocked rather than being falsely labelled CMYK.`);
    this.name = 'ColourConversionUnavailableError';
  }
}

export function assertColourConversionAvailable(settings: ExportColourSettings): void {
  if (settings.mode === 'cmyk') throw new ColourConversionUnavailableError(settings.profile);
}
