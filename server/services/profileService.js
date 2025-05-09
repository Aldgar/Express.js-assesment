import User from '../models/user.js';

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