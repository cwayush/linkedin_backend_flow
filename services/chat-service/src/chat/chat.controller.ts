import { Request, Response } from 'express';
import { chatService } from './chat.service';
import { createChatSchema } from './chat.validator';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';
import { HTTP_STATUS, MESSAGES } from 'shared';

export class ChatController {
  async createChat(req: AuthRequest, res: Response) {
    try {
      const data = createChatSchema.parse(req.body);
      const chat = await chatService.createChat(req.user.userId, data);
      res.status(HTTP_STATUS.CREATED).json(chat);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Create Chat: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Create chat failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getChats(req: AuthRequest, res: Response) {
    try {
      const chats = await chatService.getChats(req.user.userId);
      res.json(chats);
    } catch (err: any) {
      logger.error(`Fetch chats failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getChatById(req: AuthRequest, res: Response) {
    try {
      const chatId = parseInt(req.params.id as string);
      const chat = await chatService.getChatById(chatId, req.user.userId);
      res.json(chat);
    } catch (err: any) {
      logger.error(`Fetch chat failed: ${err.message}`);
      if (err.message === MESSAGES.USER.FORBIDDEN) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ error: err.message });
      }
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
  }

  async deleteChat(req: AuthRequest, res: Response) {
    try {
      const chatId = parseInt(req.params.id as string);
      // NOTE: Should add authorization check to ensure only participants can delete.
      await chatService.deleteChat(chatId);
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (err: any) {
      logger.error(`Delete chat failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }
}

export const chatController = new ChatController();
