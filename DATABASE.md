# Database Management Guide

## Overview

The Iconic Sports Complexes database stores venue information in Excel format (`public/databases/iconic-venues.xlsx`) with one worksheet per sport.

**Current Database Status:**
- **Total Venues:** 69
- **Sports:** 8 (Formula 1, Football, Cricket, Tennis, Golf, Rugby, Olympic Venues, Boxing)
- **Parameters:** 30+ per venue

## Database Structure

### Data Model
Each venue includes:
- **Basic Info:** sport, competition, venueName, city, country, countryFlag
- **Capacity:** opened (year), capacity (seats/stands)
- **Location:** latitude, longitude, architect, surface type
- **Aesthetics:** colourThemePrimary, colourThemeSecondary, colourThemeAccent
- **Content:** famousFor, iconicMoments, nickname, notableEvents, championshipHistory
- **Specs:** dimensions, raceDistance, numberOfTurns, altitude, historicRecords
- **Meta:** clubLogo, collectorNumber

### Breakdown by Sport

| Sport | Venues | Competitions | Notes |
|-------|--------|--------------|-------|
| Formula 1 | 23 | 23 | All official F1 circuits |
| Football | 21 | Multiple | Premier League, La Liga, Serie A, Bundesliga |
| Cricket | 5 | Test Cricket | Major test grounds |
| Tennis | 4 | Grand Slams | Major tournament venues |
| Golf | 4 | Championships | Major championship courses |
| Rugby | 4 | Six Nations | International venues |
| Olympic | 4 | Summer Olympics | Tokyo, Paris, London, Beijing |
| Boxing | 4 | Title Fights | Major boxing arenas |

## Managing the Database

### Prerequisites
```bash
npm install ts-node typescript
```

### Database Operations

#### View Statistics
```bash
npx ts-node scripts/manage-database.ts stats
```

Output:
```
📊 Database Statistics:
{
  'Formula 1': 23,
  'Football': 21,
  'Cricket': 5,
  ...
  total: 69
}
```

#### Validate Database Integrity
```bash
npx ts-node scripts/manage-database.ts validate
```

Checks for:
- ✅ All required fields present
- ✅ No missing data
- ✅ Data consistency

#### List All Sports
```bash
npx ts-node scripts/manage-database.ts list-sports
```

#### Export Venues by Sport
```bash
npx ts-node scripts/manage-database.ts export "Formula 1"
```

### Adding New Venues

#### Method 1: Direct Script Execution

Create a new script or use the management tool API:

```typescript
import { DatabaseManager } from '@/scripts/manage-database';

const manager = new DatabaseManager();

manager.addVenue({
  sport: 'Football',
  competition: 'Premier League',
  venueName: 'Liverpool FC - Anfield',
  city: 'Liverpool',
  country: 'England',
  countryFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  opened: 1892,
  capacity: 61276,
  lat: 53.4309,
  lng: -2.9609,
  architect: 'Historic',
  surface: 'Grass',
  colourThemePrimary: '#C8102E',
  colourThemeSecondary: '#FFF8DC',
  colourThemeAccent: '#FFD700',
  famousFor: 'Liverpool FC,The Kop,Historic',
  iconicMoments: 'European Cup victories',
  nickname: 'The Fortress',
  notableEvents: 'Liverpool tradition',
  championshipHistory: 'Liverpool FC',
  collectorNumber: 100
});

manager.save();
```

#### Method 2: Bulk Population Script

Use the `populate-*.js` scripts to bulk-import venues:

```bash
node populate-comprehensive-venues.js
```

### Updating Existing Venues

```typescript
const manager = new DatabaseManager();

manager.updateVenue('Formula 1', 'Circuit de Monaco', {
  nickname: 'Updated Nickname',
  capacity: 40000,
  famousFor: 'Updated description'
});

manager.save();
```

### Deleting Venues

```typescript
const manager = new DatabaseManager();

manager.deleteVenue('Formula 1', 'Circuit de Monaco');

manager.save();
```

## Database Expansion Strategy

### Phase 1: Complete Database (~150 venues)
- Add 50+ Football stadiums (currently 21)
- Add 40+ Cricket grounds (currently 5)
- Add 20+ Tennis venues (currently 4)
- Add 65+ Golf courses (currently 4)
- Add 35+ Rugby stadiums (currently 4)
- Add 75+ Olympic venues (currently 4)
- Add 25+ Boxing arenas (currently 4)

### Phase 2: Enhanced Parameters (~200+ venues)
- Add venue logos and club logos
- Add stadium maps and architectural drawings
- Add historical photo references
- Add tournament/championship details

### Phase 3: Production Database (~400+ venues)
- Comprehensive global coverage
- All 30+ parameters fully populated
- Ready for commercial use on Etsy

## API Integration

The database is accessed via REST API endpoints:

### Get All Sports
```
GET /api/sports
```

Response:
```json
{
  "sports": ["Formula 1", "Football", "Cricket", ...]
}
```

### Get Competitions for a Sport
```
GET /api/competitions?sport=Formula%201
```

Response:
```json
{
  "competitions": ["Monaco Grand Prix", "British Grand Prix", ...]
}
```

### Get Venues for a Sport/Competition
```
GET /api/venues?sport=Formula%201&competition=Monaco%20Grand%20Prix
```

Response:
```json
{
  "venues": [
    {
      "venueName": "Circuit de Monaco",
      "city": "Monte Carlo",
      "country": "Monaco",
      ...
    }
  ]
}
```

## Database Backup & Recovery

### Backup
```bash
cp public/databases/iconic-venues.xlsx public/databases/iconic-venues.backup.xlsx
```

### Verify Database
```bash
npx ts-node scripts/manage-database.ts validate
```

## Excel File Format

The database uses `.xlsx` format (Excel 2007+):
- One worksheet per sport
- Headers as first row
- Data starting from row 2
- Supports 30+ columns

### To Edit Manually

1. Open `public/databases/iconic-venues.xlsx` in Excel/Google Sheets
2. Select the sport worksheet
3. Add or modify venue rows
4. Save as `.xlsx` format
5. Run validation: `npx ts-node scripts/manage-database.ts validate`

## Troubleshooting

### Database Won't Load
- Check file exists: `ls public/databases/iconic-venues.xlsx`
- Validate structure: `npx ts-node scripts/manage-database.ts validate`
- Verify Excel format: File should be `.xlsx` not `.xls`

### Missing Venues After Update
- Check for duplicates preventing insert
- Verify all required fields are present
- Review validation errors

### Performance Issues
- Database with 400+ venues loads in <1s
- Queries are cached at API level
- Consider pagination for UI if needed

## Future Enhancements

- [ ] Database sync with cloud storage (Google Drive, Dropbox)
- [ ] Web-based venue editor interface
- [ ] Bulk import from CSV
- [ ] Automated data validation on save
- [ ] Venue change history and audit trail
- [ ] Multi-user collaborative editing
