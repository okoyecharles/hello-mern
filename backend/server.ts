import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db';
import goalRouter from './routes/goalRoutes';
import userRouter from './routes/userRoutes';
import { errorHandler } from './middleware/errorMiddleware';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on ${port}`))