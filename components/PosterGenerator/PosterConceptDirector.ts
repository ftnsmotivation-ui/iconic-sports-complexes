import type { PosterLayoutId } from './PosterLayoutDirector';

export type PosterConceptId = 'monument' | 'gallery' | 'survey';

export interface PosterConceptProfile {
  id: PosterConceptId;
  name: string;
  description: string;
  layoutId: PosterLayoutId;
  titleScale: number;
  titleLetterSpacing: string;
  titleWeight: number;
  imageFilter: string;
  imageScale: number;
  colours?: {
    background: string;
    foreground: string;
    accent: string;
    muted: string;
    subtle: string;
    heroOverlay: string;
    vignette: string;
  };
}

export const posterConcepts: Readonly<Record<PosterConceptId, PosterConceptProfile>> = {
  monument: {
    id: 'monument',
    name: 'Monument',
    description: 'Cinematic scale and collector drama.',
    layoutId: 'cinematic-hero',
    titleScale: 1.06,
    titleLetterSpacing: '-1.8px',
    titleWeight: 700,
    imageFilter: 'saturate(.92) contrast(1.08)',
    imageScale: 1.045,
  },
  gallery: {
    id: 'gallery',
    name: 'Gallery',
    description: 'Quiet editorial space and warm paper.',
    layoutId: 'editorial-column',
    titleScale: .88,
    titleLetterSpacing: '-.5px',
    titleWeight: 600,
    imageFilter: 'grayscale(.18) sepia(.08) brightness(1.06)',
    imageScale: 1.02,
    colours: {
      background: '#e7e0d2', foreground: '#201f1b', accent: '#816a3c', muted: '#5d5a50', subtle: '#817d70',
      heroOverlay: 'linear-gradient(180deg,rgba(237,231,218,.05) 0%,rgba(231,224,210,.2) 46%,rgba(231,224,210,.97) 69%)',
      vignette: 'radial-gradient(circle at 50% 35%,transparent 38%,rgba(52,47,39,.17) 100%)',
    },
  },
  survey: {
    id: 'survey',
    name: 'Survey',
    description: 'Cartographic structure and archival tone.',
    layoutId: 'atlas-archive',
    titleScale: .94,
    titleLetterSpacing: '1.2px',
    titleWeight: 600,
    imageFilter: 'saturate(.62) sepia(.24) contrast(1.04)',
    imageScale: 1.03,
    colours: {
      background: '#252e2d', foreground: '#e7dfca', accent: '#c4aa67', muted: '#a8a18e', subtle: '#747b72',
      heroOverlay: 'linear-gradient(180deg,rgba(20,29,29,.03) 0%,rgba(25,34,33,.28) 47%,rgba(37,46,45,.98) 72%)',
      vignette: 'radial-gradient(circle at 50% 36%,transparent 32%,rgba(3,8,8,.64) 100%)',
    },
  },
};

export function resolvePosterConcept(id: PosterConceptId): PosterConceptProfile {
  return posterConcepts[id];
}
