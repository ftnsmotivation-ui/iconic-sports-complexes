import { useState } from "react";

import CinematicHeroPoster from "@/components/PosterGenerator/CinematicHeroPoster";
import type { PosterModel } from "@/components/PosterGenerator/PosterModel";
import type { PosterConceptId } from "@/components/PosterGenerator/PosterConceptDirector";

import type { StudioStyle } from "../Sidebar/StylePanel";
import PreviewToolbar, { type PreviewZoom } from "./PreviewToolbar";
import ConceptSelector from "./ConceptSelector";

interface PreviewCanvasProps {
  posterModel: PosterModel | null;
  selectedStyle: StudioStyle;
  loading: boolean;
  selectedConcept: PosterConceptId;
  onConceptChange: (concept: PosterConceptId) => void;
}

export default function PreviewCanvas({ posterModel, selectedStyle, loading, selectedConcept, onConceptChange }: PreviewCanvasProps) {
  const [zoom, setZoom] = useState<PreviewZoom>("fit");
  const [showGrid, setShowGrid] = useState(false);
  const [showSafeMargin, setShowSafeMargin] = useState(false);
  const [showGuides, setShowGuides] = useState(false);
  const canvasWidth = zoom === "fit"
    ? "min(100%, calc((100vh - 200px) * 8 / 11))"
    : `${610 * zoom}px`;

  return (
    <section className="relative flex min-h-[620px] min-w-0 flex-col bg-[#11151a] lg:min-h-[720px] xl:min-h-0">
      <PreviewToolbar
        venueName={posterModel?.identity.venueName}
        selectedStyle={selectedStyle}
        zoom={zoom}
        showGrid={showGrid}
        showSafeMargin={showSafeMargin}
        showGuides={showGuides}
        onZoomChange={setZoom}
        onGridToggle={() => setShowGrid((current) => !current)}
        onSafeMarginToggle={() => setShowSafeMargin((current) => !current)}
        onGuidesToggle={() => setShowGuides((current) => !current)}
      />
      <ConceptSelector posterModel={posterModel} selectedConcept={selectedConcept} onConceptChange={onConceptChange}/>
      <div className="flex flex-1 items-center justify-center overflow-auto bg-[radial-gradient(circle_at_center,#252b33_0%,#15191e_55%,#0e1115_100%)] p-4 sm:p-6 2xl:p-10">
        <div
          className="relative shrink-0"
          style={{ width: canvasWidth, maxWidth: zoom === "fit" ? 610 : "none" }}
        >
          {posterModel ? (
            <CinematicHeroPoster model={posterModel} />
          ) : (
            <div className="flex aspect-[8/11] w-full items-center justify-center border border-white/10 bg-[#0b0e11] text-sm text-white/35">
              {loading ? "Preparing poster…" : "Select an available venue"}
            </div>
          )}
          {posterModel && (
            <PreviewOverlays grid={showGrid} safeMargin={showSafeMargin} guides={showGuides} />
          )}
        </div>
      </div>
      <div className="flex h-10 items-center justify-between border-t border-white/10 bg-[#0d1014] px-5 text-[10px] text-white/35">
        <span>1000 × 1600 master artwork</span>
        <span>RGB preview · Vector master · {zoom === "fit" ? "Fit" : `${zoom * 100}%`}</span>
      </div>
    </section>
  );
}

function PreviewOverlays({ grid, safeMargin, guides }: { grid: boolean; safeMargin: boolean; guides: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {grid && (
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[size:10%_10%]" />
      )}
      {safeMargin && <div className="absolute inset-[5%] border border-dashed border-amber-300/80" />}
      {guides && (
        <>
          <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-cyan-300/70" />
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-cyan-300/70" />
        </>
      )}
    </div>
  );
}
