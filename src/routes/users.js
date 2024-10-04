// routes/users.js
import express from 'express'; // Import express using ESM syntax
import User from '../models/User.js'; // Adjust the import path to include .js
import bcrypt from 'bcrypt'; // Import bcrypt
import { authMiddleware, isAdmin } from '../middleware/auth.js'; // Import middleware using ESM syntax

const router = express.Router();

// Admin creates a new user
router.post('/create', authMiddleware, isAdmin, async (req, res) => {
  const { email, password, role } = req.body;

  // Validate the role
  if (!['manager', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role. Role must be either "manager" or "user".' });
  }

  // Check for existing user
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error checking existing user.', error });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User created successfully.', user: { email, role } });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

export default router; // Use export default to export the router
