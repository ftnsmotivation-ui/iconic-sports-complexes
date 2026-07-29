'use client';

import { useState } from 'react';

const PRESET_SPORTS = [
  'Formula 1',
  'Football Stadiums',
  'Cricket Grounds',
  'Tennis Venues',
  'Golf Courses',
  'Rugby Stadiums',
  'Olympic Venues',
  'Boxing Arenas',
];

interface SportSelectionProps {
  onSelect: (sport: string) => void;
  loading?: boolean;
}

export default function SportSelection({
  onSelect,
  loading = false,
}: SportSelectionProps) {
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [otherSport, setOtherSport] = useState<string>('');
  const [showOther, setShowOther] = useState(false);

  const handleSelect = (sport: string) => {
    setSelectedSport(sport);
    setShowOther(false);
    setOtherSport('');
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherSport(e.target.value);
    if (e.target.value) {
      setSelectedSport('');
    }
  };

  const handleContinue = () => {
    const sport = selectedSport || otherSport;
    if (sport && !loading) {
      onSelect(sport);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-serif font-bold text-white mb-4">
          Select a Sport
        </h2>
        <p className="text-amber-500">
          Choose from our curated collection or add a new sport
        </p>
      </div>

      <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {PRESET_SPORTS.map((sport) => (
            <button
              key={sport}
              onClick={() => handleSelect(sport)}
              className={`p-4 text-left rounded-lg border-2 transition-all ${
                selectedSport === sport
                  ? 'border-amber-500 bg-amber-500/10'
                  : 'border-amber-700/30 hover:border-amber-500/50 bg-slate-700/50'
              }`}
            >
              <div className="text-white font-semibold">{sport}</div>
            </button>
          ))}
        </div>

        {/* Other Sport */}
        <div className="border-t border-amber-700/30 pt-6">
          <label className="flex items-center cursor-pointer mb-4">
            <input
              type="radio"
              name="sport"
              checked={showOther}
              onChange={() => setShowOther(!showOther)}
              className="mr-3"
            />
            <span className="text-white font-semibold">Other Sport:</span>
          </label>

          {showOther && (
            <input
              type="text"
              placeholder="Enter sport name (e.g., Swimming, Badminton, Baseball)"
              value={otherSport}
              onChange={handleOtherChange}
              onClick={() => setShowOther(true)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-amber-700/30 text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none"
            />
          )}
        </div>
      </div>

      {/* Info Box */}
      {showOther && otherSport && (
        <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-6 mb-8">
          <p className="text-amber-500 text-sm">
            <span className="font-semibold">Note:</span> If "{otherSport}" is not in our database,
            we'll offer to download iconic venues and add them automatically.
          </p>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!selectedSport && !otherSport || loading}
        className="w-full py-3 px-6 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Continue to Competitions'}
      </button>
    </div>
  );
}
