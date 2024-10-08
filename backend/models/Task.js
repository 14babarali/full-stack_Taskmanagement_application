// models/Task.js
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  description: { 
    type: String
  },
  dueDate: {
    type: Date, 
    required: true
  },
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // User who created the task
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Users to whom the task is assigned
  }], // Changed this to an array
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);
