export type PosterHistoryKind = 'moment' | 'record' | 'event' | 'championship';

export interface PosterHistoryItem {
  kind: PosterHistoryKind;
  label: string;
  text: string;
}

export interface PosterHistorySource {
  iconicMoments?: string | readonly string[];
  historicRecords?: string | Readonly<Record<string, unknown>>;
  notableEvents?: string | readonly string[];
  championshipHistory?: string | readonly string[];
}

const MAX_HISTORY_ITEMS = 8;
const MAX_ITEM_LENGTH = 120;

function normalizeList(value: string | readonly string[] | undefined): string[] {
  const values = Array.isArray(value) ? value : typeof value === 'string' ? value.split(/[|;]/) : [];
  return values.map((item) => item.trim()).filter(Boolean);
}

function shorten(value: string): string {
  return value.length > MAX_ITEM_LENGTH ? `${value.slice(0, MAX_ITEM_LENGTH - 1).trimEnd()}…` : value;
}

function normalizeRecords(value: PosterHistorySource['historicRecords']): PosterHistoryItem[] {
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed: unknown = JSON.parse(value);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return normalizeRecords(parsed as Readonly<Record<string, unknown>>);
      }
    } catch {
      return normalizeList(value).map((text) => ({ kind: 'record', label: 'Record', text: shorten(text) }));
    }
  }
  if (typeof value !== 'object') return [];
  return Object.entries(value).filter(([, text]) => text !== null && text !== undefined && text !== '').map(([label, text]) => ({
    kind: 'record',
    label,
    text: shorten(String(text)),
  }));
}

function labelledItems(kind: PosterHistoryKind, label: string, values?: string | readonly string[]): PosterHistoryItem[] {
  return normalizeList(values).map((text) => ({ kind, label, text: shorten(text) }));
}

export function resolvePosterHistory(source: PosterHistorySource): readonly PosterHistoryItem[] {
  return [
    ...labelledItems('moment', 'Iconic moment', source.iconicMoments),
    ...normalizeRecords(source.historicRecords),
    ...labelledItems('event', 'Notable event', source.notableEvents),
    ...labelledItems('championship', 'Championship', source.championshipHistory),
  ].slice(0, MAX_HISTORY_ITEMS);
}
