import Joi from 'joi';
import User from '../models/user.js';
import Challenge from '../models/challenge.js';
import { getSolvedChallengesStatistics } from '../services/statisticsService.js';
import { getLeaderboard } from '../services/leaderboardService.js';

// Controller to get the leaderboard
export const leaderboardController = async (req, res) => {
  try {
    const leaderboard = await getLeaderboard(); // Fetch leaderboard from the service
    res.status(200).json(leaderboard);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get the top coders
export const getTopCoders = async (req, res) => {
  const schema = Joi.object({
    k: Joi.number().integer().min(1).required(),
  });

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { k } = req.query;

  try {
    const topCoders = await User.find({ role: 'Coder' }).sort({ score: -1 }).limit(Number(k)); // Fetch top K coders
    res.status(200).json(topCoders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get solved challenges statistics
export const solvedChallengesStatisticsController = async (req, res) => {
  const userId = req.user.id; // Extracted from the `authorize` middleware

  try {
    const stats = await getSolvedChallengesStatistics(userId); // Fetch statistics from the service
    res.status(200).json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get trending categories
export const getTrendingCategories = async (req, res) => {
  try {
    const trendingCategories = await Challenge.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json(trendingCategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get the heatmap
export const getHeatmap = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
  });

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { username, start_date, end_date } = req.query;

  try {
    const heatmapData = await Challenge.aggregate([
      {
        $match: {
          solvedBy: username, // Assuming 'solvedBy' field exists
          solvedAt: { $gte: new Date(start_date), $lte: new Date(end_date) }, // Assuming 'solvedAt' field exists
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$solvedAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(heatmapData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};