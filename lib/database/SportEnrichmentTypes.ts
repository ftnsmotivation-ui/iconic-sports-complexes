export interface SportEnrichmentInput {
  sport: string;
  competition: string;
  venueName: string;
  city: string;
  country: string;
  opened: number;
  capacity: number;
}

export interface SportEnrichmentResult {
  sport: string;
  competition: string;
  venueName: string;
  sports: string[];
}
