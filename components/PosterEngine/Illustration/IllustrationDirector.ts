import type { ComponentType } from "react";

import type { IllustrationProps } from "./IllustrationTypes";

import { GenericRenderer } from "./GenericRenderer";
import { CricketRenderer } from "./CricketRenderer";
import { EdenGardensIllustration } from "./EdenGardensIllustration";

export function getIllustrationRenderer(
  sport: string,
  venue: string,
): ComponentType<IllustrationProps> {

  const normalisedVenue =
    venue.trim().toLowerCase();

  if (normalisedVenue === "eden gardens") {
    return EdenGardensIllustration;
  }

  switch (sport.trim().toLowerCase()) {

    case "cricket":
      return CricketRenderer;

    default:
      return GenericRenderer;
  }
}