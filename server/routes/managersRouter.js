import express from 'express';
import { loginAccount } from '../controllers/accountController.js';
import { getProfile } from '../controllers/accountController.js';
import { updateProfile } from '../controllers/accountController.js';
import { registerUser } from '../controllers/accountController.js';
import { loginUser } from '../controllers/accountController.js';
import { authorize } from '../middleware/authMiddleware.js';

const managersRouter = express.Router();

// Define routes for managers
managersRouter.post('/login', loginAccount); // Route for manager login
managersRouter.get('/', (req, res) => {
  res.send('Managers Home Page');
});

managersRouter.get('/profile', getProfile);

managersRouter.put('/profile', updateProfile); 

managersRouter.get('/details', (req, res) => {
  res.send('Managers Details Page');
});
managersRouter.post('/register', registerUser); 
managersRouter.post('/login', loginUser);

managersRouter.post('/create-challenge', authorize(['Manager']), createChallenge);

export default managersRouter;