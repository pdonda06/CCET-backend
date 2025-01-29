import express from 'express';
import { getUserProfile, updateUserProfile, deleteUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.delete('/', authenticateToken, deleteUser);

export default router;