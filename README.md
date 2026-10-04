# Vansh Agicha: portfolio

A one-page portfolio for a growth marketing manager. It uses Next.js 16 and
plain CSS Modules, and the build output is plain static files.

```bash
npm install
npm run dev      # local preview
npm run build    # static site in out/
npm start        # serve out/ to check the production build
```

## Editing content

All the copy lives in `src/data/profile.ts`. Any link set to `null` (LinkedIn,
résumé, Amazon) is hidden until you fill it in.

## Adding assets

1. Put the original image in `assets-src/`, named after its slot (for
   example `acm-microsite.png`). `assets-src/README.md` lists every slot and
   its suggested shape.
2. Run `npm run assets`. This writes AVIF and WebP versions at 480, 960 and
   1600px wide to `public/assets/`, and updates
   `src/data/asset-manifest.json`.
3. Commit `public/assets/` and the manifest.

A slot with no file renders as a labelled empty frame of the same shape, so
the layout doesn't move when the real image arrives.

**Videos.** Compress them first. Then put the file in `public/video/`, set
`src` on its slot in `profile.ts` (for example `"/video/ok-reel.mp4"`), and
add an image with the same slot name to use as the poster.

```bash
ffmpeg -i in.mov -vf "scale=720:-2" -c:v libx264 -crf 28 -preset slow \
  -movflags +faststart -an public/video/ok-reel.mp4
```

Remove `-an` if the video needs sound.

**Résumé.** Put it at `public/resume.pdf` and set that résumé link's `href` to
`"/resume.pdf"`.

## Why it loads fast

- **Static HTML.** `output: "export"` builds plain files for a CDN, with no
  server.
- **No JavaScript for first paint.** Nothing on the page needs React in the browser, so
  `scripts/postbuild.mjs` removes the Next runtime (about 170 KB gzipped) and
  inlines the CSS. The page is about 6 KB of gzipped HTML, and nothing blocks
  rendering. If you ever add a `"use client"` component, take the postbuild
  step out of the `build` script.
- **One font file.** Inter as a single variable font (weight and optical
  size), latin only, self-hosted and preloaded (~73 KB). Headings use optical
  size 32, which is Inter Display. The ₹ sign is drawn from the system font
  (`src/components/Text`), because Inter keeps it in a separate ~130 KB file.
- **Images.** Each image is served as a `<picture>` with AVIF and WebP
  sources, `srcset`/`sizes`, and its real width and height (no layout shift).
  Images below the fold load lazily, the hero portrait loads with high
  priority, and a blurred preview of about 200 bytes is inlined while each
  image loads.
- **Video.** Videos use the native player with `preload="none"`, so only the
  poster loads with the page.
- **Caching.** Asset filenames include a content hash, so `vercel.json` can
  cache `/assets/*` permanently.

## Responsive type and spacing

`src/app/globals.css` defines a fluid type scale (`--step--1` … `--step-hero`)
and spacing scale (`--space-2xs` … `--space-2xl`) with `clamp()`. Every size
grows smoothly between a 360px and a 1440px screen, with no breakpoint jumps.
Use these tokens rather than fixed sizes.

## Animations

The animations are CSS only, so they need no JavaScript and run off the main
thread.

- The name slides up word by word when the page loads.
- Scroll-driven (`animation-timeline`): a progress line along the top, the
  hero portrait drifting away, the brand strip sliding sideways, sections and
  stats rising in (`.reveal`, staggered with `.stagger` and `--i`), and
  case-study images opening from the bottom.

Anything not animated is simply shown in its final state. That covers
browsers without scroll timelines, such as Firefox today, and visitors whose
system asks for reduced motion.

## 3D funnel (Three.js)

The particle funnel in the hero is `src/three/funnel.ts`. It isn't part of
the Next build. `scripts/postbuild.mjs` bundles it separately with esbuild
into `/js/funnel.<hash>.js` (~130 KB gzipped) and adds a small loader to the
page. The loader fetches the bundle only after the page has loaded and gone
idle, so the first paint is still plain HTML. It skips visitors who ask for
reduced motion or reduced data, and browsers without WebGL 2; they just see
the tile without it. Particle motion runs on the GPU, and rendering pauses
while the hero is off-screen or the tab is hidden.

Because the loader is added after the build, the funnel doesn't show in
`npm run dev`. Use `npm run build && npm start` to see it.

## Deploying (Vercel)

Import the repo; no settings to change. `vercel.json` already sets the build
command and the `out/` output folder.
