export type PosterStyleId = 'collector' | 'atlas' | 'heritage';

export interface PosterCoordinates {
  lat: number;
  lng: number;
}

export interface PosterPersonalisation {
  enabled?: boolean;
  date?: string;
  occasion?: string;
  standNo?: string;
  seatNo?: string;
  notes?: string;
}

export interface PosterVenueData {
  sport: string;
  competition: string;
  venueName: string;
  city: string;
  country: string;

  countryFlag?: string;
  opened?: number | string;
  capacity?: number | string;
  architect?: string;
  surface?: string;
  nickname?: string;

  coordinates?: PosterCoordinates;

  famousFor?: string;
  iconicMoments?: string;
  signatureQuote?: string;
  quoteAttribution?: string;

  dimensions?: string;
  raceDistance?: string;
  numberOfTurns?: number | string;
  altitude?: number | string;
  elevationProfile?: string;
  historicRecords?: string;
  notableEvents?: string;
  championshipHistory?: string;

  venueLogo?: string;
  clubLogo?: string;
  venueMap?: string;
  heroImageHref?: string;

  collectorNumber?: number | string;
  collectorEditionSize?: number | string;

  personalisation?: PosterPersonalisation;

  extra?: Record<string, unknown>;
}

export interface PosterRenderOptions {
  styleId: PosterStyleId;
  selectedParameters?: string[];
  showBorders?: boolean;
  showCollectorMark?: boolean;
  showVenueStory?: boolean;
}

export interface PosterRendererProps {
  venue: PosterVenueData;
  options: PosterRenderOptions;
}