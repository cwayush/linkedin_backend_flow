import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async findUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: { userInfo: true, experiences: true, files: true },
    });
  }

  async findPublicUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        userInfo: true,
        experiences: true,
        files: true,
      },
    });
  }

  async updateBaseUser(id: number, firstName?: string, lastName?: string) {
    return prisma.user.update({
      where: { id },
      data: { firstName, lastName },
    });
  }

  async upsertUserInfo(userId: number, infoData: any) {
    return prisma.userInfo.upsert({
      where: { userId },
      update: infoData,
      create: {
        ...infoData,
        dob: infoData.dob ? new Date(infoData.dob) : new Date(),
        userId,
      },
    });
  }

  async findFriends(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        friends: {
          select: { id: true, firstName: true, lastName: true, username: true },
        },
      },
    });
    return user?.friends || [];
  }

  async createExperience(userId: number, data: any) {
    return prisma.experience.create({
      data: {
        ...data,
        userId,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      },
    });
  }

  async findExperiences(userId: number) {
    return prisma.experience.findMany({ where: { userId } });
  }
}

export const userRepository = new UserRepository();
