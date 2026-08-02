import { PanelHeading } from "./VenuePanel";
import type { PosterContentId } from "@/components/PosterGenerator/PosterContent";

export interface StudioParameter {
  id: PosterContentId;
  label: string;
}

interface ParameterPanelProps {
  parameters: readonly StudioParameter[];
  selectedParameters: readonly PosterContentId[];
  onToggleParameter: (parameter: PosterContentId) => void;
}

export default function ParameterPanel({ parameters, selectedParameters, onToggleParameter }: ParameterPanelProps) {
  return (
    <>
      <PanelHeading number="03" title="Poster Content" description="Control what appears in the artwork." />
      <div className="mt-5 space-y-2" role="group" aria-label="Poster content">
        {parameters.map((parameter) => (
          <label key={parameter.id} className="flex cursor-pointer items-center justify-between rounded-lg border border-white/8 bg-white/[0.025] px-3 py-3 transition hover:bg-white/[0.05] focus-within:ring-2 focus-within:ring-amber-300">
            <span className="text-xs text-white/70">{parameter.label}</span>
            <input type="checkbox" checked={selectedParameters.includes(parameter.id)} onChange={() => onToggleParameter(parameter.id)} className="h-4 w-4 accent-amber-300" />
          </label>
        ))}
      </div>
    </>
  );
}
