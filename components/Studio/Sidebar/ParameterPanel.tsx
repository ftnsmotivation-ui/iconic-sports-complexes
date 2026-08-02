import { PanelHeading } from "./VenuePanel";

interface ParameterPanelProps {
  parameters: readonly string[];
  selectedParameters: string[];
  onToggleParameter: (parameter: string) => void;
}

export default function ParameterPanel({ parameters, selectedParameters, onToggleParameter }: ParameterPanelProps) {
  return (
    <>
      <PanelHeading number="03" title="Poster Content" description="Control what appears in the artwork." />
      <div className="mt-5 space-y-2">
        {parameters.map((parameter) => (
          <label key={parameter} className="flex cursor-pointer items-center justify-between rounded-lg border border-white/8 bg-white/[0.025] px-3 py-3 transition hover:bg-white/[0.05]">
            <span className="text-xs text-white/70">{parameter}</span>
            <input type="checkbox" checked={selectedParameters.includes(parameter)} onChange={() => onToggleParameter(parameter)} className="h-4 w-4 accent-amber-300" />
          </label>
        ))}
      </div>
    </>
  );
}
