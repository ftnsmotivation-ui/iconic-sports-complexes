import type { PosterTheme } from "./ThemeTypes";

export const themeProfiles: Record<string, PosterTheme> = {
  "collector-noir": {
    id: "collector-noir",
    name: "Collector Noir",
    description:
      "A restrained luxury theme with deep dark tones, warm metallic accents and museum-style detailing.",

    background: "Gradient",
    texture: "Paper",
    border: "Museum",

    colours: {
      primary: "#07111F",
      secondary: "#111827",
      accent: "#C6A45A",
      text: "#F3EFE6",
      panel: "#0D1726",
    },

    titleFont: "Cormorant Garamond",
    bodyFont: "Inter",

    mapStyle: "Minimal",
    iconStyle: "Luxury",

    frameRecommendation: "Walnut",
    paperStyle: "Museum Matte",

    decorativeElements: [
      "Fine gold rules",
      "Collector edition badge",
      "Subtle compass rose",
      "Restrained corner detailing",
    ],
  },

  "heritage-parchment": {
    id: "heritage-parchment",
    name: "Heritage Parchment",
    description:
      "A historic editorial theme inspired by archival sporting programmes, cartography and aged fine-art paper.",

    background: "Paper",
    texture: "Linen",
    border: "FineLine",

    colours: {
      primary: "#E8DDC7",
      secondary: "#CDBB9A",
      accent: "#8A663E",
      text: "#27231D",
      panel: "#F2E9D8",
    },

    titleFont: "Libre Baskerville",
    bodyFont: "Source Sans 3",

    mapStyle: "Classic",
    iconStyle: "Line",

    frameRecommendation: "Oak",
    paperStyle: "Fine Art Cotton",

    decorativeElements: [
      "Archival date markers",
      "Historic timeline",
      "Cartographic linework",
      "Subtle paper ageing",
    ],
  },

  "technical-blueprint": {
    id: "technical-blueprint",
    name: "Technical Blueprint",
    description:
      "A precise architectural theme suited to circuits, stadium structures and engineering-focused collector editions.",

    background: "Blueprint",
    texture: "None",
    border: "Double",

    colours: {
      primary: "#0A2540",
      secondary: "#12395B",
      accent: "#E8F1F7",
      text: "#F5FAFD",
      panel: "#0E2E4D",
    },

    titleFont: "Rajdhani",
    bodyFont: "IBM Plex Sans",

    mapStyle: "Technical",
    iconStyle: "Line",

    frameRecommendation: "Black",
    paperStyle: "Premium Satin",

    decorativeElements: [
      "Measurement lines",
      "Technical annotations",
      "Coordinate grid",
      "Architectural section marks",
    ],
  },

  "museum-gallery": {
    id: "museum-gallery",
    name: "Museum Gallery",
    description:
      "A quiet, spacious theme that gives the hero illustration maximum authority and uses minimal supporting information.",

    background: "Solid",
    texture: "None",
    border: "None",

    colours: {
      primary: "#ECE9E1",
      secondary: "#D6D1C6",
      accent: "#1F2933",
      text: "#171717",
      panel: "#F4F1EA",
    },

    titleFont: "Bodoni Moda",
    bodyFont: "Helvetica Neue",

    mapStyle: "Minimal",
    iconStyle: "Line",

    frameRecommendation: "White",
    paperStyle: "Fine Art Cotton",

    decorativeElements: [
      "Large breathing space",
      "Small curator caption",
      "Minimal edition numbering",
      "Gallery-style title placement",
    ],
  },

  "championship-green": {
    id: "championship-green",
    name: "Championship Green",
    description:
      "A refined sporting theme inspired by grass courts, golf courses, cricket grounds and traditional championship venues.",

    background: "Gradient",
    texture: "Canvas",
    border: "FineLine",

    colours: {
      primary: "#102A20",
      secondary: "#1B4433",
      accent: "#D2B56B",
      text: "#F1EBDD",
      panel: "#17382B",
    },

    titleFont: "Cinzel",
    bodyFont: "Inter",

    mapStyle: "Classic",
    iconStyle: "Luxury",

    frameRecommendation: "Oak",
    paperStyle: "Museum Matte",

    decorativeElements: [
      "Botanical line details",
      "Championship crest treatment",
      "Fine gold dividers",
      "Traditional sporting motifs",
    ],
  },
};

export const defaultPosterTheme: PosterTheme =
  themeProfiles["collector-noir"];