import ParameterPanel from "../Sidebar/ParameterPanel";
import type { StudioParameter } from "../Sidebar/ParameterPanel";
import type { PosterContentId } from "@/components/PosterGenerator/PosterContent";
import type { PosterPersonalisationInput } from "@/components/PosterGenerator/PosterPersonalisation";
import OutputPanel from "./OutputPanel";
import PersonalisationPanel from "./PersonalisationPanel";

interface VenueInspectorProps {
  parameters: readonly StudioParameter[];
  selectedParameters: readonly PosterContentId[];
  onToggleParameter: (parameter: PosterContentId) => void;
  personalisation: PosterPersonalisationInput;
  onPersonalisationChange: (value: PosterPersonalisationInput) => void;
  onResetStudio: () => void;
}

export default function VenueInspector({ parameters, selectedParameters, onToggleParameter, personalisation, onPersonalisationChange, onResetStudio }: VenueInspectorProps) {
  return (
    <>
      <ParameterPanel parameters={parameters} selectedParameters={selectedParameters} onToggleParameter={onToggleParameter} />
      <PersonalisationPanel value={personalisation} onChange={onPersonalisationChange}/>
      <OutputPanel onResetStudio={onResetStudio}/>
    </>
  );
}
