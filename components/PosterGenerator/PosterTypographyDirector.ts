import type { PosterLayoutProfile } from "./PosterLayoutDirector";
import type { PosterModel } from "./PosterModel";
import type { PosterStyleProfile } from "./PosterStyleProfiles";
import type { PosterConceptProfile } from "./PosterConceptDirector";

export interface TypographySpec {
  fontFamily: string;
  fontSize: number;
  fontWeight: number | string;
  letterSpacing: string;
  lineHeight: number;
  textTransform?: "uppercase";
}

export interface PosterTypographySystem {
  titleLines: readonly string[];
  titleTop: string;
  masthead: TypographySpec;
  collector: TypographySpec;
  subtitle: TypographySpec;
  title: TypographySpec;
  metadata: TypographySpec;
  sectionLabel: TypographySpec;
  quote: TypographySpec;
  body: TypographySpec;
  factLabel: TypographySpec;
  factValue: TypographySpec;
  caption: TypographySpec;
  micro: TypographySpec;
}

function balanceTitle(title: string): string[] {
  const words = title.trim().toUpperCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return ["ICONIC"];
  if (words.length === 1) return words;

  const maxLines = title.length > 34 && words.length > 3 ? 3 : 2;
  const targetLength = Math.ceil((words.join(" ").length + maxLines - 1) / maxLines);
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (current && candidate.length > targetLength && lines.length < maxLines - 1) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });
  if (current) lines.push(current);
  return lines;
}

export function resolvePosterTypography(
  model: PosterModel,
  layout: PosterLayoutProfile,
  style: PosterStyleProfile,
  concept?: PosterConceptProfile,
): PosterTypographySystem {
  const titleLines = balanceTitle(model.identity.venueName);
  const longestLine = Math.max(...titleLines.map((line) => line.length));
  const baseTitleSize = longestLine > 22 ? 42 : longestLine > 16 ? 50 : longestLine > 12 ? 58 : 72;
  const titleTop = titleLines.length > 2
    ? `calc(${layout.titleTop[0]} - 3%)`
    : titleLines.length > 1 ? layout.titleTop[0] : layout.titleTop[1];
  const uppercase = { textTransform: "uppercase" as const };

  return {
    titleLines,
    titleTop,
    masthead: { fontFamily: style.bodyFont, fontSize: 10, fontWeight: 500, letterSpacing: "3.5px", lineHeight: 1.2, ...uppercase },
    collector: { fontFamily: style.bodyFont, fontSize: 10, fontWeight: 500, letterSpacing: "1.8px", lineHeight: 1.2, ...uppercase },
    subtitle: { fontFamily: style.bodyFont, fontSize: 12, fontWeight: 600, letterSpacing: "4.2px", lineHeight: 1.2, ...uppercase },
    title: { fontFamily: model.direction.titleFont, fontSize: baseTitleSize * layout.titleScale * (concept?.titleScale ?? 1), fontWeight: concept?.titleWeight ?? 700, letterSpacing: concept?.titleLetterSpacing ?? "-1.6px", lineHeight: titleLines.length > 2 ? 0.94 : 0.91, ...uppercase },
    metadata: { fontFamily: style.bodyFont, fontSize: 13, fontWeight: 500, letterSpacing: "4px", lineHeight: 1.2, ...uppercase },
    sectionLabel: { fontFamily: style.bodyFont, fontSize: 10, fontWeight: 600, letterSpacing: "3px", lineHeight: 1.2, ...uppercase },
    quote: { fontFamily: model.direction.titleFont, fontSize: 21, fontWeight: 400, letterSpacing: "0", lineHeight: 1.32 },
    body: { fontFamily: style.bodyFont, fontSize: 11, fontWeight: 400, letterSpacing: "0", lineHeight: 1.55 },
    factLabel: { fontFamily: style.bodyFont, fontSize: 8.5, fontWeight: 600, letterSpacing: "2.2px", lineHeight: 1.2, ...uppercase },
    factValue: { fontFamily: model.direction.titleFont, fontSize: 20, fontWeight: 400, letterSpacing: "0", lineHeight: 1.12 },
    caption: { fontFamily: style.bodyFont, fontSize: 8.5, fontWeight: 500, letterSpacing: "2.7px", lineHeight: 1.2, ...uppercase },
    micro: { fontFamily: style.bodyFont, fontSize: 8, fontWeight: 400, letterSpacing: "1.6px", lineHeight: 1.2, ...uppercase },
  };
}
