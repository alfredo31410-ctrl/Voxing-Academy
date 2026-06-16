import mongoose from 'mongoose';
import { Course } from '../models/Course.js';
import { localStore } from './localStore.js';

function usingMongo() {
  return mongoose.connection.readyState === 1;
}

export async function listCourses() {
  if (usingMongo()) {
    return Course.find().sort({ phase: 1, createdAt: 1 }).lean();
  }
  return localStore.listCourses();
}

export async function createCourse(course) {
  if (usingMongo()) {
    return Course.create({ ...course, slug: course.slug || slugify(course.title) });
  }
  return localStore.createCourse(course);
}

export async function updateCourse(id, course) {
  if (usingMongo()) {
    return Course.findByIdAndUpdate(id, course, { new: true }).lean();
  }
  return localStore.updateCourse(id, course);
}

export async function deleteCourse(id) {
  if (usingMongo()) {
    await Course.findByIdAndDelete(id);
    return;
  }
  await localStore.deleteCourse(id);
}

export async function seedCourses(courses) {
  const withIds = courses.map((course) => ({ ...course, _id: course._id || crypto.randomUUID() }));
  if (usingMongo()) {
    await Promise.all(
      courses.map((course) =>
        Course.findOneAndUpdate({ slug: course.slug }, course, { upsert: true, new: true })
      )
    );
    return listCourses();
  }
  return localStore.upsertCourses(withIds);
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
