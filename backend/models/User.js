import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String,
    enum: ['admin', 'manager', 'user'], 
    default: 'user',
    required: true,
  },
  manager: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    validate: {
      validator: async function(value) {
        if (!value) return true;  // Allow null if no manager is set
        const manager = await this.constructor.findById(value);
        return manager && ['manager', 'admin'].includes(manager.role);
      },
      message: 'Assigned manager must have a role of "manager" or "admin".',
    }
  }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords during login/authentication
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);
