import { z } from 'zod';

export const batchDeleteSchema = z.object({
  urls: z.array(z.string().url().or(z.string().startsWith('/uploads/'))).min(1)
});

export type BatchDeleteDto = z.infer<typeof batchDeleteSchema>;
