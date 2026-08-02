import { NextResponse } from 'next/server';
import { PDFDocument, PDFName, rgb } from 'pdf-lib';
import sharp from 'sharp';

import { MAX_RASTER_DIMENSION, MAX_RASTER_PIXELS, type ExportDpi } from '@/lib/export/ExportSettings';

const MM_PER_INCH = 25.4;
const POINTS_PER_INCH = 72;
const CROP_MARK_MARGIN_PT = 24;
const CROP_MARK_GAP_PT = 6;
const CROP_MARK_LENGTH_PT = 14;
const supportedDpi: readonly ExportDpi[] = [150, 300, 600];

interface PdfRequest {
  svgContent?: unknown;
  filename?: unknown;
  widthMm?: unknown;
  heightMm?: unknown;
  widthIn?: unknown;
  heightIn?: unknown;
  dpi?: unknown;
  bleedMm?: unknown;
  bleed?: unknown;
  cropMarks?: unknown;
  safeMarginMm?: unknown;
}

interface PdfOptions {
  widthMm: number;
  heightMm: number;
  dpi: ExportDpi;
  bleedMm: number;
  cropMarks: boolean;
  safeMarginMm: number;
}

function mmToPoints(value: number): number {
  return value / MM_PER_INCH * POINTS_PER_INCH;
}

function safeFilename(value: unknown): string {
  return String(value || 'poster').replace(/[^a-z0-9_-]+/gi, '-').replace(/^-|-$/g, '') || 'poster';
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as PdfRequest;
    if (typeof body.svgContent !== 'string' || !body.svgContent.includes('<svg')) return NextResponse.json({ error: 'SVG content required' }, { status: 400 });
    const widthMm = Number(body.widthMm ?? Number(body.widthIn ?? 30) * MM_PER_INCH);
    const heightMm = Number(body.heightMm ?? Number(body.heightIn ?? 40) * MM_PER_INCH);
    const dpi = Number(body.dpi ?? 300) as ExportDpi;
    const bleedMm = Number(body.bleedMm ?? (body.bleed === false ? 0 : 3));
    const safeMarginMm = Number(body.safeMarginMm ?? 0);
    if (![widthMm, heightMm, bleedMm, safeMarginMm].every(Number.isFinite) || widthMm <= 0 || heightMm <= 0 || bleedMm < 0 || safeMarginMm < 0) return NextResponse.json({ error: 'Invalid print dimensions.' }, { status: 400 });
    if (!supportedDpi.includes(dpi)) return NextResponse.json({ error: 'DPI must be 150, 300, or 600.' }, { status: 400 });

    const output = await createPosterPdf(body.svgContent, { widthMm, heightMm, dpi, bleedMm, cropMarks: body.cropMarks !== false, safeMarginMm });
    const filename = safeFilename(body.filename);
    return new NextResponse(new Uint8Array(output), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}.pdf"`,
        'Cache-Control': 'no-store',
        'X-ISC-PDF-Master': `raster-${dpi}dpi-vector-marks`,
      },
    });
  } catch (error) {
    console.error('PDF export error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to generate PDF' }, { status: 500 });
  }
}

async function createPosterPdf(svgContent: string, options: PdfOptions): Promise<Uint8Array> {
  const bleedPt = mmToPoints(options.bleedMm);
  const trimWidthPt = mmToPoints(options.widthMm);
  const trimHeightPt = mmToPoints(options.heightMm);
  const bleedWidthPt = trimWidthPt + bleedPt * 2;
  const bleedHeightPt = trimHeightPt + bleedPt * 2;
  const markMarginPt = options.cropMarks ? CROP_MARK_MARGIN_PT : 0;
  const pageWidthPt = bleedWidthPt + markMarginPt * 2;
  const pageHeightPt = bleedHeightPt + markMarginPt * 2;
  const pixelWidth = Math.round((options.widthMm + options.bleedMm * 2) / MM_PER_INCH * options.dpi);
  const pixelHeight = Math.round((options.heightMm + options.bleedMm * 2) / MM_PER_INCH * options.dpi);
  if (pixelWidth > MAX_RASTER_DIMENSION || pixelHeight > MAX_RASTER_DIMENSION || pixelWidth * pixelHeight > MAX_RASTER_PIXELS) throw new Error(`Requested PDF master is ${pixelWidth} × ${pixelHeight}px and exceeds the safe canvas limit.`);

  const png = await sharp(Buffer.from(svgContent), { density: options.dpi, limitInputPixels: MAX_RASTER_PIXELS, sequentialRead: true }).resize(pixelWidth, pixelHeight, { fit: 'cover', position: 'centre' }).png({ compressionLevel: 9 }).toBuffer();
  const document = await PDFDocument.create();
  const page = document.addPage([pageWidthPt, pageHeightPt]);
  page.drawRectangle({ x: 0, y: 0, width: pageWidthPt, height: pageHeightPt, color: rgb(1, 1, 1) });
  const image = await document.embedPng(png);
  page.drawImage(image, { x: markMarginPt, y: markMarginPt, width: bleedWidthPt, height: bleedHeightPt });

  const trimX0 = markMarginPt + bleedPt;
  const trimY0 = markMarginPt + bleedPt;
  const trimX1 = trimX0 + trimWidthPt;
  const trimY1 = trimY0 + trimHeightPt;
  page.node.set(PDFName.of('TrimBox'), document.context.obj([trimX0, trimY0, trimX1, trimY1]));
  page.node.set(PDFName.of('BleedBox'), document.context.obj([markMarginPt, markMarginPt, markMarginPt + bleedWidthPt, markMarginPt + bleedHeightPt]));
  const safePt = Math.min(mmToPoints(options.safeMarginMm), trimWidthPt / 2, trimHeightPt / 2);
  page.node.set(PDFName.of('ArtBox'), document.context.obj([trimX0 + safePt, trimY0 + safePt, trimX1 - safePt, trimY1 - safePt]));

  if (options.cropMarks) {
    const corners = [{ x: trimX0, y: trimY0, dx: -1, dy: -1 }, { x: trimX1, y: trimY0, dx: 1, dy: -1 }, { x: trimX0, y: trimY1, dx: -1, dy: 1 }, { x: trimX1, y: trimY1, dx: 1, dy: 1 }];
    corners.forEach(({ x, y, dx, dy }) => {
      page.drawLine({ start: { x: x + dx * CROP_MARK_GAP_PT, y }, end: { x: x + dx * (CROP_MARK_GAP_PT + CROP_MARK_LENGTH_PT), y }, thickness: .75, color: rgb(0, 0, 0) });
      page.drawLine({ start: { x, y: y + dy * CROP_MARK_GAP_PT }, end: { x, y: y + dy * (CROP_MARK_GAP_PT + CROP_MARK_LENGTH_PT) }, thickness: .75, color: rgb(0, 0, 0) });
    });
  }
  return document.save();
}
