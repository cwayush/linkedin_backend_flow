import { Request, Response } from 'express';
import { userService } from './user.service';
import { updateUserInfoSchema, addExperienceSchema } from './user.validator';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';
import { HTTP_STATUS, MESSAGES } from 'shared';

export class UserController {
  async getMyProfile(req: AuthRequest, res: Response) {
    try {
      const profile = await userService.getMyProfile(req.user.userId);
      res.json(profile);
    } catch (err: any) {
      logger.error(`Failed to fetch self profile: ${err.message}`);
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: MESSAGES.USER.NOT_FOUND });
    }
  }

  async getProfileById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id as string);
      const profile = await userService.getProfileById(userId);
      res.json(profile);
    } catch (err: any) {
      logger.error(`Failed to fetch public profile: ${err.message}`);
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: MESSAGES.USER.NOT_FOUND });
    }
  }

  async updateUserDetails(req: AuthRequest, res: Response) {
    try {
      const data = updateUserInfoSchema.parse(req.body);
      const result = await userService.updateProfile(req.user.userId, data);
      res.json(result);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError;
        logger.warn(`Validation Error on Update Profile: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Update profile failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getFriends(req: AuthRequest, res: Response) {
    try {
      const friends = await userService.getFriends(req.user.userId);
      res.json(friends);
    } catch (err: any) {
      logger.error(`Failed to fetch friends: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async addExperience(req: AuthRequest, res: Response) {
    try {
      const data = addExperienceSchema.parse(req.body);
      const exp = await userService.addExperience(req.user.userId, data);
      res.status(HTTP_STATUS.CREATED).json(exp);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError;
        logger.warn(`Validation Error on Add Experience: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Failed to add experience: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getExperiences(req: AuthRequest, res: Response) {
    try {
      const exps = await userService.getExperiences(req.user.userId);
      res.json(exps);
    } catch (err: any) {
      logger.error(`Failed to fetch experiences: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }
}

export const userController = new UserController();
