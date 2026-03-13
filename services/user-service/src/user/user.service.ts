import { userRepository } from './user.repository';
import { UpdateUserInfoDto, AddExperienceDto } from './user.validator';
import { logger } from '../utils/logger';
import { MESSAGES } from 'shared';

export class UserService {
  async getMyProfile(userId: number) {
    logger.info(`${MESSAGES.USER.FETCH_SELF} for user ${userId}`);
    const profile = await userRepository.findUserById(userId);
    if (!profile) throw new Error(MESSAGES.USER.NOT_FOUND);
    return profile;
  }

  async getProfileById(userId: number) {
    logger.info(`${MESSAGES.USER.FETCH_PUBLIC} for user ${userId}`);
    const profile = await userRepository.findPublicUserById(userId);
    if (!profile) throw new Error(MESSAGES.USER.NOT_FOUND);
    return profile;
  }

  async updateProfile(userId: number, data: UpdateUserInfoDto) {
    logger.info(`Updating profile for user ${userId}`);
    const { firstName, lastName, ...infoData } = data;
    
    // Update base user
    if (firstName || lastName) {
      await userRepository.updateBaseUser(userId, firstName, lastName);
    }

    // Upsert user info
    if (Object.keys(infoData).length > 0) {
      await userRepository.upsertUserInfo(userId, infoData);
    }

    return { message: MESSAGES.USER.UPDATE_PROFILE_SUCCESS };
  }

  async getFriends(userId: number) {
    logger.info(`${MESSAGES.USER.FETCH_FRIENDS} for user ${userId}`);
    return userRepository.findFriends(userId);
  }

  async addExperience(userId: number, data: AddExperienceDto) {
    logger.info(`${MESSAGES.USER.ADD_EXPERIENCE} for user ${userId}: ${data.title}`);
    return userRepository.createExperience(userId, data);
  }

  async getExperiences(userId: number) {
    logger.info(`${MESSAGES.USER.FETCH_EXPERIENCES} for user ${userId}`);
    return userRepository.findExperiences(userId);
  }
}

export const userService = new UserService();
