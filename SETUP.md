# Setup & Deployment Guide

## Local Development Setup

### Prerequisites
- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** 9+ (included with Node.js)
- **Git** ([download](https://git-scm.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/iconic-sports-complexes.git
cd iconic-sports-complexes

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env.local
```

### Running Locally

```bash
# Development server (with hot reload)
npm run dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run linter
npm run lint

# Type check
npm run type-check
```

## Database Management

### Adding a New Sport

1. Open `public/databases/iconic-venues.xlsx`
2. Create a new worksheet with the sport name
3. Add venues following the column structure
4. Save the file
5. Restart the development server

### Database Schema Columns

Required:
- sport, competition, venueName, city, country
- opened, capacity, lat, lng

Recommended:
- architect, surface, nickname, famousFor
- iconicMoments, notableEvents, collectorNumber

## Docker Deployment

### Build Docker Image

```bash
docker build -t iconic-sports-complexes:latest .
docker run -p 3000:3000 iconic-sports-complexes:latest
```

## Vercel Deployment

### One-Click Deploy

1. Push code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import the GitHub repository
4. Configure environment variables
5. Click Deploy

### Manual Deployment

```bash
npm install -g vercel
vercel --prod
```

## GitHub Actions (CI/CD)

Automated tests and builds on:
- Pull requests
- Merges to main
- Tagged releases

See `.github/workflows/` for configuration.

## Troubleshooting

### Port Already in Use

```bash
npm run dev -- -p 3001
```

### Database File Not Found

```bash
# Ensure the Excel file exists:
ls public/databases/iconic-venues.xlsx
```

### TypeScript Errors

```bash
rm -rf .next
npm run build
```

## Deployment Checklist

- [ ] Code reviewed and merged to main
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Production build tested locally
- [ ] Deployment platform configured
- [ ] DNS/domain setup complete
- [ ] Monitoring configured
- [ ] Documentation updated

## Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
