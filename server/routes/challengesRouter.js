import express from 'express';
import { 
  createChallenge, 
  listChallengesController, 
  getChallengeByIdController, 
  getCategories, 
  submitCode 
} from '../controllers/challengeController.js';
import { authorize } from '../middleware/authMiddleware.js';

const challengesRouter = express.Router();

challengesRouter.post('/create', authorize(['Manager']), createChallenge); // Route to create a challenge
challengesRouter.get('/', authorize(['Coder', 'Manager']), listChallengesController); // Route to list all challenges
challengesRouter.get('/:id', authorize(['Coder', 'Manager']), getChallengeByIdController); // Route to get a challenge by ID
challengesRouter.get('/categories', getCategories); // Route to get all categories
challengesRouter.post('/submit', authorize(['Coder']), submitCode); // Route to submit code
challengesRouter.post('/grade', authorize(['Coder']), submitCode); // Route to grade submissions

export default challengesRouter;