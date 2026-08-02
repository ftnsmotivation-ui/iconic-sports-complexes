export type VenueMapKind = 'circuit' | 'stadium' | 'golf-course' | 'venue-outline';

export interface VenueCoordinates {
  lat: number;
  lng: number;
}

export interface VenueMapEngineProps {
  sport: string;
  venueName?: string;
  color: string;
  mutedColor: string;
  kind?: VenueMapKind;
  coordinates?: VenueCoordinates;
  showCompass?: boolean;
  showFrame?: boolean;
}

function inferMapKind(sport: string): VenueMapKind {
  const normalized = sport.toLowerCase();
  if (normalized.includes('formula') || normalized.includes('motor') || normalized.includes('racing')) return 'circuit';
  if (normalized.includes('golf')) return 'golf-course';
  if (normalized.includes('olympic') || normalized.includes('boxing')) return 'venue-outline';
  return 'stadium';
}

function formatCoordinates({ lat, lng }: VenueCoordinates): string {
  const latitude = `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'}`;
  const longitude = `${Math.abs(lng).toFixed(2)}°${lng >= 0 ? 'E' : 'W'}`;
  return `${latitude}  ${longitude}`;
}

function CircuitMap({ venueName, color }: { venueName: string; color: string }) {
  const isMonaco = /monaco/i.test(venueName);
  const path = isMonaco
    ? 'M-126 35C-151 7-138-31-99-39c38-8 56 25 91 15 31-9 45-53 79-57 35-4 45 29 72 40 31 13 63-15 91-2 27 13 20 47-8 60-31 15-59 5-73 35-13 28 17 49 4 72-15 26-51 12-73 31-22 19-4 48-30 61-29 14-52-14-80-10-29 4-44 34-74 31-29-3-37-34-58-48-25-16-59-15-79-39Z'
    : 'M-128 28C-145-23-102-70-49-63-12-58-1-85 38-75 77-66 73-28 107-9 36 20 32 69-8 80-42 12-66-21-99-10-35 11-73 5-88-38-12-35-6-59-1-72Z';

  return (
    <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      <path d={path} strokeWidth="13" opacity=".16" />
      <path d={path} strokeWidth="2.5" />
      <path d={path} strokeWidth=".75" strokeDasharray="4 6" opacity=".7" />
      <line x1={isMonaco ? -128 : -3} y1={isMonaco ? 25 : 69} x2={isMonaco ? -113 : -3} y2={isMonaco ? 43 : 82} strokeWidth="4" />
    </g>
  );
}

function StadiumPlan({ sport, color }: { sport: string; color: string }) {
  const normalized = sport.toLowerCase();
  if (normalized.includes('cricket')) {
    return <g fill="none" stroke={color} strokeWidth="2"><ellipse rx="125" ry="85"/><ellipse rx="109" ry="72" opacity=".55"/><rect x="-12" y="-62" width="24" height="124"/><path d="M-12-48h24M-12 48h24"/></g>;
  }
  if (normalized.includes('tennis')) {
    return <g fill="none" stroke={color} strokeWidth="2"><rect x="-132" y="-57" width="264" height="114"/><path d="M0-57v114M-79-57v114M79-57v114M-79 0h158"/></g>;
  }
  if (normalized.includes('rugby')) {
    return <g fill="none" stroke={color} strokeWidth="2"><rect x="-115" y="-70" width="230" height="140"/><path d="M0-70v140M-62-70v140M62-70v140" strokeDasharray="4 4"/><path d="M-108-48v96M108-48v96"/></g>;
  }
  return <g fill="none" stroke={color} strokeWidth="2"><rect x="-105" y="-70" width="210" height="140"/><path d="M0-70v140"/><circle r="28"/><path d="M-105-35h26v70h-26M105-35H79v70h26"/></g>;
}

function GolfCourseMap({ color }: { color: string }) {
  return (
    <g fill="none" stroke={color} strokeLinecap="round">
      <path d="M-128 62C-105 17-78-9-43-3-22 1-10 32 15 24 39 16 34-24 65-35 83-42 105-32 119-54" strokeWidth="34" opacity=".14"/>
      <path d="M-128 62C-105 17-78-9-43-3-22 1-10 32 15 24 39 16 34-24 65-35 83-42 105-32 119-54" strokeWidth="2.5"/>
      <ellipse cx="-126" cy="63" rx="16" ry="9"/><circle cx="119" cy="-54" r="8"/>
      <path d="M119-54v-36l28 10-28 10" fill={color}/>
      <path d="M-68 5l13 8M57-28l16 6" strokeWidth="7" opacity=".45"/>
    </g>
  );
}

function VenueOutline({ sport, color }: { sport: string; color: string }) {
  if (sport.toLowerCase().includes('boxing')) {
    return <g fill="none" stroke={color} strokeWidth="2"><rect x="-79" y="-79" width="158" height="158"/><rect x="-61" y="-61" width="122" height="122"/><circle cx="-79" cy="-79" r="7"/><circle cx="79" cy="-79" r="7"/><circle cx="-79" cy="79" r="7"/><circle cx="79" cy="79" r="7"/></g>;
  }
  const positions: readonly [number, number][] = [[-61, -13], [0, -13], [61, -13], [-30, 18], [30, 18]];
  return <g fill="none" stroke={color} strokeWidth="2">{positions.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="30"/>)}</g>;
}

export function CompassRose({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <g stroke={color} fill="none" strokeWidth="1.5">
      <circle r={size}/><path d={`M0-${size}V${size}M-${size} 0H${size}`}/>
      <path d={`M0-${size - 4}L4 0 0 ${size - 4}-4 0Z`} fill={color} stroke="none"/>
      <text x="0" y={-size - 5} textAnchor="middle" fontSize="10" fill={color} fontWeight="bold">N</text>
    </g>
  );
}

export function VenueMapEngine({ sport, venueName = '', color, mutedColor, kind, coordinates, showCompass = false, showFrame = true }: VenueMapEngineProps) {
  const mapKind = kind ?? inferMapKind(sport);
  return (
    <g data-venue-map-kind={mapKind}>
      {showFrame && <><circle r="165" fill="none" stroke={mutedColor}/><circle r="152" fill="none" stroke={mutedColor}/>{Array.from({ length: 24 }, (_, index) => { const angle = index * Math.PI / 12; return <line key={index} x1={Math.cos(angle) * 152} y1={Math.sin(angle) * 152} x2={Math.cos(angle) * 161} y2={Math.sin(angle) * 161} stroke={mutedColor}/>; })}</>}
      {mapKind === 'circuit' && (
        <CircuitMap venueName={venueName} color={color}/>
      )}
      {mapKind === 'stadium' && (
        <StadiumPlan sport={sport} color={color}/>
      )}
      {mapKind === 'golf-course' && (
        <GolfCourseMap color={color}/>
      )}
      {mapKind === 'venue-outline' && (
        <VenueOutline sport={sport} color={color}/>
      )}
      {showCompass && <g transform="translate(112 -104) scale(.72)"><CompassRose color={color}/></g>}
      {coordinates && <text y="132" textAnchor="middle" fill={mutedColor} fontSize="10" letterSpacing="2">{formatCoordinates(coordinates)}</text>}
    </g>
  );
}
