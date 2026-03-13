import { PrismaClient } from '@prisma/client';
import { RegisterDto } from './auth.validator';

const prisma = new PrismaClient();

export class AuthRepository {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findUserByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  }

  async createUser(data: RegisterDto & { password: string }) {
    return prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }
}

export const authRepository = new AuthRepository();
