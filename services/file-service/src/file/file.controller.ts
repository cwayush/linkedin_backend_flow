import { Request, Response } from 'express';
import { fileService } from './file.service';
import { batchDeleteSchema } from './file.validator';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';
import { HTTP_STATUS, MESSAGES } from 'shared';

export class FileController {
  async uploadFile(req: AuthRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'No file uploaded' });
      }
      
      const result = await fileService.processUpload(req.file.filename);
      res.status(HTTP_STATUS.CREATED).json(result);
    } catch (err: any) {
      logger.error(`Failed to upload file: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async batchDelete(req: AuthRequest, res: Response) {
    try {
      const data = batchDeleteSchema.parse(req.body);
      await fileService.batchDelete(data);
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Batch Delete: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Failed to batch delete files: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async deleteFile(req: AuthRequest, res: Response) {
    try {
      const urlParam = req.query.url as string;
      if (!urlParam) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'No URL provided' });
      }

      await fileService.deleteFile(urlParam);
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (err: any) {
      logger.error(`Failed to delete file: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }
}

export const fileController = new FileController();
