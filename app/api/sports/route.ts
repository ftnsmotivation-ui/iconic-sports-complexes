import { NextResponse } from 'next/server';
import { appendNewSport, databaseExists, getSports } from '@/lib/database/workbook';
import type { SportEnrichmentInput } from '@/lib/database/SportEnrichmentTypes';

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

export async function POST(request: Request) {
  try {
    const body = await request.json() as { confirmed?: unknown; record?: unknown };
    if (body.confirmed !== true) return NextResponse.json({ error: 'Explicit confirmation is required before changing the workbook.' }, { status: 400 });
    if (!body.record || typeof body.record !== 'object') return NextResponse.json({ error: 'A normalized sport record is required.' }, { status: 400 });
    const result = await appendNewSport(body.record as SportEnrichmentInput);
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to add sport.';
    const status = /already exists/i.test(message) ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
