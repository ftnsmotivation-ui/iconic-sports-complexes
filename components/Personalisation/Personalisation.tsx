'use client';

import { useState } from 'react';
import type { PersonalisationData } from '@/components/PosterGenerator/PosterDisplay';

interface PersonalisationProps {
  onNext: (data: PersonalisationData) => void;
  onBack: () => void;
}

export default function Personalisation({ onNext, onBack }: PersonalisationProps) {
  const [enabled, setEnabled] = useState(false);
  const [date, setDate] = useState('');
  const [occasion, setOccasion] = useState('');
  const [stand, setStand] = useState('');
  const [seat, setSeat] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="mb-6 text-amber-500 hover:text-amber-400 underline text-sm"
      >
        ← Back to Style
      </button>

      <div className="mb-8">
        <h2 className="text-4xl font-serif font-bold text-white mb-4">
          Personalisation
        </h2>
        <p className="text-amber-500">
          Optionally add the details of the day you were there
        </p>
      </div>

      <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-8">
        <label className="flex items-center cursor-pointer mb-8">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            className="w-5 h-5 rounded border-amber-600 text-amber-600 focus:ring-amber-500 cursor-pointer"
          />
          <span className="ml-3 text-white font-semibold text-lg">I Was There</span>
        </label>

        {enabled && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-amber-500 tracking-wider mb-2">
                  DATE
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. 28 May 2023"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-amber-700/30 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-amber-500 tracking-wider mb-2">
                  OCCASION
                </label>
                <input
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder="e.g. Finals"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-amber-700/30 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-amber-500 tracking-wider mb-2">
                  STAND
                </label>
                <input
                  type="text"
                  value={stand}
                  onChange={(e) => setStand(e.target.value)}
                  placeholder="e.g. 56"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-amber-700/30 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-amber-500 tracking-wider mb-2">
                  SEAT
                </label>
                <input
                  type="text"
                  value={seat}
                  onChange={(e) => setSeat(e.target.value)}
                  placeholder="e.g. 78"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-amber-700/30 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-amber-500 tracking-wider mb-2">
                NOTES
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="A personal memory of the day"
                className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-amber-700/30 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onNext({ enabled, date, occasion, stand, seat, notes })}
        className="w-full mt-8 py-3 px-6 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors"
      >
        Continue to Preview
      </button>
    </div>
  );
}
