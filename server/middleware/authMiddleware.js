import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from '../graphql/schema.js';
import { verifyToken } from '../utils/auth.js'; // Updated path

const app = express();

app.use(
  '/graphql',
  createHandler({
    schema,
    context: (req) => {
      const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
      const user = verifyToken(token); // Verify the token and get user info
      return { user }; // Pass user info to the context
    },
  })
);

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});