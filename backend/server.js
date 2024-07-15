import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectToMongoDB from './db/connectToMongoDB.js';

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'hello world!' });
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is listening on port ${PORT} ...`);
});
