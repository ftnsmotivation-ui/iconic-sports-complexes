import * as XLSX from 'xlsx';
import { Venue } from '@/lib/types';

export async function loadVenuesFromExcel(filePath: string): Promise<Map<string, Venue[]>> {
  try {
    const workbook = XLSX.readFile(filePath);
    const venuesByStport = new Map<string, Venue[]>();

    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json<any>(worksheet);

      const venues: Venue[] = data.map(row => ({
        sport: row.sport || sheetName,
        competition: row.competition || '',
        venueName: row.venueName || '',
        city: row.city || '',
        country: row.country || '',
        countryFlag: row.countryFlag || '',
        opened: parseInt(row.opened) || 0,
        capacity: parseInt(row.capacity) || 0,
        coordinates: {
          lat: parseFloat(row.lat) || 0,
          lng: parseFloat(row.lng) || 0,
        },
        architect: row.architect,
        surface: row.surface,
        venueMap: row.venueMap,
        compassRose: row.compassRose === 'true' || row.compassRose === true,
        heroIllustration: row.heroIllustration,
        colourTheme: {
          primary: row.themePrimary || '#1a1a1a',
          secondary: row.themeSecondary || '#c41e3a',
          accent: row.themeAccent || '#d4af37',
        },
        famousFor: (row.famousFor || '').split(',').map((s: string) => s.trim()),
        iconicMoments: (row.iconicMoments || '').split('|').map((s: string) => s.trim()),
        raceDistance: parseFloat(row.raceDistance),
        numberOfTurns: parseInt(row.numberOfTurns),
        altitude: parseInt(row.altitude),
        elevationProfile: row.elevationProfile,
        historicRecords: row.historicRecords ? JSON.parse(row.historicRecords) : {},
        nickname: row.nickname,
        notableEvents: (row.notableEvents || '').split('|').map((s: string) => s.trim()),
        championshipHistory: (row.championshipHistory || '').split('|').map((s: string) => s.trim()),
        venueLogo: row.venueLogo,
        clubLogo: row.clubLogo,
        collectorNumber: parseInt(row.collectorNumber),
      }));

      venuesByStport.set(sheetName, venues);
    }

    return venuesByStport;
  } catch (error) {
    console.error('Error loading venues from Excel:', error);
    return new Map();
  }
}

export async function getCompetitionsByVenue(
  venues: Venue[]
): Promise<Map<string, string[]>> {
  const competitionsByVenue = new Map<string, string[]>();

  for (const venue of venues) {
    if (!competitionsByVenue.has(venue.venueName)) {
      competitionsByVenue.set(venue.venueName, []);
    }
    const competitions = competitionsByVenue.get(venue.venueName) || [];
    if (!competitions.includes(venue.competition)) {
      competitions.push(venue.competition);
    }
  }

  return competitionsByVenue;
}

export async function getVenuesByCompetition(
  venues: Venue[],
  competition: string
): Promise<Venue[]> {
  return venues.filter(v => v.competition === competition);
}

export async function updateExcelWithNewSport(
  filePath: string,
  sportName: string,
  venues: Venue[]
): Promise<boolean> {
  try {
    const workbook = XLSX.readFile(filePath);
    const worksheet = XLSX.utils.json_to_sheet(venues);
    workbook.Sheets[sportName] = worksheet;
    if (!workbook.SheetNames.includes(sportName)) {
      workbook.SheetNames.push(sportName);
    }
    XLSX.writeFile(workbook, filePath);
    return true;
  } catch (error) {
    console.error('Error updating Excel file:', error);
    return false;
  }
}
