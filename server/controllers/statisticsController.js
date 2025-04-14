import Joi from 'joi';
import User from '../models/user.js';
import Challenge from '../models/challenge.js';

// Controller to get the leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ score: -1 }).limit(10); // Assuming 'score' field exists
    res.status(200).json(leaderboard);
  } catch (err) {
    console.error(err);
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
    const topCoders = await User.find().sort({ score: -1 }).limit(Number(k)); // Assuming 'score' field exists
    res.status(200).json(topCoders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get solved challenges statistics
export const getSolvedChallengesStats = async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const solvedStats = await Challenge.aggregate([
      { $match: { solvedBy: username } }, // Assuming 'solvedBy' field exists
      { $group: { _id: '$level', count: { $sum: 1 } } },
    ]);

    res.status(200).json(solvedStats);
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