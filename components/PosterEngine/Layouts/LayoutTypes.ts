export type LayoutStyle =
  | "Hero"
  | "Editorial"
  | "Atlas"
  | "Technical"
  | "Collector";

export interface LayoutRegion {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PosterLayout {
  id: string;

  name: string;

  style: LayoutStyle;

  hero: LayoutRegion;

  title: LayoutRegion;

  subtitle: LayoutRegion;

  information: LayoutRegion;

  map: LayoutRegion;

  timeline?: LayoutRegion;

  statistics?: LayoutRegion;

  footer: LayoutRegion;
}