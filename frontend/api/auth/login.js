import { config, methodNotAllowed, sendJson } from '../_lib/config.js';
import { createToken } from '../_lib/auth.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    methodNotAllowed(res);
    return;
  }

  const email = String(req.body?.email || '').toLowerCase().trim();
  const password = String(req.body?.password || '');
  const validEmail = email === config.adminEmail || email === config.adminEmailAlias;
  const validPassword = password === config.adminPassword;

  if (!validEmail || !validPassword) {
    sendJson(res, 401, { message: 'Credenciales invalidas' });
    return;
  }

  sendJson(res, 200, { token: createToken(), email: config.adminEmail });
}
