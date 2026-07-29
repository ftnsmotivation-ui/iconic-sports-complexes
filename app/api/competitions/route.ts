import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sport = searchParams.get('sport');

    if (!sport) {
      return NextResponse.json({ error: 'Sport parameter required' }, { status: 400 });
    }

    const dbPath = path.join(process.cwd(), 'public/databases/iconic-venues.xlsx');
    const workbook = XLSX.readFile(dbPath);
    const worksheet = workbook.Sheets[sport];

    if (!worksheet) {
      return NextResponse.json({ error: 'Sport not found' }, { status: 404 });
    }

    const data = XLSX.utils.sheet_to_json(worksheet);
    const competitions = [...new Set(data.map((row: any) => row.competition))];

    return NextResponse.json({ competitions });
  } catch (error) {
    console.error('Error loading competitions:', error);
    return NextResponse.json({ error: 'Failed to load competitions' }, { status: 500 });
  }
}
