import { Venue, GenerationParameters, PosterStyle } from '@/lib/types';

interface Dimensions {
  width: number;
  height: number;
}

export class PosterGenerator {
  private venue: Venue;
  private style: PosterStyle;
  private dimensions: Dimensions;

  constructor(venue: Venue, style: PosterStyle, dimensions: Dimensions = { width: 3000, height: 4200 }) {
    this.venue = venue;
    this.style = style;
    this.dimensions = dimensions;
  }

  generateSVG(): string {
    const svg = this.createSVGDocument();

    // Build poster layers
    this.addBackgroundLayer(svg);
    this.addBorderFrame(svg);
    this.addHeaderSection(svg);
    this.addMainMapSection(svg);
    this.addVenueFacts(svg);
    this.addIconicMoments(svg);
    this.addQuickFacts(svg);
    this.addFooterSection(svg);

    return svg.outerHTML;
  }

  private createSVGDocument(): SVGElement {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', `0 0 ${this.dimensions.width} ${this.dimensions.height}`);
    svg.setAttribute('xmlns', ns);
    svg.setAttribute('width', this.dimensions.width.toString());
    svg.setAttribute('height', this.dimensions.height.toString());
    return svg;
  }

  private addBackgroundLayer(svg: SVGElement): void {
    const ns = 'http://www.w3.org/2000/svg';
    const bg = document.createElementNS(ns, 'rect');
    bg.setAttribute('width', this.dimensions.width.toString());
    bg.setAttribute('height', this.dimensions.height.toString());
    bg.setAttribute('fill', this.style.colourPalette.background);
    svg.appendChild(bg);

    // Add subtle pattern
    this.addBackgroundPattern(svg);
  }

  private addBackgroundPattern(svg: SVGElement): void {
    const ns = 'http://www.w3.org/2000/svg';
    const defs = document.createElementNS(ns, 'defs');

    const pattern = document.createElementNS(ns, 'pattern');
    pattern.setAttribute('id', 'bgPattern');
    pattern.setAttribute('x', '0');
    pattern.setAttribute('y', '0');
    pattern.setAttribute('width', '100');
    pattern.setAttribute('height', '100');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');

    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', '0');
    line.setAttribute('x2', '100');
    line.setAttribute('y2', '100');
    line.setAttribute('stroke', this.style.colourPalette.border);
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('opacity', '0.1');

    pattern.appendChild(line);
    defs.appendChild(pattern);
    svg.appendChild(defs);
  }

  private addBorderFrame(svg: SVGElement): void {
    const ns = 'http://www.w3.org/2000/svg';
    const borderWidth = 40;
    const borderColor = this.style.colourPalette.accent;

    // Outer border
    const border = document.createElementNS(ns, 'rect');
    border.setAttribute('x', '0');
    border.setAttribute('y', '0');
    border.setAttribute('width', this.dimensions.width.toString());
    border.setAttribute('height', this.dimensions.height.toString());
    border.setAttribute('fill', 'none');
    border.setAttribute('stroke', borderColor);
    border.setAttribute('stroke-width', borderWidth.toString());
    svg.appendChild(border);

    // Inner decorative frame
    const innerFrame = document.createElementNS(ns, 'rect');
    innerFrame.setAttribute('x', (borderWidth + 20).toString());
    innerFrame.setAttribute('y', (borderWidth + 20).toString());
    innerFrame.setAttribute('width', (this.dimensions.width - 2 * (borderWidth + 20)).toString());
    innerFrame.setAttribute('height', (this.dimensions.height - 2 * (borderWidth + 20)).toString());
    innerFrame.setAttribute('fill', 'none');
    innerFrame.setAttribute('stroke', borderColor);
    innerFrame.setAttribute('stroke-width', '2');
    innerFrame.setAttribute('stroke-dasharray', '10,5');
    innerFrame.setAttribute('opacity', '0.3');
    svg.appendChild(innerFrame);
  }

  private addHeaderSection(svg: SVGElement): void {
    const ns = 'http://www.w3.org/2000/svg';
    const headerY = 150;

    // Competition title
    const competition = document.createElementNS(ns, 'text');
    competition.setAttribute('x', (this.dimensions.width / 2).toString());
    competition.setAttribute('y', headerY.toString());
    competition.setAttribute('text-anchor', 'middle');
    competition.setAttribute('font-size', '36');
    competition.setAttribute('font-weight', 'bold');
    competition.setAttribute('fill', this.style.colourPalette.accent);
    competition.setAttribute('letter-spacing', '8');
    competition.textContent = this.venue.competition.toUpperCase();
    svg.appendChild(competition);

    // Venue name
    const venueName = document.createElementNS(ns, 'text');
    venueName.setAttribute('x', (this.dimensions.width / 2).toString());
    venueName.setAttribute('y', (headerY + 100).toString());
    venueName.setAttribute('text-anchor', 'middle');
    venueName.setAttribute('font-size', '72');
    venueName.setAttribute('font-weight', 'bold');
    venueName.setAttribute('fill', this.style.colourPalette.text);
    venueName.setAttribute('font-family', 'serif');
    venueName.textContent = this.venue.venueName;
    svg.appendChild(venueName);

    // Location
    const location = document.createElementNS(ns, 'text');
    location.setAttribute('x', (this.dimensions.width / 2).toString());
    location.setAttribute('y', (headerY + 160).toString());
    location.setAttribute('text-anchor', 'middle');
    location.setAttribute('font-size', '24');
    location.setAttribute('fill', this.style.colourPalette.secondary);
    location.textContent = `${this.venue.city}, ${this.venue.country}`;
    svg.appendChild(location);
  }

  private addMainMapSection(svg: SVGElement): void {
    const ns = 'http://www.w3.org/2000/svg';
    const mapY = 450;
    const mapSize = 1200;

    // Circular map background
    const mapBg = document.createElementNS(ns, 'circle');
    mapBg.setAttribute('cx', (this.dimensions.width / 2).toString());
    mapBg.setAttribute('cy', (mapY + mapSize / 2).toString());
    mapBg.setAttribute('r', (mapSize / 2).toString());
    mapBg.setAttribute('fill', '#1a1a1a');
    mapBg.setAttribute('stroke', this.style.colourPalette.accent);
    mapBg.setAttribute('stroke-width', '8');
    svg.appendChild(mapBg);

    // Compass rose
    if (this.venue.compassRose) {
      this.addCompassRose(svg, this.dimensions.width / 2, mapY + mapSize / 2 + 200, 80);
    }

    // Placeholder for venue map content
    const mapText = document.createElementNS(ns, 'text');
    mapText.setAttribute('x', (this.dimensions.width / 2).toString());
    mapText.setAttribute('y', (mapY + mapSize / 2).toString());
    mapText.setAttribute('text-anchor', 'middle');
    mapText.setAttribute('dominant-baseline', 'middle');
    mapText.setAttribute('font-size', '20');
    mapText.setAttribute('fill', this.style.colourPalette.accent);
    mapText.setAttribute('opacity', '0.5');
    mapText.textContent = 'CIRCUIT MAP';
    svg.appendChild(mapText);
  }

  private addCompassRose(svg: SVGElement, x: number, y: number, size: number): void {
    const ns = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('transform', `translate(${x},${y})`);

    // North arrow
    const points = `0,-${size} ${size * 0.3},${size * 0.5} 0,${size * 0.2} -${size * 0.3},${size * 0.5}`;
    const poly = document.createElementNS(ns, 'polygon');
    poly.setAttribute('points', points);
    poly.setAttribute('fill', this.style.colourPalette.accent);
    poly.setAttribute('opacity', '0.6');
    g.appendChild(poly);

    // N label
    const label = document.createElementNS(ns, 'text');
    label.setAttribute('x', '0');
    label.setAttribute('y', (-size - 20).toString());
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '18');
    label.setAttribute('fill', this.style.colourPalette.accent);
    label.textContent = 'N';
    g.appendChild(label);

    svg.appendChild(g);
  }

  private addVenueFacts(svg: SVGElement): void {
    const ns = 'http://www.w3.org/2000/svg';
    const startY = 1800;
    const boxWidth = 500;
    const boxHeight = 300;
    const x = 100;

    this.addFactBox(svg, x, startY, boxWidth, boxHeight, 'VENUE FACTS', [
      [`OPENED`, this.venue.opened.toString()],
      [`CAPACITY`, this.formatNumber(this.venue.capacity)],
      [`COORDINATES`, `${this.venue.coordinates.lat}, ${this.venue.coordinates.lng}`],
      [`SURFACE`, this.venue.surface || 'N/A'],
    ]);
  }

  private addIconicMoments(svg: SVGElement): void {
    const ns = 'http://www.w3.org/2000/svg';
    const startY = 1800;
    const boxWidth = 600;
    const boxHeight = 300;
    const x = this.dimensions.width / 2 - boxWidth / 2;

    const moments = this.venue.iconicMoments?.slice(0, 2) || [];
    const momentTexts = moments.map((m, i) => [`MOMENT ${i + 1}`, m]);

    this.addFactBox(svg, x, startY, boxWidth, boxHeight, 'ICONIC MOMENTS', momentTexts);
  }

  private addQuickFacts(svg: SVGElement): void {
    const ns = 'http://www.w3.org/2000/svg';
    const startY = 1800;
    const boxWidth = 500;
    const boxHeight = 300;
    const x = this.dimensions.width - boxWidth - 100;

    this.addFactBox(svg, x, startY, boxWidth, boxHeight, 'QUICK FACTS', [
      [`COMPETITION`, this.venue.competition],
      [`FAMOUS FOR`, (this.venue.famousFor[0] || 'N/A')],
      [`NICKNAME`, this.venue.nickname || 'N/A'],
    ]);
  }

  private addFactBox(
    svg: SVGElement,
    x: number,
    y: number,
    width: number,
    height: number,
    title: string,
    facts: Array<[string, string]>
  ): void {
    const ns = 'http://www.w3.org/2000/svg';

    // Background
    const bg = document.createElementNS(ns, 'rect');
    bg.setAttribute('x', x.toString());
    bg.setAttribute('y', y.toString());
    bg.setAttribute('width', width.toString());
    bg.setAttribute('height', height.toString());
    bg.setAttribute('fill', 'rgba(0, 0, 0, 0.5)');
    bg.setAttribute('stroke', this.style.colourPalette.accent);
    bg.setAttribute('stroke-width', '2');
    svg.appendChild(bg);

    // Title
    const titleEl = document.createElementNS(ns, 'text');
    titleEl.setAttribute('x', (x + width / 2).toString());
    titleEl.setAttribute('y', (y + 30).toString());
    titleEl.setAttribute('text-anchor', 'middle');
    titleEl.setAttribute('font-size', '20');
    titleEl.setAttribute('font-weight', 'bold');
    titleEl.setAttribute('fill', this.style.colourPalette.accent);
    titleEl.setAttribute('letter-spacing', '2');
    titleEl.textContent = title;
    svg.appendChild(titleEl);

    // Facts
    facts.forEach((fact, i) => {
      const [label, value] = fact;
      const factY = y + 70 + i * 50;

      const labelEl = document.createElementNS(ns, 'text');
      labelEl.setAttribute('x', (x + 20).toString());
      labelEl.setAttribute('y', factY.toString());
      labelEl.setAttribute('font-size', '12');
      labelEl.setAttribute('font-weight', 'bold');
      labelEl.setAttribute('fill', this.style.colourPalette.accent);
      labelEl.textContent = label;
      svg.appendChild(labelEl);

      const valueEl = document.createElementNS(ns, 'text');
      valueEl.setAttribute('x', (x + 20).toString());
      valueEl.setAttribute('y', (factY + 20).toString());
      valueEl.setAttribute('font-size', '14');
      valueEl.setAttribute('fill', this.style.colourPalette.text);
      valueEl.textContent = value.substring(0, 40);
      svg.appendChild(valueEl);
    });
  }

  private addFooterSection(svg: SVGElement): void {
    const ns = 'http://www.w3.org/2000/svg';
    const footerY = this.dimensions.height - 100;

    // Separator line
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', '100');
    line.setAttribute('y1', footerY.toString());
    line.setAttribute('x2', (this.dimensions.width - 100).toString());
    line.setAttribute('y2', footerY.toString());
    line.setAttribute('stroke', this.style.colourPalette.accent);
    line.setAttribute('stroke-width', '2');
    svg.appendChild(line);

    // Tagline
    const tagline = document.createElementNS(ns, 'text');
    tagline.setAttribute('x', (this.dimensions.width / 2).toString());
    tagline.setAttribute('y', (this.dimensions.height - 30).toString());
    tagline.setAttribute('text-anchor', 'middle');
    tagline.setAttribute('font-size', '16');
    tagline.setAttribute('font-style', 'italic');
    tagline.setAttribute('fill', this.style.colourPalette.secondary);
    tagline.textContent = 'ICONIC SPORTS COMPLEXES - MUSEUM QUALITY POSTER';
    svg.appendChild(tagline);
  }

  private formatNumber(num: number): string {
    return num.toLocaleString();
  }
}
