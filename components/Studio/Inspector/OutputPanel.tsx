import { PanelHeading } from "../Sidebar/VenuePanel";

export default function OutputPanel() {
  return (
    <>
      <div className="my-7 h-px bg-white/10" />
      <PanelHeading number="04" title="Output" description="Prepare the commercial artwork." />
      <label className="mt-5 block">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/35">Print size</span>
        <select className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none">
          <option>A2 Portrait</option>
          <option>A3 Portrait</option>
          <option>A1 Portrait</option>
          <option>18 × 24 inch</option>
          <option>24 × 36 inch</option>
        </select>
      </label>
      <label className="mt-4 block">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/35">Resolution</span>
        <select className="w-full rounded-lg border border-white/10 bg-[#171b21] px-3 py-3 text-sm text-white outline-none">
          <option>300 DPI</option>
          <option>600 DPI</option>
          <option>150 DPI</option>
        </select>
      </label>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button type="button" className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-xs text-white/65 transition hover:bg-white/10">Save Draft</button>
        <button type="button" className="rounded-lg border border-amber-300/40 bg-amber-300/10 px-3 py-3 text-xs font-semibold text-amber-200 transition hover:bg-amber-300/20">Export</button>
      </div>
    </>
  );
}
