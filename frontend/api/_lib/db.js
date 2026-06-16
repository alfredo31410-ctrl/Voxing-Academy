import mongoose from 'mongoose';
import { config } from './config.js';

const courseSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    phase: { type: String, required: true },
    audience: { type: String, default: '' },
    transformation: { type: String, required: true },
    price: { type: String, default: '$497 MXN' },
    format: { type: String, default: '' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export async function connectMongo() {
  if (!config.mongoUri) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(config.mongoUri, {
    dbName: 'voxing-academy',
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000
  });
}
