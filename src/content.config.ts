import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";
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

const professional = defineCollection({
  loader: file("./src/data/work/professional.yml"),
  schema: ({ image }) =>
    z.object({
      organization: z.string().nonempty(),
      role: z.string().nonempty(),
      start: z.string().nonempty(),
      end: z.string().nonempty().optional(),
      image: image(),
      description: z.string(),
    }),
});

const education = defineCollection({
  loader: file("./src/data/work/education.yml"),
  schema: ({ image }) =>
    z.object({
      organization: z.string().nonempty(),
      role: z.string().nonempty(),
      start: z.string().nonempty(),
      end: z.string().nonempty().optional(),
      image: image(),
      description: z.string(),
    }),
});

const foss = defineCollection({
  loader: file("./src/data/work/foss.yml"),
  schema: ({ image }) =>
    z.object({
      organization: z.string().nonempty(),
      role: z.string().nonempty(),
      start: z.string().nonempty(),
      end: z.string().nonempty().optional(),
      image: image(),
      description: z.string(),
    }),
});

export const collections = {
  notes,
  professional,
  education,
  foss,
};
