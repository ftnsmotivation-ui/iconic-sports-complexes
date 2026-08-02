import ParameterPanel from "../Sidebar/ParameterPanel";
import type { StudioParameter } from "../Sidebar/ParameterPanel";
import type { PosterContentId } from "@/components/PosterGenerator/PosterContent";
import type { PosterPersonalisationInput } from "@/components/PosterGenerator/PosterPersonalisation";
import OutputPanel from "./OutputPanel";
import PersonalisationPanel from "./PersonalisationPanel";
import type { ExportSettings } from "@/lib/export/ExportSettings";

interface VenueInspectorProps {
  parameters: readonly StudioParameter[];
  selectedParameters: readonly PosterContentId[];
  onToggleParameter: (parameter: PosterContentId) => void;
  personalisation: PosterPersonalisationInput;
  onPersonalisationChange: (value: PosterPersonalisationInput) => void;
  onResetStudio: () => void;
  exportSettings: ExportSettings;
  onExportSettingsChange: (settings: ExportSettings) => void;
  exporting: boolean;
  exportMessage: string;
  onExport: () => void;
  onExportPrintPackage: () => void;
  onExportEtsyPackage: () => void;
}

export default function VenueInspector({ parameters, selectedParameters, onToggleParameter, personalisation, onPersonalisationChange, onResetStudio, exportSettings, onExportSettingsChange, exporting, exportMessage, onExport, onExportPrintPackage, onExportEtsyPackage }: VenueInspectorProps) {
  return (
    <>
      <ParameterPanel parameters={parameters} selectedParameters={selectedParameters} onToggleParameter={onToggleParameter} />
      <PersonalisationPanel value={personalisation} onChange={onPersonalisationChange}/>
      <OutputPanel settings={exportSettings} onSettingsChange={onExportSettingsChange} onResetStudio={onResetStudio} exporting={exporting} exportMessage={exportMessage} onExport={onExport} onExportPrintPackage={onExportPrintPackage} onExportEtsyPackage={onExportEtsyPackage}/>
    </>
  );
}
