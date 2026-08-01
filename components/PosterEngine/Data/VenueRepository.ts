import fs from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";

import type { VenueRecord } from "./VenueRecord";

interface ExcelVenueRow {
  sport?: string;
  competition?: string;
  venueName?: string;
  city?: string;
  country?: string;
  opened?: number;
  capacity?: number;
  surface?: string;
  lat?: number;
  lng?: number;
  nickname?: string;
  famousFor?: string;
  collectorNumber?: number;
}

export function getVenueByName(
  sheetName: string,
  venueName: string,
): VenueRecord {
  const workbookPath = path.join(
    process.cwd(),
    "components",
    "PosterEngine",
    "Data",
    "iconic-venues.xlsx",
  );

  if (!fs.existsSync(workbookPath)) {
    throw new Error(
      `Venue workbook not found at ${workbookPath}`,
    );
  }

  const workbookBuffer = fs.readFileSync(workbookPath);

const workbook = XLSX.read(workbookBuffer, {
  type: "buffer",
});
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error(
      `Worksheet "${sheetName}" was not found.`,
    );
  }

  const rows =
    XLSX.utils.sheet_to_json<ExcelVenueRow>(
      worksheet,
      { defval: "" },
    );

  const row = rows.find(
    (item) =>
      item.venueName?.trim().toLowerCase() ===
      venueName.trim().toLowerCase(),
  );

  if (!row) {
    throw new Error(
      `Venue "${venueName}" was not found in "${sheetName}".`,
    );
  }

  return {
    sport: row.sport ?? "",
    competition: row.competition ?? "",
    venueName: row.venueName ?? "",
    city: row.city ?? "",
    country: row.country ?? "",
    opened: Number(row.opened),
    capacity: Number(row.capacity),
    surface: row.surface ?? "",
    latitude: Number(row.lat),
    longitude: Number(row.lng),
    nickname: row.nickname || undefined,
    famousFor: row.famousFor || undefined,
    collectorNumber:
      Number(row.collectorNumber) || undefined,
  };
}