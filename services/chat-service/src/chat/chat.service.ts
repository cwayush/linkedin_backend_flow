import { chatRepository } from './chat.repository';
import { CreateChatDto } from './chat.validator';
import { logger } from '../utils/logger';
import { MESSAGES } from 'shared';

export class ChatService {
  async createChat(userId: number, data: CreateChatDto) {
    logger.info(`Checking if chat exists between ${userId} and ${data.participantId}`);
    const existingChat = await chatRepository.findChatByParticipants(userId, data.participantId);
    if (existingChat) {
      return existingChat;
    }

    logger.info(`Creating new chat between ${userId} and ${data.participantId}`);
    return chatRepository.createChat(userId, data.participantId);
  }

  async getChats(userId: number) {
    logger.info(`Fetching chats for user ${userId}`);
    const chats = await chatRepository.getUserChats(userId);
    return chats.map((cp: any) => cp.chat);
  }

  async getChatById(chatId: number, userId: number) {
    logger.info(`Fetching chat ${chatId} for user ${userId}`);
    const chat = await chatRepository.getChatById(chatId);
    
    if (!chat) {
      throw new Error(MESSAGES.USER.NOT_FOUND); 
    }

    // Access Control
    const isParticipant = chat.participants.some((p: any) => p.userId === userId);
    if (!isParticipant) {
      throw new Error(MESSAGES.USER.FORBIDDEN);
    }

    return chat;
  }

  async deleteChat(chatId: number) {
    logger.info(`Deleting chat ${chatId}`);
    await chatRepository.deleteChat(chatId);
    return { message: 'Chat deleted' };
  }
}

export const chatService = new ChatService();
