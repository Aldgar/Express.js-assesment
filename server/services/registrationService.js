import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { sendVerificationEmail } from '../utils/emailService.js';

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret

export const registerAccount = async (userData) => {
  const { firstName, lastName, email, password, role } = userData;

  // Check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    isVerified: false,
  });

  await newUser.save();

  // Generate a JWT token for email verification
  const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1d' });

  // Send verification email
  await sendVerificationEmail(email, token);

  return { message: 'Account registered successfully. Please verify your email.' };
};