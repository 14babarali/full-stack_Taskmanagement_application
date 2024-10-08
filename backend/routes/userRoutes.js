
import { Router } from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { signup } from '../controllers/authController.js';
import { getUsers } from '../controllers/userController.js';
const router = Router();

// Route to get all users - Admin only
router.get('/', getAllUsers);

// Middleware to protect the route
router.get('/', authMiddleware(['admin']), getUsers); 
// Route to update user - Admin and Manager roles
router.put('/:id', authMiddleware(['admin', 'manager']), updateUser);

// Route to delete a user - Admin only
router.delete('/:id', authMiddleware('admin'), deleteUser);

// Signup route for admin to create users
router.post('/signup', authMiddleware('admin'), signup);

export default router;
