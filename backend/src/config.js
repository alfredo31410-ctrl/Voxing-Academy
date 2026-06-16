import dotenv from 'dotenv';

dotenv.config({ path: new URL('../../.env', import.meta.url).pathname });

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  adminEmail: (process.env.ADMIN_EMAIL || 'voxing444@gmail.com').toLowerCase(),
  adminEmailAlias: (process.env.ADMIN_EMAIL_ALIAS || 'voxing444@gmail.conm').toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || 'Mariel250900',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
};
