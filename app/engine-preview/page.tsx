import { resolveVenueDNA } from "@/components/PosterEngine/DNA";
import { resolveTheme } from "@/components/PosterEngine/Themes";
import { resolveLayout } from "@/components/PosterEngine/Layouts";
import {
  buildPrompt,
  resolveIllustration,
} from "@/components/PosterEngine/Illustrations";
import { PosterRenderer } from "@/components/PosterEngine/Renderer/PosterRenderer";

export default function EnginePreviewPage() {
  const venueName = "Eden Gardens";

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

  const model = {
    venueName,
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