import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../../data/local-db.json');

async function readDb() {
  try {
    const raw = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { courses: [] };
  }
}

async function writeDb(db) {
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

export const localStore = {
  async listCourses() {
    const db = await readDb();
    return db.courses;
  },
  async upsertCourses(courses) {
    const db = await readDb();
    const existingBySlug = new Map(db.courses.map((course) => [course.slug, course]));
    courses.forEach((course) => {
      existingBySlug.set(course.slug, { ...existingBySlug.get(course.slug), ...course });
    });
    db.courses = Array.from(existingBySlug.values());
    await writeDb(db);
    return db.courses;
  },
  async createCourse(course) {
    const db = await readDb();
    const next = {
      ...course,
      slug: course.slug || slugify(course.title),
      _id: crypto.randomUUID()
    };
    db.courses.push(next);
    await writeDb(db);
    return next;
  },
  async updateCourse(id, course) {
    const db = await readDb();
    db.courses = db.courses.map((item) => (item._id === id ? { ...item, ...course, _id: id } : item));
    await writeDb(db);
    return db.courses.find((item) => item._id === id);
  },
  async deleteCourse(id) {
    const db = await readDb();
    db.courses = db.courses.filter((item) => item._id !== id);
    await writeDb(db);
  }
};

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
