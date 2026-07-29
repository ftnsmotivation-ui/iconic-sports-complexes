'use client';

import { useState, useEffect } from 'react';
import SportSelection from '@/components/SportSelection/SportSelection';

export default function Home() {
  const [step, setStep] = useState<'sport' | 'competition'>('sport');
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [competitions, setCompetitions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSportSelect = async (sport: string) => {
    setLoading(true);
    setError('');
    setSelectedSport(sport);

    try {
      const response = await fetch(`/api/competitions?sport=${encodeURIComponent(sport)}`);
      if (!response.ok) {
        throw new Error(`Failed to load competitions for ${sport}`);
      }
      const data = await response.json();
      setCompetitions(data.competitions || []);
      setStep('competition');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load competitions');
      console.error('Error loading competitions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSports = () => {
    setStep('sport');
    setSelectedSport('');
    setCompetitions([]);
    setError('');
  };

  return (
    <div className="min-h-screen">
      {step === 'sport' && (
        <SportSelection onSelect={handleSportSelect} loading={loading} />
      )}

      {step === 'competition' && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <button
            onClick={handleBackToSports}
            className="mb-6 text-amber-500 hover:text-amber-400 underline text-sm"
          >
            ← Back to Sports
          </button>
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Select a Competition
          </h2>
          <p className="text-amber-500 mb-8">
            Competitions for <span className="font-bold">{selectedSport}</span>
          </p>

          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-8">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {competitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {competitions.map((competition) => (
                <button
                  key={competition}
                  className="p-6 text-left rounded-lg border-2 border-amber-700/30 bg-slate-700/50 hover:border-amber-500/50 hover:bg-slate-700/70 transition-all text-white"
                >
                  <div className="font-semibold">{competition}</div>
                  <div className="text-xs text-amber-500 mt-2">Click to select venue</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-8">
              <div className="text-center text-white">
                <p className="mb-4">No competitions found for {selectedSport}</p>
                <p className="text-sm text-slate-400">Check that the sport exists in the database</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Workflow progress indicator */}
      <div className="fixed bottom-8 right-8 bg-black/80 border border-amber-700 rounded-lg p-4 text-sm text-amber-500">
        <div className="font-semibold mb-2">Workflow Progress</div>
        <div className="space-y-1 text-xs">
          <div className={step === 'sport' ? 'text-amber-400' : 'text-slate-500'}>
            {step === 'sport' ? '✓' : '○'} Sport Selection
          </div>
          <div className={step === 'competition' ? 'text-amber-400' : 'text-slate-500'}>
            {step === 'competition' ? '✓' : '○'} Competition Selection
          </div>
          <div className="text-slate-500">
            ○ Venue Selection
          </div>
        </div>
      </div>
    </div>
  );
}
