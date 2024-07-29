import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'hello world!' });
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is listening on port ${PORT} ...`);
});
