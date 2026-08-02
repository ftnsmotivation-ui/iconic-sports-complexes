'use client';

import { getSportParams } from '@/lib/sportParameters';
import { CompassRose, VenueMapEngine } from './VenueMapEngine';

export interface PersonalisationData {
  enabled: boolean;
  date?: string;
  occasion?: string;
  stand?: string;
  seat?: string;
  notes?: string;
}

interface PosterDisplayProps {
  sport: string;
  venueName: string;
  competition: string;
  city: string;
  country: string;
  countryFlag?: string;
  opened: number;
  capacity: number;
  architect?: string;
  surface?: string;
  nickname?: string;
  famousFor?: string;
  iconicMoments?: string;
  signatureQuote?: string;
  quoteAttribution?: string;
  coordinates?: { lat: number; lng: number };
  collectorNumber?: number;
  styleId?: 'blueprint' | 'graphite' | 'verdant';
  selectedParameters: string[];
  personalisation?: PersonalisationData;
  sportFields?: Record<string, unknown>;
}

interface StyleTheme {
  name: string;
  bgFrom: string;
  bgTo: string;
  ink: string; // primary text — venue name, values
  accent: string; // gold/primary decorative — labels, borders, wreath
  pop: string; // secondary contrast colour — tagline, competition banner
  muted: string; // subdued rules, map lines, quiet captions
  fontFamily: string;
  taglineFont: string;
}

// Generic "serif" falls back to whatever the rendering engine considers
// default serif (often a thin, dated-looking face). Georgia has much better
// proportions and weight for a premium display poster, with safe fallbacks.
const PREMIUM_SERIF = "Georgia, 'Times New Roman', Times, serif";

export const STYLE_THEMES: Record<'blueprint' | 'graphite' | 'verdant', StyleTheme> = {
  blueprint: {
    name: 'Blueprint Atlas',
    bgFrom: '#132a4a',
    bgTo: '#0a1626',
    ink: '#f2ede0',
    accent: '#d4af37',
    pop: '#c0483a',
    muted: '#5b7ca3',
    fontFamily: '"Courier New", monospace',
    taglineFont: PREMIUM_SERIF,
  },
  graphite: {
    name: 'Graphite Museum',
    bgFrom: '#3a3a3a',
    bgTo: '#1c1c1c',
    ink: '#f5f1e8',
    accent: '#c9a961',
    pop: '#8a2e2e',
    muted: '#8a8a8a',
    fontFamily: PREMIUM_SERIF,
    taglineFont: PREMIUM_SERIF,
  },
  verdant: {
    name: 'Verdant Club',
    bgFrom: '#1c3324',
    bgTo: '#0d1a12',
    ink: '#f3ead9',
    accent: '#c9a961',
    pop: '#a13a3a',
    muted: '#5f7a5f',
    fontFamily: PREMIUM_SERIF,
    taglineFont: PREMIUM_SERIF,
  },
};

function fitFontSize(text: string, maxWidth: number, max: number, min: number) {
  const size = maxWidth / (text.length * 0.52);
  return Math.max(min, Math.min(max, size));
}

function splitList(value: string): string[] {
  return value.split(/[|,]/).map((p) => p.trim()).filter(Boolean);
}

function truncate(value: string, max: number): string {
  return value.length > max ? value.slice(0, max - 1) + '…' : value;
}

// Procedural laurel branch: soft, rounded, overlapping leaves alternating
// either side of a smoothly curved stem, gently tapering from base to tip —
// a braided laurel rope, not a row of separate scattered marks.
const LAUREL_LEAF_COUNT = 14;

function buildLaurelPoints() {
  const points: { x: number; y: number; angle: number; t: number }[] = [];
  for (let i = 0; i <= LAUREL_LEAF_COUNT; i++) {
    const t = i / LAUREL_LEAF_COUNT;
    const angle = ((14 + t * 98) * Math.PI) / 180; // sweep ~14°→112°
    const radius = 10 + t * 76;
    points.push({ x: -radius * Math.cos(angle), y: 26 - radius * Math.sin(angle), angle, t });
  }
  return points;
}

function LaurelBranch({ color, mirror }: { color: string; mirror?: boolean }) {
  const points = buildLaurelPoints();

  let stemPath = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    stemPath += ` Q ${points[i - 1].x.toFixed(1)} ${points[i - 1].y.toFixed(1)}, ${points[i].x.toFixed(1)} ${points[i].y.toFixed(1)}`;
  }

  const leaves = points.slice(1).map((p, idx) => {
    const i = idx + 1;
    const side = i % 2 === 0 ? 1 : -1;
    const scale = 1.0 - p.t * 0.3; // gentle, near-uniform taper
    const leafLen = 15 * scale;
    const leafWide = 9.5 * scale; // wide relative to length: soft oval, not a needle
    const rotationDeg = (p.angle * 180) / Math.PI - 90 + side * 24;
    return { x: p.x, y: p.y, rotationDeg, leafLen, leafWide };
  });

  return (
    <g transform={mirror ? 'scale(-1,1)' : undefined}>
      <path d={stemPath} fill="none" stroke={color} strokeWidth="2" opacity="0.85" strokeLinecap="round" />
      {leaves.map((l, i) => {
        const half = l.leafLen / 2;
        const ctrl = half * 0.5;
        const w = l.leafWide;
        return (
          <g key={i} transform={`translate(${l.x.toFixed(1)}, ${l.y.toFixed(1)}) rotate(${l.rotationDeg.toFixed(1)})`}>
            <path
              d={`M 0 ${(-half).toFixed(1)} C ${w.toFixed(1)} ${(-ctrl).toFixed(1)}, ${w.toFixed(1)} ${ctrl.toFixed(1)}, 0 ${half.toFixed(1)} C ${(-w).toFixed(1)} ${ctrl.toFixed(1)}, ${(-w).toFixed(1)} ${(-ctrl).toFixed(1)}, 0 ${(-half).toFixed(1)} Z`}
              fill={color}
            />
            <path
              d={`M 0 ${(-half).toFixed(1)} C ${w.toFixed(1)} ${(-ctrl).toFixed(1)}, ${w.toFixed(1)} ${ctrl.toFixed(1)}, 0 ${half.toFixed(1)} Z`}
              fill="#000000"
              opacity="0.3"
            />
            <line x1="0" y1={(-half + 1.5).toFixed(1)} x2="0" y2={(half - 1.5).toFixed(1)} stroke="#000000" strokeWidth="0.6" opacity="0.45" />
          </g>
        );
      })}
    </g>
  );
}

type IconType = 'calendar' | 'people' | 'pin' | 'ruler' | 'trophy' | 'tag' | 'star' | 'building';

function FactIcon({ type, color }: { type: IconType; color: string }) {
  switch (type) {
    case 'calendar':
      return (
        <g stroke={color} fill="none" strokeWidth="1.3">
          <rect x="-7" y="-6" width="14" height="12" rx="1.5" />
          <line x1="-7" y1="-2" x2="7" y2="-2" />
          <line x1="-3.5" y1="-8" x2="-3.5" y2="-6" />
          <line x1="3.5" y1="-8" x2="3.5" y2="-6" />
        </g>
      );
    case 'people':
      return (
        <g fill={color}>
          <circle cx="0" cy="-4" r="3" />
          <path d="M -6 6 Q -6 -1 0 -1 Q 6 -1 6 6 Z" />
        </g>
      );
    case 'pin':
      return (
        <path
          d="M 0 -7 C 4 -7 7 -4 7 -0.5 C 7 4.5 0 8 0 8 C 0 8 -7 4.5 -7 -0.5 C -7 -4 -4 -7 0 -7 Z"
          fill={color}
        />
      );
    case 'ruler':
      return (
        <g stroke={color} fill="none" strokeWidth="1.3">
          <rect x="-8" y="-3" width="16" height="6" />
          <line x1="-4" y1="-3" x2="-4" y2="0" />
          <line x1="0" y1="-3" x2="0" y2="0.5" />
          <line x1="4" y1="-3" x2="4" y2="0" />
        </g>
      );
    case 'trophy':
      return (
        <g fill={color}>
          <path d="M -5 -6 L 5 -6 L 4 2 Q 4 5 0 5 Q -4 5 -4 2 Z" />
          <rect x="-3" y="5" width="6" height="2" />
          <rect x="-1.5" y="7" width="3" height="1.5" />
        </g>
      );
    case 'tag':
      return <path d="M -6 -4 L 2 -4 L 6 0 L 2 4 L -6 4 Z" fill={color} />;
    case 'building':
      return (
        <g stroke={color} fill="none" strokeWidth="1.3">
          <rect x="-6" y="-8" width="12" height="16" />
          <line x1="-3" y1="-5" x2="-3" y2="-5.5" />
          <line x1="0" y1="-5" x2="0" y2="-5.5" />
          <line x1="3" y1="-5" x2="3" y2="-5.5" />
          <line x1="-3" y1="-1" x2="-3" y2="-1.5" />
          <line x1="0" y1="-1" x2="0" y2="-1.5" />
          <line x1="3" y1="-1" x2="3" y2="-1.5" />
        </g>
      );
    case 'star':
    default:
      return (
        <g fill={color}>
          <path d="M 0 -7 L 1.6 -1.6 L 7 0 L 1.6 1.6 L 0 7 L -1.6 1.6 L -7 0 L -1.6 -1.6 Z" />
        </g>
      );
  }
}

function FactRow({
  x,
  y,
  icon,
  label,
  value,
  theme,
}: {
  x: number;
  y: number;
  icon: IconType;
  label: string;
  value: string;
  theme: StyleTheme;
}) {
  return (
    <g>
      <g transform={`translate(${x}, ${y - 4})`}>
        <FactIcon type={icon} color={theme.accent} />
      </g>
      <text x={x + 14} y={y} fontSize="12">
        <tspan fill={theme.accent} fontWeight="bold" letterSpacing="0.5">
          {label}{' '}
        </tspan>
        <tspan fill={theme.ink}>{value}</tspan>
      </text>
    </g>
  );
}

// Ribbon-banner shape: flat top and sides, shallow inward notch cut into the
// bottom edge (a simple pennant/ticket silhouette), used for the country and
// since-year corner banners.
function RibbonBanner({
  x,
  y,
  width,
  height,
  theme,
  topLabel,
  mainLabel,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  theme: StyleTheme;
  topLabel: string;
  mainLabel: string;
}) {
  const notch = 12;
  const path = `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x + width / 2} ${y + height - notch} L ${x} ${y + height} Z`;
  const fitSize = fitFontSize(mainLabel, width - 16, 15, 9);
  return (
    <g>
      <path d={path} fill="none" stroke={theme.accent} strokeWidth="1.5" />
      <text x={x + width / 2} y={y + 18} textAnchor="middle" fontSize="8" fill={theme.muted} letterSpacing="2">
        {topLabel.toUpperCase()}
      </text>
      <text
        x={x + width / 2}
        y={y + 38}
        textAnchor="middle"
        fontSize={fitSize}
        fontWeight="bold"
        fill={theme.ink}
        fontFamily={PREMIUM_SERIF}
      >
        {truncate(mainLabel, 16)}
      </text>
    </g>
  );
}

export default function PosterDisplay({
  sport,
  venueName,
  competition,
  city,
  country,
  countryFlag,
  opened,
  capacity,
  architect,
  surface,
  nickname,
  famousFor,
  iconicMoments,
  signatureQuote,
  quoteAttribution,
  coordinates,
  collectorNumber,
  styleId = 'blueprint',
  selectedParameters,
  personalisation,
  sportFields,
}: PosterDisplayProps) {
  const theme = STYLE_THEMES[styleId];
  const has = (id: string) => selectedParameters.includes(id);

  const venueFontSize = fitFontSize(venueName, 660, 54, 22);

  // The laurel-wrapped competition label sits between two fixed-position
  // wreath branches — shrink font/letter-spacing together so long names
  // never run into the leaves.
  const compLabel = competition.toUpperCase();
  const compLetterSpacing = 2;
  const compFontSize = Math.max(
    8,
    Math.min(14, (170 / compLabel.length - compLetterSpacing) / 0.58)
  );

  const tagline = has('nickname') && nickname ? nickname : undefined;
  const showCity = has('city') && Boolean(city);
  const showCountryLine = has('country') && Boolean(country);
  const showCollector = has('collectorNumber') && collectorNumber;
  const showPersonalisation = Boolean(personalisation?.enabled);
  const showQuote = has('signatureQuote') && Boolean(signatureQuote);

  const famousForItems = famousFor ? splitList(famousFor) : [];
  const iconicMomentItems = iconicMoments ? splitList(iconicMoments) : [];

  const sportFacts = getSportParams(sport)
    .filter((p) => has(p.id) && sportFields?.[p.id] !== undefined && sportFields[p.id] !== null && sportFields[p.id] !== '')
    .map((p) => ({ label: p.label.toUpperCase(), value: truncate(String(sportFields![p.id]), 30) }));

  // --- Footer: fixed-height 3-column fact panel -----------------------------
  const FOOTER_TOP = 790;
  const FOOTER_HEIGHT = 260;
  const FOOTER_BOTTOM = FOOTER_TOP + FOOTER_HEIGHT;
  const COL_ROW_HEIGHT = 30;
  const COL1_X = 65;
  const COL2_X = 305;
  const COL3_X = 545;
  const COL_DIV1_X = 285;
  const COL_DIV2_X = 525;
  const HEADER_Y = FOOTER_TOP + 26;
  const ROWS_START_Y = FOOTER_TOP + 54;

  const venueFactRows: { icon: IconType; label: string; value: string }[] = [];
  if (has('opened')) venueFactRows.push({ icon: 'calendar', label: 'OPENED', value: String(opened) });
  if (has('capacity')) venueFactRows.push({ icon: 'people', label: 'CAPACITY', value: capacity.toLocaleString() });
  if (has('coordinates') && coordinates) {
    venueFactRows.push({
      icon: 'pin',
      label: 'COORDS',
      value: `${Math.abs(coordinates.lat).toFixed(2)}°${coordinates.lat >= 0 ? 'N' : 'S'} ${Math.abs(coordinates.lng).toFixed(2)}°${coordinates.lng >= 0 ? 'E' : 'W'}`,
    });
  }
  if (has('surface') && surface) venueFactRows.push({ icon: 'ruler', label: 'SURFACE', value: surface });

  const momentFactRows: { icon: IconType; label: string; value: string }[] = [];
  if (has('iconicMoments')) {
    iconicMomentItems.slice(0, 2).forEach((item) => {
      momentFactRows.push({ icon: 'star', label: '', value: truncate(item, 30) });
    });
  }
  sportFacts.slice(0, 2).forEach((f) => {
    momentFactRows.push({ icon: 'tag', label: f.label, value: f.value });
  });

  const quickFactRows: { icon: IconType; label: string; value: string }[] = [];
  if (has('competition')) quickFactRows.push({ icon: 'trophy', label: 'COMPETITION', value: truncate(competition, 26) });
  if (has('famousFor') && famousForItems[0]) quickFactRows.push({ icon: 'tag', label: 'FAMOUS FOR', value: truncate(famousForItems[0], 26) });
  if (has('architect') && architect) quickFactRows.push({ icon: 'building', label: 'ARCHITECT', value: truncate(architect, 26) });

  // --- Upper content: single flexible cursor, kept clear of the fixed footer -
  let y = 500;
  const yVenueName = y;
  y += 32;
  const yTagline = tagline ? (y += 28, y) : null;
  const yCity = showCity ? (y += tagline ? 30 : 34, y) : null;
  const yCountry = showCountryLine ? (y += showCity ? 22 : 30, y) : null;
  y += 20;
  const yDivider1 = y;

  let yQuote: number | null = null;
  if (showQuote) {
    y += 26;
    yQuote = y;
    y += 54;
  }

  let yPersonal: number | null = null;
  if (showPersonalisation) {
    y += 20;
    yPersonal = y;
    y += 96;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg
        viewBox="0 0 800 1100"
        className="w-full border-8"
        style={{ backgroundColor: theme.bgTo, borderColor: theme.accent }}
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.bgFrom} />
            <stop offset="100%" stopColor={theme.bgTo} />
          </linearGradient>
          <radialGradient id="mapVignette" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor={theme.bgFrom} stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </radialGradient>
          <pattern id="hairlinePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="40" x2="40" y2="0" stroke={theme.accent} strokeWidth="0.5" opacity="0.06" />
          </pattern>
          <filter id="textDepth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        <rect width="800" height="1100" fill="url(#bgGradient)" />

        <rect width="800" height="1100" fill="url(#hairlinePattern)" />
        <circle cx="400" cy="290" r="220" fill="url(#mapVignette)" />

        <rect x="0" y="0" width="800" height="1100" fill="none" stroke={theme.accent} strokeWidth="3" />
        <rect x="10" y="10" width="780" height="1080" fill="none" stroke={theme.bgTo} strokeWidth="2" />
        <rect x="24" y="24" width="752" height="1052" fill="none" stroke={theme.accent} strokeWidth="1" opacity="0.6" />

        {/* Corner ornaments */}
        {[[46, 46], [754, 46], [46, 1054], [754, 1054]].map(([cx, cy], i) => (
          <rect
            key={i}
            x={cx - 5}
            y={cy - 5}
            width="10"
            height="10"
            fill="none"
            stroke={theme.accent}
            strokeWidth="1.5"
            transform={`rotate(45 ${cx} ${cy})`}
          />
        ))}

        {/* Country + since-year ribbon banners */}
        {has('country') && country && (
          <RibbonBanner x={50} y={40} width={110} height={62} theme={theme} topLabel="Country" mainLabel={country} />
        )}
        {has('opened') && (
          <RibbonBanner x={640} y={40} width={110} height={62} theme={theme} topLabel="Since" mainLabel={String(opened)} />
        )}

        {/* Laurel-wrapped competition badge — branches sit at a fixed offset,
            so the label shrinks (with letter-spacing accounted for) to
            never run into the leaves regardless of competition name length. */}
        <g transform="translate(400, 78)">
          <g transform="translate(-100, 0)">
            <LaurelBranch color={theme.accent} />
          </g>
          <g transform="translate(100, 0)">
            <LaurelBranch color={theme.accent} mirror />
          </g>
          <text
            textAnchor="middle"
            fontSize={compFontSize}
            fontWeight="bold"
            fill={theme.accent}
            letterSpacing={compLetterSpacing}
            fontFamily={theme.fontFamily}
          >
            {compLabel}
          </text>
        </g>

        {has('compassRose') && (
          <g transform="translate(645, 155)">
            <CompassRose color={theme.accent} />
          </g>
        )}

        {has('venueMap') && (
          <g transform="translate(400, 290)">
            <VenueMapEngine sport={sport} venueName={venueName} color={theme.accent} mutedColor={theme.muted} coordinates={coordinates} />
          </g>
        )}

        {has('venueName') && (
          <text
            x="400"
            y={yVenueName}
            textAnchor="middle"
            fontSize={venueFontSize}
            fontWeight="bold"
            fill={theme.ink}
            fontFamily={PREMIUM_SERIF}
            filter="url(#textDepth)"
          >
            {venueName}
          </text>
        )}

        {yTagline && (
          <text
            x="400"
            y={yTagline}
            textAnchor="middle"
            fontSize="17"
            fill={theme.accent}
            fontStyle="italic"
            fontFamily={theme.taglineFont}
          >
            {tagline}
          </text>
        )}

        {yCity && (
          <text
            x="400"
            y={yCity}
            textAnchor="middle"
            fontSize="21"
            fontWeight="bold"
            fill={theme.pop}
            letterSpacing="2"
            fontFamily={PREMIUM_SERIF}
          >
            {city.toUpperCase()}
          </text>
        )}

        {yCountry && (
          <text
            x="400"
            y={yCountry}
            textAnchor="middle"
            fontSize="12"
            fill={theme.accent}
            letterSpacing="3"
            fontFamily={theme.fontFamily}
          >
            {country.toUpperCase()}
          </text>
        )}

        <line x1="90" y1={yDivider1} x2="710" y2={yDivider1} stroke={theme.muted} strokeWidth="1" />

        {yQuote && signatureQuote && (
          <g>
            <text x="400" y={yQuote} textAnchor="middle" fontSize="14" fill={theme.ink} fontStyle="italic" fontFamily={theme.taglineFont}>
              &ldquo;{truncate(signatureQuote, 56)}&rdquo;
            </text>
            {quoteAttribution && (
              <text x="400" y={yQuote + 22} textAnchor="middle" fontSize="11" fill={theme.muted} letterSpacing="1">
                — {quoteAttribution}
              </text>
            )}
          </g>
        )}

        {yPersonal && (
          <g>
            <rect x="90" y={yPersonal - 22} width="620" height="108" fill="none" stroke={theme.muted} strokeWidth="1" rx="4" />
            <text x="400" y={yPersonal} textAnchor="middle" fontSize="11" fontWeight="bold" fill={theme.accent} letterSpacing="3">
              I WAS THERE
            </text>
            {(personalisation?.occasion || personalisation?.stand || personalisation?.seat) && (
              <text x="400" y={yPersonal + 26} textAnchor="middle" fontSize="13" fill={theme.ink}>
                {[
                  personalisation?.occasion && `Occasion: ${personalisation.occasion}`,
                  personalisation?.stand && `Stand: ${personalisation.stand}`,
                  personalisation?.seat && `Seat: ${personalisation.seat}`,
                ].filter(Boolean).join('   ·   ')}
              </text>
            )}
            {personalisation?.date && (
              <text x="400" y={yPersonal + 48} textAnchor="middle" fontSize="12" fill={theme.muted}>
                {personalisation.date}
              </text>
            )}
            {personalisation?.notes && (
              <text x="400" y={yPersonal + 70} textAnchor="middle" fontSize="11" fill={theme.muted}>
                {truncate(personalisation.notes, 80)}
              </text>
            )}
          </g>
        )}

        {/* Fixed-height 3-column fact footer */}
        <rect x="40" y={FOOTER_TOP} width="720" height={FOOTER_HEIGHT} fill="none" stroke={theme.muted} strokeWidth="1" />
        <line x1={COL_DIV1_X} y1={FOOTER_TOP} x2={COL_DIV1_X} y2={FOOTER_BOTTOM} stroke={theme.muted} strokeWidth="1" />
        <line x1={COL_DIV2_X} y1={FOOTER_TOP} x2={COL_DIV2_X} y2={FOOTER_BOTTOM} stroke={theme.muted} strokeWidth="1" />

        <text x={COL1_X} y={HEADER_Y} fontSize="12" fontWeight="bold" fill={theme.accent} letterSpacing="2">VENUE FACTS</text>
        <text x={COL2_X} y={HEADER_Y} fontSize="12" fontWeight="bold" fill={theme.accent} letterSpacing="2">MOMENTS &amp; FACTS</text>
        <text x={COL3_X} y={HEADER_Y} fontSize="12" fontWeight="bold" fill={theme.accent} letterSpacing="2">QUICK FACTS</text>

        {venueFactRows.slice(0, 6).map((row, i) => (
          <FactRow key={i} x={COL1_X} y={ROWS_START_Y + i * COL_ROW_HEIGHT} icon={row.icon} label={row.label} value={row.value} theme={theme} />
        ))}
        {momentFactRows.slice(0, 6).map((row, i) => (
          <FactRow key={i} x={COL2_X} y={ROWS_START_Y + i * COL_ROW_HEIGHT} icon={row.icon} label={row.label} value={row.value} theme={theme} />
        ))}
        {quickFactRows.slice(0, 6).map((row, i) => (
          <FactRow key={i} x={COL3_X} y={ROWS_START_Y + i * COL_ROW_HEIGHT} icon={row.icon} label={row.label} value={row.value} theme={theme} />
        ))}

        {/* Bottom tagline banner */}
        <rect x="40" y="1058" width="720" height="26" fill={theme.pop} />
        <text x="400" y="1075" textAnchor="middle" fontSize="11" fill={theme.ink} letterSpacing="3" fontFamily={theme.fontFamily}>
          &#9670;&#160;&#160;ICONIC SPORTS COMPLEXES&#160;&#160;&#9670;
        </text>
        {showCollector && (
          <text x="740" y="1075" textAnchor="end" fontSize="10" fill={theme.ink} opacity="0.85" fontFamily={theme.fontFamily}>
            No. {String(collectorNumber).padStart(3, '0')}/500
          </text>
        )}
      </svg>
    </div>
  );
}
