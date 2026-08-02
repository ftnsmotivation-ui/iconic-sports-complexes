import {
  defaultVenueDNA,
  dnaProfiles,
} from "./DnaProfiles";

import type { VenueDNA } from "./DnaTypes";

function normaliseVenueKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const venueAliases: Record<string, string> = {
  monaco: "monaco-grand-prix",
  "circuit-de-monaco": "monaco-grand-prix",
  "monaco-grand-prix": "monaco-grand-prix",

  "eden-gardens": "eden-gardens",

  wimbledon: "wimbledon-centre-court",
  "centre-court": "wimbledon-centre-court",
  "wimbledon-centre-court": "wimbledon-centre-court",
  "all-england-lawn-tennis-club": "wimbledon-centre-court",

  bernabeu: "santiago-bernabeu",
  "santiago-bernabeu-stadium": "santiago-bernabeu",
  "santiago-bernabeu": "santiago-bernabeu",

  augusta: "augusta-national",
  "augusta-national": "augusta-national",
  "augusta-national-golf-club": "augusta-national",

  "camp-nou": "camp-nou",
  "spotify-camp-nou": "camp-nou",
};

export function resolveVenueDNA(
  venueName?: string,
): VenueDNA {
  if (!venueName?.trim()) {
    return defaultVenueDNA;
  }

  const normalisedKey = normaliseVenueKey(venueName);

  const profileKey =
    venueAliases[normalisedKey] ?? normalisedKey;

  return dnaProfiles[profileKey] ?? {
    ...defaultVenueDNA,
    venue: venueName.trim(),
  };
}

export function hasVenueDNA(
  venueName?: string,
): boolean {
  if (!venueName?.trim()) {
    return false;
  }

  const normalisedKey = normaliseVenueKey(venueName);

  const profileKey =
    venueAliases[normalisedKey] ?? normalisedKey;

  return Boolean(dnaProfiles[profileKey]);
}
