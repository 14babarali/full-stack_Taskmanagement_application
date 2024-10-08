//controllers/userController.js
import User from '../models/User.js';


export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'email'); // Adjust fields returned based on your User model
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};


export const updateUser = async (req, res) => {
  const { role, manager } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.user.role === 'admin') {
      // Only admins can update role and manager
      user.role = role || user.role;
      user.manager = manager || user.manager;
    } else if (req.user.role === 'manager' && req.user.id === manager) {
      // Managers can update only users under their management
      user.manager = req.user.id; // Update the manager to the current manager
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.remove();
    res.json({ message: 'User removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

