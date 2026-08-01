import { getVenueByName } from
  "@/components/PosterEngine/Data/VenueRepository";
  import { resolveVenueDNA } from "@/components/PosterEngine/DNA";
import { resolveTheme } from "@/components/PosterEngine/Themes";
import { resolveLayout } from "@/components/PosterEngine/Layouts";
import {
  buildPrompt,
  resolveIllustration,
} from "@/components/PosterEngine/Illustration";
import { PosterRenderer } from "@/components/PosterEngine/Renderer/PosterRenderer";

export default function EnginePreviewPage() {
  const venue = getVenueByName(
  "Cricket",
  "Eden Gardens",
);

const venueName = venue.venueName;
  
    const dna = resolveVenueDNA(venueName);
  const theme = resolveTheme(dna);
  const layout = resolveLayout(dna);
  const illustration = resolveIllustration(dna);

  const prompt = buildPrompt(
    dna,
    theme,
    layout,
    illustration,
  );
  
    const facts = [
  {
    label: "Opened",
    value: String(venue.opened),
  },
  {
    label: "Capacity",
    value: venue.capacity.toLocaleString("en-IN"),
  },
  {
    label: "Surface",
    value: venue.surface,
  },
];

  const model = {
  venueName,

  city: venue.city,
  country: venue.country,

  facts,

  dna,
  theme,
  layout,
  illustration,
  prompt,
};

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#111827",
      }}
    >
      <div
        style={{
          width: "500px",
          margin: "0 auto",
          background: "white",
        }}
      >
        <PosterRenderer model={model} />
      </div>
    </main>
  );
}