import type { PosterDirection } from './PosterDirection';

export type VisualStoryArchetype = 'speed-luxury' | 'atmosphere-history' | 'tradition-discipline' | 'tranquillity-perfection' | 'grandeur-modernity' | 'heritage-monument';
export type StoryLighting = 'cinematic' | 'floodlit' | 'ceremonial' | 'natural' | 'architectural';

export interface VisualStoryPlan {
  archetype: VisualStoryArchetype;
  primaryTheme: string;
  secondaryTheme: string;
  statement: string;
  lighting: StoryLighting;
  heroEmphasis: number;
  negativeSpace: number;
  mapAffinity: number;
  densityBias: -1 | 0 | 1;
  typographyTone: 'luxury' | 'heritage' | 'restrained' | 'modern';
}

const storyProfiles: Readonly<Record<VisualStoryArchetype, Omit<VisualStoryPlan, 'archetype'>>> = {
  'speed-luxury': { primaryTheme: 'Speed', secondaryTheme: 'Luxury', statement: 'Velocity, framed by ceremony.', lighting: 'cinematic', heroEmphasis: .88, negativeSpace: .42, mapAffinity: .9, densityBias: 0, typographyTone: 'luxury' },
  'atmosphere-history': { primaryTheme: 'Atmosphere', secondaryTheme: 'History', statement: 'Memory gathers beneath the lights.', lighting: 'floodlit', heroEmphasis: .9, negativeSpace: .36, mapAffinity: .56, densityBias: 1, typographyTone: 'heritage' },
  'tradition-discipline': { primaryTheme: 'Tradition', secondaryTheme: 'Discipline', statement: 'Tradition, measured line by line.', lighting: 'ceremonial', heroEmphasis: .72, negativeSpace: .78, mapAffinity: .42, densityBias: -1, typographyTone: 'restrained' },
  'tranquillity-perfection': { primaryTheme: 'Perfection', secondaryTheme: 'Tranquillity', statement: 'Precision held in perfect quiet.', lighting: 'natural', heroEmphasis: .76, negativeSpace: .82, mapAffinity: .5, densityBias: -1, typographyTone: 'luxury' },
  'grandeur-modernity': { primaryTheme: 'Grandeur', secondaryTheme: 'Modernity', statement: 'A modern monument built for great nights.', lighting: 'architectural', heroEmphasis: .84, negativeSpace: .55, mapAffinity: .48, densityBias: 0, typographyTone: 'modern' },
  'heritage-monument': { primaryTheme: 'Heritage', secondaryTheme: 'Place', statement: 'Architecture becomes collective memory.', lighting: 'cinematic', heroEmphasis: .8, negativeSpace: .56, mapAffinity: .58, densityBias: 0, typographyTone: 'heritage' },
};

const keywords: Readonly<Record<VisualStoryArchetype, readonly string[]>> = {
  'speed-luxury': ['track', 'circuit', 'speed', 'yacht', 'harbour', 'technical', 'mediterranean', 'prestigious'],
  'atmosphere-history': ['crowd', 'floodlight', 'passionate', 'electric', 'roaring', 'history', 'historic', 'match-day'],
  'tradition-discipline': ['royal', 'tradition', 'ceremonial', 'ivy', 'grass court', 'discipline', 'calm'],
  'tranquillity-perfection': ['landscape', 'tranquil', 'quiet', 'fairway', 'garden', 'azalea', 'scenic', 'perfection'],
  'grandeur-modernity': ['modern', 'facade', 'architectural', 'monumental', 'luminous', 'silver', 'grandeur'],
  'heritage-monument': ['heritage', 'venue', 'iconic', 'architecture', 'legendary'],
};

export function resolveVisualStory(direction: PosterDirection): VisualStoryPlan {
  const context = [direction.moods.join(' '), direction.heroFocus, direction.atmosphere, direction.illustrationPriority, direction.signatureElements.join(' ')].join(' ').toLowerCase();
  const scores = (Object.keys(keywords) as VisualStoryArchetype[]).map((archetype) => ({
    archetype,
    score: keywords[archetype].reduce((score, keyword) => score + (context.includes(keyword) ? 1 : 0), 0),
  }));
  const archetype = scores.sort((left, right) => right.score - left.score)[0]?.archetype ?? 'heritage-monument';
  return { archetype, ...storyProfiles[archetype] };
}
