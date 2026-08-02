# Setup and Deployment

Use Node.js 20 or newer and npm.

```bash
npm install --include=optional
npm test
npm run build
npm start
```

Open `http://localhost:3000`; the application redirects to the Studio workspace. The production server requires the bundled `public/databases/iconic-venues.xlsx` workbook and `public/venue-assets` directory.

For the standalone desktop build:

```bash
npm run build
npm run desktop:prepare
npm run desktop:start
```

`desktop:prepare` copies public and Next.js static assets into the standalone output. Sharp platform binaries are included through Next.js output tracing. See [desktop/README.md](desktop/README.md) for packaging and signing constraints.

The Studio can add an unlisted sport through its confirmed enrichment workflow. Workbook writes are normalized, verified in a temporary file, backed up, and atomically promoted. Manual workbook edits remain supported and are detected without restarting the server.
