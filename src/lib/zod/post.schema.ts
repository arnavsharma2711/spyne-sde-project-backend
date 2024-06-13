import { z } from 'zod';

export const postSchema = z.object({
  text: z.string(),
  hashtags: z.array(z.string()),
});

export const fetchPostSchema = z.object({
  id: z.number(),
  description: z.string(),
  author_id: z.number(),
  view_count: z.number(),
});
