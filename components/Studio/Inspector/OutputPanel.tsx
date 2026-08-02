import { PanelHeading } from "../Sidebar/VenuePanel";
import { exportSizes, selectExportSize, type ExportDpi, type ExportFormat, type ExportSettings, type ExportSizeId } from "@/lib/export/ExportSettings";
import type { CmykProfileId } from "@/lib/export/ColourManagement";

interface OutputPanelProps {
  settings: ExportSettings;
  onSettingsChange: (settings: ExportSettings) => void;
  onResetStudio: () => void;
  exporting: boolean;
  exportMessage: string;
  onExport: () => void;
  onExportPrintPackage: () => void;
  onExportEtsyPackage: () => void;
}

const sizeLabels: Readonly<Record<Exclude<ExportSizeId, 'custom'>, string>> = { a4: 'A4 Portrait', a3: 'A3 Portrait', a2: 'A2 Portrait', a1: 'A1 Portrait', a0: 'A0 Portrait', '18x24': '18 × 24 inch', '24x36': '24 × 36 inch' };

export default function OutputPanel({ settings, onSettingsChange, onResetStudio, exporting, exportMessage, onExport, onExportPrintPackage, onExportEtsyPackage }: OutputPanelProps) {
  const formatSupported = (settings.format === 'svg' || settings.format === 'png' || settings.format === 'jpeg' || settings.format === 'pdf' || settings.format === 'tiff') && settings.colour.mode === 'rgb';
  const colourValue = settings.colour.mode === 'rgb' ? 'srgb' : settings.colour.profile;
  const changeColour = (value: string) => onSettingsChange({ ...settings, colour: value === 'srgb' ? { mode: 'rgb', profile: 'srgb', conversion: 'native' } : { mode: 'cmyk', profile: value as CmykProfileId, conversion: 'external-required' } });
  return (
    <>
      <div className="my-7 h-px bg-white/10" />
      <PanelHeading number="05" title="Output" description="Prepare the commercial artwork." />
      <label className="mt-5 block">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/35">Print size</span>
        <select value={settings.sizeId} onChange={(event) => onSettingsChange(selectExportSize(settings, event.target.value as ExportSizeId))} className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none">
          {(Object.keys(exportSizes) as Exclude<ExportSizeId, 'custom'>[]).map((sizeId) => <option key={sizeId} value={sizeId}>{sizeLabels[sizeId]}</option>)}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/35">Resolution</span>
        <select value={settings.dpi} onChange={(event) => onSettingsChange({ ...settings, dpi: Number(event.target.value) as ExportDpi })} className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none">
          {[150, 300, 600].map((dpi) => <option key={dpi} value={dpi}>{dpi} DPI</option>)}
        </select>
      </label>
      <label className="mt-4 block"><span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/35">Format</span><select value={settings.format} onChange={(event) => onSettingsChange({ ...settings, format: event.target.value as ExportFormat })} className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none">{(['svg', 'png', 'jpeg', 'pdf', 'eps', 'tiff'] as ExportFormat[]).map((format) => <option key={format} value={format}>{format.toUpperCase()}</option>)}</select></label>
      {settings.format === 'eps' && <p className="mt-2 text-[10px] leading-4 text-amber-200/55">EPS requires a trusted PostScript converter and is unavailable in this runtime. SVG and PDF remain vector-first alternatives.</p>}
      <label className="mt-4 block"><span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/35">Print colour</span><select value={colourValue} onChange={(event) => changeColour(event.target.value)} className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none"><option value="srgb">sRGB · available</option><option value="fogra39">CMYK · FOGRA39</option><option value="gracol2006">CMYK · GRACoL 2006</option></select></label>
      {settings.colour.mode === 'cmyk' && <p className="mt-2 text-[10px] leading-4 text-amber-200/55">CMYK is configured but blocked: a licensed ICC transform is not installed. Preview remains sRGB.</p>}
      <div className="mt-4 space-y-2 text-xs text-white/60">
        <label className="flex items-center gap-2"><input type="checkbox" checked={settings.bleedMm > 0} onChange={(event) => onSettingsChange({ ...settings, bleedMm: event.target.checked ? 3 : 0 })} className="h-4 w-4 accent-amber-300"/>3 mm bleed</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={settings.cropMarks} onChange={(event) => onSettingsChange({ ...settings, cropMarks: event.target.checked })} className="h-4 w-4 accent-amber-300"/>Crop marks</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={settings.safeMarginMm > 0} onChange={(event) => onSettingsChange({ ...settings, safeMarginMm: event.target.checked ? 5 : 0 })} className="h-4 w-4 accent-amber-300"/>5 mm safe margin</label>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button type="button" onClick={onResetStudio} className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-xs text-white/65 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">Reset Draft</button>
        <button type="button" disabled={!formatSupported || exporting} onClick={onExport} title={formatSupported ? `Download production ${settings.format.toUpperCase()}` : `${settings.format.toUpperCase()} support is introduced in a later sprint.`} className="rounded-lg border border-amber-300/40 bg-amber-300/10 px-3 py-3 text-xs font-semibold text-amber-200 transition hover:bg-amber-300/20 disabled:cursor-not-allowed disabled:opacity-40">{exporting ? 'Preparing…' : `Export ${settings.format.toUpperCase()}`}</button>
      </div>
      <button type="button" disabled={settings.colour.mode !== 'rgb' || exporting} onClick={onExportPrintPackage} className="mt-3 w-full rounded-lg border border-amber-300/25 bg-amber-300/[.07] px-3 py-3 text-xs font-semibold text-amber-100 transition hover:bg-amber-300/15 disabled:cursor-not-allowed disabled:opacity-40">One-Click Print Package</button>
      <button type="button" disabled={settings.colour.mode !== 'rgb' || exporting} onClick={onExportEtsyPackage} className="mt-2 w-full rounded-lg border border-white/10 bg-white/[.04] px-3 py-3 text-xs font-semibold text-white/70 transition hover:bg-white/[.08] disabled:cursor-not-allowed disabled:opacity-40">Etsy Publishing Package</button>
      {exportMessage && <p role="status" className="mt-3 text-[10px] leading-4 text-white/45">{exportMessage}</p>}
    </>
  );
}
