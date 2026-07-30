import { NextResponse } from 'next/server';
import { databaseExists, getCompetitions, getSports } from '@/lib/database/workbook';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sport = searchParams.get('sport');

    if (!sport) {
      return NextResponse.json({ error: 'Sport parameter required' }, { status: 400 });
    }

    if (!databaseExists()) {
      return NextResponse.json({ error: 'Database not found' }, { status: 404 });
    }

    const competitions = getCompetitions(sport);

    if (!competitions) {
      return NextResponse.json({
        error: `Sport "${sport}" not found. Available: ${getSports().join(', ')}`
      }, { status: 404 });
    }

    return NextResponse.json({ competitions });
  } catch (error) {
    console.error('Error loading competitions:', error);
    return NextResponse.json({
      error: 'Failed to load competitions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
