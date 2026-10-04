// The share image for LinkedIn, X and Slack (1200×630), rendered at build
// time: satori lays out the card with real font files, sharp turns it into a
// PNG. Served as /og.png and referenced from Base.astro.
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import { profile } from "@/data/profile";

const require = createRequire(import.meta.url);
const font = (path: string) => readFile(require.resolve(path));

// Plain objects instead of JSX, so the page needs no React.
type Node = { type: string; props: Record<string, unknown> };
const h = (
  type: string,
  style: Record<string, unknown>,
  ...children: (Node | string)[]
): Node => ({
  type,
  // satori needs an explicit flex layout on any div with several children.
  props: { style: { display: "flex", ...style }, children },
});

export const GET: APIRoute = async () => {
  const [inter400, inter600, serif, portrait] = await Promise.all([
    font("@fontsource/inter/files/inter-latin-400-normal.woff"),
    font("@fontsource/inter/files/inter-latin-600-normal.woff"),
    font(
      "@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff",
    ),
    // Greyscale, with its edges faded to transparent by a radial alpha mask.
    sharp("src/assets/media/portrait.jpg")
      .resize(560, 560)
      .grayscale()
      .ensureAlpha()
      .composite([
        {
          input: Buffer.from(
            `<svg width="560" height="560"><defs><radialGradient id="g">
              <stop offset="55%" stop-color="#fff"/>
              <stop offset="98%" stop-color="#fff" stop-opacity="0"/>
            </radialGradient></defs>
            <rect width="560" height="560" fill="url(#g)"/></svg>`,
          ),
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer(),
  ]);

  const lime = "#d4ff3f";
  const card = h(
    "div",
    {
      width: 1200,
      height: 630,
      display: "flex",
      position: "relative",
      background: "#0a0b0d",
      color: "#ecece9",
      fontFamily: "Inter",
    },
    {
      type: "img",
      props: {
        src: `data:image/png;base64,${portrait.toString("base64")}`,
        width: 560,
        height: 560,
        style: { position: "absolute", right: -40, top: 40, opacity: 0.75 },
      },
    },
    h(
      "div",
      {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        width: "100%",
      },
      h(
        "div",
        {
          display: "flex",
          alignItems: "center",
          fontSize: 24,
          color: "#8b8f96",
        },
        h("div", {
          width: 14,
          height: 14,
          borderRadius: 7,
          background: lime,
          marginRight: 14,
        }),
        profile.current,
      ),
      h(
        "div",
        { display: "flex", flexDirection: "column" },
        h(
          "div",
          { fontSize: 104, fontWeight: 600, letterSpacing: -4, lineHeight: 1 },
          profile.name,
        ),
        h(
          "div",
          {
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: 118,
            color: lime,
            lineHeight: 1.05,
          },
          profile.tagline,
        ),
      ),
      h(
        "div",
        { display: "flex", fontSize: 26, color: "#8b8f96" },
        ...["700+ SQLs", "60× organic traffic", "1M reach"].map((t, i) =>
          h(
            "div",
            {
              display: "flex",
              marginRight: 22,
              padding: "10px 20px",
              border: "1px solid #24272d",
              borderRadius: 999,
              color: i === 0 ? "#0a0b0d" : "#ecece9",
              background: i === 0 ? lime : "transparent",
            },
            t,
          ),
        ),
      ),
    ),
  );

  const svg = await satori(card as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: inter400, weight: 400, style: "normal" },
      { name: "Inter", data: inter600, weight: 600, style: "normal" },
      { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
