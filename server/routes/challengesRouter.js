import express from 'express';
import { 
  createChallenge, 
  getAllChallenges, 
  getChallengeById, 
  getCategories, 
  submitCode 
} from '../controllers/challengeController.js';

const challengesRouter = express.Router(); // Initialize the router first

// Define routes
challengesRouter.post('/create', createChallenge); // Route to create a challenge
challengesRouter.get('/', getAllChallenges); // Route to get all challenges
challengesRouter.get('/:id', getChallengeById); // Route to get a challenge by ID
challengesRouter.get('/categories', getCategories); // Route to get all categories
challengesRouter.post('/submit', submitCode); // Route to submit code

export default challengesRouter;