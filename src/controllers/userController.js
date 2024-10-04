import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  const { role, manager } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role || user.role;
    user.manager = manager || user.manager;
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
