import type { LayoutProfile } from "./LayoutTypes";
import { Grid } from "./Grid";

const contentWidth = Grid.pageWidth - Grid.margin * 2;

const columnWidth = (contentWidth - Grid.gutter) / 2;

const leftColumnX = Grid.margin;

const rightColumnX =
  Grid.margin + columnWidth + Grid.gutter;

export const layoutProfiles: Record<string, LayoutProfile> = {
  collector: {
    id: "collector",

    name: "Collector Edition",

    style: "Collector",

    title: {
      id: "title",
      x: Grid.margin,
      y: 60,
      width: contentWidth,
      height: 80,
    },

    subtitle: {
      id: "subtitle",
      x: Grid.margin,
      y: 150,
      width: contentWidth,
      height: 40,
    },

    hero: {
      id: "hero",
      x: Grid.margin,
      y: 220,
      width: contentWidth,
      height: 700,
    },

    information: {
      id: "information",
      x: leftColumnX,
      y: 950,
      width: columnWidth,
      height: 280,
    },

    map: {
      id: "map",
      x: rightColumnX,
      y: 950,
      width: columnWidth,
      height: 280,
    },

    timeline: {
      id: "timeline",
      x: Grid.margin,
      y: 1260,
      width: contentWidth,
      height: 80,
    },

    statistics: {
      id: "statistics",
      x: Grid.margin,
      y: 1360,
      width: contentWidth,
      height: 140,
    },

    footer: {
      id: "footer",
      x: Grid.margin,
      y: 1520,
      width: contentWidth,
      height: 40,
    },
  },
};

export const defaultLayout = layoutProfiles.collector;