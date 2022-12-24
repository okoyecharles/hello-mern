import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes/goalRoutes';

const port = process.env.PORT;
const app = express()

app.use('/api/goals', router)
app.listen(port, () => console.log(`Server started on ${port}`))