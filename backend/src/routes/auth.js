import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim();
  const password = String(req.body.password || '').trim();
  const validEmail = config.adminEmails.includes(email);
  const hash = await bcrypt.hash(config.adminPassword, 10);
  const validPassword = await bcrypt.compare(password, hash);

  if (!validEmail || !validPassword) {
    return res.status(401).json({ message: 'Credenciales invalidas. Revisa usuario/correo y contrasena.' });
  }

  const token = jwt.sign({ email: config.adminEmail, role: 'admin' }, config.jwtSecret, { expiresIn: '8h' });
  res.json({ token, email: config.adminEmail });
});
