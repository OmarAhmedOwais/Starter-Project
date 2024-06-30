import mongoose from 'mongoose';
import 'colors';
import { config } from './config';

const MONGO_URI = config.MONGO_URI!;

export default function db_connection(): void {
  mongoose.set('strictQuery', true); // Add this line
  mongoose
    .connect(MONGO_URI, { dbName: config.DB_NAME })
    .then(() => {
      console.log('MongoDB connected successfully'.green);
    })
    .catch((error) => {
      console.log('MongoDB connection failed'.red.bold);
      console.error(`${error.message}`.red);
      process.exit(1);
      // restart the server
    });
}
