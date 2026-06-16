import mongoose from 'mongoose';
import { config } from './config.js';

export async function connectDatabase() {
  if (!config.mongoUri) {
    console.log('MongoDB URI not configured. Using local JSON storage.');
    return false;
  }

  await mongoose.connect(config.mongoUri, {
    dbName: 'voxing-academy'
  });
  console.log('MongoDB connected.');
  return true;
}
