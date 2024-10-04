//rouutes/userRoutes.js
import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { signup } from '../controllers/authController.js';
const router = Router();

router.get('/', authMiddleware('admin'), getAllUsers); // Admin only
router.put('/:id', authMiddleware('admin'), updateUser); // Admin only
router.delete('/:id', authMiddleware('admin'), deleteUser); // Admin only

// Signup route for admin to create users
router.post('/signup', authMiddleware('admin'), signup);

export default router;
