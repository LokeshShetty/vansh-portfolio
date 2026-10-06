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

| Path                        | What                                                                            |
| --------------------------- | ------------------------------------------------------------------------------- |
| `src/data/profile.ts`       | Copy: intro, statement, stats, brands, book, experience, links                  |
| `src/content/work/`         | One Markdown file per case study (card and its own page)                        |
| `src/assets/media/`         | Images; drop a file in, named after its slot                                    |
| `src/pages/index.astro`     | The home page: puts the sections in order                                       |
| `src/pages/work/[id].astro` | A page per case study, at `/work/<id>/`                                         |
| `src/sections/`             | Hero, Brands, Statement, CaseStudy, CaseRow, Products, Book, Background, Footer |
| `src/components/`           | Asset (images), Video, Text, Funnel                                             |
| `src/three/funnel.ts`       | The Three.js particle funnel                                                    |
| `src/styles/globals.css`    | Colours, fluid type and spacing scales, scroll animations                       |

Any link set to `null` in `profile.ts` (LinkedIn, résumé, Amazon) is hidden
until you fill it in.

## Case studies

Each project is a Markdown file in `src/content/work/`. The frontmatter
(order, kicker, title, summary, what he did, results, assets) drives both the
card on the home page and the top of the project's own page at
`/work/<file-name>/`. The Markdown body underneath is the full write-up. Each
file starts with an outline in an HTML comment; nothing shows on the page
until real text is written. Projects with `featured: true` get a large split
card on the home page (image side alternating); the rest form an
expandable list underneath. To add a project, copy a file and change it. The
schema in `src/content.config.ts` checks every field at build time.

## Adding assets

Put the original image in `src/assets/media/`, named after its slot (for
example `acm-microsite.png`). `src/assets/media/README.md` lists every slot.
That's it: on build, Astro generates AVIF and WebP versions at 480, 960 and
1600px wide (never upscaled), with real dimensions and hashed filenames. A
slot with no file renders as a labelled empty frame of the same shape, so the
layout doesn't move when the real image arrives.

**Work video.** The "From Execution to Ownership" section after the statement plays
one video. Compress it (the ffmpeg command below; use `scale=1280:-2` for a
landscape video), put it at `public/video/work-video.mp4`, add a cover image
named `work-video` to `src/assets/media/`, and set `src` on `video` in
`profile.ts` to `"/video/work-video.mp4"`. For a vertical video, also set
`ratio` to `"9 / 16"`. Only the cover loads with the page; the video
downloads when someone presses play.

**Case-study videos.** Compress them first. Then put the file in `public/video/`, set
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
  size), self-hosted from Fontsource; only the Latin file (~73 KB) is
  preloaded and used. Headings use optical size 32, which is Inter Display.
  Numbers use tabular figures (`.tnum`).
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

## Themes

Light is the default. The round button in the top-right corner switches to
dark and remembers the choice (`localStorage`). A two-line inline script in
`layouts/Base.astro` applies it before first paint, so there's no flash.

Colours are tokens in `src/styles/globals.css`: `:root` holds the light set,
`:root[data-theme="dark"]` the dark one. Lime (`--accent`) is a fill colour
in both themes. Anything lime as text uses `--accent-text`, which is deep
olive on light, where lime would be unreadable. The light theme also has a
few touches of its own:

- a lime highlighter behind "grows things" instead of lime text;
- a faint dot-grid page background;
- dark funnel particles;
- a stronger green on the meters.

The contact card stays dark in both themes.

## Share image

`src/pages/og.png.ts` renders the 1200×630 image used when the link is shared
on LinkedIn, X or Slack. It's built at build time with satori (layout and
fonts) and sharp (PNG), from the name, tagline, stats and portrait in
`profile.ts`. Share images need an absolute URL. On Vercel the production
domain is picked up automatically; for a custom domain, set `SITE_URL` (for
example `https://vansh.co`) in the project's environment variables.

## Responsive type and spacing

`src/styles/globals.css` defines a fluid type scale (`--step--1` …
`--step-hero`) and spacing scale (`--space-2xs` … `--space-2xl`) with
`clamp()`. Every size grows smoothly between a 360px and a 1440px screen,
with no breakpoint jumps. Use these tokens rather than fixed sizes.

## Animations

Apart from the funnel, the animations are CSS only, so they need no
JavaScript and run off the main thread.

- The name slides up word by word when the page loads.
- Section headings slide up out of a mask as they scroll in (`.lift`).
- Switching theme wipes the new one in as a circle from the toggle (View
  Transitions API; an instant switch where it isn't supported).
- Tiles get a faint lime spotlight that follows the cursor (mouse and
  trackpad only; a few lines in `layouts/Base.astro`).
- The 3D funnel flows faster while you scroll and eases back after.
- The hero stats count up from 0 (a registered `@property` integer printed
  by a CSS counter; `components/Count.astro`). Screen readers get the plain
  value.
- The brand and channel strips scroll continuously in opposite directions
  and pause on hover.
- Scroll-driven (`animation-timeline`): a progress line along the top,
  tiles and stats rising in (`.reveal`, staggered with `.stagger` and `--i`),
  meters filling, and case-study images rising into place.

For smooth scrolling, nothing uses `backdrop-filter`, blend modes or
animated `clip-path`: each of those forced large repaints on every scroll
frame.

CSS is minified with esbuild, not Vite's default lightningcss.
lightningcss folds `animation-timeline` into the `animation` shorthand,
which browsers reject, and that silently turns off every scroll animation
(see `astro.config.mjs`).

Anything not animated is simply shown in its final state. That covers
browsers without scroll timelines, such as Firefox today, and visitors whose
system asks for reduced motion.

## Analytics

Production builds include Vercel Web Analytics (under 1 KB). To turn it on,
open the Vercel project → Analytics → Enable. Page views then work on any
plan. Clicks on "Get in touch" links are sent as `contact_click` events
(tagged with where they came from) via a `data-track` attribute. Custom
events need a Vercel Pro plan; on Hobby they're simply ignored. Until
Analytics is enabled, the script request returns a harmless 404.

## Deploying (Vercel)

Import the repo; no settings to change. `vercel.json` already sets the build
command and the `dist/` output folder.
