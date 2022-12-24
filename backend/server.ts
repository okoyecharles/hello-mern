import dotenv from 'dotenv';
dotenv.config();
import { errorHandler } from './middleware/errorMiddleware';
import express from 'express';
import router from './routes/goalRoutes';

const port = process.env.PORT;
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', router);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`))