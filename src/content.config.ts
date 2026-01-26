import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { rssSchema } from "@astrojs/rss";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/notes" }),
  schema: rssSchema
    .required({
      title: true,
      description: true,
      pubDate: true,
    })
    .extend({
      draft: z.boolean().default(false),
    }),
});

export const collections = { notes };
