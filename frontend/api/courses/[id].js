import { requireAuth } from '../_lib/auth.js';
import { connectMongo, Course } from '../_lib/db.js';
import { methodNotAllowed, sendJson } from '../_lib/config.js';

export default async function handler(req, res) {
  try {
    requireAuth(req);
    await connectMongo();

    const { id } = req.query;

    if (req.method === 'PUT') {
      const course = await Course.findByIdAndUpdate(id, req.body, { new: true }).lean();
      sendJson(res, 200, course);
      return;
    }

    if (req.method === 'DELETE') {
      await Course.findByIdAndDelete(id);
      res.status(204).end();
      return;
    }

    methodNotAllowed(res);
  } catch (error) {
    const status = error.name === 'JsonWebTokenError' ? 401 : 500;
    sendJson(res, status, { message: error.message || 'Internal server error' });
  }
}
