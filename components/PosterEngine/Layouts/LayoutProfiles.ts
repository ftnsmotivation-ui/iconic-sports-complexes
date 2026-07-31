import type { LayoutProfile } from "./LayoutTypes";

export const layoutProfiles: Record<string, LayoutProfile> = {
  collector: {
    id: "collector",

    name: "Collector Edition",

    style: "Collector",

    title: {
      id: "title",
      x: 80,
      y: 60,
      width: 840,
      height: 80,
    },

    subtitle: {
      id: "subtitle",
      x: 80,
      y: 150,
      width: 840,
      height: 40,
    },

    hero: {
      id: "hero",
      x: 60,
      y: 220,
      width: 880,
      height: 700,
    },

    information: {
      id: "information",
      x: 80,
      y: 950,
      width: 420,
      height: 280,
    },

    map: {
      id: "map",
      x: 540,
      y: 950,
      width: 380,
      height: 280,
    },

    timeline: {
      id: "timeline",
      x: 80,
      y: 1260,
      width: 840,
      height: 80,
    },

    statistics: {
      id: "statistics",
      x: 80,
      y: 1360,
      width: 840,
      height: 140,
    },

    footer: {
      id: "footer",
      x: 60,
      y: 1540,
      width: 880,
      height: 60,
    },
  },
};

export const defaultLayout = layoutProfiles.collector;