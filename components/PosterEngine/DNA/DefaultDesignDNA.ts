import type { VenueDNA } from "./DnaTypes";

export const defaultDesignDNA: Pick<
  VenueDNA,
  | "heroStyle"
  | "mapStyle"
  | "headerStyle"
  | "borderStyle"
  | "footerStyle"
  | "illustrationStyle"
> = {
  heroStyle: "Architectural",

  mapStyle: "Atlas",

  headerStyle: "Luxury",

  borderStyle: "Museum",

  footerStyle: "Collector",

  illustrationStyle: "Engraving",
};