import express from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware.js';
import { createCourse, deleteCourse, listCourses, updateCourse } from '../services/courseService.js';

export const coursesRouter = express.Router();

const courseSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(2),
  phase: z.string().min(2),
  audience: z.string().optional(),
  transformation: z.string().min(4),
  price: z.string().optional(),
  format: z.string().optional(),
  featured: z.boolean().optional()
});

coursesRouter.get('/', async (_req, res) => {
  res.json(await listCourses());
});

coursesRouter.post('/', requireAuth, async (req, res) => {
  const parsed = courseSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Datos inválidos', errors: parsed.error.flatten() });
  res.status(201).json(await createCourse(parsed.data));
});

coursesRouter.put('/:id', requireAuth, async (req, res) => {
  const parsed = courseSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Datos inválidos', errors: parsed.error.flatten() });
  const course = await updateCourse(req.params.id, parsed.data);
  res.json(course);
});

coursesRouter.delete('/:id', requireAuth, async (req, res) => {
  await deleteCourse(req.params.id);
  res.status(204).end();
});
