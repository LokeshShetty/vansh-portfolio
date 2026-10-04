// Case studies: one Markdown file per project in src/content/work. The
// frontmatter drives the card on the home page and the top of /work/<id>;
// the Markdown body is the full write-up on that page.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const asset = z.object({
  /** File name (without extension) in src/assets/media/. */
  name: z.string(),
  alt: z.string(),
  ratio: z.string().optional(),
  /** Videos only: "/video/<file>.mp4" once uploaded, null until then. */
  src: z.string().nullable().optional(),
});

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "*.md" }),
  schema: z.object({
    order: z.number(),
    /** Featured projects get a large split card; the rest go in the list. */
    featured: z.boolean().default(false),
    kicker: z.string(),
    title: z.string(),
    summary: z.string(),
    did: z.array(z.string()),
    results: z.array(z.object({ value: z.string(), label: z.string() })),
    assets: z.array(asset).default([]),
  }),
});

export const collections = { work };
