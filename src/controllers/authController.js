import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ username, email, password, role });
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If both checks pass, create a JWT token
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate if the user is an admin
  const adminUser = await User.findById(req.user.id); // Assume req.user is the logged-in user

  if (!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden. Only admins can create users.' });
  }

  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
          role, // Role is assigned here
      });

      res.status(201).json({ message: 'User created successfully', userId: newUser._id });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error });
  }
};

