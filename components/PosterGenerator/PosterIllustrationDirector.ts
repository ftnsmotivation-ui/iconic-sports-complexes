export type PosterIllustrationStrategy = "venue-master" | "sport-system" | "compatibility-fallback";

export interface PosterIllustrationPlan {
  strategy: PosterIllustrationStrategy;
  assetHref: string;
  objectPosition: string;
  scale: number;
}

export interface PosterIllustrationInput {
  venueName: string;
  sport: string;
  illustrationPriority: string;
  requestedAssetHref?: string;
}

const EDEN_GARDENS_MASTER = "/venue-assets/eden-gardens/hero-night.svg";
const MONACO_MASTER = "/venue-assets/circuit-de-monaco/hero-night.svg";
const BERNABEU_MASTER = "/venue-assets/santiago-bernabeu/hero-night.svg";
const ST_ANDREWS_MASTER = "/venue-assets/st-andrews/hero-links.svg";
const MADISON_SQUARE_GARDEN_MASTER = "/venue-assets/madison-square-garden/hero-night.svg";

const venueMasters: Readonly<Record<string, string>> = {
  "eden gardens": EDEN_GARDENS_MASTER,
  "circuit de monaco": MONACO_MASTER,
  "monaco grand prix": MONACO_MASTER,
  "santiago bernabéu": BERNABEU_MASTER,
  "santiago bernabeu": BERNABEU_MASTER,
  "old course at st andrews": ST_ANDREWS_MASTER,
  "madison square garden": MADISON_SQUARE_GARDEN_MASTER,
};

const sportFallbacks: Readonly<Record<string, string>> = {
  cricket: EDEN_GARDENS_MASTER,
};

const objectPositions: Readonly<Record<string, string>> = {
  Venue: "center 46%",
  Track: "center 40%",
  Architecture: "center 46%",
  Crowd: "center 58%",
  Landscape: "center 36%",
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function resolvePosterIllustration(input: PosterIllustrationInput): PosterIllustrationPlan {
  const venueMaster = venueMasters[normalize(input.venueName)];
  const sportFallback = sportFallbacks[normalize(input.sport)];
  const assetHref = input.requestedAssetHref || venueMaster || sportFallback || EDEN_GARDENS_MASTER;

  return {
    strategy: input.requestedAssetHref || venueMaster
      ? "venue-master"
      : sportFallback
        ? "sport-system"
        : "compatibility-fallback",
    assetHref,
    objectPosition: objectPositions[input.illustrationPriority] ?? "center 46%",
    scale: 1.035,
  };
}
