const express = require('express');
const { createTask, getTasks, updateTask } = require('../controllers/taskController');
const { roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', roleMiddleware(['regular', 'manager']), createTask);
router.get('/', roleMiddleware(['admin']), getTasks);
router.put('/:id', roleMiddleware(['regular', 'manager', 'admin']), updateTask);

module.exports = router;
