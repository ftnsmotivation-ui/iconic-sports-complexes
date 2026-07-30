'use client';

import { useState } from 'react';

export interface ExportOptions {
  widthIn: number;
  heightIn: number;
  dpi: number;
  colourProfile: 'srgb' | 'cmyk';
  bleed: boolean;
  cropMarks: boolean;
  safeMargin: boolean;
}

interface PreviewFrameProps {
  posterComponent: React.ReactNode;
  onBack: () => void;
  onExport: (format: 'pdf' | 'png' | 'svg' | 'jpeg', options: ExportOptions) => Promise<void>;
}

const FRAME_OPTIONS = [
  { id: 'black', name: 'Black Frame', swatch: '#0a0a0a', border: '#0a0a0a' },
  { id: 'oak', name: 'Oak Frame', swatch: 'linear-gradient(135deg, #d4b483, #b8935f)', border: '#b8935f' },
  { id: 'walnut', name: 'Walnut Frame', swatch: 'linear-gradient(135deg, #5c3d2e, #3d2817)', border: '#3d2817' },
  { id: 'white', name: 'White Frame', swatch: '#f5f5f0', border: '#f5f5f0' },
  { id: 'none', name: 'No Frame', swatch: 'transparent', border: 'transparent' },
];

const SIZE_OPTIONS = [
  { label: '30x40 in', widthIn: 30, heightIn: 40 },
  { label: '24x36 in', widthIn: 24, heightIn: 36 },
  { label: '18x24 in', widthIn: 18, heightIn: 24 },
  { label: '11x17 in', widthIn: 11, heightIn: 17 },
  { label: 'A2 (16.5x23.4 in)', widthIn: 16.5, heightIn: 23.4 },
];

const DPI_OPTIONS = [150, 300, 600];

export default function PreviewFrame({
  posterComponent,
  onBack,
  onExport,
}: PreviewFrameProps) {
  const [selectedFrame, setSelectedFrame] = useState('oak');
  const [sizeIdx, setSizeIdx] = useState(0);
  const [dpi, setDpi] = useState(300);
  const [colourProfile, setColourProfile] = useState<'srgb' | 'cmyk'>('srgb');
  const [bleed, setBleed] = useState(true);
  const [cropMarks, setCropMarks] = useState(true);
  const [safeMargin, setSafeMargin] = useState(false);

  const frame = FRAME_OPTIONS.find((f) => f.id === selectedFrame)!;
  const size = SIZE_OPTIONS[sizeIdx];
  const frameWidth = frame.id === 'none' ? 0 : 28;

  const buildOptions = (): ExportOptions => ({
    widthIn: size.widthIn,
    heightIn: size.heightIn,
    dpi,
    colourProfile,
    bleed,
    cropMarks,
    safeMargin,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="mb-6 text-amber-500 hover:text-amber-400 underline text-sm"
      >
        ← Back to Personalisation
      </button>

      <div className="mb-8">
        <h2 className="text-4xl font-serif font-bold text-white mb-4">
          Preview & Frame
        </h2>
        <p className="text-amber-500">
          Choose your presentation style and prepare for export
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preview Area */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 rounded-lg p-8">
            <div
              className="flex items-center justify-center rounded-lg overflow-hidden"
              style={{
                padding: `${frameWidth}px`,
                background: frame.swatch,
                boxShadow: frame.id !== 'none' ? 'inset 0 0 12px rgba(0,0,0,0.4)' : 'none',
              }}
            >
              <div className="w-full max-w-2xl">
                {posterComponent}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-4">
              <p className="text-amber-500 text-xs font-semibold mb-2">RESOLUTION</p>
              <p className="text-white text-lg font-bold">{dpi} DPI</p>
              <p className="text-slate-400 text-xs mt-2">
                {Math.round(size.widthIn * dpi)}×{Math.round(size.heightIn * dpi)}px raster
              </p>
            </div>
            <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-4">
              <p className="text-amber-500 text-xs font-semibold mb-2">PRINT SIZE</p>
              <p className="text-white text-sm font-bold">{size.label}</p>
              <p className="text-slate-400 text-xs mt-2">
                {colourProfile === 'cmyk' ? 'CMYK (FOGRA39 label)' : 'sRGB'}
              </p>
            </div>
          </div>
        </div>

        {/* Options Panel */}
        <div>
          {/* Frame Selection */}
          <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">Frame Style</h3>
            <div className="grid grid-cols-2 gap-3">
              {FRAME_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedFrame(option.id)}
                  className={`p-3 rounded-lg text-left transition-all border-2 flex items-center gap-2 ${
                    selectedFrame === option.id
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-amber-700/30 bg-slate-700/50 hover:border-amber-500/50'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-slate-500 flex-shrink-0"
                    style={{ background: option.swatch }}
                  />
                  <span className="text-white text-xs font-semibold">{option.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Print Options */}
          <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">Print Options</h3>

            <label className="block text-xs font-semibold text-amber-500 tracking-wider mb-2">SIZE</label>
            <select
              value={sizeIdx}
              onChange={(e) => setSizeIdx(Number(e.target.value))}
              className="w-full mb-4 px-3 py-2 rounded-lg bg-slate-700 border border-amber-700/30 text-white text-sm focus:border-amber-500 focus:outline-none"
            >
              {SIZE_OPTIONS.map((s, i) => (
                <option key={s.label} value={i}>{s.label}</option>
              ))}
            </select>

            <label className="block text-xs font-semibold text-amber-500 tracking-wider mb-2">RESOLUTION</label>
            <select
              value={dpi}
              onChange={(e) => setDpi(Number(e.target.value))}
              className="w-full mb-4 px-3 py-2 rounded-lg bg-slate-700 border border-amber-700/30 text-white text-sm focus:border-amber-500 focus:outline-none"
            >
              {DPI_OPTIONS.map((d) => (
                <option key={d} value={d}>{d} DPI</option>
              ))}
            </select>

            <label className="block text-xs font-semibold text-amber-500 tracking-wider mb-2">COLOUR</label>
            <select
              value={colourProfile}
              onChange={(e) => setColourProfile(e.target.value as 'srgb' | 'cmyk')}
              className="w-full mb-4 px-3 py-2 rounded-lg bg-slate-700 border border-amber-700/30 text-white text-sm focus:border-amber-500 focus:outline-none"
            >
              <option value="srgb">sRGB (screen/digital)</option>
              <option value="cmyk">CMYK · FOGRA39 (print label)</option>
            </select>

            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={bleed} onChange={(e) => setBleed(e.target.checked)} className="w-4 h-4 rounded border-amber-600 text-amber-600 focus:ring-amber-500" />
                <span className="ml-2 text-white text-sm">Bleed 3mm</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={cropMarks} onChange={(e) => setCropMarks(e.target.checked)} className="w-4 h-4 rounded border-amber-600 text-amber-600 focus:ring-amber-500" />
                <span className="ml-2 text-white text-sm">Crop Marks</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={safeMargin} onChange={(e) => setSafeMargin(e.target.checked)} className="w-4 h-4 rounded border-amber-600 text-amber-600 focus:ring-amber-500" />
                <span className="ml-2 text-white text-sm">Safe Margin</span>
              </label>
            </div>
          </div>

          {/* Export Formats */}
          <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-white mb-4">Export Format</h3>
            <div className="space-y-3">
              <button onClick={() => onExport('pdf', buildOptions())} className="w-full py-3 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors">
                📄 PDF (Print-Ready)
              </button>
              <button onClick={() => onExport('png', buildOptions())} className="w-full py-3 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors">
                🖼️ PNG (High-Res)
              </button>
              <button onClick={() => onExport('svg', buildOptions())} className="w-full py-3 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors">
                ✨ SVG (Vector)
              </button>
              <button onClick={() => onExport('jpeg', buildOptions())} className="w-full py-3 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors">
                📸 JPEG (Web)
              </button>
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-4">
            <p className="text-amber-500 text-xs font-semibold mb-2">READY TO DOWNLOAD</p>
            <p className="text-amber-200 text-xs">
              Your poster is ready for download at {size.label}, {dpi} DPI, with your selected frame style.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
