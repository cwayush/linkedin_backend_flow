import fs from 'fs';
import path from 'path';
import { BatchDeleteDto } from './file.validator';
import { logger } from '../utils/logger';
import { MESSAGES } from 'shared';

export class FileService {
  async processUpload(filename: string) {
    logger.info(`Processing uploaded file: ${filename}`);
    const fileUrl = `/uploads/${filename}`;
    return { url: fileUrl };
  }

  async batchDelete(data: BatchDeleteDto) {
    logger.info(`Batch deleting ${data.urls.length} files...`);
    for (const url of data.urls) {
      this.deleteSingleFileLocally(url);
    }
  }

  async deleteFile(url: string) {
    logger.info(`Deleting file: ${url}`);
    this.deleteSingleFileLocally(url);
  }

  private deleteSingleFileLocally(url: string) {
    try {
      const fileName = url.split('/').pop();
      if (fileName) {
        const filePath = path.join(__dirname, '..', '..', 'uploads', fileName); // NOTE: since we are inside src/file/ -> __dirname is src/file, '..' is src, '..' is root
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          logger.info(`Deleted cleanly: ${fileName}`);
        } else {
          logger.warn(`File not found during delete: ${fileName}`);
        }
      }
    } catch (err: any) {
      logger.error(`Error deleting file loop block: ${err.message}`);
    }
  }
}

export const fileService = new FileService();
