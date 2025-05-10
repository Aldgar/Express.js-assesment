import User from '../models/user.js';
import { uploadToSupabase } from '../utils/supabaseClient.js';

export const getUserProfile = async (userId, role) => {
  // Fetch the user profile
  const user = await User.findById(userId).select('-password'); // Exclude the password field
  if (!user) {
    throw new Error('User not found');
  }

  const profile = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    score: user.score,
  };

  // If the user is a Coder, calculate their rank
  if (role === 'Coder') {
    const rank = await User.countDocuments({ role: 'Coder', score: { $gt: user.score } }) + 1;
    profile.rank = rank;
  }

  return profile;
};

export const updateProfile = async (coderId, profileData, file) => {
  try {
    let avatarUrl = '';

    // Upload the avatar if a file is provided
    if (file) {
      avatarUrl = await uploadToSupabase(file);
    }

    // Update the coder's profile in the database (mocked for now)
    const updatedProfile = {
      first_name: profileData.first_name || 'Default First Name',
      last_name: profileData.last_name || 'Default Last Name',
      about: profileData.about || '',
      avatar: avatarUrl || profileData.avatar || '',
    };

    // Simulate database update (replace this with actual DB logic)
    console.log('Updated Profile:', updatedProfile);

    return updatedProfile;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};