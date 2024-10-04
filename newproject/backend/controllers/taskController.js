const Task = require('../models/Task');

// Create task
exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = new Task({ title, description, dueDate, user: req.user._id });
  await task.save();
  res.status(201).json(task);
};

// Get all tasks (Admin)
exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

// Update task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (req.user.role !== 'admin' && !task.user.equals(req.user._id))
    return res.status(403).json({ message: 'Unauthorized' });

  task.status = status;
  await task.save();
  res.status(200).json(task);
};
