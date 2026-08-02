import type { VenueDNA } from "../DNA";
import type { PosterTheme } from "../Themes";
import type { LayoutProfile } from "../Layouts";
import type { IllustrationProfile } from "../Illustration/IllustrationTypes";

export function buildPrompt(
  dna: VenueDNA,
  theme: PosterTheme,
  layout: LayoutProfile,
  illustration: IllustrationProfile,
): string {
  return `
Create a premium museum-quality collector poster.

Venue personality:
${dna.primaryStyle}

Colour palette:

Primary: ${theme.colours.primary}
Secondary: ${theme.colours.secondary}
Accent: ${theme.colours.accent}

Typography:

Title Font: ${theme.titleFont}
Body Font: ${theme.bodyFont}

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