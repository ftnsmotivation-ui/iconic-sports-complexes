import type { IllustrationProfile } from "./IllustrationTypes";

export const illustrationProfiles: Record<
  string,
  IllustrationProfile
> = {
  "monaco-luxury-vector": {
    id: "monaco-luxury-vector",

    name: "Monaco Luxury Vector",

    style: "Vector",

    lighting: "Golden Hour",

    camera: "Aerial",

    includePeople: true,

    includeSky: true,

    includeLandscape: true,

    emphasis: [
      "Mediterranean harbour",
      "Luxury yachts",
      "Historic street circuit",
      "Dense hillside architecture",
      "Elegant coastal atmosphere",
    ],

    avoid: [
      "Incorrect circuit layout",
      "Oversized racing cars",
      "Modern corporate billboards",
      "Photorealistic rendering",
      "Cluttered composition",
    ],
  },

  "football-cathedral": {
    id: "football-cathedral",

    name: "Football Cathedral",

    style: "Vector",

    lighting: "Night",

    camera: "Three Quarter",

    includePeople: true,

    includeSky: true,

    includeLandscape: false,

    emphasis: [
      "Monumental stadium architecture",
      "Floodlit atmosphere",
      "Crowd energy",
      "Strong structural geometry",
      "Sense of scale",
    ],

    avoid: [
      "Incorrect seating colours",
      "Generic stadium design",
      "Distorted roof structure",
      "Visible sponsor logos",
      "Empty atmosphere",
    ],
  },

  "heritage-cricket": {
    id: "heritage-cricket",

    name: "Heritage Cricket",

    style: "Vintage",

    lighting: "Daylight",

    camera: "Three Quarter",

    includePeople: true,

    includeSky: true,

    includeLandscape: true,

    emphasis: [
      "Historic pavilion",
      "Traditional cricket field",
      "Crowd terraces",
      "Architectural heritage",
      "Ceremonial sporting atmosphere",
    ],

    avoid: [
      "Modern advertising clutter",
      "Incorrect field proportions",
      "Baseball-style visual language",
      "Overcrowded foreground",
      "Photographic realism",
    ],
  },

  "championship-tennis": {
    id: "championship-tennis",

    name: "Championship Tennis",

    style: "Watercolour",

    lighting: "Morning",

    camera: "Three Quarter",

    includePeople: true,

    includeSky: true,

    includeLandscape: true,

    emphasis: [
      "Elegant centre court",
      "Manicured playing surface",
      "Refined spectator atmosphere",
      "Botanical surroundings",
      "Calm prestige",
    ],

    avoid: [
      "Harsh neon colours",
      "Incorrect court markings",
      "Oversized players",
      "Crowded typography",
      "Aggressive visual effects",
    ],
  },

  "golf-landscape": {
    id: "golf-landscape",

    name: "Golf Landscape",

    style: "Painterly",

    lighting: "Morning",

    camera: "Aerial",

    includePeople: false,

    includeSky: true,

    includeLandscape: true,

    emphasis: [
      "Course contours",
      "Signature hole",
      "Natural landscape",
      "Tree lines",
      "Water features",
      "Atmospheric depth",
    ],

    avoid: [
      "Urban clutter",
      "Oversized golfers",
      "Incorrect hole routing",
      "Artificial greens",
      "Heavy visual noise",
    ],
  },

  "boxing-drama": {
    id: "boxing-drama",

    name: "Boxing Drama",

    style: "Engraving",

    lighting: "Night",

    camera: "Front",

    includePeople: true,

    includeSky: false,

    includeLandscape: false,

    emphasis: [
      "Illuminated boxing ring",
      "Arena spotlights",
      "Intense crowd atmosphere",
      "Historic sporting drama",
      "Strong contrast",
    ],

    avoid: [
      "Graphic violence",
      "Recognisable fighter likenesses",
      "Modern sponsor branding",
      "Cartoon appearance",
      "Distracting background detail",
    ],
  },
};

export const defaultIllustrationProfile =
  illustrationProfiles["monaco-luxury-vector"];