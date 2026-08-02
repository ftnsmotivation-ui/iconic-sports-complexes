import type { CSSProperties, ReactNode } from 'react';

export type PreviewFrameId = 'none' | 'black' | 'oak' | 'walnut' | 'white';

interface FrameProfile {
  name: string;
  frame: CSSProperties;
  swatch: CSSProperties;
}

const frameProfiles: Readonly<Record<PreviewFrameId, FrameProfile>> = {
  none: { name: 'No Frame', frame: {}, swatch: { background: 'transparent' } },
  black: { name: 'Black', frame: { padding: 12, background: 'linear-gradient(135deg,#303235,#090a0b 45%,#242628)', boxShadow: '0 24px 55px rgba(0,0,0,.58),inset 0 0 0 2px #050505,inset 0 0 0 4px #3a3b3d' }, swatch: { background: '#151719' } },
  oak: { name: 'Oak', frame: { padding: 12, background: 'repeating-linear-gradient(100deg,#c39a61 0 5px,#a97c48 5px 9px,#d0aa72 9px 15px)', boxShadow: '0 24px 55px rgba(0,0,0,.5),inset 0 0 0 2px #75502d,inset 0 0 0 4px #ddbd8c' }, swatch: { background: '#bd925c' } },
  walnut: { name: 'Walnut', frame: { padding: 12, background: 'repeating-linear-gradient(105deg,#5d3826 0 5px,#3c2218 5px 9px,#744b32 9px 15px)', boxShadow: '0 24px 55px rgba(0,0,0,.58),inset 0 0 0 2px #28150f,inset 0 0 0 4px #81563c' }, swatch: { background: '#583321' } },
  white: { name: 'White', frame: { padding: 12, background: 'linear-gradient(135deg,#fff,#d8d7d2 52%,#f4f3ef)', boxShadow: '0 24px 55px rgba(0,0,0,.42),inset 0 0 0 2px #b9b8b3,inset 0 0 0 4px #fff' }, swatch: { background: '#ecebe7' } },
};

export function FramePreview({ frame, children }: { frame: PreviewFrameId; children: ReactNode }) {
  if (frame === 'none') return <>{children}</>;
  return <div data-preview-frame={frame} aria-label={`${frameProfiles[frame].name} frame preview`} style={frameProfiles[frame].frame}>{children}</div>;
}

export function FrameSelector({ selectedFrame, onFrameChange }: { selectedFrame: PreviewFrameId; onFrameChange: (frame: PreviewFrameId) => void }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto border-b border-white/10 bg-[#0d1014] px-4 py-1.5" aria-label="Frame preview">
      <span className="mr-1 shrink-0 text-[9px] uppercase tracking-[.18em] text-white/30">Frame</span>
      {(Object.keys(frameProfiles) as PreviewFrameId[]).map((frame) => {
        const profile = frameProfiles[frame];
        return <button key={frame} type="button" aria-pressed={selectedFrame === frame} onClick={() => onFrameChange(frame)} className={["flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 text-[9px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300", selectedFrame === frame ? "border-amber-300/50 bg-amber-300/10 text-amber-200" : "border-white/8 text-white/45 hover:bg-white/5"].join(' ')}><span className="h-2.5 w-2.5 rounded-full border border-white/20" style={profile.swatch}/>{profile.name}</button>;
      })}
    </div>
  );
}
