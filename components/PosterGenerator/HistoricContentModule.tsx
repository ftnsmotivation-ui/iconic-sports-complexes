import type { CSSProperties } from 'react';

import type { PosterHistoryItem } from './PosterHistory';

interface HistoricContentModuleProps {
  items: readonly PosterHistoryItem[];
  fallback: string;
  limit: number;
  accentColor: string;
  textColor: string;
  borderColor: string;
  labelStyle: CSSProperties;
  bodyStyle: CSSProperties;
}

export default function HistoricContentModule({ items, fallback, limit, accentColor, textColor, borderColor, labelStyle, bodyStyle }: HistoricContentModuleProps) {
  const visibleItems = items.slice(0, Math.max(1, limit));
  if (visibleItems.length === 0) {
    return <div style={{ color: textColor, ...bodyStyle }}>{fallback}</div>;
  }

  return (
    <div aria-label="Historic moments and records" style={{ display: 'grid', gap: 12 }}>
      {visibleItems.map((item, index) => (
        <div key={`${item.kind}-${item.label}-${index}`} style={{ borderTop: index ? `1px solid ${borderColor}` : 'none', paddingTop: index ? 10 : 0 }}>
          <div style={{ color: accentColor, marginBottom: 4, ...labelStyle }}>{item.label}</div>
          <div style={{ color: textColor, ...bodyStyle }}>{item.text}</div>
        </div>
      ))}
    </div>
  );
}
