import mongoose from 'mongoose';

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

export const Course = mongoose.model('Course', courseSchema);
