import manifest from "@/data/asset-manifest.json";

export type ManifestEntry = {
  width: number;
  height: number;
  hash: string;
  widths: number[];
  blur: string;
};

const entries = manifest as Record<string, ManifestEntry>;

export function getAsset(name: string): ManifestEntry | undefined {
  return entries[name];
}

export function assetUrl(name: string, entry: ManifestEntry, width: number, ext: string) {
  return `/assets/${name}-${width}.${entry.hash}.${ext}`;
}
