import express from 'express';
import { loginAccount } from '../controllers/accountController.js';
import { getProfile } from '../controllers/accountController.js';
import { updateProfile } from '../controllers/accountController.js';
import {
  getLeaderboard,
  getTopCoders,
  getSolvedChallengesStats,
  getTrendingCategories,
  getHeatmap,
} from '../controllers/statisticsController.js';

const codersRouter = express.Router();

// Define routes for coders
codersRouter.post('/login', loginAccount); // Route for coder login

codersRouter.get('/', (req, res) => {
  res.send('Coders Home Page');
});

codersRouter.get('/profile', getProfile);

codersRouter.put('/profile', updateProfile); 

codersRouter.get('/profile', (req, res) => {
  res.send('Coders Profile Page');
});

// Route to get the leaderboard
codersRouter.get('/leaderboard', getLeaderboard);

// Route to get the top coders
codersRouter.get('/top-coders', getTopCoders);

// Route to get solved challenges statistics
codersRouter.get('/solved-challenges', getSolvedChallengesStats);

// Route to get trending categories
codersRouter.get('/trending-categories', getTrendingCategories);

// Route to get the heatmap
codersRouter.get('/heatmap', getHeatmap);

export default codersRouter;