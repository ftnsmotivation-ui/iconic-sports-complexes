export interface PosterPersonalisationInput {
  enabled: boolean;
  date?: string;
  occasion?: string;
  stand?: string;
  seat?: string;
  notes?: string;
}

export interface PosterPersonalisation {
  enabled: boolean;
  date: string;
  occasion: string;
  stand: string;
  seat: string;
  notes: string;
}

export const emptyPosterPersonalisation: PosterPersonalisation = {
  enabled: false,
  date: '',
  occasion: '',
  stand: '',
  seat: '',
  notes: '',
};

function clean(value: string | undefined, maxLength: number): string {
  return (value || '').trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

export function resolvePosterPersonalisation(input?: PosterPersonalisationInput): PosterPersonalisation {
  if (!input?.enabled) return emptyPosterPersonalisation;
  return {
    enabled: true,
    date: clean(input.date, 32),
    occasion: clean(input.occasion, 48),
    stand: clean(input.stand, 24),
    seat: clean(input.seat, 24),
    notes: clean(input.notes, 140),
  };
}
