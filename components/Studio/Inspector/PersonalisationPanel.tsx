import type { PosterPersonalisationInput } from '@/components/PosterGenerator/PosterPersonalisation';

import { PanelHeading } from '../Sidebar/VenuePanel';

interface PersonalisationPanelProps {
  value: PosterPersonalisationInput;
  onChange: (value: PosterPersonalisationInput) => void;
}

const fields = [
  { id: 'date', label: 'Date', placeholder: '28 May 2023', maxLength: 32 },
  { id: 'occasion', label: 'Occasion', placeholder: 'Championship final', maxLength: 48 },
  { id: 'stand', label: 'Stand', placeholder: 'Grandstand K', maxLength: 24 },
  { id: 'seat', label: 'Seat', placeholder: 'Row 8 · Seat 12', maxLength: 24 },
] as const;

export default function PersonalisationPanel({ value, onChange }: PersonalisationPanelProps) {
  const update = (field: keyof PosterPersonalisationInput, fieldValue: string | boolean) => onChange({ ...value, [field]: fieldValue });
  return (
    <>
      <div className="my-7 h-px bg-white/10"/>
      <PanelHeading number="04" title="I Was There" description="Turn a collector print into a personal memory."/>
      <label className="mt-5 flex cursor-pointer items-center justify-between rounded-lg border border-white/8 bg-white/[0.025] px-3 py-3 focus-within:ring-2 focus-within:ring-amber-300">
        <span className="text-xs text-white/70">Add personal details</span>
        <input type="checkbox" checked={value.enabled} onChange={(event) => update('enabled', event.target.checked)} className="h-4 w-4 accent-amber-300"/>
      </label>
      {value.enabled && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {fields.map((field) => (
            <label key={field.id} className={field.id === 'occasion' ? 'col-span-2' : ''}>
              <span className="mb-1.5 block text-[9px] uppercase tracking-[0.18em] text-white/55">{field.label}</span>
              <input value={value[field.id] || ''} maxLength={field.maxLength} onChange={(event) => update(field.id, event.target.value)} placeholder={field.placeholder} className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/20 focus:border-amber-400/60"/>
            </label>
          ))}
          <label className="col-span-2">
            <span className="mb-1.5 block text-[9px] uppercase tracking-[0.18em] text-white/55">Notes</span>
            <textarea value={value.notes || ''} maxLength={140} rows={3} onChange={(event) => update('notes', event.target.value)} placeholder="A short memory of the day" className="w-full resize-none rounded-lg border border-white/10 bg-[#171b21] px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/20 focus:border-amber-400/60"/>
          </label>
        </div>
      )}
    </>
  );
}
