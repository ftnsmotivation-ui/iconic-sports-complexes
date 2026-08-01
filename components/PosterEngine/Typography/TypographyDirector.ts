export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number | string;
  letterSpacing: number;
  fill: string;
}

export function getVenueTitleStyle(): TypographyStyle {
  return {
    fontFamily: "Georgia, serif",
    fontSize: 38,
    fontWeight: 700,
    letterSpacing: 2,
    fill: "#37342F",
  };
}