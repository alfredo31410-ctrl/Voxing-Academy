import { connectDatabase } from './db.js';
import { courses } from './seedData.js';
import { seedCourses } from './services/courseService.js';

await connectDatabase();
const seeded = await seedCourses(courses);
console.log(`Seed complete: ${seeded.length} courses available.`);
process.exit(0);
