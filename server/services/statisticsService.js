import Challenge from '../models/challenge.js';

export const getSolvedChallengesStatistics = async (userId) => {
  // Get the total number of challenges for each difficulty level
  const totalChallenges = await Challenge.aggregate([
    { $group: { _id: '$level', count: { $sum: 1 } } },
  ]);

  const solvedChallenges = await Challenge.aggregate([
    { $match: { solvedBy: userId } },
    { $group: { _id: '$level', count: { $sum: 1 } } },
  ]);

  // Map the results to the required format
  const stats = {
    totalEasyChallenges: totalChallenges.find((c) => c._id === 'Easy')?.count || 0,
    totalModerateChallenges: totalChallenges.find((c) => c._id === 'Moderate')?.count || 0,
    totalHardChallenges: totalChallenges.find((c) => c._id === 'Hard')?.count || 0,
    totalEasySolvedChallenges: solvedChallenges.find((c) => c._id === 'Easy')?.count || 0,
    totalModerateSolvedChallenges: solvedChallenges.find((c) => c._id === 'Moderate')?.count || 0,
    totalHardSolvedChallenges: solvedChallenges.find((c) => c._id === 'Hard')?.count || 0,
  };

  return stats;
};