import jwt from 'jsonwebtoken';
import { config } from './config.js';

export function createToken() {
  return jwt.sign({ email: config.adminEmail, role: 'admin' }, config.jwtSecret, { expiresIn: '8h' });
}

export function requireAuth(req) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  return jwt.verify(token, config.jwtSecret);
}
