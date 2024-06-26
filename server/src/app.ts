import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { userRouter } from './routes/user.routes';
import { taskRouter } from './routes/task.routes';

const app = express();

dotenv.config({
  path: './.env.production'
});

app.use(
  cors({
    origin: [
      `${process.env.CORS_ORIGIN_DEV}`,
      `${process.env.CORS_ORIGIN_PROD}`
    ],
    credentials: true
  })
);

// middlewares
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

export { app };
