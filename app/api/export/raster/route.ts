import { NextResponse } from 'next/server';
import sharp from 'sharp';

import { MAX_RASTER_DIMENSION, MAX_RASTER_PIXELS, type ExportDpi } from '@/lib/export/ExportSettings';

const supportedDpi: readonly ExportDpi[] = [150, 300, 600];

interface RasterRequest {
  svgContent?: unknown;
  format?: unknown;
  width?: unknown;
  height?: unknown;
  dpi?: unknown;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RasterRequest;
    const width = Number(body.width);
    const height = Number(body.height);
    const dpi = Number(body.dpi) as ExportDpi;
    if (typeof body.svgContent !== 'string' || !body.svgContent.startsWith('<?xml')) return NextResponse.json({ error: 'A standalone SVG master is required.' }, { status: 400 });
    if (body.format !== 'png' && body.format !== 'jpeg') return NextResponse.json({ error: 'Raster format must be PNG or JPEG.' }, { status: 400 });
    if (!supportedDpi.includes(dpi)) return NextResponse.json({ error: 'DPI must be 150, 300, or 600.' }, { status: 400 });
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > MAX_RASTER_DIMENSION || height > MAX_RASTER_DIMENSION || width * height > MAX_RASTER_PIXELS) {
      return NextResponse.json({ error: 'Requested raster dimensions exceed the safe canvas limit.' }, { status: 400 });
    }

    const pipeline = sharp(Buffer.from(body.svgContent), { density: dpi, limitInputPixels: MAX_RASTER_PIXELS, sequentialRead: true }).resize(width, height, { fit: 'fill' });
    const output = body.format === 'png'
      ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
      : await pipeline.flatten({ background: '#ffffff' }).jpeg({ quality: 95, chromaSubsampling: '4:4:4', mozjpeg: true }).toBuffer();
    return new NextResponse(new Uint8Array(output), {
      headers: {
        'Content-Type': body.format === 'png' ? 'image/png' : 'image/jpeg',
        'Content-Length': String(output.byteLength),
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Raster export error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create raster export.' }, { status: 500 });
  }
}
