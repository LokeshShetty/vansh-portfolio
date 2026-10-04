// Turns raw uploads in assets-src/ into small, cache-safe files in
// public/assets/ and records what it made in src/data/asset-manifest.json.
//
//   assets-src/inbound-microsite.png
//     -> public/assets/inbound-microsite-480.3f9a1c2b.avif (+ .webp, per width)
//
// The page reads the manifest, so dropping a file in and re-running is the
// whole upload flow. Filenames carry a content hash, which is what lets
// vercel.json cache /assets/* forever.

import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { extname, basename, join } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "assets-src");
const OUT = join(ROOT, "public/assets");
const MANIFEST = join(ROOT, "src/data/asset-manifest.json");

// Covers a phone at 1x up to a half-width desktop column at 2x.
const WIDTHS = [480, 960, 1600];
const IMAGE_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".tif",
  ".tiff",
]);

const files = (await readdir(SRC)).filter((f) =>
  IMAGE_EXT.has(extname(f).toLowerCase()),
);

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, ".gitkeep"), "");

const manifest = {};

for (const file of files.sort()) {
  const name = basename(file, extname(file)).toLowerCase();
  const input = await readFile(join(SRC, file));
  const hash = createHash("sha256").update(input).digest("hex").slice(0, 8);
  const image = sharp(input).rotate(); // honour EXIF orientation
  const { width, height } = await image.metadata();

  // Never upscale; always keep at least one size.
  const widths = WIDTHS.filter((w) => w < width);
  if (widths.length === 0 || widths.at(-1) < width)
    widths.push(Math.min(width, WIDTHS.at(-1)));
  const unique = [...new Set(widths)];

  for (const w of unique) {
    const resized = image.clone().resize({ width: w });
    await resized
      .clone()
      .avif({ quality: 50, effort: 6 })
      .toFile(join(OUT, `${name}-${w}.${hash}.avif`));
    await resized
      .clone()
      .webp({ quality: 72 })
      .toFile(join(OUT, `${name}-${w}.${hash}.webp`));
  }

  // ~200 byte blurred preview, inlined as the image background while it loads.
  const blur = await image
    .clone()
    .resize({ width: 16 })
    .webp({ quality: 40 })
    .toBuffer();

  manifest[name] = {
    width,
    height,
    hash,
    widths: unique,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  console.log(`✓ ${file} → ${name} (${unique.join(", ")}w)`);
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `\n${files.length} image(s) written to public/assets, manifest updated.`,
);
