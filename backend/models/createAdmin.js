//models/createAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './User.js'; // Adjust the path if necessary

const createAdminUser = async () => {
  const hashedPassword = await bcrypt.hash("admin@admin.com", 10); // Hash the password
  const adminUser = new User({
    username: "adminUser",
    email: "admin@admin.com",
    password: hashedPassword, // Use the hashed password
    role: "admin"
  });

  await adminUser.save();
  console.log('Admin user created:', adminUser);
};

// Connect to your MongoDB
mongoose.connect('mongodb://localhost:27017/task_management', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    return createAdminUser();
  })
  .then(() => mongoose.disconnect())
  .catch(err => console.error(err));
