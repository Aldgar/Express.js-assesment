import express from 'express';
import { uploadMiddleware } from '../utils/uploadMiddleware.js';
import { updateCoderProfile } from '../controllers/profileController.js';

const router = express.Router();

// Route to update coder profile
router.put('/profile/:id', uploadMiddleware.single('avatar'), updateCoderProfile);

export default router;