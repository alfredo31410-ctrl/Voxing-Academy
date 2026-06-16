import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim();
  const password = String(req.body.password || '');
  const validEmail = email === config.adminEmail || email === config.adminEmailAlias;
  const hash = await bcrypt.hash(config.adminPassword, 10);
  const validPassword = await bcrypt.compare(password, hash);

  if (!validEmail || !validPassword) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ email: config.adminEmail, role: 'admin' }, config.jwtSecret, { expiresIn: '8h' });
  res.json({ token, email: config.adminEmail });
});
