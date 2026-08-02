# ISC Studio Autonomous Sprint Plan

## Mission

Build **Iconic Sports Complexes Studio (ISC Studio)** into a polished, premium, commercially viable cross-platform application for generating museum-quality sporting venue posters.

The product must remain vector-first, Excel-driven, strongly typed, visually premium, scalable across sports and venues, and suitable for commercial printing and digital marketplaces.

Read `AGENTS.md` and `ARCHITECTURE.md` before every sprint.

## Autonomous Working Rules

For each sprint:

1. Inspect the affected files before editing.
2. Preserve existing working behavior unless the sprint explicitly changes it.
3. Keep changes narrowly scoped.
4. Avoid unrelated formatting and line-ending changes.
5. Run `npm run build` and fix every TypeScript/build error.
6. Run `git diff --stat`.
7. Commit only files belonging to that sprint.
8. Push to the `isc-studio` branch.
9. Continue automatically to the next sprint.

Use conventional commit messages.

### Stop only when

- an architectural decision cannot be resolved from project documentation;
- a credential, paid API, or external service is required;
- user data could be deleted or corrupted;
- a build failure cannot be fixed after reasonable attempts;
- merging into `main` would be required;
- product scope would materially change.

# Milestone 1 — Studio Foundation

## Sprint 01 — Verify Studio Baseline
Confirm the current Studio refactor and style cards are stable. Run build, verify sport/competition/venue/style selection, preview, inspector, and output controls.

Commit: `chore(studio): verify refactored workspace baseline`

## Sprint 02 — Live Style Preview Cards
Use current venue data to render genuine miniature Collector, Editorial, and Atlas previews. Preserve accessibility and the main preview.

Commit: `feat(studio): add live style preview cards`

## Sprint 03 — Distinct Style Profiles
Create typed style profiles for background, typography, border, spacing, accent, and information density. Ensure the main poster changes meaningfully by style.

Commit: `feat(styles): introduce distinct poster style profiles`

## Sprint 04 — Responsive Studio Layout
Support 1366×768, 1440×900, and 1920×1080. Preserve a three-column workspace on large screens and collapse intelligently on narrower widths.

Commit: `feat(studio): add responsive workspace layout`

## Sprint 05 — Toolbar Functionality
Implement Fit, zoom presets, grid, safe margin, and guides. Keep overlays preview-only.

Commit: `feat(preview): add zoom and layout guide controls`

# Milestone 2 — Poster Intelligence

## Sprint 06 — Normalize Poster Model
Create one canonical typed poster model between venue data and rendering. Preserve Excel as the source of truth.

Commit: `refactor(model): normalize poster data pipeline`

## Sprint 07 — Venue DNA Integration
Resolve DNA from the selected venue and feed mood, palette, typography, density, and illustration priority into rendering.

Commit: `feat(dna): connect venue profiles to studio rendering`

## Sprint 08 — Layout Director Integration
Add at least three premium layouts selected by DNA and style. Centralize geometry and prevent overlaps.

Commit: `feat(layout): enable dna-driven poster layouts`

## Sprint 09 — Typography Director Upgrade
Add adaptive title, subtitle, metadata, caption, and collector typography with long-title handling.

Commit: `feat(typography): add adaptive premium type system`

## Sprint 10 — Colour Director
Centralize venue-aware, sport-aware, and style-aware print-friendly palettes.

Commit: `feat(colour): add venue-aware colour direction`

# Milestone 3 — Illustration and Maps

## Sprint 11 — Illustration Architecture Review
Remove dead/duplicate illustration code. Prefer venue-specific masters where recognisability matters; retain shared primitives only where valuable.

Commit: `refactor(illustration): simplify venue artwork architecture`

## Sprint 12 — Premium Eden Gardens Master
Replace the generic stadium icon with recognisable, premium vector artwork featuring perspective, seating, pavilion, floodlights, and atmosphere.

Commit: `feat(illustration): add premium eden gardens master`

## Sprint 13 — Monaco Master Artwork
Create an original premium Monaco composition including vector circuit map, harbour character, and street-circuit identity.

Commit: `feat(illustration): add premium monaco master`

## Sprint 14 — Venue Map Engine
Support circuit maps, stadium plans, golf-course maps, venue outlines, compass rose, and coordinates as vector artwork.

Commit: `feat(maps): introduce vector venue map engine`

## Sprint 15 — Historic Moments and Records
Render iconic moments, records, notable events, and championships elegantly, respecting selected parameters and overflow limits.

Commit: `feat(content): add historic moments and records modules`

# Milestone 4 — Studio Workflow

## Sprint 16 — Parameter-Driven Rendering
Connect every visible poster-content toggle to actual output and rebalance layouts when sections are hidden.

Commit: `feat(parameters): connect studio controls to poster output`

## Sprint 17 — “I Was There” Personalisation
Support date, occasion, stand, seat, and notes. Replace the area intelligently when disabled.

Commit: `feat(personalisation): add i-was-there collector panel`

## Sprint 18 — Three Concept Generator
Generate three distinct live concepts varying layout, typography, background, illustration treatment, and palette; allow one to be selected.

Commit: `feat(concepts): add three-option poster generator`

## Sprint 19 — Frame Preview System
Add Black, Oak, Walnut, White, and No Frame previews without contaminating final artwork exports.

Commit: `feat(mockup): add selectable frame previews`

## Sprint 20 — Draft Persistence
Persist Studio settings locally, restore on refresh, and provide reset behavior.

Commit: `feat(studio): add local draft persistence`

# Milestone 5 — Export Engine

## Sprint 21 — Export Architecture
Separate preview rendering from export rendering. Type size, DPI, format, bleed, crop, margin, and colour settings.

Commit: `refactor(export): establish export service architecture`

## Sprint 22 — SVG Export
Export clean standalone SVG with vector text/geometry and inlined styling.

Commit: `feat(export): add production svg export`

## Sprint 23 — PNG and JPEG Export
Support 150/300/600 DPI, selected size, correct aspect ratio, and large-canvas safety.

Commit: `feat(export): add high-resolution raster output`

## Sprint 24 — PDF Export
Support ISO and imperial sizes, bleed, crop marks, safe margins, and vector preservation where practical.

Commit: `feat(export): add print-ready pdf output`

## Sprint 25 — EPS and TIFF Strategy
Implement real support or isolate honest adapters for environments requiring server-side conversion. Never fake support.

Commit: `feat(export): add professional eps and tiff pipeline`

## Sprint 26 — CMYK and ICC Preparation
Separate RGB preview from print configuration; add honest typed CMYK/ICC settings without claiming conversions that are not implemented.

Commit: `feat(print): add colour-management configuration`

# Milestone 6 — Publishing Packages

## Sprint 27 — One-Click Print Package
Generate A4/A3/A2/A1/A0 and supported SVG/PNG/JPEG/PDF outputs with organized filenames.

Commit: `feat(package): add one-click print bundle`

## Sprint 28 — Etsy Package
Generate listing preview, thumbnail, common sizes, ZIP, title, description, tags, keywords, alt text, JSON, and CSV metadata.

Commit: `feat(package): add etsy publishing bundle`

## Sprint 29 — Social and Website Packages
Generate Instagram, Story, Pinterest, Facebook, X, LinkedIn, Retina, and standard web previews with safe cropping.

Commit: `feat(package): add social and website exports`

## Sprint 30 — Marketing Mockups
Generate luxury living-room, office, gallery, frame, and canvas mockups separately from the master poster.

Commit: `feat(marketing): add premium poster mockups`

# Milestone 7 — Desktop and Offline

## Sprint 31 — Offline Audit
Remove runtime network dependencies for existing venues and bundle/cache required assets.

Commit: `feat(offline): enable local venue generation`

## Sprint 32 — Desktop Packaging Strategy
Evaluate Tauri versus Electron, prefer the lighter secure option, and add a desktop shell without breaking the web build.

Commit: `feat(desktop): add cross-platform application shell`

## Sprint 33 — Dynamic Sport Addition
Detect unknown sport, confirm enrichment, append normalized records safely to the workbook, and make them immediately available offline.

Commit: `feat(database): add dynamic sport enrichment workflow`

# Milestone 8 — Quality and Release

## Sprint 34 — Error Handling and Recovery
Add professional, actionable states for catalogue, workbook, export, missing artwork, and unsupported formats.

Commit: `feat(quality): add resilient error handling`

## Sprint 35 — Accessibility Audit
Improve keyboard navigation, focus, labels, contrast, reduced motion, and screen-reader semantics.

Commit: `fix(a11y): improve studio accessibility`

## Sprint 36 — Performance Audit
Measure bundle size, reduce unnecessary rerenders, and lazy-load heavy preview/export features without reducing quality.

Commit: `perf(studio): optimize rendering and bundle usage`

## Sprint 37 — Test Coverage
Add tests for model normalization, style resolution, catalogue APIs, Studio smoke flow, and exports where practical.

Commit: `test(core): cover critical studio workflows`

## Sprint 38 — Visual QA
Test Monaco, Santiago Bernabéu, Eden Gardens, one iconic golf course, and one boxing arena across styles. Fix overlap, clipping, hierarchy, and data issues.

Commit: `fix(design): resolve visual qa findings`

## Sprint 39 — Release Candidate
Remove dead code and obsolete routes, confirm licenses, update README/CHANGELOG, and verify build/tests/offline/export behavior.

Commit: `chore(release): prepare isc studio 1.0 candidate`

## Sprint 40 — Version 1.0
Produce the release build and final report. Do not merge into `main` or tag a release without explicit user approval.

Commit: `release: isc studio 1.0`

# Final Quality Standard

The product is complete only when:

- the Studio feels like professional creative software;
- posters look premium and collectible;
- venue data comes from the workbook;
- artwork is vector-first;
- exports are honest and reliable;
- representative venues across sports render well;
- the build is clean;
- the architecture remains maintainable;
- a paying customer can use it without developer assistance.
