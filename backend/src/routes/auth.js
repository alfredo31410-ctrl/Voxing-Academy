import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim();
  const password = String(req.body.password || '').trim();

  const validEmail = config.adminEmails.includes(email);
  const validPassword = password === config.adminPassword;

  if (!validEmail || !validPassword) {
    return res.status(401).json({
      message: 'Credenciales inválidas. Revisa usuario/correo y contraseña.',
    });
  }

  const token = jwt.sign(
    {
      email,
      role: 'admin',
    },
    config.jwtSecret,
    {
      expiresIn: '8h',
    }
  );

  res.json({
    token,
    email,
  });
});