import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export interface VenueRow {
  sport?: string;
  competition?: string;
  venueName?: string;
  city?: string;
  country?: string;
  opened?: string | number;
  capacity?: string | number;
  [key: string]: unknown;
}

const DB_PATH = path.join(process.cwd(), 'public/databases/iconic-venues.xlsx');

let cache: {
  mtimeMs: number;
  sports: string[];
  rowsBySport: Map<string, VenueRow[]>;
} | null = null;

// Re-parses only when the .xlsx file changes on disk, so edits to the database
// are picked up without restarting the server.
function load() {
  const { mtimeMs } = fs.statSync(DB_PATH);
  if (cache && cache.mtimeMs === mtimeMs) return cache;

  const workbook = XLSX.read(fs.readFileSync(DB_PATH), { type: 'buffer' });
  const rowsBySport = new Map<string, VenueRow[]>();

  for (const sheetName of workbook.SheetNames) {
    rowsBySport.set(
      sheetName,
      XLSX.utils.sheet_to_json<VenueRow>(workbook.Sheets[sheetName])
    );
  }

  cache = { mtimeMs, sports: workbook.SheetNames, rowsBySport };
  return cache;
}

export function databaseExists(): boolean {
  return fs.existsSync(DB_PATH);
}

export function getSports(): string[] {
  return load().sports;
}

export function getRowsForSport(sport: string): VenueRow[] | undefined {
  return load().rowsBySport.get(sport);
}

export function getCompetitions(sport: string): string[] | undefined {
  const rows = getRowsForSport(sport);
  if (!rows) return undefined;

  const seen = new Set<string>();
  for (const row of rows) {
    if (row.competition) seen.add(String(row.competition));
  }
  return [...seen];
}
