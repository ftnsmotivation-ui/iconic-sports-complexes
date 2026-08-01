import type { VenueDNA } from "../DNA/DnaTypes";
import type { LayoutProfile } from "../Layouts";

export function chooseLayout(
  dna: VenueDNA,
  layouts: LayoutProfile[]
): LayoutProfile {

  if (dna.sport === "Formula 1") {
    return layouts[0];
  }

  if (dna.sport === "Football") {
    return layouts[1];
  }

  if (dna.sport === "Golf") {
    return layouts[2];
  }

  return layouts[0];
}