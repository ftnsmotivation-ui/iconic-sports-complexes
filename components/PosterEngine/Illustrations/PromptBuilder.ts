import type { VenueDNA } from "../DNA";
import type { ThemeProfile } from "../Themes";
import type { LayoutProfile } from "../Layouts";
import type { IllustrationProfile } from "./IllustrationTypes";

export function buildPrompt(
  dna: VenueDNA,
  theme: ThemeProfile,
  layout: LayoutProfile,
  illustration: IllustrationProfile,
): string {
  return `
Create a premium museum-quality collector poster.

Venue personality:
${dna.primaryStyle}

Colour palette:
${theme.colours.join(", ")}

Typography:
${theme.typography}

Layout:
${layout.name}

Illustration style:
${illustration.style}

Lighting:
${illustration.lighting}

Camera:
${illustration.camera}

Emphasise:
${illustration.emphasis.join(", ")}

Avoid:
${illustration.avoid.join(", ")}

The artwork must be elegant, balanced, vector-inspired, suitable for fine-art printing,
with exceptional typography, premium spacing, and a timeless collector aesthetic.
`;
}