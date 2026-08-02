import CinematicHeroPoster from '@/components/PosterGenerator/CinematicHeroPoster';
import { posterConcepts, type PosterConceptId } from '@/components/PosterGenerator/PosterConceptDirector';
import type { PosterModel } from '@/components/PosterGenerator/PosterModel';

interface ConceptSelectorProps {
  posterModel: PosterModel | null;
  selectedConcept: PosterConceptId;
  onConceptChange: (concept: PosterConceptId) => void;
}

const conceptIds: readonly PosterConceptId[] = ['monument', 'gallery', 'survey'];

export default function ConceptSelector({ posterModel, selectedConcept, onConceptChange }: ConceptSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-white/10 bg-[#0d1014] px-4 py-2" role="group" aria-label="Poster concept">
      {conceptIds.map((conceptId) => {
        const concept = posterConcepts[conceptId];
        const selected = selectedConcept === conceptId;
        return (
          <button key={conceptId} type="button" aria-pressed={selected} aria-label={`${concept.name}: ${concept.description}`} onClick={() => onConceptChange(conceptId)} className={["flex min-w-[150px] flex-1 items-center gap-2 rounded-lg border p-1.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300", selected ? "border-amber-300/50 bg-amber-300/10" : "border-white/8 bg-white/[0.025] hover:bg-white/[0.06]"].join(' ')}>
            <span aria-hidden="true" className="relative h-[50px] w-[36px] shrink-0 overflow-hidden rounded-sm border border-white/15 bg-black">
              {posterModel && <span className="pointer-events-none absolute left-0 top-0 block h-[1100px] w-[800px] origin-top-left" style={{ transform: 'scale(.045)' }}><CinematicHeroPoster model={{ ...posterModel, conceptId }}/></span>}
            </span>
            <span className="min-w-0"><span className={selected ? "block text-[11px] font-semibold text-amber-200" : "block text-[11px] font-semibold text-white/75"}>{concept.name}</span><span className="mt-0.5 block truncate text-[9px] text-white/35">{concept.description}</span></span>
          </button>
        );
      })}
    </div>
  );
}
