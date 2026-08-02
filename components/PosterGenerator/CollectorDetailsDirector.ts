import type { PosterModel } from './PosterModel';
import type { PosterCompositionPlan } from './PosterCompositionDirector';

export interface CollectorDetailsPlan {
  borderInsets: readonly [number, number];
  rule: 'fine' | 'gradient';
  mastheadLabel: string;
  showMastheadNumber: boolean;
  footerLeft: string;
  footerRight: string;
  collectorMark: 'circle' | 'registration' | 'none';
  microTracking: string;
}

export function resolveCollectorDetails(model: PosterModel, composition: PosterCompositionPlan): CollectorDetailsPlan {
  const museumBorder = model.direction.borderStyle === 'Museum';
  return {
    borderInsets: museumBorder ? [27, 39] : model.direction.borderStyle === 'Double' ? [29, 0] : [27, 0],
    rule: composition.negativeSpace > .68 ? 'fine' : 'gradient',
    mastheadLabel: `${model.story.primaryTheme} · ${model.styleId} series`,
    showMastheadNumber: composition.informationDensity !== 'rich',
    footerLeft: `${model.story.primaryTheme} · ${model.story.secondaryTheme}`,
    footerRight: `Limited edition · ${model.collector.number} / 500`,
    collectorMark: composition.mapProminence === 'feature' ? 'registration' : 'circle',
    microTracking: composition.negativeSpace > .7 ? '2.4px' : '1.8px',
  };
}
