// components/PosterEngine/DNA/DnaTypes.ts

export type VenueMood =
  | "Prestigious"
  | "Historic"
  | "Passionate"
  | "Modern"
  | "Elegant"
  | "Technical"
  | "Electric"
  | "Legendary"
  | "Scenic"
  | "Royal"
  | "Iconic";

export type PosterStyle =
  | "Collector"
  | "Atlas"
  | "Heritage"
  | "Blueprint"
  | "Editorial"
  | "Gallery";

export interface VenueDNA {
  venue: string;
  sport: string;
  competition?: string;

  moods: VenueMood[];
  primaryStyle: PosterStyle;
  colourPalette: string[];
  heroFocus: string;
  atmosphere: string;
  typography: "Classic" | "Modern" | "Luxury";
  informationDensity: "Minimal" | "Balanced" | "Rich";

  illustrationPriority:
    | "Venue"
    | "Track"
    | "Architecture"
    | "Crowd"
    | "Landscape";

  preferredLayouts: string[];
  signatureElements: string[];

  heroStyle?:
    | "Architectural"
    | "Aerial"
    | "Blueprint"
    | "Action";

  mapStyle?:
    | "Plan"
    | "Satellite"
    | "Circuit"
    | "Atlas";

  headerStyle?:
    | "Classic"
    | "Editorial"
    | "Luxury";

  borderStyle?:
    | "Simple"
    | "Double"
    | "Museum";

  footerStyle?:
    | "Collector"
    | "Minimal"
    | "Editorial";

  illustrationStyle?:
    | "LineArt"
    | "Engraving"
    | "Watercolour"
    | "ModernVector";
}