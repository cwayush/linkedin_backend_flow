import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterDto, LoginDto } from './auth.validator';
import { authRepository } from './auth.repository';
import { logger } from '../utils/logger';
import { MESSAGES } from 'shared';

export class AuthService {
  async registerUser(data: RegisterDto) {
    logger.info(`Checking if user ${data.email} exists...`);
    const existing = await authRepository.findUserByEmail(data.email);
    if (existing) {
      throw new Error(MESSAGES.AUTH.EMAIL_IN_USE);
    }

    const existingUsername = await authRepository.findUserByUsername(data.username);
    if(existingUsername) {
        throw new Error(MESSAGES.AUTH.USERNAME_TAKEN);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    logger.info(`Creating new user ${data.email}...`);
    const user = await authRepository.createUser({ ...data, password: hashedPassword });
    
    return { userId: user.id, message: MESSAGES.AUTH.SUCCESS_REGISTER };
  }

  async loginUser(data: LoginDto) {
    logger.info(`Authenticating user ${data.email}...`);
    const user = await authRepository.findUserByEmail(data.email);
    if (!user) {
      throw new Error(MESSAGES.AUTH.INVALID_CREDS);
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new Error(MESSAGES.AUTH.INVALID_CREDS);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '1d' });
    logger.info(`User ${data.email} successfully authenticated.`);
    
    return { token, user: { id: user.id, username: user.username, email: user.email } };
  }
}

export const authService = new AuthService();
