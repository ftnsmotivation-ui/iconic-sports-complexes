"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

import { buildPosterModel } from "@/components/PosterGenerator/PosterModel";
import type { PosterConceptId } from "@/components/PosterGenerator/PosterConceptDirector";
import type { PosterContentId } from "@/components/PosterGenerator/PosterContent";
import { emptyPosterPersonalisation, type PosterPersonalisationInput } from "@/components/PosterGenerator/PosterPersonalisation";
import type { StudioParameter } from "@/components/Studio/Sidebar/ParameterPanel";
import type { PreviewFrameId } from "@/components/Studio/Preview/FramePreview";
import type { StudioStyle } from "@/components/Studio/Sidebar/StylePanel";
import VenuePanel, { type StudioVenue } from "@/components/Studio/Sidebar/VenuePanel";
import StudioHeader from "@/components/Studio/StudioHeader";
import StudioShell from "@/components/Studio/StudioShell";
import { clearStudioDraft, loadStudioDraft, saveStudioDraft } from "@/components/Studio/StudioDraft";
import { defaultExportSettings, type ExportSettings } from "@/lib/export/ExportSettings";
import type { SportEnrichmentInput, SportEnrichmentResult } from "@/lib/database/SportEnrichmentTypes";
import { downloadArtifact } from "@/lib/export/downloadArtifact";

const StylePanel = dynamic(() => import('@/components/Studio/Sidebar/StylePanel'), { ssr: false });
const PreviewCanvas = dynamic(() => import('@/components/Studio/Preview/PreviewCanvas'), {
  ssr: false,
  loading: () => <div className="flex min-h-[620px] items-center justify-center bg-[#11151a] text-sm text-white/50" role="status">Loading vector preview…</div>,
});
const VenueInspector = dynamic(() => import('@/components/Studio/Inspector/VenueInspector'), { ssr: false });

const initialSports = ["Formula 1", "Football", "Cricket", "Tennis", "Golf", "Rugby", "Olympic Venues", "Boxing"];
const defaultParameters: PosterContentId[] = ["venueFacts", "venueMap", "collectorNumber"];

const posterParameters: readonly StudioParameter[] = [
  { id: "venueFacts", label: "Venue facts" },
  { id: "venueMap", label: "Venue map" },
  { id: "countryFlag", label: "Country flag" },
  { id: "compassRose", label: "Compass rose" },
  { id: "historicMoments", label: "Historic moments" },
  { id: "collectorNumber", label: "Collector number" },
];

async function responseError(response: Response, fallback: string): Promise<string> {
  try {
    const body = await response.json() as { error?: unknown; details?: unknown };
    const summary = typeof body.error === 'string' ? body.error : fallback;
    return typeof body.details === 'string' ? `${summary}: ${body.details}` : summary;
  } catch {
    return fallback;
  }
}

export default function StudioPreviewPage() {
  const [selectedSport, setSelectedSport] = useState("Cricket");
  const [availableSports, setAvailableSports] = useState<string[]>(initialSports);
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
  const [sportsError, setSportsError] = useState("");
  const [draftReady, setDraftReady] = useState(false);
  const [catalogueRevision, setCatalogueRevision] = useState(0);
  const [exportSettings, setExportSettings] = useState<ExportSettings>(defaultExportSettings);
  const [exporting, setExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');
  const [exportFailed, setExportFailed] = useState(false);
  const restoreTarget = useRef({ competition: '', venueName: '' });

  useEffect(() => {
    const draft = loadStudioDraft();
    if (draft) {
      restoreTarget.current = { competition: draft.selectedCompetition, venueName: draft.selectedVenueName };
      setSelectedSport(draft.selectedSport || 'Cricket');
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
    setSportsError('');
    void fetch('/api/sports').then(async (response) => {
      if (!response.ok) throw new Error(await responseError(response, 'Unable to read the venue workbook'));
      return response.json();
    }).then((data) => { if (data?.sports) setAvailableSports(data.sports); }).catch((error) => setSportsError(error instanceof Error ? error.message : 'Unable to read the venue workbook.'));
  }, [catalogueRevision, draftReady]);

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
        if (!response.ok) throw new Error(await responseError(response, "Unable to load competitions"));
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
        if (!response.ok) throw new Error(await responseError(response, "Unable to load venues"));
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
  const addSport = async (record: SportEnrichmentInput): Promise<string | null> => {
    try {
      const response = await fetch('/api/sports', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ confirmed: true, record }) });
      const data: { result?: SportEnrichmentResult; error?: string } = await response.json();
      if (!response.ok || !data.result) return data.error || 'Unable to add sport.';
      setAvailableSports(data.result.sports);
      setSelectedSport(data.result.sport);
      navigator.serviceWorker?.controller?.postMessage({ type: 'REFRESH_CATALOGUE' });
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : 'Unable to add sport.';
    }
  };
  const posterModel = useMemo(() => selectedVenue ? buildPosterModel(selectedVenue, selectedStyle, selectedParameters, personalisation, selectedConcept) : null, [personalisation, selectedConcept, selectedParameters, selectedStyle, selectedVenue]);
  const exportPoster = async () => {
    if (!posterModel) return;
    setExporting(true);
    setExportMessage('');
    setExportFailed(false);
    try {
      const { createStudioExportService } = await import('@/lib/export/createStudioExportService');
      const service = createStudioExportService();
      const artifact = await service.create({ model: posterModel, settings: exportSettings, filename: posterModel.identity.venueName });
      downloadArtifact(artifact);
      setExportMessage(`${artifact.filename} is ready.`);
    } catch (error) {
      setExportFailed(true);
      setExportMessage(error instanceof Error ? error.message : 'Unable to create export.');
    } finally {
      setExporting(false);
    }
  };
  const exportPrintPackage = async () => {
    if (!posterModel) return;
    setExporting(true);
    setExportMessage('Starting print package…');
    setExportFailed(false);
    try {
      const [{ createPrintPackage }, { createStudioExportService }] = await Promise.all([import('@/lib/export/PrintPackageService'), import('@/lib/export/createStudioExportService')]);
      const artifact = await createPrintPackage(createStudioExportService(), posterModel, exportSettings, setExportMessage);
      downloadArtifact(artifact);
      setExportMessage(`${artifact.filename} is ready.`);
    } catch (error) {
      setExportFailed(true);
      setExportMessage(error instanceof Error ? error.message : 'Unable to create print package.');
    } finally {
      setExporting(false);
    }
  };
  const exportEtsyPackage = async () => {
    if (!posterModel) return;
    setExporting(true);
    setExportMessage('Starting Etsy package…');
    setExportFailed(false);
    try {
      const [{ createEtsyPackage }, { createStudioExportService }] = await Promise.all([import('@/lib/export/EtsyPackageService'), import('@/lib/export/createStudioExportService')]);
      const artifact = await createEtsyPackage(createStudioExportService(), posterModel, exportSettings, setExportMessage);
      downloadArtifact(artifact);
      setExportMessage(`${artifact.filename} is ready.`);
    } catch (error) {
      setExportFailed(true);
      setExportMessage(error instanceof Error ? error.message : 'Unable to create Etsy package.');
    } finally {
      setExporting(false);
    }
  };
  const exportSocialPackage = async () => {
    if (!posterModel) return;
    setExporting(true);
    setExportMessage('Starting social and web package…');
    setExportFailed(false);
    try {
      const { createSocialPackage } = await import('@/lib/export/SocialPackageService');
      const artifact = await createSocialPackage(posterModel, exportSettings, setExportMessage);
      downloadArtifact(artifact);
      setExportMessage(`${artifact.filename} is ready.`);
    } catch (error) {
      setExportFailed(true);
      setExportMessage(error instanceof Error ? error.message : 'Unable to create social package.');
    } finally {
      setExporting(false);
    }
  };
  const exportMarketingMockups = async () => {
    if (!posterModel) return;
    setExporting(true);
    setExportMessage('Starting marketing mockups…');
    setExportFailed(false);
    try {
      const { createMarketingMockups } = await import('@/lib/export/MarketingMockupService');
      const artifact = await createMarketingMockups(posterModel, exportSettings, setExportMessage);
      downloadArtifact(artifact);
      setExportMessage(`${artifact.filename} is ready.`);
    } catch (error) {
      setExportFailed(true);
      setExportMessage(error instanceof Error ? error.message : 'Unable to create marketing mockups.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <StudioShell
      header={<StudioHeader />}
      sidebar={(
        <>
          <VenuePanel sports={availableSports} selectedSport={selectedSport} selectedCompetition={selectedCompetition} selectedVenue={selectedVenue} competitions={competitions} venues={venues} loading={loading} catalogueError={sportsError || catalogueError} onSportChange={setSelectedSport} onCompetitionChange={setSelectedCompetition} onVenueChange={setSelectedVenue} onAddSport={addSport} onRetryCatalogue={() => setCatalogueRevision((current) => current + 1)} />
          <StylePanel selectedStyle={selectedStyle} posterModel={posterModel} onStyleChange={setSelectedStyle} />
        </>
      )}
      preview={<PreviewCanvas posterModel={posterModel} selectedStyle={selectedStyle} loading={loading} selectedConcept={selectedConcept} onConceptChange={setSelectedConcept} selectedFrame={selectedFrame} onFrameChange={setSelectedFrame} />}
      inspector={<VenueInspector parameters={posterParameters} selectedParameters={selectedParameters} onToggleParameter={toggleParameter} personalisation={personalisation} onPersonalisationChange={setPersonalisation} onResetStudio={resetStudio} exportSettings={exportSettings} onExportSettingsChange={setExportSettings} exporting={exporting} exportMessage={exportMessage} exportFailed={exportFailed} onExport={() => void exportPoster()} onExportPrintPackage={() => void exportPrintPackage()} onExportEtsyPackage={() => void exportEtsyPackage()} onExportSocialPackage={() => void exportSocialPackage()} onExportMarketingMockups={() => void exportMarketingMockups()} />}
    />
  );
}
