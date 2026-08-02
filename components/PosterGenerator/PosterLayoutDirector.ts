import type { PosterDirection } from "./PosterDirection";
import type { PosterStyleId } from "./PosterStyleProfiles";

export type PosterLayoutId = "cinematic-hero" | "editorial-column" | "atlas-archive";

export interface PosterLayoutProfile {
  id: PosterLayoutId;
  name: string;
  borderInsets: readonly [number, number];
  contentInset: number;
  heroHeight: string;
  titleTop: readonly [string, string];
  lowerPanelTop: string;
  titleScale: number;
  storyColumns: string;
}

export const posterLayoutProfiles: Record<PosterLayoutId, PosterLayoutProfile> = {
  "cinematic-hero": {
    id: "cinematic-hero",
    name: "Cinematic Hero",
    borderInsets: [27, 39],
    contentInset: 57,
    heroHeight: "61%",
    titleTop: ["39.5%", "43%"],
    lowerPanelTop: "66.5%",
    titleScale: 1,
    storyColumns: "1.2fr .8fr",
  },
  "editorial-column": {
    id: "editorial-column",
    name: "Editorial Column",
    borderInsets: [22, 0],
    contentInset: 64,
    heroHeight: "55%",
    titleTop: ["35%", "39%"],
    lowerPanelTop: "62%",
    titleScale: 0.88,
    storyColumns: "1fr",
  },
  "atlas-archive": {
    id: "atlas-archive",
    name: "Atlas Archive",
    borderInsets: [25, 37],
    contentInset: 54,
    heroHeight: "60%",
    titleTop: ["38.5%", "42%"],
    lowerPanelTop: "65%",
    titleScale: 0.94,
    storyColumns: "1.2fr .8fr",
  },
};

const styleLayouts: Record<PosterStyleId, PosterLayoutId> = {
  collector: "cinematic-hero",
  editorial: "editorial-column",
  atlas: "atlas-archive",
};

function preferenceLayout(preference: string): PosterLayoutId | null {
  const value = preference.toLowerCase();
  if (value.includes("atlas") || value.includes("timeline")) return "atlas-archive";
  if (value.includes("editorial") || value.includes("gallery")) return "editorial-column";
  if (value.includes("hero") || value.includes("monument")) return "cinematic-hero";
  return null;
}

export function resolvePosterLayout(styleId: PosterStyleId, direction: PosterDirection): PosterLayoutProfile {
  const scores: Record<PosterLayoutId, number> = {
    "cinematic-hero": 0,
    "editorial-column": 0,
    "atlas-archive": 0,
  };

  scores[styleLayouts[styleId]] += 4;
  direction.preferredLayouts.forEach((preference, index) => {
    const preferred = preferenceLayout(preference);
    if (preferred) scores[preferred] += Math.max(1, 3 - index);
  });
  if (direction.informationDensity === "minimal") scores["editorial-column"] += 1;
  if (direction.illustrationPriority === "Track" || direction.illustrationPriority === "Landscape") scores["atlas-archive"] += 1;

  const selected = (Object.entries(scores) as [PosterLayoutId, number][])
    .sort((left, right) => right[1] - left[1])[0][0];

  return posterLayoutProfiles[selected];
}
