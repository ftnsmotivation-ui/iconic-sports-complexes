# Iconic Sports Complexes Studio

ISC Studio is a vector-first poster workspace for producing collector artwork of iconic sporting venues. Venue facts come from the bundled Excel workbook, while typed directors control layout, typography, colour, illustration, and export decisions.

## Capabilities

- Excel-driven sport, competition, and venue catalogue with offline caching
- Collector, Editorial, and Atlas poster systems with three composition concepts
- Venue-specific vector masters for Monaco, Eden Gardens, Santiago Bernabéu, St Andrews, and Madison Square Garden
- Personalised “I Was There” editions and frame previews
- SVG, PDF, PNG, JPEG, and TIFF production exports
- Print, Etsy, social/website, and marketing-mockup packages
- A sandboxed Electron desktop shell around the same tested Next.js application

EPS export remains intentionally unavailable until a trusted PostScript converter is installed. CMYK output is blocked until a licensed ICC conversion workflow is configured; sRGB exports remain available.

## Requirements

- Node.js 20 or newer
- npm

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`; the root route redirects to `/studio-preview`.

## Verification

```bash
npm test
npm run qa:visual
npm run build
```

The visual QA command writes a 15-poster contact sheet and individual PNG previews to `.next/visual-qa/`. Generated QA files are build artifacts and are not committed.

## Production and Desktop

```bash
npm run build
npm start

# Desktop development
npm run desktop:dev

# Desktop production shell after a build
npm run desktop:start
```

See [desktop/README.md](desktop/README.md) for packaging architecture and security boundaries. Platform installers and code signing are release-engineering tasks and require external credentials.

## Architecture

The primary flow is:

```text
Excel workbook → repository/API → Studio state → poster model
→ directors → vector renderer → export adapters/packages
```

The workbook at `public/databases/iconic-venues.xlsx` is the venue-data source of truth. Renderers draw; directors decide; repositories provide data. See [ARCHITECTURE.md](ARCHITECTURE.md) for layer responsibilities.

## License

ISC Studio is MIT licensed. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
