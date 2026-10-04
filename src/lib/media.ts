import type { ImageMetadata } from "astro";

// Every image in src/assets/media, keyed by file name without extension.
// A slot in profile.ts whose name has no file here renders as a placeholder.
const files = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/media/*.{jpg,jpeg,png,webp,avif,tif,tiff}",
  { eager: true },
);

const byName = new Map(
  Object.entries(files).map(([path, mod]) => [
    path
      .split("/")
      .pop()!
      .replace(/\.[^.]+$/, "")
      .toLowerCase(),
    mod.default,
  ]),
);

export function getMedia(name: string): ImageMetadata | undefined {
  return byName.get(name);
}

/** Widths to generate: covers a phone at 1x up to a half-width column at 2x, never upscaled. */
export function widthsFor(image: ImageMetadata) {
  const widths = [480, 960, 1600].filter((w) => w < image.width);
  return [...widths, Math.min(image.width, 1600)];
}
