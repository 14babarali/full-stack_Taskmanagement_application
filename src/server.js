// // src/server.js
// import express from 'express';
// import connectDB from './config/db.js';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Function to setup routes
// const setupRoutes = async () => {
//   const authRoutes = await import('./routes/authRoutes.js');
//   const userRoutes = await import('./routes/userRoutes.js');
//   const taskRoutes = await import('./routes/taskRoutes.js');

//   app.use('/api/auth', authRoutes.default);
//   app.use('/api/users', userRoutes.default);
//   app.use('/api/tasks', taskRoutes.default);
// };

// // Initialize routes
// setupRoutes().then(() => {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch(err => {
//   console.error('Error setting up routes:', err);
// });



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize express app
const app = express();

// Middleware to enable CORS and JSON request body parsing
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Global error handler (optional, for better error responses)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
