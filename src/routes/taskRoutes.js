
import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();

router.get('/', authMiddleware(), getTasks); // All users
router.post('/', authMiddleware(), createTask); // All users
router.put('/:id', authMiddleware(), updateTask); // All users
router.delete('/:id', authMiddleware(), deleteTask); // All users

export default router;
