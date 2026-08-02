import type { CollectorDetailsPlan } from './CollectorDetailsDirector';
import type { PosterColourSystem } from './PosterColourDirector';
import { formatPosterCoordinates, type PosterCompositionPlan } from './PosterCompositionDirector';
import type { PosterModel } from './PosterModel';
import type { PosterTypographySystem } from './PosterTypographyDirector';
import { VenueMapEngine } from './VenueMapEngine';

interface CollectorInformationZoneProps {
  model: PosterModel;
  colours: PosterColourSystem;
  typography: PosterTypographySystem;
  composition: PosterCompositionPlan;
  details: CollectorDetailsPlan;
  contentInset: number;
}

export default function CollectorInformationZone({ model, colours, typography, composition, details, contentInset }: CollectorInformationZoneProps) {
  const coordinates = formatPosterCoordinates(model.identity.coordinates);
  const mapWidth = composition.mapProminence === 'feature' ? 218 : composition.mapProminence === 'balanced' ? 184 : 146;
  const facts = [
    ['Opened', model.facts.opened],
    ['Capacity', model.facts.capacity],
    ...(model.content.collectorNumber ? [['Edition', `${model.collector.number} / 500`]] : []),
  ];

  return (
    <div style={{ position: 'absolute', left: contentInset, right: contentInset, top: composition.lowerPanelTop, bottom: 51, display: 'grid', gridTemplateRows: '2px auto 1fr auto' }}>
      <div style={{ background: details.rule === 'gradient' ? `linear-gradient(90deg,${colours.rule},${colours.borderSecondary} 66%,transparent)` : colours.rule }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 22, color: colours.accentMuted, ...typography.caption }}>
        <span>{model.story.primaryTheme} · {model.story.secondaryTheme}</span>
        {coordinates && <span>{coordinates}</span>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: model.content.venueMap ? composition.storyColumns : '1fr', alignItems: 'center', gap: composition.mapProminence === 'feature' ? 36 : 44, minHeight: 0 }}>
        <div>
          <div style={{ color: colours.foreground, ...typography.quote }}>{model.story.statement}</div>
          {model.content.venueFacts && (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${facts.length},1fr)`, marginTop: composition.negativeSpace > .7 ? 31 : 25, borderTop: `1px solid ${colours.borderSecondary}`, borderBottom: `1px solid ${colours.borderSecondary}` }}>
              {facts.map(([label, value], index) => (
                <div key={label} style={{ padding: '19px 13px 18px', borderLeft: index ? `1px solid ${colours.borderSecondary}` : 'none' }}>
                  <div style={{ color: colours.accentMuted, marginBottom: 9, ...typography.factLabel }}>{label}</div>
                  <div style={{ color: colours.foreground, ...typography.factValue }}>{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {model.content.venueMap && (
          <svg viewBox="-180 -180 360 360" aria-label={`${model.identity.venueName} venue plan`} style={{ display: 'block', width: mapWidth, justifySelf: composition.titleAlign === 'right' ? 'start' : 'end' }}>
            <VenueMapEngine sport={model.identity.sport} venueName={model.identity.venueName} color={colours.map} mutedColor={colours.borderSecondary} coordinates={model.identity.coordinates ?? undefined} showCompass={model.content.compassRose && composition.mapProminence === 'feature'} />
          </svg>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: colours.subtle, ...typography.micro, letterSpacing: details.microTracking }}>
        <span>{details.footerLeft}</span>
        <span>{details.footerRight}</span>
      </div>
    </div>
  );
}
