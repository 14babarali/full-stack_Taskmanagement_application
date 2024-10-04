import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();

router.get('/', authMiddleware('admin'), getAllUsers); // Admin only
router.put('/:id', authMiddleware('admin'), updateUser); // Admin only
router.delete('/:id', authMiddleware('admin'), deleteUser); // Admin only

export default router;
