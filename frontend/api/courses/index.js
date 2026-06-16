import { requireAuth } from '../_lib/auth.js';
import { connectMongo, Course } from '../_lib/db.js';
import { methodNotAllowed, sendJson } from '../_lib/config.js';
import { slugify } from '../_lib/slugify.js';

export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === 'GET') {
      const courses = await Course.find().sort({ phase: 1, createdAt: 1 }).lean();
      sendJson(res, 200, courses);
      return;
    }

    if (req.method === 'POST') {
      requireAuth(req);
      const course = await Course.create({
        ...req.body,
        slug: req.body.slug || slugify(req.body.title)
      });
      sendJson(res, 201, course);
      return;
    }

    methodNotAllowed(res);
  } catch (error) {
    const status = error.name === 'JsonWebTokenError' ? 401 : 500;
    sendJson(res, status, { message: error.message || 'Internal server error' });
  }
}
