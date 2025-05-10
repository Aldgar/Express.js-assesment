import { updateProfile } from '../services/profileService.js';

export const updateCoderProfile = async (req, res) => {
  try {
    const coderId = req.params.id; // Assume coder ID is passed as a route parameter
    const profileData = req.body;
    const file = req.file;

    const updatedProfile = await updateProfile(coderId, profileData, file);

    res.status(200).json({ message: 'Profile updated successfully', data: updatedProfile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};