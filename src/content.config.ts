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
    /** Keep `assets` in the file but don't show them anywhere. */
    archivedAssets: z.boolean().default(false),
    kicker: z.string(),
    title: z.string(),
    summary: z.string(),
    did: z.array(z.string()),
    results: z.array(z.object({ value: z.string(), label: z.string() })),
    assets: z.array(asset).default([]),

    // Case-study page structure. All optional; each renders only if set.
    /** The business or growth problem. */
    challenge: z.string().optional(),
    /** The strategy, system or idea. */
    approach: z.string().optional(),
    /** Heading for the approach block, e.g. "Idea". Defaults to "Approach". */
    approachLabel: z.string().optional(),
    /** Extra lines under the approach. */
    approachNotes: z.array(z.string()).optional(),
    /** What he personally owned. */
    owned: z.array(z.string()).optional(),
    /** A pipeline or system, drawn as steps joined by arrows. */
    system: z.array(z.string()).optional(),
    /** One line on scale, shown under the system. */
    scale: z.string().optional(),
    /** Channels, campaigns, workflows, creative used. */
    execution: z.array(z.string()).optional(),
    /** Parallel workstreams, each with its own points (and results). When
     *  set, they replace the separate Result block on the page. */
    engines: z
      .array(
        z.object({
          name: z.string(),
          points: z.array(z.string()),
          /** Emphasise the strongest one. */
          highlight: z.boolean().default(false),
        }),
      )
      .optional(),
    /** Lines under the result figures. */
    resultNotes: z.array(z.string()).optional(),
  }),
});

export const collections = { work };
