import { connectDatabase } from './db.js';
import { listCourses } from './services/courseService.js';

const connected = await connectDatabase();

if (!connected) {
  console.log('MongoDB is not configured. Add MONGODB_URI to .env first.');
  process.exit(1);
}

const courses = await listCourses();
console.log(`MongoDB connection OK. Courses found: ${courses.length}`);
process.exit(0);
