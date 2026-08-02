"use client";

import { useEffect, useState } from "react";

import { buildPosterModel } from "@/components/PosterGenerator/PosterModel";
import type { PosterContentId } from "@/components/PosterGenerator/PosterContent";
import VenueInspector from "@/components/Studio/Inspector/VenueInspector";
import type { StudioParameter } from "@/components/Studio/Sidebar/ParameterPanel";
import PreviewCanvas from "@/components/Studio/Preview/PreviewCanvas";
import StylePanel, { type StudioStyle } from "@/components/Studio/Sidebar/StylePanel";
import VenuePanel, { type StudioVenue } from "@/components/Studio/Sidebar/VenuePanel";
import StudioHeader from "@/components/Studio/StudioHeader";
import StudioShell from "@/components/Studio/StudioShell";

const sports = ["Formula 1", "Football", "Cricket", "Tennis", "Golf", "Rugby", "Olympic Venues", "Boxing"];

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
  const [selectedParameters, setSelectedParameters] = useState<PosterContentId[]>(["venueFacts", "venueMap", "collectorNumber"]);
  const [loading, setLoading] = useState(false);
  const [catalogueError, setCatalogueError] = useState("");

  useEffect(() => {
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
        setSelectedCompetition(items[0] ?? "");
      } catch (error) {
        setCatalogueError(error instanceof Error ? error.message : "Unable to load competitions.");
      } finally {
        setLoading(false);
      }
    }
    void loadCompetitions();
  }, [selectedSport]);

  useEffect(() => {
    if (!selectedCompetition) return;
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
        setSelectedVenue(items[0] ?? null);
      } catch (error) {
        setCatalogueError(error instanceof Error ? error.message : "Unable to load venues.");
      } finally {
        setLoading(false);
      }
    }
    void loadVenues();
  }, [selectedCompetition, selectedSport]);

  const toggleParameter = (parameter: PosterContentId) => {
    setSelectedParameters((current) => current.includes(parameter) ? current.filter((item) => item !== parameter) : [...current, parameter]);
  };
  const posterModel = selectedVenue ? buildPosterModel(selectedVenue, selectedStyle, selectedParameters) : null;

  return (
    <StudioShell
      header={<StudioHeader />}
      sidebar={(
        <>
          <VenuePanel sports={sports} selectedSport={selectedSport} selectedCompetition={selectedCompetition} selectedVenue={selectedVenue} competitions={competitions} venues={venues} loading={loading} catalogueError={catalogueError} onSportChange={setSelectedSport} onCompetitionChange={setSelectedCompetition} onVenueChange={setSelectedVenue} />
          <StylePanel selectedStyle={selectedStyle} posterModel={posterModel} onStyleChange={setSelectedStyle} />
        </>
      )}
      preview={<PreviewCanvas posterModel={posterModel} selectedStyle={selectedStyle} loading={loading} />}
      inspector={<VenueInspector parameters={posterParameters} selectedParameters={selectedParameters} onToggleParameter={toggleParameter} />}
    />
  );
}
