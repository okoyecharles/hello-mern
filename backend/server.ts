import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db';
import router from './routes/goalRoutes';
import { errorHandler } from './middleware/errorMiddleware';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', router);

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on ${port}`))