import express from 'express';
import codersRouter from './routes/codersRouter.js';
import managersRouter from './routes/managersRouter.js';
import mongoose from 'mongoose';
import challengesRouter from './routes/challengesRouter.js';
import verificationRouter from './routes/verificationRouter.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/coders', codersRouter); // Routes for coders
app.use('/managers', managersRouter); // Routes for managers
app.use('/challenges', challengesRouter);
app.use(verificationRouter); 

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

mongoose.connect('mongodb://localhost:27017/react-assessment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});