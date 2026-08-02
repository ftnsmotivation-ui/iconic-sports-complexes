import { resolvePosterDirection, type PosterDirection } from "./PosterDirection";
import { resolvePosterContent, type PosterContentId, type PosterContentVisibility } from "./PosterContent";
import type { PosterConceptId } from "./PosterConceptDirector";
import { resolvePosterIllustration, type PosterIllustrationPlan } from "./PosterIllustrationDirector";
import { resolvePosterPersonalisation, type PosterPersonalisation, type PosterPersonalisationInput } from "./PosterPersonalisation";
import { resolvePosterHistory, type PosterHistoryItem, type PosterHistorySource } from "./PosterHistory";
import type { PosterStyleId } from "./PosterStyleProfiles";
import { resolvePosterVariation, type PosterVariationPlan } from './PosterVariationDirector';
import { resolveVisualStory, type VisualStoryPlan } from './VisualStoryDirector';

export interface PosterModelSource extends PosterHistorySource {
  venueName: string;
  sport?: string;
  city: string;
  country: string;
  countryFlag?: string;
  lat?: number | string;
  lng?: number | string;
  opened: number | string;
  capacity: number | string;
  competition?: string;
  collectorNumber?: number | string;
  inscription?: string;
  collectorInscription?: string;
  heroImageHref?: string;
  nickname?: string;
  famousFor?: string;
  surface?: string;
  architect?: string;
}

export interface PosterModel {
  identity: {
    venueName: string;
    sport: string;
    city: string;
    country: string;
    countryFlag: string;
    competition: string;
    coordinates: { lat: number; lng: number } | null;
  };
  facts: {
    opened: string;
    capacity: string;
    surface: string;
    architect: string;
  };
  collector: {
    number: string;
    inscription: string;
  };
  narrative: {
    secondaryStory: string;
  };
  history: readonly PosterHistoryItem[];
  illustration: PosterIllustrationPlan;
  direction: PosterDirection;
  styleId: PosterStyleId;
  content: PosterContentVisibility;
  personalisation: PosterPersonalisation;
  conceptId: PosterConceptId;
  story: VisualStoryPlan;
  variation: PosterVariationPlan;
}

function normalizeCapacity(value: number | string): string {
  if (typeof value === "number") return value.toLocaleString();
  const parsed = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed.toLocaleString() : String(value);
}

export function buildPosterModel(source: PosterModelSource, styleId: PosterStyleId = "collector", selectedContent?: readonly PosterContentId[], personalisation?: PosterPersonalisationInput, conceptId: PosterConceptId = 'monument', variationKey = 'primary'): PosterModel {
  const sport = source.sport || "Sporting Venue";
  const direction = resolvePosterDirection(source.venueName);
  const lat = Number(source.lat);
  const lng = Number(source.lng);

  return {
    identity: {
      venueName: source.venueName,
      sport,
      city: source.city,
      country: source.country,
      countryFlag: source.countryFlag || "",
      competition: source.competition || "ICONIC SPORTING VENUE",
      coordinates: Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null,
    },
    facts: {
      opened: String(source.opened),
      capacity: normalizeCapacity(source.capacity),
      surface: source.surface || "International standard",
      architect: source.architect || "Historic development",
    },
    collector: {
      number: String(source.collectorNumber ?? 12).padStart(3, "0"),
      inscription: source.inscription || source.collectorInscription || source.nickname || source.famousFor || "Where sporting history becomes part of the city.",
    },
    narrative: {
      secondaryStory: source.famousFor || source.nickname || "A stage where generations gathered, records fell and sporting memory became civic history.",
    },
    history: resolvePosterHistory(source),
    illustration: resolvePosterIllustration({
      venueName: source.venueName,
      sport,
      illustrationPriority: direction.illustrationPriority,
      requestedAssetHref: source.heroImageHref,
    }),
    direction,
    styleId,
    content: resolvePosterContent(selectedContent),
    personalisation: resolvePosterPersonalisation(personalisation),
    conceptId,
    story: resolveVisualStory(direction),
    variation: resolvePosterVariation(source.venueName, variationKey),
  };
}
