import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), 'public/databases/iconic-venues.xlsx');

    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ error: 'Database not found' }, { status: 404 });
    }

    const workbook = XLSX.readFile(dbPath);
    const sports = workbook.SheetNames;

    return NextResponse.json({ sports });
  } catch (error) {
    console.error('Error loading sports:', error);
    return NextResponse.json({ error: 'Failed to load sports' }, { status: 500 });
  }
}
