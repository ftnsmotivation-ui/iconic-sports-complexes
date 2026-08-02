import type { ExportArtifact } from './ExportService';

interface ZipEntry {
  path: string;
  bytes: Uint8Array;
}

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) crc = (crc & 1) ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
  return crc >>> 0;
});

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  bytes.forEach((byte) => { crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8); });
  return (crc ^ 0xffffffff) >>> 0;
}

function header(length: number): { bytes: Uint8Array; view: DataView } {
  const bytes = new Uint8Array(length);
  return { bytes, view: new DataView(bytes.buffer) };
}

function join(parts: readonly Uint8Array[]): Uint8Array {
  const length = parts.reduce((total, part) => total + part.byteLength, 0);
  if (length > 0xffffffff) throw new Error('Print package exceeds the 4 GB classic ZIP limit. Reduce DPI or export sizes separately.');
  const result = new Uint8Array(length);
  let offset = 0;
  parts.forEach((part) => { result.set(part, offset); offset += part.byteLength; });
  return result;
}

export function createZipArchive(entries: readonly ZipEntry[], filename: string): ExportArtifact {
  const encoder = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let localOffset = 0;

  entries.forEach((entry) => {
    const name = encoder.encode(entry.path.replace(/^\/+/, ''));
    const crc = crc32(entry.bytes);
    const local = header(30);
    local.view.setUint32(0, 0x04034b50, true); local.view.setUint16(4, 20, true); local.view.setUint16(6, 0x0800, true); local.view.setUint32(14, crc, true); local.view.setUint32(18, entry.bytes.byteLength, true); local.view.setUint32(22, entry.bytes.byteLength, true); local.view.setUint16(26, name.byteLength, true);
    localParts.push(local.bytes, name, entry.bytes);

    const central = header(46);
    central.view.setUint32(0, 0x02014b50, true); central.view.setUint16(4, 20, true); central.view.setUint16(6, 20, true); central.view.setUint16(8, 0x0800, true); central.view.setUint32(16, crc, true); central.view.setUint32(20, entry.bytes.byteLength, true); central.view.setUint32(24, entry.bytes.byteLength, true); central.view.setUint16(28, name.byteLength, true); central.view.setUint32(42, localOffset, true);
    centralParts.push(central.bytes, name);
    localOffset += local.bytes.byteLength + name.byteLength + entry.bytes.byteLength;
  });

  const centralBytes = join(centralParts);
  const end = header(22);
  end.view.setUint32(0, 0x06054b50, true); end.view.setUint16(8, entries.length, true); end.view.setUint16(10, entries.length, true); end.view.setUint32(12, centralBytes.byteLength, true); end.view.setUint32(16, localOffset, true);
  return { bytes: join([...localParts, centralBytes, end.bytes]), filename, mimeType: 'application/zip' };
}
