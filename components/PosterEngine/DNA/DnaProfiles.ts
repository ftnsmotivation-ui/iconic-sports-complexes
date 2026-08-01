import type { VenueDNA } from "./DnaTypes";
import { defaultDesignDNA } from "./DefaultDesignDNA";

export const dnaProfiles: Record<string, VenueDNA> = {
  "monaco-grand-prix": {
    ...defaultDesignDNA,venue: "Circuit de Monaco",
    sport: "Formula 1",
    competition: "Monaco Grand Prix",
    moods: ["Prestigious", "Elegant", "Historic", "Technical", "Iconic"],
    primaryStyle: "Collector",
    colourPalette: ["#07111F", "#C6A45A", "#E7E1D6", "#8E1B1B"],
    heroFocus: "The harbour section, yachts and tightly enclosed street circuit",
    atmosphere: "Mediterranean twilight with restrained golden illumination",
    typography: "Luxury",
    informationDensity: "Balanced",
    illustrationPriority: "Track",
    preferredLayouts: ["CinematicHero", "CollectorEditorial", "AtlasOverlay"],
    signatureElements: [
      "Harbour",
      "Yachts",
      "Casino district",
      "Tunnel",
      "Street circuit",
      "Mediterranean coastline",
    ],
  heroStyle: "Action",

mapStyle: "Circuit",

headerStyle: "Editorial",

borderStyle: "Museum",

footerStyle: "Collector",

illustrationStyle: "ModernVector",},

  "eden-gardens": {
    ...defaultDesignDNA,
    venue: "Eden Gardens",
    sport: "Cricket",
    competition: "International Cricket",
    moods: ["Historic", "Passionate", "Electric", "Legendary", "Iconic"],
    primaryStyle: "Heritage",
    colourPalette: ["#081711", "#B99146", "#E6DDC8", "#7C1E20"],
    heroFocus: "The grandstands, floodlights and immense match-day atmosphere",
    atmosphere: "Dramatic evening under floodlights with a sense of history",
    typography: "Classic",
    informationDensity: "Rich",
    illustrationPriority: "Architecture",
    preferredLayouts: ["HeritageMonument", "CinematicHero", "TimelineEditorial"],
    signatureElements: [
      "Floodlight towers",
      "Historic grandstands",
      "Cricket pitch",
      "Kolkata skyline",
      "Roaring crowd",
      "Heritage timeline",
    ],
  heroStyle: "Architectural",

mapStyle: "Atlas",

headerStyle: "Luxury",

borderStyle: "Museum",

footerStyle: "Collector",

illustrationStyle: "Engraving",},

  "wimbledon-centre-court": {
    venue: "Wimbledon Centre Court",
    sport: "Tennis",
    competition: "The Championships, Wimbledon",
    moods: ["Royal", "Elegant", "Historic", "Prestigious", "Iconic"],
    primaryStyle: "Collector",
    colourPalette: ["#112B1F", "#D7C9A1", "#F3F0E7", "#5C2A72"],
    heroFocus: "Centre Court framed by ivy, grass and refined architectural detail",
    atmosphere: "Soft English summer light with ceremonial calm",
    typography: "Classic",
    informationDensity: "Minimal",
    illustrationPriority: "Architecture",
    preferredLayouts: ["GalleryMinimal", "HeritageMonument", "CollectorEditorial"],
    signatureElements: [
      "Grass court",
      "Ivy",
      "Royal Box",
      "Centre Court roof",
      "Purple and green identity",
      "Championship traditions",
    ],
  heroStyle: "Architectural",

mapStyle: "Atlas",

headerStyle: "Luxury",

borderStyle: "Museum",

footerStyle: "Collector",

illustrationStyle: "Engraving",},

  "santiago-bernabeu": {
    ...defaultDesignDNA,
    venue: "Santiago Bernabéu Stadium",
    sport: "Football",
    competition: "Club Football",
    moods: ["Prestigious", "Modern", "Legendary", "Electric", "Iconic"],
    primaryStyle: "Editorial",
    colourPalette: ["#07101B", "#D6D9DD", "#F3F4F5", "#B5964D"],
    heroFocus: "The monumental exterior and luminous match-night atmosphere",
    atmosphere: "Night-time architectural drama with controlled white light",
    typography: "Modern",
    informationDensity: "Balanced",
    illustrationPriority: "Architecture",
    preferredLayouts: ["CinematicHero", "EditorialGrid", "CollectorEditorial"],
    signatureElements: [
      "Illuminated facade",
      "European nights",
      "Madrid skyline",
      "Championship heritage",
      "Stadium bowl",
      "Collector inscription",
    ],
  },

  "camp-nou": {
    ...defaultDesignDNA,venue: "Camp Nou",
    sport: "Football",
    competition: "Club Football",
    moods: ["Historic", "Passionate", "Legendary", "Electric", "Iconic"],
    primaryStyle: "Heritage",
    colourPalette: ["#07152A", "#A61B34", "#D4A342", "#E8E1D5"],
    heroFocus: "The sweeping stadium bowl and emotionally charged crowd",
    atmosphere: "Deep evening tones with warm stadium illumination",
    typography: "Classic",
    informationDensity: "Balanced",
    illustrationPriority: "Crowd",
    preferredLayouts: ["CinematicHero", "HeritageMonument", "TimelineEditorial"],
    signatureElements: [
      "Stadium bowl",
      "Barcelona skyline",
      "Match-night crowd",
      "Club colours",
      "European heritage",
      "Historic moments",
    ],
  },
};

export const defaultVenueDNA: VenueDNA = {
  venue: "Unknown Venue",
  sport: "Other",
  moods: ["Iconic"],
  primaryStyle: "Collector",
  colourPalette: ["#0A0F18", "#C5A15A", "#E8E2D8", "#6B7280"],
  heroFocus: "The venue's defining architectural form",
  atmosphere: "Dramatic, refined and suitable for a premium collector print",
  typography: "Luxury",
  informationDensity: "Balanced",
  illustrationPriority: "Venue",
  preferredLayouts: ["CinematicHero", "CollectorEditorial"],
  signatureElements: ["Venue silhouette", "Location", "Heritage details"],
};