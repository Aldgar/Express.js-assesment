import User from '../models/user.js';
import { registerAccount } from '../services/registrationService.js';
import { loginAccount } from '../services/loginService.js';
import { getUserProfile } from '../services/profileService.js';
import { updateUserProfile } from '../services/profileService.js';


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

export const getProfile = async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { firstName, lastName, about } = user;
    res.status(200).json({ username, firstName, lastName, about });
  } catch {
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
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserProfileById = async (req, res) => {
  const userId = req.user.id; // Extracted from the `authorize` middleware
  const role = req.user.role;

  try {
    const profile = await getUserProfile(userId, role);
    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUserProfileById = async (req, res) => {
  const userId = req.user.id; // Extracted from the `authorize` middleware
  const updateData = req.body;

  try {
    const updatedProfile = await updateUserProfile(userId, updateData);
    res.status(200).json(updatedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};