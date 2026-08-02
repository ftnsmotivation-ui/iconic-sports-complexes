import ParameterPanel from "../Sidebar/ParameterPanel";
import OutputPanel from "./OutputPanel";

interface VenueInspectorProps {
  parameters: readonly string[];
  selectedParameters: string[];
  onToggleParameter: (parameter: string) => void;
}

export default function VenueInspector({ parameters, selectedParameters, onToggleParameter }: VenueInspectorProps) {
  return (
    <>
      <ParameterPanel parameters={parameters} selectedParameters={selectedParameters} onToggleParameter={onToggleParameter} />
      <OutputPanel />
    </>
  );
}
