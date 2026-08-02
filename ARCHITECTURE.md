# ISC Studio Architecture

## Product Overview

Iconic Sports Complexes Studio generates premium collector posters of sporting venues using structured venue data, reusable design systems, vector illustration, and commercial export workflows.

## High-Level Data Flow

Excel Workbook
→ Repository Layer
→ API Routes
→ Studio Application State
→ Poster Model
→ Venue DNA
→ Visual Story Director
→ Variation Director
→ Layout + Composition Directors
→ Typography Director
→ Colour Director
→ Illustration Director
→ Collector Details Director
→ SVG Renderer
→ Export Engine

## Application Layers

### 1. Studio Interface

Responsible for:

- Sport selection
- Competition selection
- Venue selection
- Parameter selection
- Style selection
- Personalisation
- Preview controls
- Export controls

The Studio must not contain venue-specific facts that belong in the workbook.

### 2. Application State

Responsible for:

- Current sport
- Current competition
- Current venue
- Selected parameters
- Selected style
- Personalisation
- Output settings
- Loading and error states

### 3. Repository and API Layer

Responsible for:

- Reading the Excel workbook
- Discovering sports
- Loading competitions
- Loading venues
- Returning structured venue records
- Keeping database knowledge out of the UI

### 4. Poster Model

Responsible for converting database records and user selections into one normalized object suitable for rendering.

### 5. Venue DNA

Responsible for high-level artistic characteristics such as:

- Mood
- Primary style
- Colour palette
- Hero focus
- Information density
- Illustration priority
- Preferred layouts
- Signature elements

### 6. Directors

Directors make design decisions.

The collector design engine uses a staged decision graph:

- The Visual Story Director translates Venue DNA into narrative emphasis, lighting, density, map affinity, and typographic tone.
- The Variation Director deterministically selects one of several premium art-direction strategies from a venue and edition key.
- The Layout Director supplies structural bounds; the Composition Director decides hero dominance, title scale and alignment, visual weight, negative space, information density, and map prominence.
- The Typography Director derives title line breaks, scale, tracking, leading, hierarchy, and breathing room from the composition and story.
- The Colour Director promotes the Venue DNA palette into semantic roles used by artwork treatment, type, rules, maps, borders, and paper.
- The Collector Details Director supplies reusable edition marks, fine rules, borders, mastheads, and micro-typography.
- The Illustration Director selects the vector artwork strategy independently of editorial layout.

Both the live React preview and standalone SVG export consume these same plans. Renderers draw the resolved plans and must not contain venue-name layout or typography branches.

Variation keys are deterministic. `primary`, `alternate`, and `archive` can produce distinct editions of one venue without storing hand-tuned layouts or making export output unstable.

Renderers should not make editorial decisions that belong to directors.

### 7. Rendering Layer

Responsible for producing the visual artwork.

Current areas include:

- SVG canvas
- Background
- Header
- Hero
- Map
- Information
- Collector strip
- Illustration components

The rendering layer must remain vector-first.

### 8. Illustration System

Responsible for venue artwork.

It may include:

- Venue-specific master illustrations
- Sport-specific illustration systems
- Shared architectural components
- Maps
- Elevation profiles
- Decorative atlas elements

Recognisable quality is more important than premature reuse.

### 9. Export Engine

Planned responsibilities:

- PDF
- SVG
- EPS
- PNG
- JPEG
- TIFF
- ISO sizes
- Imperial sizes
- Custom dimensions
- DPI selection
- RGB and CMYK
- Bleed
- Crop marks
- Safe margins
- ICC profiles

### 10. Publishing Packages

Planned outputs:

- Print package
- Etsy package
- Social package
- Website package
- Marketing mockups
- Metadata package

## Current Status

### Working

- Excel-backed venue catalogue
- Sport, competition, and venue APIs
- Studio preview workspace
- Live venue loading
- Poster rendering components
- SVG poster engine
- Venue DNA system
- Layout system
- Typography system
- Initial illustration system

### In Development

- Professional ISC Studio component architecture
- Premium venue illustrations
- Style preview cards
- Parameter-driven rendering
- Export system
- Responsive workspace

### Future

- Batch generation
- Template management
- Marketplace automation
- AI Art Director
- Asset library
- Offline desktop packaging
- Cloud synchronization

## Structural Direction

The Studio interface should gradually move toward focused components such as:

components/Studio/
- StudioShell.tsx
- StudioHeader.tsx
- VenueControls.tsx
- StyleControls.tsx
- PreviewCanvas.tsx
- Inspector.tsx
- OutputControls.tsx
- StatusBar.tsx

Avoid allowing app/studio-preview/page.tsx to become a permanent oversized component.

## Non-Negotiable Principles

- Excel remains the single source of venue data.
- Poster artwork remains vector-first.
- Renderers draw; directors decide.
- The artwork is always the hero of the interface.
- Commercial print quality is mandatory.
- The Monaco reference defines ambition, not a template to copy.
- No shortcuts that make future expansion harder.
