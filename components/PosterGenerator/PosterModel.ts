import { resolvePosterDirection, type PosterDirection } from "./PosterDirection";
import type { PosterStyleId } from "./PosterStyleProfiles";

export interface PosterModelSource {
  venueName: string;
  sport?: string;
  city: string;
  country: string;
  opened: number | string;
  capacity: number | string;
  competition?: string;
  collectorNumber?: number | string;
  inscription?: string;
  collectorInscription?: string;
  heroImageHref?: string;
  nickname?: string;
  famousFor?: string;
  iconicMoments?: string;
  surface?: string;
  architect?: string;
}

export interface PosterModel {
  identity: {
    venueName: string;
    sport: string;
    city: string;
    country: string;
    competition: string;
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
  artwork: {
    heroImageHref: string;
  };
  direction: PosterDirection;
  styleId: PosterStyleId;
}

function normalizeCapacity(value: number | string): string {
  if (typeof value === "number") return value.toLocaleString();
  const parsed = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed.toLocaleString() : String(value);
}

export function buildPosterModel(source: PosterModelSource, styleId: PosterStyleId = "collector"): PosterModel {
  return {
    identity: {
      venueName: source.venueName,
      sport: source.sport || "Sporting Venue",
      city: source.city,
      country: source.country,
      competition: source.competition || "ICONIC SPORTING VENUE",
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
      secondaryStory: source.iconicMoments || source.famousFor || source.nickname || "A stage where generations gathered, records fell and sporting memory became civic history.",
    },
    artwork: {
      heroImageHref: source.heroImageHref || "/venue-assets/eden-gardens/hero-night.svg",
    },
    direction: resolvePosterDirection(source.venueName),
    styleId,
  };
}
