import {
  defaultIllustrationProfile,
  illustrationProfiles,
} from "./IllustrationProfiles";

import type { IllustrationProfile } from "./IllustrationTypes";
import type { VenueDNA } from "../DNA";

export function resolveIllustration(
  dna: VenueDNA,
): IllustrationProfile {
  switch (dna.primaryStyle) {
    case "Collector":
      return illustrationProfiles["monaco-luxury-vector"];

    case "Heritage":
      return illustrationProfiles["heritage-cricket"];

    case "Blueprint":
      return illustrationProfiles["monaco-luxury-vector"];

    case "Gallery":
      return illustrationProfiles["championship-tennis"];

    case "Atlas":
      return illustrationProfiles["golf-landscape"];

    case "Editorial":
      return illustrationProfiles["football-cathedral"];

    default:
      return defaultIllustrationProfile;
  }
}