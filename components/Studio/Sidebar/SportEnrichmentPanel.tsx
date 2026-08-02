import { useState } from 'react';

import type { SportEnrichmentInput } from '@/lib/database/SportEnrichmentTypes';

interface SportEnrichmentPanelProps {
  onAddSport: (input: SportEnrichmentInput) => Promise<string | null>;
}

const emptyForm = { sport: '', competition: '', venueName: '', city: '', country: '', opened: '', capacity: '' };

export default function SportEnrichmentPanel({ onAddSport }: SportEnrichmentPanelProps) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const update = (field: keyof typeof form, value: string) => { setPreview(false); setError(''); setForm((current) => ({ ...current, [field]: value })); };
  const normalized: SportEnrichmentInput = { ...form, opened: Number(form.opened), capacity: Number(form.capacity) };
  const valid = Object.values(form).every((value) => value.trim()) && Number.isInteger(normalized.opened) && Number.isInteger(normalized.capacity);
  const confirm = async () => {
    setSaving(true); setError('');
    const message = await onAddSport(normalized);
    setSaving(false);
    if (message) setError(message); else { setOpen(false); setPreview(false); setForm(emptyForm); }
  };

  if (!open) return <button type="button" onClick={() => setOpen(true)} className="mt-3 w-full rounded-lg border border-dashed border-white/15 px-3 py-2.5 text-xs text-white/45 transition hover:border-amber-300/40 hover:text-amber-200">+ Add an unlisted sport</button>;
  return (
    <div className="mt-3 rounded-xl border border-amber-300/20 bg-amber-300/[.04] p-3">
      <p className="text-xs font-semibold text-amber-100">New sport enrichment</p>
      <p className="mt-1 text-[10px] leading-4 text-white/35">Creates one normalized worksheet and venue record after confirmation.</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {(['sport', 'competition', 'venueName', 'city', 'country', 'opened', 'capacity'] as const).map((field) => <label key={field} className={field === 'competition' || field === 'venueName' ? 'col-span-2' : ''}><span className="mb-1 block text-[8px] uppercase tracking-[.16em] text-white/30">{field.replace(/([A-Z])/g, ' $1')}</span><input value={form[field]} inputMode={field === 'opened' || field === 'capacity' ? 'numeric' : 'text'} onChange={(event) => update(field, event.target.value)} className="w-full rounded-md border border-white/10 bg-[#171b21] px-2 py-2 text-[11px] text-white outline-none focus:border-amber-300/50"/></label>)}
      </div>
      {preview && <div className="mt-3 rounded-lg border border-white/10 bg-black/20 p-2 text-[10px] leading-4 text-white/55"><strong className="text-amber-200">Confirm workbook addition:</strong><br/>{form.sport} → {form.competition}<br/>{form.venueName}, {form.city}, {form.country}<br/>Opened {form.opened} · Capacity {form.capacity}</div>}
      {error && <p role="alert" className="mt-2 text-[10px] leading-4 text-red-200">{error}</p>}
      <div className="mt-3 flex gap-2"><button type="button" onClick={() => { setOpen(false); setPreview(false); }} className="flex-1 rounded-md border border-white/10 px-2 py-2 text-[10px] text-white/50">Cancel</button>{preview ? <button type="button" disabled={saving} onClick={() => void confirm()} className="flex-1 rounded-md bg-amber-300 px-2 py-2 text-[10px] font-bold text-[#19150b] disabled:opacity-50">{saving ? 'Adding…' : 'Confirm & Add'}</button> : <button type="button" disabled={!valid} onClick={() => setPreview(true)} className="flex-1 rounded-md bg-amber-300/15 px-2 py-2 text-[10px] font-semibold text-amber-100 disabled:opacity-30">Review</button>}</div>
    </div>
  );
}
