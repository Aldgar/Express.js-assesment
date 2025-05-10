import express from 'express';
import uploadRoutes from './routes/upload.js';
import profileRoutes from './routes/profile.js';

const app = express();

app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', profileRoutes);

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});