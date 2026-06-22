import { config, methodNotAllowed, sendJson } from '../_lib/config.js';
import { createToken } from '../_lib/auth.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    methodNotAllowed(res);
    return;
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      sendJson(res, 400, { message: 'Solicitud invalida' });
      return;
    }
  }
  const email = String(body.email || '').toLowerCase().trim();
  const password = String(body.password || '').trim();
  const validEmail = config.adminEmails.includes(email);
  const validPassword = password === config.adminPassword;

  if (!validEmail || !validPassword) {
    sendJson(res, 401, { message: 'Credenciales invalidas. Revisa usuario/correo y contrasena.' });
    return;
  }

  sendJson(res, 200, { token: createToken(), email: config.adminEmail });
}
