export interface Venue {
  sport: string;
  competition: string;
  venueName: string;
  city: string;
  country: string;
  countryFlag: string;
  opened: number;
  capacity: number;
  coordinates: { lat: number; lng: number };
  architect?: string;
  surface?: string;
  venueMap?: string;
  compassRose?: boolean;
  heroIllustration?: string;
  colourTheme: { primary: string; secondary: string; accent: string };
  famousFor: string[];
  iconicMoments?: string[];
  raceDistance?: number;
  numberOfTurns?: number;
  altitude?: number;
  elevationProfile?: string;
  historicRecords?: Record<string, string>;
  nickname?: string;
  notableEvents?: string[];
  championshipHistory?: string[];
  venueLogo?: string;
  clubLogo?: string;
  collectorNumber?: number;
}

export interface GenerationParameters {
  venue: Venue;
  style: PosterStyle;
  frame: FrameType;
  personalisation?: PersonalisationData;
  selectedElements: string[];
}

export interface PosterStyle {
  layout: 'classic' | 'modern' | 'vintage';
  typography: TypographyStyle;
  background: BackgroundStyle;
  illustrationStyle: 'realistic' | 'minimalist' | 'abstract';
  colourPalette: ColourPalette;
}

export interface TypographyStyle {
  headline: string;
  subheading: string;
  body: string;
  accent: string;
}

export interface BackgroundStyle {
  type: 'solid' | 'gradient' | 'image' | 'pattern';
  primaryColor?: string;
  secondaryColor?: string;
  imageUrl?: string;
  opacity: number;
}

export interface ColourPalette {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
  border: string;
}

export type FrameType = 'black' | 'oak' | 'walnut' | 'white' | 'none';

export interface PersonalisationData {
  date?: string;
  occasion?: string;
  standNo?: string;
  seatNo?: string;
  notes?: string;
}

export interface ExportOptions {
  format: 'pdf' | 'svg' | 'eps' | 'png' | 'jpeg' | 'tiff';
  size: PaperSize;
  resolution: number;
  colorMode: 'cmyk' | 'rgb';
  includeBleed?: boolean;
  includeCropMarks?: boolean;
  iccProfile?: string;
}

export type PaperSize =
  | 'A6' | 'A5' | 'A4' | 'A3' | 'A2' | 'A1' | 'A0'
  | '11x14' | '12x18' | '16x20' | '18x24' | '24x36' | '30x40'
  | 'custom';

export interface CustomSize {
  width: number;
  height: number;
  unit: 'mm' | 'cm' | 'inch';
}

export interface PublishPackage {
  printPackage: boolean;
  marketplacePackage: boolean;
  socialPackage: boolean;
  marketingMockups: boolean;
  metadata: boolean;
}
