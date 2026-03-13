import { Router } from 'express';
import { postController } from './post.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public Routes
router.get('/feed', postController.getFeed.bind(postController));
router.get('/:id', postController.getPostById.bind(postController));

// Protected Routes
router.use(authenticateToken);
router.post('/', postController.createPost.bind(postController));
router.delete('/:id', postController.deletePost.bind(postController));
router.post('/comment', postController.addComment.bind(postController));
router.post('/like', postController.toggleLike.bind(postController));

export default router;
