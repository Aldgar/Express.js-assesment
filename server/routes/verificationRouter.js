import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const verificationRouter = express.Router();
const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret

verificationRouter.get('/verify', async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('<h1>User not found</h1>');
    }

    // Update the isVerified field
    if (user.isVerified) {
      return res.status(400).send('<h1>Account is already verified</h1>');
    }

    user.isVerified = true;
    await user.save();

    res.status(200).send('<h1>Account verified successfully</h1>');
  } catch (err) {
    console.error(err);
    res.status(400).send('<h1>Invalid or expired token</h1>');
  }
});

export default verificationRouter;