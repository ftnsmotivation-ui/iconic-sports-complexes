import type { VenueDNA } from "../DNA";
import type { PosterTheme } from "../Themes";
import type { LayoutProfile } from "../Layouts";
import type { IllustrationProfile } from "../Illustrations";

export interface PosterRenderModel {
  venueName: string;

  dna: VenueDNA;

  theme: PosterTheme;

  layout: LayoutProfile;

  illustration: IllustrationProfile;

  prompt: string;
}

export interface PosterRendererProps {
  model: PosterRenderModel;
}