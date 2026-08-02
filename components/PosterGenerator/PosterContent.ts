export type PosterContentId = 'venueFacts' | 'venueMap' | 'countryFlag' | 'compassRose' | 'historicMoments' | 'collectorNumber';

export type PosterContentVisibility = Readonly<Record<PosterContentId, boolean>>;

export const defaultPosterContent: readonly PosterContentId[] = [
  'venueFacts',
  'venueMap',
  'countryFlag',
  'compassRose',
  'historicMoments',
  'collectorNumber',
];

export function resolvePosterContent(selected: readonly PosterContentId[] = defaultPosterContent): PosterContentVisibility {
  const enabled = new Set(selected);
  return {
    venueFacts: enabled.has('venueFacts'),
    venueMap: enabled.has('venueMap'),
    countryFlag: enabled.has('countryFlag'),
    compassRose: enabled.has('compassRose'),
    historicMoments: enabled.has('historicMoments'),
    collectorNumber: enabled.has('collectorNumber'),
  };
}
