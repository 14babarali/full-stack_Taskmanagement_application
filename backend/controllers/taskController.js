// controllers/taskController.js
import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'manager') {
      // Get tasks created by users assigned to this manager
      tasks = await Task.find({ assignedTo: req.user.id }).populate('createdBy', 'username');
    } else {
      // Regular users see only their own tasks
      tasks = await Task.find({ createdBy: req.user.id }).populate('assignedTo', 'email'); // Populate assigned users for better response
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req, res) => {
  const { title, description, dueDate, status, assignedUsers } = req.body; // Include assignedUsers
  try {
    // Check if the user has permission to assign tasks
    if (req.user.role === 'user' && assignedUsers && assignedUsers.length > 0) {
      return res.status(403).json({ message: 'You cannot assign tasks to others' });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      createdBy: req.user.id,
      assignedTo: assignedUsers || [req.user.id], // Assign to the user themselves if no one specified
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
    if (!task || (task.createdBy.toString() !== req.user.id && req.user.role !== 'manager')) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the task only if the user is a manager or the creator
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
