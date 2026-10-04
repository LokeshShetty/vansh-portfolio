// Runs after `next build`. The page is fully server-rendered and has no
// client components, so the React/Next runtime (~170 KB gzipped) would only
// hydrate HTML that never changes. This strips it out and inlines the CSS,
// leaving each page as one HTML file plus a web font: no render-blocking
// requests and no JavaScript to parse.
//
// If you ever add a "use client" component, delete this step from the build
// script; the site works the same with the runtime left in.
//
// It also bundles the optional 3D funnel (src/three/funnel.ts) with esbuild
// and adds a tiny loader that fetches it only once the page is idle, and only
// for visitors who haven't asked for reduced motion or reduced data and whose
// browser has WebGL. Without it the hero tile simply has no animation.

import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { build } from "esbuild";

const OUT = new URL("../out", import.meta.url).pathname;
const ROOT = new URL("..", import.meta.url).pathname;

const bundle = await build({
  entryPoints: [join(ROOT, "src/three/funnel.ts")],
  bundle: true,
  minify: true,
  format: "esm",
  target: "es2020",
  write: false,
  legalComments: "none",
});
const code = bundle.outputFiles[0].contents;
const hash = createHash("sha256").update(code).digest("hex").slice(0, 8);
const funnelUrl = `/js/funnel.${hash}.js`;
await mkdir(join(OUT, "js"), { recursive: true });
await writeFile(join(OUT, funnelUrl), code);

const loader = `<script type="module">
const c = document.querySelector("canvas[data-funnel]");
const ok = c
  && matchMedia("(prefers-reduced-motion: no-preference)").matches
  && !(navigator.connection && navigator.connection.saveData)
  && !!document.createElement("canvas").getContext("webgl2");
if (ok) {
  const go = () => import("${funnelUrl}").then((m) => m.mount(c)).catch(() => {});
  const idle = () => ("requestIdleCallback" in window ? requestIdleCallback(go, { timeout: 2500 }) : setTimeout(go, 1200));
  document.readyState === "complete" ? idle() : addEventListener("load", idle, { once: true });
}
</script>`;

const pages = (await readdir(OUT)).filter((f) => f.endsWith(".html"));

for (const page of pages) {
  const path = join(OUT, page);
  let html = await readFile(path, "utf8");

  // Inline each stylesheet. Font URLs are relative to the CSS file, so make
  // them absolute before moving the rules into the HTML.
  const sheets = [
    ...html.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*\/?>/g),
  ];
  for (const [tag, href] of sheets) {
    const css = (await readFile(join(OUT, href), "utf8"))
      .replace(/\/\*# sourceMappingURL=.*?\*\//g, "")
      .replaceAll("url(../media/", "url(/_next/static/media/");
    html = html.replace(tag, `<style>${css}</style>`);
  }

  html = html
    // Runtime chunks and their preloads.
    .replace(/<script src="\/_next\/[^"]*"[^>]*><\/script>/g, "")
    .replace(/<link rel="preload" as="script"[^>]*\/?>/g, "")
    // Inline RSC payload (self.__next_f.push(...)) and bootstrap scripts.
    // Typed scripts such as the JSON-LD block are left alone.
    .replace(/<script>[\s\S]*?<\/script>/g, "");

  if (html.includes("data-funnel")) {
    html = html.replace("</body>", `${loader}</body>`);
  }

  await writeFile(path, html);
}

// Client-side navigation payloads and runtime chunks are now unreferenced.
for (const f of await readdir(OUT)) {
  if (f.endsWith(".txt")) await rm(join(OUT, f));
}
await rm(join(OUT, "_next/static/chunks"), { recursive: true, force: true });
for (const dir of await readdir(OUT, { withFileTypes: true })) {
  // _not-found/ and similar folders only hold .txt payloads.
  if (dir.isDirectory() && dir.name.startsWith("_") && dir.name !== "_next") {
    await rm(join(OUT, dir.name), { recursive: true });
  }
}

console.log(`Stripped runtime and inlined CSS in ${pages.length} page(s).`);
console.log(
  `3D funnel: ${funnelUrl} (${(code.length / 1024).toFixed(0)} KB, loaded after idle)`,
);
