import mongoose from 'mongoose';
import { env } from '../../config/env.variable';

export default async function connectDB() {
  try {
    await mongoose.connect(env.DBADDRESS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected DB successfully');
  } catch (error) {
    console.log(error);
  }
}
