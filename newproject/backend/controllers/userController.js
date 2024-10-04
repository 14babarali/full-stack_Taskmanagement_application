const User = require('../models/User');

// Get all users (Admin Only)
exports.getUsers = async (req, res) => {
  const users = await User.find().populate('manager');
  res.status(200).json(users);
};

// Create user (Admin)
exports.createUser = async (req, res) => {
  const { name, email, password, role, managerId } = req.body;

  let user = new User({ name, email, password, role });
  if (role === 'regular' && managerId) {
    const manager = await User.findById(managerId);
    if (!manager || manager.role !== 'manager')
      return res.status(400).json({ message: 'Invalid manager ID' });
    user.manager = manager._id;
  }

  await user.save();
  res.status(201).json(user);
};
