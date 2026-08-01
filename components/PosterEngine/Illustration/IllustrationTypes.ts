export type IllustrationStyle =
  | "Vector"
  | "Painterly"
  | "Blueprint"
  | "Engraving"
  | "Watercolour"
  | "Vintage";

export type LightingStyle =
  | "Morning"
  | "Golden Hour"
  | "Daylight"
  | "Night";

export type CameraAngle =
  | "Aerial"
  | "Three Quarter"
  | "Front"
  | "Isometric";

export interface IllustrationProfile {
  id: string;

  name: string;

  style: IllustrationStyle;

  lighting: LightingStyle;

  camera: CameraAngle;

  includePeople: boolean;

  includeSky: boolean;

  includeLandscape: boolean;

  emphasis: string[];

  avoid: string[];
}
export interface IllustrationProps {
  venue: string;
  x: number;
  y: number;
  width: number;
  height: number;
}