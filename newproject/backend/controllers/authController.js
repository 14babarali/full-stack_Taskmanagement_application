const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Admin sign-up
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (role !== 'admin') return res.status(403).json({ message: 'Only admin can register' });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id);

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
