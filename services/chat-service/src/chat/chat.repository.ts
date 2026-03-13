import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ChatRepository {
  async findChatByParticipants(userId: number, participantId: number) {
    return prisma.chat.findFirst({
      where: {
        AND: [
          { participants: { some: { userId } } },
          { participants: { some: { userId: participantId } } }
        ]
      }
    });
  }

  async createChat(userId: number, participantId: number) {
    return prisma.chat.create({
      data: {
        participants: {
          create: [{ userId }, { userId: participantId }]
        }
      }
    });
  }

  async getUserChats(userId: number) {
    return prisma.chatParticipant.findMany({
      where: { userId },
      include: {
        chat: {
          include: {
            participants: { include: { user: { select: { id: true, firstName: true, lastName: true, username: true } } } },
            messages: { orderBy: { sentAt: 'desc' }, take: 1 }
          }
        }
      }
    });
  }

  async getChatById(id: number) {
    return prisma.chat.findUnique({
      where: { id },
      include: {
        participants: { include: { user: { select: { id: true, firstName: true, lastName: true } } } },
        messages: { orderBy: { sentAt: 'asc' } }
      }
    });
  }

  async deleteChat(id: number) {
    return prisma.chat.delete({ where: { id } });
  }
}

export const chatRepository = new ChatRepository();
