// components/PosterEngine/Themes/ThemeTypes.ts

export type BackgroundStyle =
  | "Solid"
  | "Gradient"
  | "Paper"
  | "Blueprint"
  | "Marble"
  | "Canvas";

export type BorderStyle =
  | "None"
  | "FineLine"
  | "ArtDeco"
  | "Museum"
  | "Double";

export type TextureStyle =
  | "None"
  | "Paper"
  | "Canvas"
  | "Stone"
  | "Linen";

export type FrameRecommendation =
  | "Black"
  | "Walnut"
  | "Oak"
  | "White"
  | "NoFrame";

export interface PosterTheme {
  id: string;

  name: string;

  description: string;

  background: BackgroundStyle;

  texture: TextureStyle;

  border: BorderStyle;

  colours: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    panel: string;
  };

  titleFont: string;

  bodyFont: string;

  mapStyle:
    | "Classic"
    | "Minimal"
    | "Technical";

  iconStyle:
    | "Line"
    | "Filled"
    | "Luxury";

  frameRecommendation: FrameRecommendation;

  paperStyle:
    | "Museum Matte"
    | "Fine Art Cotton"
    | "Premium Satin";

  decorativeElements: string[];
}