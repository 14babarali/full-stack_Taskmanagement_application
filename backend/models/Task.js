import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  assignedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
  }],
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);
