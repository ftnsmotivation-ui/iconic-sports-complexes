# Iconic Sports Complexes - Museum Quality Poster Generator

A professional cross-platform web application for generating museum-quality, premium sporting venue posters suitable for commercial printing, fine art galleries, and online marketplaces like Etsy.

## 🎨 Features

- **Sport Selection**: Curated list of major sports with custom sport entry
- **Smart Database Management**: Excel-based offline database with automatic updates
- **Multiple Venue Parameters**: 30+ customizable poster elements
- **AI-Powered Design**: Museum-quality layouts with intelligent typography and composition
- **Multiple Export Formats**: 
  - Vector: PDF, SVG, EPS
  - Raster: PNG, JPEG, TIFF
- **Professional Print Options**:
  - Multiple paper sizes (A0-A6, Imperial)
  - Adjustable resolution (150-600 DPI)
  - CMYK/RGB color modes
  - Bleed, crop marks, and safe margins
- **One-Click Publishing**:
  - Print package
  - Marketplace package (Etsy-ready)
  - Social media package
  - Marketing mockups
  - Metadata generation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/iconic-sports-complexes.git
cd iconic-sports-complexes

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📊 Supported Sports

### Preset Sports
- Formula 1
- Football Stadiums
- Cricket Grounds
- Tennis Venues
- Golf Courses
- Rugby Stadiums
- Olympic Venues
- Boxing Arenas

### Custom Sports
Add any sport dynamically (Swimming, Badminton, Baseball, Basketball, etc.)

## 🗂️ Project Structure

```
iconic-sports-complexes/
├── app/
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main workflow
│   └── globals.css        # Global styles
├── components/
│   ├── SportSelection/    # Sport selector
│   ├── CompetitionSelection/
│   ├── VenueSelection/
│   ├── ParameterSelection/
│   ├── StyleSelection/
│   ├── Preview/
│   └── Export/
├── lib/
│   ├── types/             # TypeScript interfaces
│   ├── database/          # Excel handling
│   └── poster/            # Generation engine
├── public/
│   └── databases/         # Excel data files
└── package.json
```

## 🎭 Workflow

1. **Sport Selection** - Choose from presets or add custom sport
2. **Competition Selection** - Pick competition for the sport
3. **Venue Selection** - Choose specific venue
4. **Parameters Selection** - Select poster elements (30+)
5. **Style Selection** - AI generates 3 design concepts
6. **Preview** - Review poster with frame options
7. **Generate** - Create final artwork
8. **Export** - Multiple formats and sizes

## 📦 Export Options

### Sizes: A0-A6, 11×14 to 30×40, Custom
### Resolutions: 150, 300, 600 DPI
### Formats: PDF, SVG, EPS, PNG, JPEG, TIFF
### Print: CMYK/RGB, Bleed, Crop Marks, ICC Profile

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.
