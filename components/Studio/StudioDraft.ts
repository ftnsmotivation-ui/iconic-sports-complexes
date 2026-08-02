import type { PosterConceptId } from '@/components/PosterGenerator/PosterConceptDirector';
import type { PosterContentId } from '@/components/PosterGenerator/PosterContent';
import type { PosterPersonalisationInput } from '@/components/PosterGenerator/PosterPersonalisation';

import type { PreviewFrameId } from './Preview/FramePreview';
import type { StudioStyle } from './Sidebar/StylePanel';

const STORAGE_KEY = 'isc-studio-draft-v1';

export interface StudioDraft {
  version: 1;
  selectedSport: string;
  selectedCompetition: string;
  selectedVenueName: string;
  selectedStyle: StudioStyle;
  selectedParameters: PosterContentId[];
  personalisation: PosterPersonalisationInput;
  selectedConcept: PosterConceptId;
  selectedFrame: PreviewFrameId;
}

const styles: readonly StudioStyle[] = ['collector', 'editorial', 'atlas'];
const concepts: readonly PosterConceptId[] = ['monument', 'gallery', 'survey'];
const frames: readonly PreviewFrameId[] = ['none', 'black', 'oak', 'walnut', 'white'];
const parameters: readonly PosterContentId[] = ['venueFacts', 'venueMap', 'countryFlag', 'compassRose', 'historicMoments', 'collectorNumber'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function loadStudioDraft(): StudioDraft | null {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    if (!isRecord(parsed) || parsed.version !== 1 || typeof parsed.selectedSport !== 'string') return null;
    const personalisation = isRecord(parsed.personalisation) ? parsed.personalisation : {};
    return {
      version: 1,
      selectedSport: parsed.selectedSport,
      selectedCompetition: typeof parsed.selectedCompetition === 'string' ? parsed.selectedCompetition : '',
      selectedVenueName: typeof parsed.selectedVenueName === 'string' ? parsed.selectedVenueName : '',
      selectedStyle: styles.includes(parsed.selectedStyle as StudioStyle) ? parsed.selectedStyle as StudioStyle : 'collector',
      selectedParameters: Array.isArray(parsed.selectedParameters) ? parsed.selectedParameters.filter((value): value is PosterContentId => parameters.includes(value as PosterContentId)) : ['venueFacts', 'venueMap', 'collectorNumber'],
      personalisation: {
        enabled: personalisation.enabled === true,
        date: typeof personalisation.date === 'string' ? personalisation.date : '',
        occasion: typeof personalisation.occasion === 'string' ? personalisation.occasion : '',
        stand: typeof personalisation.stand === 'string' ? personalisation.stand : '',
        seat: typeof personalisation.seat === 'string' ? personalisation.seat : '',
        notes: typeof personalisation.notes === 'string' ? personalisation.notes : '',
      },
      selectedConcept: concepts.includes(parsed.selectedConcept as PosterConceptId) ? parsed.selectedConcept as PosterConceptId : 'monument',
      selectedFrame: frames.includes(parsed.selectedFrame as PreviewFrameId) ? parsed.selectedFrame as PreviewFrameId : 'none',
    };
  } catch {
    return null;
  }
}

export function saveStudioDraft(draft: StudioDraft): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // The Studio remains fully usable when storage is unavailable or full.
  }
}

export function clearStudioDraft(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Reset still applies to in-memory state when storage is unavailable.
  }
}
