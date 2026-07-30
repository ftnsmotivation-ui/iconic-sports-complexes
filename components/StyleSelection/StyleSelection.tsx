'use client';

interface StyleSelectionProps {
  onSelect: (style: string) => void;
  onBack: () => void;
}

const STYLES = [
  {
    id: 'blueprint',
    name: 'Blueprint Atlas',
    description: 'Cartographic grid, technical mono, midnight blue.',
    features: ['Midnight blue', 'Technical mono labels', 'Cartographic ring', 'Cyan line art'],
    colorPrimary: '#0d1b2e',
    colorSecondary: '#4a6fa5',
    colorAccent: '#7fa8d9',
  },
  {
    id: 'graphite',
    name: 'Graphite Museum',
    description: 'Exhibition wall grey, restrained rules, quiet type.',
    features: ['Museum grey', 'Restrained rules', 'Quiet serif type', 'High contrast'],
    colorPrimary: '#262626',
    colorSecondary: '#8a8a8a',
    colorAccent: '#c9c9c9',
  },
  {
    id: 'verdant',
    name: 'Verdant Club',
    description: 'Clubhouse green, gilt serif, engraved rules.',
    features: ['Clubhouse green', 'Gilt serif', 'Engraved rules', 'Warm parchment ink'],
    colorPrimary: '#132318',
    colorSecondary: '#c9a961',
    colorAccent: '#f3ead9',
  },
];

export default function StyleSelection({
  onSelect,
  onBack,
}: StyleSelectionProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="mb-6 text-amber-500 hover:text-amber-400 underline text-sm"
      >
        ← Back to Parameters
      </button>

      <div className="mb-8">
        <h2 className="text-4xl font-serif font-bold text-white mb-4">
          Choose Your Poster Style
        </h2>
        <p className="text-amber-500">
          Three unique concepts — layout, type, palette and illustration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {STYLES.map((style) => (
          <div
            key={style.id}
            className="rounded-lg border-2 border-amber-700/30 bg-slate-800/50 hover:border-amber-500/50 hover:bg-slate-800 transition-all overflow-hidden cursor-pointer"
          >
            <div className="h-32 w-full flex gap-2 p-4" style={{ backgroundColor: style.colorPrimary }}>
              <div className="flex-1 rounded" style={{ backgroundColor: style.colorPrimary, border: `1px solid ${style.colorSecondary}` }}></div>
              <div className="flex-1 rounded" style={{ backgroundColor: style.colorSecondary }}></div>
              <div className="flex-1 rounded" style={{ backgroundColor: style.colorAccent }}></div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{style.name}</h3>
              <p className="text-amber-500 text-sm mb-4">{style.description}</p>

              <div className="mb-4">
                <p className="text-xs text-slate-400 font-semibold mb-2">KEY FEATURES</p>
                <div className="flex flex-wrap gap-2">
                  {style.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 text-xs rounded bg-amber-600/20 text-amber-400 border border-amber-600/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelect(style.id)}
                className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold transition-colors"
              >
                Choose {style.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-6">
        <h4 className="text-amber-500 font-semibold mb-2">Design Philosophy</h4>
        <p className="text-slate-300 text-sm">
          Each style maintains professional museum-quality standards while offering distinct visual identities.
          Suitable for commercial printing, marketplace listing, and collector editions.
        </p>
      </div>
    </div>
  );
}
