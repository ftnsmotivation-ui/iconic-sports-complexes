"use client";

import { useEffect, useRef, useState } from "react";

import { buildPosterModel } from "@/components/PosterGenerator/PosterModel";
import type { PosterConceptId } from "@/components/PosterGenerator/PosterConceptDirector";
import type { PosterContentId } from "@/components/PosterGenerator/PosterContent";
import { emptyPosterPersonalisation, type PosterPersonalisationInput } from "@/components/PosterGenerator/PosterPersonalisation";
import VenueInspector from "@/components/Studio/Inspector/VenueInspector";
import type { StudioParameter } from "@/components/Studio/Sidebar/ParameterPanel";
import PreviewCanvas from "@/components/Studio/Preview/PreviewCanvas";
import type { PreviewFrameId } from "@/components/Studio/Preview/FramePreview";
import StylePanel, { type StudioStyle } from "@/components/Studio/Sidebar/StylePanel";
import VenuePanel, { type StudioVenue } from "@/components/Studio/Sidebar/VenuePanel";
import StudioHeader from "@/components/Studio/StudioHeader";
import StudioShell from "@/components/Studio/StudioShell";
import { clearStudioDraft, loadStudioDraft, saveStudioDraft } from "@/components/Studio/StudioDraft";
import { defaultExportSettings, type ExportSettings } from "@/lib/export/ExportSettings";
import { downloadArtifact } from "@/lib/export/downloadArtifact";
import { createStudioExportService } from "@/lib/export/createStudioExportService";
import { createPrintPackage } from "@/lib/export/PrintPackageService";

const sports = ["Formula 1", "Football", "Cricket", "Tennis", "Golf", "Rugby", "Olympic Venues", "Boxing"];
const defaultParameters: PosterContentId[] = ["venueFacts", "venueMap", "collectorNumber"];

const posterParameters: readonly StudioParameter[] = [
  { id: "venueFacts", label: "Venue facts" },
  { id: "venueMap", label: "Venue map" },
  { id: "countryFlag", label: "Country flag" },
  { id: "compassRose", label: "Compass rose" },
  { id: "historicMoments", label: "Historic moments" },
  { id: "collectorNumber", label: "Collector number" },
];

export default function StudioPreviewPage() {
  const [selectedSport, setSelectedSport] = useState("Cricket");
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<StudioVenue | null>(null);
  const [competitions, setCompetitions] = useState<string[]>([]);
  const [venues, setVenues] = useState<StudioVenue[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<StudioStyle>("collector");
  const [selectedParameters, setSelectedParameters] = useState<PosterContentId[]>(defaultParameters);
  const [personalisation, setPersonalisation] = useState<PosterPersonalisationInput>(emptyPosterPersonalisation);
  const [selectedConcept, setSelectedConcept] = useState<PosterConceptId>('monument');
  const [selectedFrame, setSelectedFrame] = useState<PreviewFrameId>('none');
  const [loading, setLoading] = useState(false);
  const [catalogueError, setCatalogueError] = useState("");
  const [draftReady, setDraftReady] = useState(false);
  const [catalogueRevision, setCatalogueRevision] = useState(0);
  const [exportSettings, setExportSettings] = useState<ExportSettings>(defaultExportSettings);
  const [exporting, setExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');
  const restoreTarget = useRef({ competition: '', venueName: '' });

  useEffect(() => {
    const draft = loadStudioDraft();
    if (draft) {
      restoreTarget.current = { competition: draft.selectedCompetition, venueName: draft.selectedVenueName };
      setSelectedSport(sports.includes(draft.selectedSport) ? draft.selectedSport : 'Cricket');
      setSelectedStyle(draft.selectedStyle);
      setSelectedParameters(draft.selectedParameters);
      setPersonalisation(draft.personalisation);
      setSelectedConcept(draft.selectedConcept);
      setSelectedFrame(draft.selectedFrame);
    }
    setDraftReady(true);
  }, []);

  useEffect(() => {
    if (!draftReady) return;
    async function loadCompetitions() {
      setLoading(true);
      setCatalogueError("");
      setSelectedCompetition("");
      setSelectedVenue(null);
      setVenues([]);
      try {
        const response = await fetch(`/api/competitions?sport=${encodeURIComponent(selectedSport)}`);
        if (!response.ok) throw new Error("Unable to load competitions.");
        const data = await response.json();
        const items: string[] = data.competitions ?? [];
        setCompetitions(items);
        const restoredCompetition = restoreTarget.current.competition;
        setSelectedCompetition(items.includes(restoredCompetition) ? restoredCompetition : items[0] ?? "");
      } catch (error) {
        setCatalogueError(error instanceof Error ? error.message : "Unable to load competitions.");
      } finally {
        setLoading(false);
      }
    }
    void loadCompetitions();
  }, [catalogueRevision, draftReady, selectedSport]);

  useEffect(() => {
    if (!draftReady || !selectedCompetition) return;
    async function loadVenues() {
      setLoading(true);
      setCatalogueError("");
      setSelectedVenue(null);
      try {
        const response = await fetch(`/api/venues?sport=${encodeURIComponent(selectedSport)}&competition=${encodeURIComponent(selectedCompetition)}`);
        if (!response.ok) throw new Error("Unable to load venues.");
        const data = await response.json();
        const items: StudioVenue[] = data.venues ?? [];
        setVenues(items);
        const restoredVenue = restoreTarget.current.venueName;
        setSelectedVenue(items.find((venue) => venue.venueName === restoredVenue) ?? items[0] ?? null);
        restoreTarget.current = { competition: '', venueName: '' };
      } catch (error) {
        setCatalogueError(error instanceof Error ? error.message : "Unable to load venues.");
      } finally {
        setLoading(false);
      }
    }
    void loadVenues();
  }, [draftReady, selectedCompetition, selectedSport]);

  useEffect(() => {
    if (!draftReady) return;
    saveStudioDraft({ version: 1, selectedSport, selectedCompetition, selectedVenueName: selectedVenue?.venueName ?? '', selectedStyle, selectedParameters, personalisation, selectedConcept, selectedFrame });
  }, [draftReady, personalisation, selectedCompetition, selectedConcept, selectedFrame, selectedParameters, selectedSport, selectedStyle, selectedVenue]);

  const resetStudio = () => {
    clearStudioDraft();
    restoreTarget.current = { competition: '', venueName: '' };
    setSelectedSport('Cricket');
    setSelectedCompetition('');
    setSelectedVenue(null);
    setCompetitions([]);
    setVenues([]);
    setSelectedStyle('collector');
    setSelectedParameters(defaultParameters);
    setPersonalisation({ ...emptyPosterPersonalisation });
    setSelectedConcept('monument');
    setSelectedFrame('none');
    setExportSettings(defaultExportSettings);
    setCatalogueRevision((current) => current + 1);
  };

  const toggleParameter = (parameter: PosterContentId) => {
    setSelectedParameters((current) => current.includes(parameter) ? current.filter((item) => item !== parameter) : [...current, parameter]);
  };
  const posterModel = selectedVenue ? buildPosterModel(selectedVenue, selectedStyle, selectedParameters, personalisation, selectedConcept) : null;
  const exportPoster = async () => {
    if (!posterModel) return;
    setExporting(true);
    setExportMessage('');
    try {
      const service = createStudioExportService();
      const artifact = await service.create({ model: posterModel, settings: exportSettings, filename: posterModel.identity.venueName });
      downloadArtifact(artifact);
      setExportMessage(`${artifact.filename} is ready.`);
    } catch (error) {
      setExportMessage(error instanceof Error ? error.message : 'Unable to create export.');
    } finally {
      setExporting(false);
    }
  };
  const exportPrintPackage = async () => {
    if (!posterModel) return;
    setExporting(true);
    setExportMessage('Starting print package…');
    try {
      const artifact = await createPrintPackage(createStudioExportService(), posterModel, exportSettings, setExportMessage);
      downloadArtifact(artifact);
      setExportMessage(`${artifact.filename} is ready.`);
    } catch (error) {
      setExportMessage(error instanceof Error ? error.message : 'Unable to create print package.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <StudioShell
      header={<StudioHeader />}
      sidebar={(
        <>
          <VenuePanel sports={sports} selectedSport={selectedSport} selectedCompetition={selectedCompetition} selectedVenue={selectedVenue} competitions={competitions} venues={venues} loading={loading} catalogueError={catalogueError} onSportChange={setSelectedSport} onCompetitionChange={setSelectedCompetition} onVenueChange={setSelectedVenue} />
          <StylePanel selectedStyle={selectedStyle} posterModel={posterModel} onStyleChange={setSelectedStyle} />
        </>
      )}
      preview={<PreviewCanvas posterModel={posterModel} selectedStyle={selectedStyle} loading={loading} selectedConcept={selectedConcept} onConceptChange={setSelectedConcept} selectedFrame={selectedFrame} onFrameChange={setSelectedFrame} />}
      inspector={<VenueInspector parameters={posterParameters} selectedParameters={selectedParameters} onToggleParameter={toggleParameter} personalisation={personalisation} onPersonalisationChange={setPersonalisation} onResetStudio={resetStudio} exportSettings={exportSettings} onExportSettingsChange={setExportSettings} exporting={exporting} exportMessage={exportMessage} onExport={() => void exportPoster()} onExportPrintPackage={() => void exportPrintPackage()} />}
    />
  );
}
