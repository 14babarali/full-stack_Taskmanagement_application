import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware(), getTasks); // Protect route with authMiddleware
router.post('/', authMiddleware(['admin', 'manager']), createTask); // Only allow admins and managers to create tasks
router.put('/:id', authMiddleware(['admin', 'manager']), updateTask); // Only allow admins and managers to update tasks
router.delete('/:id', authMiddleware(['admin', 'manager']), deleteTask); // Only allow admins and managers to delete tasks

export default router;
