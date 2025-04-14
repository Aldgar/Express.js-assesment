import Joi from 'joi';
import bcrypt from 'bcrypt';
import User from '../models/user.js'; 
import { registerAccount } from '../services/registrationService.js';
import { loginAccount } from '../services/loginService.js';

export const createAccount = async (req, res) => {
  // Define Joi schema for validation
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });

  // Validate request data
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: 'Username already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Account registered successfully' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const loginUserAccount = async (req, res) => {
  
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });

  
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getProfile = async (req, res) => {
  const { username } = req.query; 

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { firstName, lastName, about } = user;
    res.status(200).json({ username, firstName, lastName, about });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const updateProfile = async (req, res) => {
  const { username } = req.body; 

  const { firstName, lastName, about } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (about) user.about = about;

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const registerUser = async (req, res) => {
  try {
    const response = await registerAccount(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await loginAccount(email, password);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};