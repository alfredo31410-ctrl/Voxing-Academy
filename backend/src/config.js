import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  adminEmail: (process.env.ADMIN_EMAIL || 'voxing444@gmail.com').toLowerCase(),
  adminEmailAlias: (process.env.ADMIN_EMAIL_ALIAS || 'voxing444@gmail.conm').toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || 'Mariel250900',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  allowedOrigins: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5173'
  ]
};
