export type PosterStyleId = "collector" | "editorial" | "atlas";
export type PosterInformationDensity = "minimal" | "balanced" | "rich";

export interface PosterStyleProfile {
  id: PosterStyleId;
  name: string;
  background: string;
  foreground: string;
  muted: string;
  subtle: string;
  accent: string;
  accentMuted: string;
  border: string;
  borderSecondary: string;
  heroOverlay: string;
  vignette: string;
  titleFont: string;
  bodyFont: string;
  borderInsets: readonly [number, number];
  contentInset: number;
  heroHeight: string;
  titleTop: readonly [string, string];
  lowerPanelTop: string;
  titleScale: number;
  informationDensity: PosterInformationDensity;
  factLimit: number;
  showGrid: boolean;
  editionLabel: string;
}

export const posterStyleProfiles: Record<PosterStyleId, PosterStyleProfile> = {
  collector: {
    id: "collector",
    name: "Collector",
    background: "#080b0c",
    foreground: "#f4efe5",
    muted: "#aaa596",
    subtle: "#6f654d",
    accent: "#e0c36e",
    accentMuted: "#9b8448",
    border: "#b29248",
    borderSecondary: "rgba(178,146,72,.43)",
    heroOverlay: "linear-gradient(180deg,rgba(5,8,9,.08) 0%,rgba(5,8,9,.05) 30%,rgba(5,8,9,.48) 49%,#080a0b 62%,#080a0b 100%)",
    vignette: "radial-gradient(circle at 50% 25%,transparent 0%,transparent 34%,rgba(0,0,0,.18) 64%,rgba(0,0,0,.58) 100%)",
    titleFont: "Georgia, 'Times New Roman', serif",
    bodyFont: "Arial, Helvetica, sans-serif",
    borderInsets: [27, 39],
    contentInset: 57,
    heroHeight: "61%",
    titleTop: ["39.5%", "43%"],
    lowerPanelTop: "66.5%",
    titleScale: 1,
    informationDensity: "balanced",
    factLimit: 4,
    showGrid: false,
    editionLabel: "Cinematic Night Edition",
  },
  editorial: {
    id: "editorial",
    name: "Editorial",
    background: "#eee9dd",
    foreground: "#202326",
    muted: "#5f615f",
    subtle: "#8b8377",
    accent: "#9b6241",
    accentMuted: "#9b6241",
    border: "#292c2d",
    borderSecondary: "rgba(41,44,45,.2)",
    heroOverlay: "linear-gradient(180deg,rgba(238,233,221,.02) 0%,rgba(238,233,221,.08) 34%,rgba(238,233,221,.78) 51%,#eee9dd 61%,#eee9dd 100%)",
    vignette: "linear-gradient(90deg,rgba(238,233,221,.18),transparent 24%,transparent 76%,rgba(238,233,221,.18))",
    titleFont: "Georgia, 'Times New Roman', serif",
    bodyFont: "Arial, Helvetica, sans-serif",
    borderInsets: [22, 0],
    contentInset: 64,
    heroHeight: "55%",
    titleTop: ["35%", "39%"],
    lowerPanelTop: "62%",
    titleScale: 0.88,
    informationDensity: "minimal",
    factLimit: 3,
    showGrid: false,
    editionLabel: "Editorial Study",
  },
  atlas: {
    id: "atlas",
    name: "Atlas",
    background: "#273231",
    foreground: "#ece4d2",
    muted: "#b6ad98",
    subtle: "#8a927f",
    accent: "#d1b77a",
    accentMuted: "#a99a70",
    border: "#c5af79",
    borderSecondary: "rgba(197,175,121,.35)",
    heroOverlay: "linear-gradient(180deg,rgba(22,31,31,.08) 0%,rgba(22,31,31,.18) 30%,rgba(22,31,31,.68) 50%,#273231 63%,#273231 100%)",
    vignette: "radial-gradient(circle at 50% 24%,transparent 0%,transparent 30%,rgba(11,18,18,.3) 68%,rgba(11,18,18,.64) 100%)",
    titleFont: "Georgia, 'Times New Roman', serif",
    bodyFont: "'Courier New', monospace",
    borderInsets: [25, 37],
    contentInset: 54,
    heroHeight: "60%",
    titleTop: ["38.5%", "42%"],
    lowerPanelTop: "65%",
    titleScale: 0.94,
    informationDensity: "rich",
    factLimit: 4,
    showGrid: true,
    editionLabel: "Cartographic Archive",
  },
};

export function resolvePosterStyle(styleId: PosterStyleId | undefined): PosterStyleProfile {
  return posterStyleProfiles[styleId ?? "collector"];
}
