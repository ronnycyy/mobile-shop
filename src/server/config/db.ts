import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb+srv://ronny:123@cluster0.7uyw6.mongodb.net/mobile-shop?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    );
    console.log(`mongoDB connected. host: ${conn.connection.host}`.cyan.underline);

  } catch (err) {
    console.log(`MongoDB Connect Error: ${err.message}`.red.underline.bold);
    process.exit(1);  // 退出进程，退出码为1
  }
}

export default connectDB;