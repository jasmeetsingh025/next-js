import mongoose from 'mongoose';

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const db = mongoose.connection;
    db.on('error', (err) => {
      if (err instanceof Error) {
        console.error('MongoDB connection error:', err.message);
      } else {
        console.error('MongoDB connection error:', err);
      }
    });
    db.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    db.once('connected', () => {
      console.log('Connected to MongoDB');
    });
    db.once('open', () => {
      console.log('MongoDB connection is open');
    });
    db.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to the database');
  }
}
