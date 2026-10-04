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
- **No JavaScript.** Nothing on the page needs React in the browser, so
  `scripts/postbuild.mjs` removes the Next runtime (about 170 KB gzipped) and
  inlines the CSS. The page is about 6 KB of gzipped HTML, and nothing blocks
  rendering. If you ever add a `"use client"` component, take the postbuild
  step out of the `build` script.
- **One font.** Instrument Serif, regular weight only, self-hosted and
  preloaded. Body text uses the system font.
- **Images.** Each image is served as a `<picture>` with AVIF and WebP
  sources, `srcset`/`sizes`, and its real width and height (no layout shift).
  Images below the fold load lazily, the hero portrait loads with high
  priority, and a blurred preview of about 200 bytes is inlined while each
  image loads.
- **Video.** Videos use the native player with `preload="none"`, so only the
  poster loads with the page.
- **Caching.** Asset filenames include a content hash, so `vercel.json` can
  cache `/assets/*` permanently.

## Deploying (Vercel)

Import the repo; no settings to change. `vercel.json` already sets the build
command and the `out/` output folder.
