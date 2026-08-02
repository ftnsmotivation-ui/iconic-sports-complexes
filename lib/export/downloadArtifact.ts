import type { ExportArtifact } from './ExportService';

export function downloadArtifact(artifact: ExportArtifact): void {
  const bytes = new Uint8Array(artifact.bytes.byteLength);
  bytes.set(artifact.bytes);
  const blob = new Blob([bytes.buffer], { type: artifact.mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = artifact.filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
