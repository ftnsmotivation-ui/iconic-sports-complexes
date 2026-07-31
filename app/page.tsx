'use client';

import { useState } from 'react';
import SportSelection from '@/components/SportSelection/SportSelection';
import PosterDisplay, { PersonalisationData } from '@/components/PosterGenerator/PosterDisplay';
import CinematicHeroPoster from '@/components/PosterGenerator/CinematicHeroPoster';
import PreviewFrame, { ExportOptions } from '@/components/PreviewFrame/PreviewFrame';
import ParameterSelection from '@/components/ParameterSelection/ParameterSelection';
import StyleSelection from '@/components/StyleSelection/StyleSelection';
import Personalisation from '@/components/Personalisation/Personalisation';

type WorkflowStep = 'sport' | 'competition' | 'venue' | 'parameters' | 'style' | 'personalisation' | 'preview';

interface Venue {
  sport?: string;
  venueName: string;
  competition: string;
  city: string;
  country: string;
  countryFlag?: string;
  opened: number;
  capacity: number;
  architect?: string;
  surface?: string;
  lat?: number;
  lng?: number;
  collectorNumber?: number;
  nickname?: string;
  famousFor?: string;
  iconicMoments?: string;
  // Every sport's sheet has its own extra columns (pitchDimensions for
  // Football, endsNames for Cricket, parTotal for Golf, ...) — carried
  // through untyped since the API returns whatever the row contains.
  [key: string]: unknown;
}

export default function Home() {
  const [step, setStep] = useState<WorkflowStep>('sport');
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedCompetition, setSelectedCompetition] = useState<string>('');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([
    'venueName',
    'competition',
    'city',
    'country',
    'opened',
    'capacity',
    'nickname',
    'famousFor',
    'iconicMoments',
  ]);
  const [selectedStyle, setSelectedStyle] = useState<'blueprint' | 'graphite' | 'verdant'>('blueprint');
  const [personalisation, setPersonalisation] = useState<PersonalisationData>({ enabled: false });
  const [competitions, setCompetitions] = useState<string[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
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

  const handleCompetitionSelect = async (competition: string) => {
    setLoading(true);
    setError('');
    setSelectedCompetition(competition);

    try {
      const response = await fetch(
        `/api/venues?sport=${encodeURIComponent(selectedSport)}&competition=${encodeURIComponent(competition)}`
      );
      if (!response.ok) {
        throw new Error('Failed to load venues');
      }
      const data = await response.json();
      setVenues(data.venues || []);
      setStep('venue');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load venues');
      console.error('Error loading venues:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVenueSelect = (venue: Venue) => {
    setSelectedVenue(venue);
    setStep('parameters');
  };

  const handleParameterSelect = (params: string[]) => {
    setSelectedParameters(params);
    setStep('style');
  };

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style as 'blueprint' | 'graphite' | 'verdant');
    setStep('personalisation');
  };

  const handlePersonalisationNext = (data: PersonalisationData) => {
    setPersonalisation(data);
    setStep('preview');
  };

  const handleBackToSports = () => {
    setStep('sport');
    setSelectedSport('');
    setSelectedCompetition('');
    setCompetitions([]);
    setVenues([]);
    setError('');
  };

  const handleBackToCompetitions = () => {
    setStep('competition');
    setSelectedCompetition('');
    setVenues([]);
  };

  const handleBackToVenue = () => {
    setStep('venue');
  };

  const handleBackToParameters = () => {
    setStep('parameters');
  };

  const handleBackToStyle = () => {
    setStep('style');
  };

  const handleBackToPersonalisation = () => {
    setStep('personalisation');
  };

  const handleExport = async (
  format: 'pdf' | 'png' | 'svg' | 'jpeg',
  options: ExportOptions
) => {
  if (!selectedVenue) return;

  setError(
    `The new collector poster is working, but ${format.toUpperCase()} export is being upgraded for the new renderer.`
  );
};
      

  const exportToRaster = async (
    svgString: string,
    filename: string,
    format: 'png' | 'jpeg',
    options: ExportOptions
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const svgWithNamespace = svgString.includes('xmlns')
          ? svgString
          : svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Target the exact pixel dimensions of the chosen paper size at the chosen DPI.
        const canvasWidth = Math.round(options.widthIn * options.dpi);
        const canvasHeight = Math.round(options.heightIn * options.dpi);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const bleedPx = options.bleed ? Math.round((3 / 25.4) * options.dpi) : 0;

        const svgBlob = new Blob([svgWithNamespace], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
          ctx.fillStyle = '#1a1a1a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Contain-fit the 800x1100 artwork within the paper canvas, inset by bleed.
          const artAspect = 800 / 1100;
          const availW = canvasWidth - bleedPx * 2;
          const availH = canvasHeight - bleedPx * 2;
          let drawW = availW;
          let drawH = drawW / artAspect;
          if (drawH > availH) {
            drawH = availH;
            drawW = drawH * artAspect;
          }
          const drawX = (canvasWidth - drawW) / 2;
          const drawY = (canvasHeight - drawH) / 2;
          ctx.drawImage(img, drawX, drawY, drawW, drawH);

          if (options.safeMargin) {
            const marginPx = Math.round((5 / 25.4) * options.dpi);
            ctx.strokeStyle = 'rgba(212,175,55,0.6)';
            ctx.lineWidth = Math.max(1, options.dpi / 150);
            ctx.setLineDash([8, 6]);
            ctx.strokeRect(marginPx, marginPx, canvasWidth - marginPx * 2, canvasHeight - marginPx * 2);
            ctx.setLineDash([]);
          }

          if (options.cropMarks) {
            const len = Math.round((5 / 25.4) * options.dpi);
            const off = Math.round(bleedPx * 0.6);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = Math.max(1, options.dpi / 300);
            const drawTick = (x: number, y: number, dx: number, dy: number) => {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + dx, y + dy);
              ctx.stroke();
            };
            // top-left
            drawTick(0, off, len, 0);
            drawTick(off, 0, 0, len);
            // top-right
            drawTick(canvasWidth, off, -len, 0);
            drawTick(canvasWidth - off, 0, 0, len);
            // bottom-left
            drawTick(0, canvasHeight - off, len, 0);
            drawTick(off, canvasHeight, 0, -len);
            // bottom-right
            drawTick(canvasWidth, canvasHeight - off, -len, 0);
            drawTick(canvasWidth - off, canvasHeight, 0, -len);
          }

          URL.revokeObjectURL(url);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                downloadBlob(blob, `${filename}.${format}`);
                resolve();
              } else {
                reject(new Error('Failed to create image blob'));
              }
            },
            `image/${format}`,
            format === 'jpeg' ? 0.95 : undefined
          );
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('Failed to rasterize poster SVG'));
        };

        img.src = url;
      } catch (err) {
        reject(err);
      }
    });
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                  onClick={() => handleCompetitionSelect(competition)}
                  className="p-6 text-left rounded-lg border-2 border-amber-700/30 bg-slate-700/50 hover:border-amber-500/50 hover:bg-slate-700/70 transition-all text-white cursor-pointer"
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

      {step === 'venue' && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <button
            onClick={handleBackToCompetitions}
            className="mb-6 text-amber-500 hover:text-amber-400 underline text-sm"
          >
            ← Back to Competitions
          </button>

          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-8">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {venues.length > 0 ? (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Select a Venue</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {venues.map((venue, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleVenueSelect(venue)}
                    className="p-6 text-left rounded-lg border-2 border-amber-700/30 bg-slate-700/50 hover:border-amber-500/50 hover:bg-slate-700/70 transition-all text-white"
                  >
                    <div className="font-semibold text-lg">{venue.venueName}</div>
                    <div className="text-xs text-amber-500 mt-1">{venue.city}, {venue.country}</div>
                    <div className="text-xs text-slate-400 mt-2">Opened: {venue.opened}</div>
                    {venue.capacity && (
                      <div className="text-xs text-slate-400">Capacity: {venue.capacity.toLocaleString()}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-amber-700/30 rounded-lg p-8">
              <div className="text-center text-white">
                <p className="mb-2">Loading venue data...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 'parameters' && selectedVenue && (
        <ParameterSelection
          sport={selectedVenue.sport || selectedSport}
          onNext={handleParameterSelect}
          onBack={handleBackToVenue}
        />
      )}

      {step === 'style' && selectedVenue && (
        <StyleSelection
          onSelect={handleStyleSelect}
          onBack={handleBackToParameters}
        />
      )}

      {step === 'personalisation' && selectedVenue && (
        <Personalisation
          onNext={handlePersonalisationNext}
          onBack={handleBackToStyle}
        />
      )}

      {step === 'preview' && selectedVenue && (
        <PreviewFrame
          posterComponent={
           <CinematicHeroPoster
  venueName={selectedVenue.venueName}
  city={selectedVenue.city}
  country={selectedVenue.country}
  opened={selectedVenue.opened}
  capacity={selectedVenue.capacity}
  competition={selectedVenue.competition}
  collectorNumber={selectedVenue.collectorNumber}
  inscription={
    (selectedVenue.collectorInscription as string | undefined) ||
    (selectedVenue.nickname as string | undefined) ||
    'Where sporting history becomes part of the city.'
  }
  heroImageHref="/venue-assets/eden-gardens/hero-night.svg"
/> 
          }
          onBack={handleBackToPersonalisation}
          onExport={handleExport}
        />
      )}

      {/* Workflow progress indicator */}
      <div className="fixed bottom-8 right-8 bg-black/80 border border-amber-700 rounded-lg p-4 text-sm text-amber-500 max-w-xs">
        <div className="font-semibold mb-2">Workflow Progress</div>
        <div className="space-y-1 text-xs">
          {(['sport', 'competition', 'venue', 'parameters', 'style', 'personalisation', 'preview'] as WorkflowStep[]).map((s, i, all) => {
            const currentIdx = all.indexOf(step);
            const thisIdx = i;
            const label = s.charAt(0).toUpperCase() + s.slice(1);
            const isDone = thisIdx < currentIdx;
            const isCurrent = thisIdx === currentIdx;
            return (
              <div key={s} className={isDone || isCurrent ? 'text-amber-400' : 'text-slate-500'}>
                {isDone ? '✓' : isCurrent ? '●' : '○'} {label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
