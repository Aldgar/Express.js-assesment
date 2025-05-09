import express from 'express';
import { getProfile, updateProfile, registerUser, loginUser } from '../controllers/accountController.js';
import { createChallengeController } from '../controllers/challengeController.js';
import { authorize } from '../middleware/authMiddleware.js';

const managersRouter = express.Router();

// Define routes for managers
managersRouter.post('/login', loginUser); // Route for manager login
managersRouter.get('/', (req, res) => {
  res.send('Managers Home Page');
});

managersRouter.get('/profile', getProfile);

managersRouter.put('/profile', updateProfile);

managersRouter.get('/details', (req, res) => {
  res.send('Managers Details Page');
});

managersRouter.post('/register', registerUser);

managersRouter.post('/create-challenge', authorize(['Manager']), createChallengeController);
managersRouter.get('/profile', authorize(['Coder', 'Manager']), getProfile); // Protected route
managersRouter.put('/profile', authorize(['Coder', 'Manager']), updateProfile); // Protected route
export default managersRouter;