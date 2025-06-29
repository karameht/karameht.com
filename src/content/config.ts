import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.string().optional(),
  }),
});

const iteration = defineCollection({
  schema: z.object({
    version: z.string(),
    title: z.string(),
    date: z.date(),
    type: z.enum(["feat", "fix", "refactor", "doc", "style", "thought"]),
    summary: z.string(),
    changes: z.array(z.string()),
  }),
});

export const collections = {
  blog,
  iteration,
};
