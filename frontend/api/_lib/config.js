export const config = {
  mongoUri: process.env.MONGODB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'change-this-before-production',
  adminEmail: (process.env.ADMIN_EMAIL || 'alfredo31410_db_user').toLowerCase(),
  adminEmailAlias: (process.env.ADMIN_EMAIL_ALIAS || 'voxing444@gmail.com').toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD || ''
};

export function sendJson(res, status, data) {
  res.status(status).json(data);
}

export function methodNotAllowed(res) {
  sendJson(res, 405, { message: 'Method not allowed' });
}
