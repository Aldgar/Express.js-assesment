import User from './models/User.js'; 
import Challenge from './models/Challenge.js'; 


export const getTopCoders = async (k) => {
  // Fetch the top K coders sorted by score
  const coders = await User.find({ role: 'Coder' }).sort({ score: -1 }).limit(k);

  // Add the number of solved challenges for each coder
  const topCoders = await Promise.all(
    coders.map(async (coder) => {
      const solvedChallenges = await Challenge.countDocuments({ solvedBy: coder._id });
      return {
        username: coder.username,
        score: coder.score,
        solved_challenges: solvedChallenges,
      };
    })
  );

  return topCoders;
};