'use client';

import { useState } from 'react';
import { getSportParams, DEFAULT_SPORT_PARAM_IDS } from '@/lib/sportParameters';

interface ParameterSelectionProps {
  sport: string;
  onNext: (selectedParameters: string[]) => void;
  onBack: () => void;
}

const BASE_PARAMETERS = [
  { id: 'venueName', label: 'Venue Name', category: 'basic' },
  { id: 'competition', label: 'Competition', category: 'basic' },
  { id: 'city', label: 'City', category: 'location' },
  { id: 'country', label: 'Country', category: 'location' },
  { id: 'countryFlag', label: 'Country Flag', category: 'location' },
  { id: 'opened', label: 'Year Opened', category: 'history' },
  { id: 'capacity', label: 'Capacity', category: 'specs' },
  { id: 'architect', label: 'Architect/Designer', category: 'specs' },
  { id: 'surface', label: 'Surface Type', category: 'specs' },
  { id: 'coordinates', label: 'Coordinates (Lat/Lng)', category: 'specs' },
  { id: 'venueMap', label: 'Venue Map', category: 'visual' },
  { id: 'compassRose', label: 'Compass Rose', category: 'visual' },
  { id: 'colourTheme', label: 'Colour Theme', category: 'design' },
  { id: 'famousFor', label: 'Famous For', category: 'content' },
  { id: 'iconicMoments', label: 'Iconic Moments', category: 'content' },
  { id: 'nickname', label: 'Nickname', category: 'content' },
  { id: 'signatureQuote', label: 'Signature Quote', category: 'content' },
  { id: 'notableEvents', label: 'Notable Events', category: 'history' },
  { id: 'championshipHistory', label: 'Championship History', category: 'history' },
  { id: 'clubLogo', label: 'Club/Team Logo', category: 'visual' },
  { id: 'collectorNumber', label: 'Collector Number', category: 'design' },
];

const CATEGORIES: Record<string, string> = {
  basic: 'Essential Information',
  location: 'Location',
  specs: 'Technical Specs',
  visual: 'Visual Elements',
  design: 'Design Elements',
  content: 'Content',
  history: 'Historical Data',
};

export default function ParameterSelection({
  sport,
  onNext,
  onBack,
}: ParameterSelectionProps) {
  const sportParams = getSportParams(sport).map((p) => ({ ...p, category: 'sport' }));
  const allParameters = [...BASE_PARAMETERS, ...sportParams];
  const sportCategoryLabel = `${sport} Facts`;

  const defaultSelected = [
    'venueName', 'competition', 'city', 'country', 'opened', 'capacity',
    'nickname', 'famousFor', 'iconicMoments',
    ...(DEFAULT_SPORT_PARAM_IDS[sport] || []),
  ];
  const [selectedParams, setSelectedParams] = useState<Set<string>>(new Set(defaultSelected));

  const toggleParameter = (id: string) => {
    const newSelected = new Set(selectedParams);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedParams(newSelected);
  };

  const toggleCategory = (category: string) => {
    const categoryParams = allParameters.filter(p => p.category === category);
    const allSelected = categoryParams.every(p => selectedParams.has(p.id));

    const newSelected = new Set(selectedParams);
    categoryParams.forEach(p => {
      if (allSelected) {
        newSelected.delete(p.id);
      } else {
        newSelected.add(p.id);
      }
    });
    setSelectedParams(newSelected);
  };

  const selectAll = () => {
    setSelectedParams(new Set(allParameters.map(p => p.id)));
  };

  const clearAll = () => {
    setSelectedParams(new Set());
  };

  const categoryOrder = ['basic', 'location', 'sport', 'specs', 'visual', 'design', 'content', 'history'];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="mb-6 text-amber-500 hover:text-amber-400 underline text-sm"
      >
        ← Back to Venue
      </button>

      <div className="mb-8">
        <h2 className="text-4xl font-serif font-bold text-white mb-4">
          Customize Poster Parameters
        </h2>
        <p className="text-amber-500">
          Select which information to display on your poster ({selectedParams.size}/{allParameters.length} selected)
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={selectAll}
          className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors"
        >
          Select All
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {categoryOrder.map((categoryKey) => {
          const categoryParams = allParameters.filter(p => p.category === categoryKey);
          if (categoryParams.length === 0) return null;
          const allSelected = categoryParams.every(p => selectedParams.has(p.id));
          const categoryLabel = categoryKey === 'sport' ? sportCategoryLabel : CATEGORIES[categoryKey];

          return (
            <div key={categoryKey} className={`bg-slate-800/50 border rounded-lg p-6 ${categoryKey === 'sport' ? 'border-amber-500/60 lg:col-span-2' : 'border-amber-700/30'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-amber-500">{categoryLabel}</h3>
                <button
                  onClick={() => toggleCategory(categoryKey)}
                  className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                >
                  {allSelected ? 'Deselect' : 'Select'} All
                </button>
              </div>

              <div className={categoryKey === 'sport' ? 'grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3' : 'space-y-3'}>
                {categoryParams.map(param => (
                  <label key={param.id} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedParams.has(param.id)}
                      onChange={() => toggleParameter(param.id)}
                      className="w-4 h-4 rounded border-amber-600 text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                    <span className="ml-3 text-white group-hover:text-amber-500 transition-colors">
                      {param.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onNext(Array.from(selectedParams))}
        disabled={selectedParams.size === 0}
        className="w-full py-3 px-6 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Style Selection ({selectedParams.size} parameters)
      </button>
    </div>
  );
}
