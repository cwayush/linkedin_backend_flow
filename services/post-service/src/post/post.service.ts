import { postRepository } from './post.repository';
import { CreatePostDto, AddCommentDto, ToggleLikeDto } from './post.validator';
import { logger } from '../utils/logger';
import { MESSAGES } from 'shared';

export class PostService {
  async createPost(userId: number, data: CreatePostDto) {
    logger.info(`Creating post for user ${userId}: ${data.title}`);
    return postRepository.createPost(userId, data.title, data.description);
  }

  async getFeed() {
    logger.info(`Fetching feed`);
    return postRepository.getFeed();
  }

  async getPostById(postId: number) {
    logger.info(`Fetching post ${postId}`);
    const post = await postRepository.getPostById(postId);
    if (!post) throw new Error(MESSAGES.USER.NOT_FOUND); // Technically Post Not Found but we can use NOT_FOUND generically or define POST.NOT_FOUND. Let's just throw generic error message string for now if not defined, or use NOT_FOUND. 
    return post;
  }

  async deletePost(postId: number, userId: number) {
    logger.info(`User ${userId} attempting to delete post ${postId}`);
    const post = await postRepository.getPostByAuthorAndId(postId, userId);
    if (!post) {
      throw new Error(MESSAGES.USER.FORBIDDEN);
    }
    await postRepository.deletePost(postId);
    return { message: 'Post deleted successfully' };
  }

  async addComment(userId: number, data: AddCommentDto) {
    logger.info(`User ${userId} adding comment to post ${data.postId}`);
    return postRepository.addComment(userId, data.postId, data.text, data.parentId);
  }

  async toggleLike(userId: number, data: ToggleLikeDto) {
    logger.info(`User ${userId} toggling like on post ${data.postId}`);
    const existing = await postRepository.findLike(data.postId, userId);
    if (existing) {
      await postRepository.removeLike(existing.id);
      return { message: 'Unliked post' };
    } else {
      await postRepository.addLike(data.postId, userId);
      return { message: 'Liked post' };
    }
  }
}

export const postService = new PostService();
