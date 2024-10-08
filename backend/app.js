import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan'; // Importing Morgan
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';  // Assuming this handles core user management
import taskRoutes from './routes/taskRoutes.js';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize express app
const app = express();

// Middleware to enable CORS, JSON request body parsing, and logging
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Using Morgan to log requests in 'dev' format

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User management routes
app.use('/api/tasks', taskRoutes); // Task management routes

// Global error handler (optional, for better error responses)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Export the app for use in server.js
export default app;
