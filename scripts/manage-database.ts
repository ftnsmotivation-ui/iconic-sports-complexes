/**
 * Database Management Tool
 * Provides utilities for managing the iconic-venues database
 * Usage: ts-node scripts/manage-database.ts [command] [options]
 */

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

const DB_PATH = path.join(__dirname, '../public/databases/iconic-venues.xlsx');

interface Venue {
  sport: string;
  competition: string;
  venueName: string;
  city: string;
  country: string;
  countryFlag: string;
  opened: number;
  capacity: number;
  lat: number;
  lng: number;
  architect?: string;
  surface?: string;
  venueMap?: string;
  colourThemePrimary?: string;
  colourThemeSecondary?: string;
  colourThemeAccent?: string;
  famousFor?: string;
  iconicMoments?: string;
  nickname?: string;
  notableEvents?: string;
  championshipHistory?: string;
  historicRecords?: string;
  dimensions?: string;
  raceDistance?: number;
  numberOfTurns?: number;
  altitude?: number;
  clubLogo?: string;
  collectorNumber?: number;
  [key: string]: unknown;
}

class DatabaseManager {
  private workbook: XLSX.WorkBook;

  constructor() {
    this.workbook = XLSX.readFile(DB_PATH);
  }

  /**
   * Get all sports in the database
   */
  getSports(): string[] {
    return this.workbook.SheetNames;
  }

  /**
   * Get all venues for a sport
   */
  getVenuesBySport(sport: string): Venue[] {
    const ws = this.workbook.Sheets[sport];
    if (!ws) return [];
    return XLSX.utils.sheet_to_json<Venue>(ws);
  }

  /**
   * Add a new venue to the database
   */
  addVenue(venue: Venue): boolean {
    const { sport } = venue;
    if (!sport) {
      console.error('❌ Sport is required');
      return false;
    }

    let ws = this.workbook.Sheets[sport];
    let venues: Venue[] = [];

    if (ws) {
      venues = XLSX.utils.sheet_to_json<Venue>(ws);
    }

    // Check for duplicates
    if (venues.some(v => v.venueName === venue.venueName)) {
      console.error(`❌ Venue "${venue.venueName}" already exists`);
      return false;
    }

    venues.push(venue);

    // Update or create sheet
    const newWs = XLSX.utils.json_to_sheet(venues);
    this.workbook.Sheets[sport] = newWs;
    if (!this.workbook.SheetNames.includes(sport)) {
      this.workbook.SheetNames.push(sport);
    }

    console.log(`✅ Added venue: ${venue.venueName}`);
    return true;
  }

  /**
   * Update an existing venue
   */
  updateVenue(sport: string, venueName: string, updates: Partial<Venue>): boolean {
    const ws = this.workbook.Sheets[sport];
    if (!ws) {
      console.error(`❌ Sport "${sport}" not found`);
      return false;
    }

    const venues = XLSX.utils.sheet_to_json<Venue>(ws);
    const index = venues.findIndex(v => v.venueName === venueName);

    if (index === -1) {
      console.error(`❌ Venue "${venueName}" not found`);
      return false;
    }

    venues[index] = { ...venues[index], ...updates };
    const newWs = XLSX.utils.json_to_sheet(venues);
    this.workbook.Sheets[sport] = newWs;

    console.log(`✅ Updated venue: ${venueName}`);
    return true;
  }

  /**
   * Delete a venue from the database
   */
  deleteVenue(sport: string, venueName: string): boolean {
    const ws = this.workbook.Sheets[sport];
    if (!ws) {
      console.error(`❌ Sport "${sport}" not found`);
      return false;
    }

    const venues = XLSX.utils.sheet_to_json<Venue>(ws);
    const filtered = venues.filter(v => v.venueName !== venueName);

    if (filtered.length === venues.length) {
      console.error(`❌ Venue "${venueName}" not found`);
      return false;
    }

    if (filtered.length === 0) {
      delete this.workbook.Sheets[sport];
      this.workbook.SheetNames = this.workbook.SheetNames.filter(n => n !== sport);
      console.log(`✅ Deleted venue: ${venueName} (sport sheet now empty)`);
      return true;
    }

    const newWs = XLSX.utils.json_to_sheet(filtered);
    this.workbook.Sheets[sport] = newWs;

    console.log(`✅ Deleted venue: ${venueName}`);
    return true;
  }

  /**
   * Get database statistics
   */
  getStats(): Record<string, unknown> {
    const stats: Record<string, number> = {};
    let total = 0;

    for (const sport of this.getSports()) {
      const venues = this.getVenuesBySport(sport);
      stats[sport] = venues.length;
      total += venues.length;
    }

    return { ...stats, total };
  }

  /**
   * Save changes to database
   */
  save(): boolean {
    try {
      XLSX.writeFile(this.workbook, DB_PATH);
      console.log(`✅ Database saved to: ${DB_PATH}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to save database:', error);
      return false;
    }
  }

  /**
   * Validate database integrity
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const requiredFields = [
      'sport',
      'competition',
      'venueName',
      'city',
      'country',
      'opened',
      'capacity',
    ];

    for (const sport of this.getSports()) {
      const venues = this.getVenuesBySport(sport);
      venues.forEach((venue, idx) => {
        requiredFields.forEach(field => {
          if (!venue[field]) {
            errors.push(`${sport}[${idx}]: Missing "${field}"`);
          }
        });
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// CLI Interface
async function main() {
  const command = process.argv[2];
  const manager = new DatabaseManager();

  switch (command) {
    case 'stats':
      console.log('\n📊 Database Statistics:');
      console.log(manager.getStats());
      break;

    case 'validate':
      const validation = manager.validate();
      console.log(`\n✅ Validation: ${validation.valid ? 'PASSED' : 'FAILED'}`);
      if (validation.errors.length > 0) {
        console.log('Errors:');
        validation.errors.forEach(err => console.log(`  ❌ ${err}`));
      }
      break;

    case 'list-sports':
      console.log('\n🏆 Sports in Database:');
      manager.getSports().forEach(sport => {
        const count = manager.getVenuesBySport(sport).length;
        console.log(`  • ${sport}: ${count} venues`);
      });
      break;

    case 'export':
      const sport = process.argv[3];
      if (!sport) {
        console.error('❌ Sport name required: manage-database export [sport]');
        break;
      }
      const venues = manager.getVenuesBySport(sport);
      console.log(`\n${venues.length} venues for ${sport}:`);
      venues.forEach(v => console.log(`  • ${v.venueName} (${v.city}, ${v.country})`));
      break;

    default:
      console.log(`
🎯 Database Management Tool

Usage: ts-node scripts/manage-database.ts [command]

Commands:
  stats           - Show database statistics
  validate        - Validate database integrity
  list-sports     - List all sports in database
  export [sport]  - Export all venues for a sport

Example:
  ts-node scripts/manage-database.ts stats
      `);
  }
}

main().catch(console.error);
