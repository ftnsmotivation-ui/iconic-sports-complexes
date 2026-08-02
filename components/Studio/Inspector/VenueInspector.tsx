import ParameterPanel from "../Sidebar/ParameterPanel";
import type { StudioParameter } from "../Sidebar/ParameterPanel";
import type { PosterContentId } from "@/components/PosterGenerator/PosterContent";
import OutputPanel from "./OutputPanel";

interface VenueInspectorProps {
  parameters: readonly StudioParameter[];
  selectedParameters: readonly PosterContentId[];
  onToggleParameter: (parameter: PosterContentId) => void;
}

export default function VenueInspector({ parameters, selectedParameters, onToggleParameter }: VenueInspectorProps) {
  return (
    <>
      <ParameterPanel parameters={parameters} selectedParameters={selectedParameters} onToggleParameter={onToggleParameter} />
      <OutputPanel />
    </>
  );
}
