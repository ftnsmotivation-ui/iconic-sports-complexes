export function prepareSvgForRaster(svgContent: string, width: number, height: number): string {
  let rootFound = false;
  const prepared = svgContent.replace(/<svg\b[^>]*>/, (root) => {
    rootFound = true;
    const withoutDimensions = root
      .replace(/\swidth=(['"])[^'"]*\1/, '')
      .replace(/\sheight=(['"])[^'"]*\1/, '');
    return withoutDimensions.replace('<svg', `<svg width="${width}" height="${height}"`);
  });

  if (!rootFound) throw new Error('A valid SVG root is required for raster export.');
  return prepared;
}
