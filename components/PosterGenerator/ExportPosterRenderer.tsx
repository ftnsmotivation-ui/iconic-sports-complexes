import type { PosterModel } from './PosterModel';
import CinematicHeroPoster from './CinematicHeroPoster';

export default function ExportPosterRenderer({ model }: { model: PosterModel }) {
  return (
    <div data-export-artwork="true" style={{ width: 800, height: 1100, overflow: 'hidden' }}>
      <CinematicHeroPoster model={model} presentation="export"/>
    </div>
  );
}
