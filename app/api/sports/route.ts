import { NextResponse } from 'next/server';
import { databaseExists, getSports } from '@/lib/database/workbook';

export async function GET() {
  try {
    if (!databaseExists()) {
      return NextResponse.json({ error: 'Database not found' }, { status: 404 });
    }

    return NextResponse.json({ sports: getSports() });
  } catch (error) {
    console.error('Error loading sports:', error);
    return NextResponse.json({
      error: 'Failed to load sports',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
