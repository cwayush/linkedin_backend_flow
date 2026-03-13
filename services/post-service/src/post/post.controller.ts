import { Request, Response } from 'express';
import { postService } from './post.service';
import { createPostSchema, addCommentSchema, toggleLikeSchema } from './post.validator';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';
import { HTTP_STATUS, MESSAGES } from 'shared';

export class PostController {
  async createPost(req: AuthRequest, res: Response) {
    try {
      const data = createPostSchema.parse(req.body);
      const post = await postService.createPost(req.user.userId, data);
      res.status(HTTP_STATUS.CREATED).json(post);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Create Post: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Create post failed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getFeed(req: Request, res: Response) {
    try {
      const posts = await postService.getFeed();
      res.json(posts);
    } catch (err: any) {
      logger.error(`Failed to fetch feed: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async getPostById(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.id as string);
      const post = await postService.getPostById(postId);
      res.json(post);
    } catch (err: any) {
      logger.error(`Failed to fetch post: ${err.message}`);
      res.status(HTTP_STATUS.NOT_FOUND).json({ error: err.message });
    }
  }

  async deletePost(req: AuthRequest, res: Response) {
    try {
      const postId = parseInt(req.params.id as string);
      await postService.deletePost(postId, req.user.userId);
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } catch (err: any) {
      logger.error(`Delete post failed: ${err.message}`);
      res.status(HTTP_STATUS.FORBIDDEN).json({ error: err.message });
    }
  }

  async addComment(req: AuthRequest, res: Response) {
    try {
      const data = addCommentSchema.parse(req.body);
      const comment = await postService.addComment(req.user.userId, data);
      res.status(HTTP_STATUS.CREATED).json(comment);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Add Comment: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Failed to add comment: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }

  async toggleLike(req: AuthRequest, res: Response) {
    try {
      const data = toggleLikeSchema.parse(req.body);
      const result = await postService.toggleLike(req.user.userId, data);
      res.json(result);
    } catch (err: any) {
      if (err instanceof ZodError) {
        const zodErr = err as ZodError<any>;
        logger.warn(`Validation Error on Toggle Like: ${zodErr.message}`);
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ error: MESSAGES.USER.VALIDATION_FAILED, details: zodErr.issues });
      }
      logger.error(`Failed to toggle like: ${err.message}`);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: MESSAGES.SYSTEM.INTERNAL_ERROR });
    }
  }
}

export const postController = new PostController();
