import { NextResponse } from 'next/server';
import { databaseExists, getRowsForSport } from '@/lib/database/workbook';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sport = searchParams.get('sport');
    const competition = searchParams.get('competition');

    if (!sport || !competition) {
      return NextResponse.json({
        error: 'Sport and competition parameters required'
      }, { status: 400 });
    }

    if (!databaseExists()) {
      return NextResponse.json({ error: 'Database not found' }, { status: 404 });
    }

    const rows = getRowsForSport(sport);

    if (!rows) {
      return NextResponse.json({
        error: `Sport "${sport}" not found`
      }, { status: 404 });
    }

    const venues = rows.filter(row => row.competition === competition);

    if (venues.length === 0) {
      return NextResponse.json({
        error: `No venues found for competition "${competition}"`
      }, { status: 404 });
    }

    return NextResponse.json({ venues });
  } catch (error) {
    console.error('Error loading venues:', error);
    return NextResponse.json({
      error: 'Failed to load venues',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
