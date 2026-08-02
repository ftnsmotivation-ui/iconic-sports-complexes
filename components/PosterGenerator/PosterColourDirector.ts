import type { PosterModel } from "./PosterModel";
import type { PosterStyleProfile } from "./PosterStyleProfiles";

export interface PosterColourSystem {
  background: string;
  foreground: string;
  accent: string;
  accentMuted: string;
  muted: string;
  subtle: string;
  borderSecondary: string;
  heroOverlay: string;
  vignette: string;
  gridLine: string;
  palette: readonly string[];
}

const sportAccents: Record<string, string> = {
  "formula 1": "#c9a85e",
  football: "#b8c7d6",
  cricket: "#b99146",
  tennis: "#d4c88f",
  golf: "#a8bd8c",
  rugby: "#b89768",
  "olympic venues": "#c9a85e",
  boxing: "#b45f55",
};

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(value)) return `rgba(180,150,76,${alpha})`;
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${red},${green},${blue},${alpha})`;
}

export function resolvePosterColours(model: PosterModel, style: PosterStyleProfile): PosterColourSystem {
  const venuePalette = model.direction.colourPalette;
  const sportAccent = sportAccents[model.identity.sport.toLowerCase()];
  const venueAccent = model.styleId === "editorial" ? venuePalette[3] : venuePalette[1];
  const accent = venueAccent || sportAccent || style.accent;
  const background = model.styleId === "collector" ? venuePalette[0] || style.background : style.background;
  const foreground = model.styleId === "collector" ? venuePalette[2] || style.foreground : style.foreground;

  return {
    background,
    foreground,
    accent,
    accentMuted: withAlpha(accent, 0.78),
    muted: style.muted,
    subtle: style.subtle,
    borderSecondary: withAlpha(accent, model.styleId === "editorial" ? 0.22 : 0.38),
    heroOverlay: style.heroOverlay,
    vignette: style.vignette,
    gridLine: withAlpha(accent, 0.28),
    palette: [background, foreground, accent, style.muted, style.subtle],
  };
}
