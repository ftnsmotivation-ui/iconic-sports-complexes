import type { CSSProperties } from 'react';

import type { PosterPersonalisation } from './PosterPersonalisation';

interface PersonalisationModuleProps {
  personalisation: PosterPersonalisation;
  fallbackInscription: string;
  accentColor: string;
  textColor: string;
  mutedColor: string;
  labelStyle: CSSProperties;
  quoteStyle: CSSProperties;
  bodyStyle: CSSProperties;
}

export default function PersonalisationModule({ personalisation, fallbackInscription, accentColor, textColor, mutedColor, labelStyle, quoteStyle, bodyStyle }: PersonalisationModuleProps) {
  if (!personalisation.enabled) {
    return (
      <>
        <div style={{ color: accentColor, marginBottom: 12, ...labelStyle }}>The Venue</div>
        <div style={{ fontStyle: 'italic', color: textColor, ...quoteStyle }}>“{fallbackInscription}”</div>
      </>
    );
  }

  const location = [personalisation.stand && `Stand ${personalisation.stand}`, personalisation.seat && `Seat ${personalisation.seat}`].filter(Boolean).join(' · ');
  return (
    <div aria-label="I Was There personalisation">
      <div style={{ color: accentColor, marginBottom: 10, ...labelStyle }}>I Was There</div>
      {personalisation.occasion && <div style={{ color: textColor, ...quoteStyle }}>{personalisation.occasion}</div>}
      {(personalisation.date || location) && <div style={{ color: accentColor, marginTop: 8, ...labelStyle }}>{[personalisation.date, location].filter(Boolean).join(' · ')}</div>}
      {personalisation.notes && <div style={{ color: mutedColor, marginTop: 9, ...bodyStyle }}>{personalisation.notes}</div>}
    </div>
  );
}
