import { Router } from 'express';
import { userController } from './user.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public Routes
router.get('/profile/:id', userController.getProfileById.bind(userController));

// Protected Routes
router.use(authenticateToken);
router.get('/me', userController.getMyProfile.bind(userController));
router.put('/me', userController.updateUserDetails.bind(userController));
router.get('/friends', userController.getFriends.bind(userController));
router.post('/experience', userController.addExperience.bind(userController));
router.get('/experience', userController.getExperiences.bind(userController));

export default router;
