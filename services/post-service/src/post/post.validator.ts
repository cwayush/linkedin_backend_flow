import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const addCommentSchema = z.object({
  postId: z.number().int().positive(),
  text: z.string().min(1),
  parentId: z.number().int().positive().optional().nullable(),
});

export const toggleLikeSchema = z.object({
  postId: z.number().int().positive(),
});

export type CreatePostDto = z.infer<typeof createPostSchema>;
export type AddCommentDto = z.infer<typeof addCommentSchema>;
export type ToggleLikeDto = z.infer<typeof toggleLikeSchema>;
