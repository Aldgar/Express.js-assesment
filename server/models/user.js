import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String }, // Optional
  role: { type: String, enum: ['Coder', 'Manager'], required: true }, // User type
  isVerified: { type: Boolean, default: false }, // Account verification status
  verificationToken: { type: String }, // Token for email verification
});

const User = mongoose.model('User', userSchema);

export default User;