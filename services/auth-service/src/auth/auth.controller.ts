import { Request, Response } from 'express';
import { authService } from './auth.service';
import { registerSchema, loginSchema } from './auth.validator';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';
import { HTTP_STATUS, MESSAGES } from 'shared';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);
      const result = await authService.registerUser(data);
      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Registration: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Registration failed: ${err.message}`);
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);
      const result = await authService.loginUser(data);
      res.json(result);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Login: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Login failed: ${err.message}`);
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: err.message });
    }
  }
}

export const authController = new AuthController();
