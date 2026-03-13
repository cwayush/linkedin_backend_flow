import { Router } from 'express';
import { chatController } from './chat.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Protected Routes (Chat requires authentication)
router.use(authenticateToken);
router.post('/', chatController.createChat.bind(chatController));
router.get('/', chatController.getChats.bind(chatController));
router.get('/:id', chatController.getChatById.bind(chatController));
router.delete('/:id', chatController.deleteChat.bind(chatController));

export default router;
