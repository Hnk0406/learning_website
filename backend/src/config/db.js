import mongoose from 'mongoose';

export async function connectDB(mongoUri) {
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined');
  }

  await mongoose.connect(mongoUri);
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
}

export default mongoose;
