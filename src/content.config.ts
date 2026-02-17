import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { rssSchema } from "@astrojs/rss";

const NoteSchema = rssSchema
  .required({
    title: true,
    description: true,
    pubDate: true,
  })
  .extend({
    draft: z.boolean().default(false),
  });

export type Note = z.infer<typeof NoteSchema>;

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/notes" }),
  schema: NoteSchema,
});

export const collections = { notes };
