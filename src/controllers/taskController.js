import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      createdBy: req.user.id,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task || task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task || task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
