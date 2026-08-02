import type { VenueDNA } from "../DNA";
import type { PosterTheme } from "../Themes";
import type { LayoutProfile } from "../Layouts";
import type { IllustrationProfile } from "../Illustration";
import type { PosterFact } from "./FactTypes";

export interface PosterRenderModel {
  venueName: string;

  facts: PosterFact[];

  city: string;

  country: string;

  dna: VenueDNA;

  theme: PosterTheme;

  layout: LayoutProfile;

  illustration: IllustrationProfile;

  prompt: string;
}
export interface PosterRendererProps {
  model: PosterRenderModel;
}