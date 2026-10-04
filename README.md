# Vansh Agicha: portfolio

A one-page portfolio for a growth marketing manager, built with
[Astro](https://astro.build) and plain CSS Modules. The build output is plain
static files.

```bash
npm install
npm run dev       # local preview, 3D funnel included
npm run build     # static site in dist/
npm run preview   # serve dist/ to check the production build
npm run check     # type-check .astro and .ts files
```

## Where things live

| Path                     | What                                                       |
| ------------------------ | ---------------------------------------------------------- |
| `src/data/profile.ts`    | All the copy: stats, case studies, book, experience, links |
| `src/assets/media/`      | Images; drop a file in, named after its slot               |
| `src/pages/index.astro`  | The page: puts the sections in order                       |
| `src/sections/`          | Hero, Brands, CaseStudy, Book, Background, Footer          |
| `src/components/`        | Asset (images), Video, Text, Funnel                        |
| `src/three/funnel.ts`    | The Three.js particle funnel                               |
| `src/styles/globals.css` | Colours, fluid type and spacing scales, scroll animations  |

Any link set to `null` in `profile.ts` (LinkedIn, résumé, Amazon) is hidden
until you fill it in.

## Adding assets

Put the original image in `src/assets/media/`, named after its slot (for
example `acm-microsite.png`). `src/assets/media/README.md` lists every slot.
That's it: on build, Astro generates AVIF and WebP versions at 480, 960 and
1600px wide (never upscaled), with real dimensions and hashed filenames. A
slot with no file renders as a labelled empty frame of the same shape, so the
layout doesn't move when the real image arrives.

**Videos.** Compress them first. Then put the file in `public/video/`, set
`src` on its slot in `profile.ts` (for example `"/video/ok-reel.mp4"`), and
add an image with the same slot name to use as the poster.

```bash
ffmpeg -i in.mov -vf "scale=720:-2" -c:v libx264 -crf 28 -preset slow \
  -movflags +faststart -an public/video/ok-reel.mp4
```

Remove `-an` if the video needs sound.

**Résumé.** Put it at `public/resume.pdf` and set that résumé link's `href`
to `"/resume.pdf"`.

## Why it loads fast

- **Static HTML, no framework runtime.** Astro ships no JavaScript unless a
  component asks for it. The page is about 9 KB of gzipped HTML, with the CSS
  inlined (`build.inlineStylesheets: "always"`), so nothing blocks rendering.
- **One font file.** Inter as a single variable font (weight and optical
  size), self-hosted from Fontsource. Only the Latin file (~73 KB) is
  preloaded and used. Headings use optical size 32, which is Inter Display.
  The ₹ sign is drawn from the system font (`components/Text.astro`), because
  Inter keeps it in a separate ~130 KB file.
- **Images.** Every image becomes a `<picture>` with AVIF and WebP sources,
  `srcset`/`sizes`, and real width and height. Images below the fold load
  lazily, and the hero portrait loads with high priority.
- **Video.** Videos use the native player with `preload="none"`, so only the
  poster loads with the page.
- **Caching.** Everything in `/_astro/` has a content hash in its filename, so
  `vercel.json` caches it permanently.

## 3D funnel (Three.js)

`components/Funnel.astro` holds the canvas and a ~1 KB loader script. The
loader imports `src/three/funnel.ts`, and Astro splits three.js into its own
chunk (~130 KB gzipped), downloaded only after the page has loaded and gone
idle. Visitors who ask for reduced motion or reduced data, and browsers
without WebGL 2, never download it; they see the tile without it. Particle
motion runs on the GPU, and rendering pauses while the hero is off-screen or
the tab is hidden.

## Responsive type and spacing

`src/styles/globals.css` defines a fluid type scale (`--step--1` …
`--step-hero`) and spacing scale (`--space-2xs` … `--space-2xl`) with
`clamp()`. Every size grows smoothly between a 360px and a 1440px screen,
with no breakpoint jumps. Use these tokens rather than fixed sizes.

## Animations

Apart from the funnel, the animations are CSS only, so they need no
JavaScript and run off the main thread.

- The name slides up word by word when the page loads.
- Scroll-driven (`animation-timeline`): a progress line along the top, the
  hero portrait zooming as you scroll away, the brand strip sliding sideways,
  tiles and stats rising in (`.reveal`, staggered with `.stagger` and `--i`),
  meters filling, and case-study images opening from the bottom.

Anything not animated is simply shown in its final state. That covers
browsers without scroll timelines, such as Firefox today, and visitors whose
system asks for reduced motion.

## Deploying (Vercel)

Import the repo; no settings to change. `vercel.json` already sets the build
command and the `dist/` output folder.
