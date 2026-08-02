import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import type { SportEnrichmentInput, SportEnrichmentResult } from './SportEnrichmentTypes';

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
const BACKUP_DIR = path.join(process.cwd(), 'public/databases/backups');

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

let writeQueue: Promise<unknown> = Promise.resolve();

function safeCell(value: unknown, label: string): string {
  if (typeof value !== 'string') throw new Error(`${label} is required.`);
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (!normalized) throw new Error(`${label} is required.`);
  return /^[=+\-@]/.test(normalized) ? `'${normalized}` : normalized;
}

function normalizeEnrichment(input: SportEnrichmentInput): Required<VenueRow> {
  const sport = safeCell(input.sport, 'Sport');
  if (sport.length > 31 || /[\\/?*:[\]]/.test(sport)) throw new Error('Sport name is not a valid Excel worksheet name.');
  const opened = Number(input.opened);
  const capacity = Number(input.capacity);
  if (!Number.isInteger(opened) || opened < 1000 || opened > new Date().getFullYear() + 5) throw new Error('Opened year is invalid.');
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 2_000_000) throw new Error('Capacity is invalid.');
  return { sport, competition: safeCell(input.competition, 'Competition'), venueName: safeCell(input.venueName, 'Venue name'), city: safeCell(input.city, 'City'), country: safeCell(input.country, 'Country'), opened, capacity };
}

async function writeNewSport(input: SportEnrichmentInput): Promise<SportEnrichmentResult> {
  const row = normalizeEnrichment(input);
  const workbook = XLSX.read(fs.readFileSync(DB_PATH), { type: 'buffer' });
  if (workbook.SheetNames.some((name) => name.toLowerCase() === row.sport.toLowerCase())) throw new Error(`Sport "${row.sport}" already exists.`);
  workbook.SheetNames.push(row.sport);
  workbook.Sheets[row.sport] = XLSX.utils.json_to_sheet([row]);
  const output = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  const temporaryPath = `${DB_PATH}.tmp-${process.pid}-${Date.now()}`;
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const backupPath = path.join(BACKUP_DIR, `iconic-venues-${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`);
  try {
    fs.writeFileSync(temporaryPath, output, { flag: 'wx' });
    const verification = XLSX.read(fs.readFileSync(temporaryPath), { type: 'buffer' });
    const verificationRows = XLSX.utils.sheet_to_json<VenueRow>(verification.Sheets[row.sport]);
    if (!verification.SheetNames.includes(row.sport) || verificationRows[0]?.venueName !== row.venueName) throw new Error('Workbook verification failed; original database was not changed.');
    fs.copyFileSync(DB_PATH, backupPath, fs.constants.COPYFILE_EXCL);
    fs.renameSync(temporaryPath, DB_PATH);
    cache = null;
    return { sport: row.sport, competition: row.competition, venueName: row.venueName, sports: getSports() };
  } catch (error) {
    if (fs.existsSync(temporaryPath)) fs.unlinkSync(temporaryPath);
    throw error;
  }
}

export function appendNewSport(input: SportEnrichmentInput): Promise<SportEnrichmentResult> {
  const operation = writeQueue.then(() => writeNewSport(input));
  writeQueue = operation.catch(() => undefined);
  return operation;
}
