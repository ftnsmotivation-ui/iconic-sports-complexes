'use client';

import { useState } from 'react';
import SportSelection from '@/components/SportSelection/SportSelection';

type WorkflowStep =
  | 'sport-selection'
  | 'competition-selection'
  | 'venue-selection'
  | 'parameters-selection'
  | 'style-selection'
  | 'preview'
  | 'generate'
  | 'export';

interface WorkflowState {
  step: WorkflowStep;
  sport?: string;
  competition?: string;
  venue?: string;
}

export default function Home() {
  const [workflow, setWorkflow] = useState<WorkflowState>({
    step: 'sport-selection',
  });
  const [loading, setLoading] = useState(false);

  const handleSportSelect = async (sport: string) => {
    setLoading(true);
    try {
      // TODO: Load competitions for selected sport
      setWorkflow({
        step: 'competition-selection',
        sport,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {workflow.step === 'sport-selection' && (
        <SportSelection onSelect={handleSportSelect} loading={loading} />
      )}

      {workflow.step === 'competition-selection' && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Select a Competition
          </h2>
          <p className="text-amber-500 mb-8">
            Choose from available competitions for {workflow.sport}
          </p>
          {/* Competition selection will be implemented here */}
          <div className="text-center text-white">
            Coming soon...
          </div>
        </div>
      )}

      {/* Workflow progress indicator */}
      <div className="fixed bottom-8 right-8 bg-black/80 border border-amber-700 rounded-lg p-4 text-sm text-amber-500">
        <div className="font-semibold mb-2">Workflow Progress</div>
        <div className="space-y-1 text-xs">
          <div className={workflow.step === 'sport-selection' ? 'text-amber-400' : 'text-slate-500'}>
            ✓ Sport Selection
          </div>
          <div className={workflow.step === 'competition-selection' ? 'text-amber-400' : 'text-slate-500'}>
            ○ Competition Selection
          </div>
          <div className={['venue-selection', 'parameters-selection', 'style-selection', 'preview', 'generate', 'export'].includes(workflow.step) ? 'text-amber-400' : 'text-slate-500'}>
            ○ Venue Selection
          </div>
        </div>
      </div>
    </div>
  );
}
