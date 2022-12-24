import mongoose from "mongoose";
import colors from 'colors/safe';

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || '');

    console.log(colors.cyan(`MongoDB Connected ${conn.connection.host}`));
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

export default connectDB;