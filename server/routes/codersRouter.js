import express from 'express';
import { getProfile, updateProfile, registerUser, loginUser } from '../controllers/accountController.js';
import {
  getLeaderboard,
  getTopCoders,
  getSolvedChallengesStats,
  getTrendingCategories,
  getHeatmap,
} from '../controllers/statisticsController.js';
import { authorize } from '../middleware/authMiddleware.js';
import { leaderboardController } from '../controllers/statisticsController.js';
import { solvedChallengesStatisticsController } from '../controllers/statisticsController.js';



const codersRouter = express.Router();

// Define routes for coders
codersRouter.post('/login', loginUser); // Route for coder login

codersRouter.get('/', (req, res) => {
  res.send('Coders Home Page');
});

codersRouter.get('/profile', authorize(['Coder']), getProfile); // Only authorized Coders can access

codersRouter.put('/profile', updateProfile);

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

codersRouter.post('/register', registerUser);

codersRouter.get('/leaderboard', authorize(['Coder']), leaderboardController); // Only Coders can access
codersRouter.get('/solved-challenges-stats', authorize(['Coder']), solvedChallengesStatisticsController); // Only Coders can access
codersRouter.get('/profile', authorize(['Coder', 'Manager']), getProfile); // Protected route

codersRouter.get('/profile', authorize(['Coder', 'Manager']), getProfile); // Protected route

codersRouter.put('/profile', authorize(['Coder', 'Manager']), updateProfile); // Protected route

export default codersRouter;