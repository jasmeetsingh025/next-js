import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  bio: { type: String },
  avatar: { type: String },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  lastLogin: { type: Date },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  verificationTokenExpiry: { type: Date },
  passwordResetToken: { type: String },
  passwordResetTokenExpiry: { type: Date },
});

const User = mongoose.models.Users || mongoose.model('Users', userSchema);
export default User;
// This code defines a Mongoose schema and model for a User.
