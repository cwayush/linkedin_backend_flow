import { z } from 'zod';

export const createChatSchema = z.object({
  participantId: z.number().int().positive()
});

export type CreateChatDto = z.infer<typeof createChatSchema>;
