import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret

export const loginAccount = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if the user is verified
  if (!user.isVerified) {
    throw new Error('Account is not verified. Please verify your email.');
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

  return { token, message: 'Login successful' };
};