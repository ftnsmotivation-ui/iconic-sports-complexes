export interface VenueRecord {
  sport: string;
  competition: string;
  venueName: string;
  city: string;
  country: string;
  opened: number;
  capacity: number;
  surface: string;
  latitude?: number;
  longitude?: number;
  nickname?: string;
  famousFor?: string;
  collectorNumber?: number;
}