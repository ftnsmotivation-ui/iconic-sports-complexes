import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import sharp from 'sharp';

const MM_PER_INCH = 25.4;
const BLEED_MM = 3;
const CROP_MARK_MARGIN_PT = 24;
const CROP_MARK_GAP_PT = 6;
const CROP_MARK_LEN_PT = 14;
const RASTER_DPI = 300;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      svgContent,
      filename = 'poster',
      widthIn = 30,
      heightIn = 40,
      bleed = true,
      cropMarks = true,
    } = body;

    if (!svgContent) {
      return NextResponse.json(
        { error: 'SVG content required' },
        { status: 400 }
      );
    }

    const pdfBuffer = await createPosterPDF(svgContent, {
      widthIn,
      heightIn,
      bleed,
      cropMarks,
    });

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('PDF export error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

interface PdfOptions {
  widthIn: number;
  heightIn: number;
  bleed: boolean;
  cropMarks: boolean;
}

async function createPosterPDF(svgContent: string, options: PdfOptions): Promise<Buffer> {
  const { widthIn, heightIn, bleed, cropMarks } = options;

  const bleedPt = bleed ? (BLEED_MM / MM_PER_INCH) * 72 : 0;
  const markMarginPt = cropMarks ? CROP_MARK_MARGIN_PT : 0;

  const trimWidthPt = widthIn * 72;
  const trimHeightPt = heightIn * 72;
  const bleedBoxWidthPt = trimWidthPt + bleedPt * 2;
  const bleedBoxHeightPt = trimHeightPt + bleedPt * 2;
  const pageWidthPt = bleedBoxWidthPt + markMarginPt * 2;
  const pageHeightPt = bleedBoxHeightPt + markMarginPt * 2;

  // Rasterize the poster to fully cover the bleed box — bleed means the
  // artwork extends past the trim line so no white edge appears once cut.
  const bleedBoxWidthPx = Math.round((bleedBoxWidthPt / 72) * RASTER_DPI);
  const bleedBoxHeightPx = Math.round((bleedBoxHeightPt / 72) * RASTER_DPI);

  // The poster SVG is authored at 800x1100 user units (librsvg treats those
  // as 96dpi pixels absent physical units). Pick the rasterization density
  // so librsvg's own render pass already lands near the target pixel size —
  // otherwise it renders small once and .resize() has to upscale that raster
  // ~3-4x to fill a large paper size, which is both slow (was ~100s for a
  // 30x40in bleed box) and blurs anything raster (e.g. AI artwork) baked in.
  const svgUnitWidth = 800;
  const targetDensity = Math.max(72, Math.round((bleedBoxWidthPx / svgUnitWidth) * 96));

  const pngBuffer = await sharp(Buffer.from(svgContent), { density: targetDensity })
    .resize(bleedBoxWidthPx, bleedBoxHeightPx, {
      fit: 'cover',
      position: 'centre',
    })
    .png()
    .toBuffer();

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([pageWidthPt, pageHeightPt]);

  // Sheet background (visible only in the crop-mark margin, like real stock).
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidthPt,
    height: pageHeightPt,
    color: rgb(1, 1, 1),
  });

  const pngImage = await pdfDoc.embedPng(pngBuffer);
  const bleedBoxX = markMarginPt;
  const bleedBoxY = markMarginPt;
  page.drawImage(pngImage, {
    x: bleedBoxX,
    y: bleedBoxY,
    width: bleedBoxWidthPt,
    height: bleedBoxHeightPt,
  });

  if (cropMarks) {
    const trimX0 = bleedBoxX + bleedPt;
    const trimY0 = bleedBoxY + bleedPt;
    const trimX1 = trimX0 + trimWidthPt;
    const trimY1 = trimY0 + trimHeightPt;
    const color = rgb(0, 0, 0);

    const corners: { x: number; y: number; dirX: number; dirY: number }[] = [
      { x: trimX0, y: trimY0, dirX: -1, dirY: -1 },
      { x: trimX1, y: trimY0, dirX: 1, dirY: -1 },
      { x: trimX0, y: trimY1, dirX: -1, dirY: 1 },
      { x: trimX1, y: trimY1, dirX: 1, dirY: 1 },
    ];

    for (const { x, y, dirX, dirY } of corners) {
      page.drawLine({
        start: { x: x + dirX * CROP_MARK_GAP_PT, y },
        end: { x: x + dirX * (CROP_MARK_GAP_PT + CROP_MARK_LEN_PT), y },
        thickness: 0.75,
        color,
      });
      page.drawLine({
        start: { x, y: y + dirY * CROP_MARK_GAP_PT },
        end: { x, y: y + dirY * (CROP_MARK_GAP_PT + CROP_MARK_LEN_PT) },
        thickness: 0.75,
        color,
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
