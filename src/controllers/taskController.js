//controllers/taskController.js
import Task from '../models/Task.js';

// export const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ createdBy: req.user.id });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
export const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'manager') {
      // Get tasks created by users assigned to this manager
      tasks = await Task.find({ assignedTo: req.user.id }).populate('createdBy', 'username');
    } else {
      // Regular users see only their own tasks
      tasks = await Task.find({ createdBy: req.user.id });
    }
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// export const createTask = async (req, res) => {
//   const { title, description, dueDate } = req.body;
//   try {
//     const task = new Task({
//       title,
//       description,
//       dueDate,
//       createdBy: req.user.id,
//     });
//     await task.save();
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

export const createTask = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body; // Include assignedTo
  try {
    // Check if the user has permission to assign tasks
    if (req.user.role === 'user' && assignedTo) {
      return res.status(403).json({ message: 'You cannot assign tasks to others' });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      createdBy: req.user.id,
      assignedTo: assignedTo || req.user.id, // Assign to the user themselves if no one specified
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// export const updateTask = async (req, res) => {
//   try {
//     let task = await Task.findById(req.params.id);
//     if (!task || task.createdBy.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


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
