# ISC Studio AI Development Guide

## Project

Iconic Sports Complexes Studio (ISC Studio) is a professional cross-platform application for generating museum-quality collector posters of iconic sporting venues.

The application must support commercial printing, fine-art printing, Etsy digital downloads, social media marketing, website previews, mockups, and metadata packages.

## Product Standard

Every generated poster must feel professionally designed rather than AI-generated.

The Monaco Grand Prix reference poster defines the desired level of quality, balance, elegance, typography, and information density. It is inspiration only and must never be copied.

The final benchmark is simple:

Would a collector proudly frame this poster?

## Design Language

ISC Studio draws inspiration from:

- Art Deco
- Luxury editorial design
- Swiss typography
- Vintage travel posters
- National Geographic atlas layouts
- Premium collector prints
- Museum exhibition posters

Artwork must remain restrained, balanced, legible, and collectible.

## Architectural Principles

Maintain clear separation between:

1. User interface
2. Application state
3. Database and repositories
4. Poster model
5. Venue DNA
6. Layout selection
7. Typography
8. Illustration
9. Rendering
10. Export

Renderers draw.

Directors decide.

Repositories provide data.

The Excel workbook is the single source of truth for venue information.

## Vector-First Policy

All master artwork must be vector-first.

- Typography remains vector.
- Maps remain vector.
- Icons remain vector.
- Borders remain vector.
- Decorative elements remain vector.
- Raster exports are generated only from the vector master.

## Code Quality

- Use TypeScript strictly.
- Prefer focused components and functions.
- Avoid duplicate logic.
- Avoid hardcoded venue data.
- Avoid magic numbers where configuration is appropriate.
- Prefer composition over oversized components.
- Preserve existing APIs unless a deliberate migration is approved.
- Do not introduce unnecessary dependencies.
- Do not hide build errors.
- Do not weaken types merely to make compilation pass.

## UI Principles

ISC Studio must feel like professional creative software.

- The artwork is the visual focus.
- Controls must not compete with the poster.
- Use generous spacing.
- Maintain consistent visual hierarchy.
- Keep workflows understandable to non-technical users.
- Prefer live preview where practical.
- Support responsive desktop and web layouts.

## Database Rules

The Excel workbook is the authoritative venue database.

- Each worksheet represents a sport.
- Each row represents a venue.
- Each column represents a poster parameter.
- Do not duplicate workbook data in application code.
- New parameters must be supportable without redesigning the architecture.
- Existing venues must remain usable offline.

## Build Policy

Before finishing any implementation:

1. Run npm run build.
2. Fix every TypeScript error.
3. Preserve working features.
4. Summarize all changed files.
5. Explain any architectural decision briefly.
6. Do not commit or push unless explicitly instructed.

## Working Method

Before making large changes:

1. Inspect the repository.
2. Explain the intended approach.
3. Identify affected files.
4. Implement in coherent batches.
5. Build and test.
6. Report results honestly.

## Commercial Mission

Build the finest sporting-venue poster studio possible: elegant, scalable, maintainable, commercially useful, and worthy of museum-quality output.
