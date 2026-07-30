// Export utilities for different file formats

export interface ExportOptions {
  filename: string;
  svgContent: string;
  format: 'pdf' | 'png' | 'svg' | 'jpeg' | 'tiff';
  width?: number;
  height?: number;
  dpi?: number;
}

/**
 * Export poster as SVG (native vector format - no conversion needed)
 */
export async function exportSVG(options: ExportOptions): Promise<void> {
  const { filename, svgContent } = options;

  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  downloadBlob(blob, `${filename}.svg`);
}

/**
 * Export poster as PDF (print-ready format)
 */
export async function exportPDF(options: ExportOptions): Promise<void> {
  const { filename, svgContent, width = 800, height = 1100 } = options;

  try {
    // Dynamically import pdfkit (server-side)
    const response = await fetch('/api/export/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename,
        svgContent,
        width,
        height,
      }),
    });

    if (!response.ok) {
      throw new Error('PDF export failed');
    }

    const blob = await response.blob();
    downloadBlob(blob, `${filename}.pdf`);
  } catch (error) {
    console.error('PDF export error:', error);
    alert('Failed to export PDF. Please try another format.');
  }
}

/**
 * Export poster as PNG (raster format for web/printing)
 */
export async function exportPNG(options: ExportOptions): Promise<void> {
  const { filename, svgContent, width = 800, height = 1100, dpi = 300 } = options;

  try {
    // Use Canvas API to convert SVG to PNG
    const canvas = await svgToCanvas(svgContent, width, height, dpi);
    const blob = await canvasToBlob(canvas, 'image/png');
    downloadBlob(blob, `${filename}.png`);
  } catch (error) {
    console.error('PNG export error:', error);
    alert('Failed to export PNG. Please try another format.');
  }
}

/**
 * Export poster as JPEG (compressed raster for web)
 */
export async function exportJPEG(options: ExportOptions): Promise<void> {
  const { filename, svgContent, width = 800, height = 1100, dpi = 300 } = options;

  try {
    const canvas = await svgToCanvas(svgContent, width, height, dpi);
    const blob = await canvasToBlob(canvas, 'image/jpeg', 0.95);
    downloadBlob(blob, `${filename}.jpg`);
  } catch (error) {
    console.error('JPEG export error:', error);
    alert('Failed to export JPEG. Please try another format.');
  }
}

/**
 * Convert SVG to Canvas
 */
async function svgToCanvas(
  svgContent: string,
  width: number,
  height: number,
  dpi: number
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Scale for DPI (300 DPI = 3.125x scale)
  const scale = dpi / 96;
  canvas.width = width * scale;
  canvas.height = height * scale;

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  ctx.scale(scale, scale);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);

  // Create image from SVG
  const img = new Image();
  img.src = `data:image/svg+xml;base64,${btoa(svgContent)}`;

  return new Promise((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas);
    };
    img.onerror = () => {
      reject(new Error('Failed to load SVG'));
    };
  });
}

/**
 * Convert Canvas to Blob
 */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: 'image/png' | 'image/jpeg',
  quality?: number
): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }
    }, type, quality);
  });
}

/**
 * Trigger download for blob
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export in all formats (bulk download)
 */
export async function exportAllFormats(options: Omit<ExportOptions, 'format'>): Promise<void> {
  const formats: ExportOptions['format'][] = ['svg', 'pdf', 'png', 'jpeg'];

  for (const format of formats) {
    // Small delay between exports to prevent browser blocking
    await new Promise(resolve => setTimeout(resolve, 500));

    switch (format) {
      case 'svg':
        await exportSVG({ ...options, format });
        break;
      case 'pdf':
        await exportPDF({ ...options, format });
        break;
      case 'png':
        await exportPNG({ ...options, format });
        break;
      case 'jpeg':
        await exportJPEG({ ...options, format });
        break;
    }
  }
}
