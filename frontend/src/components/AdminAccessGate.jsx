import { useState } from 'react';
import { Lock } from 'lucide-react';

const API_URL = '/api';

function formatApiError(error, fallback = 'No se pudo validar el acceso.') {
  if (error instanceof TypeError) {
    return 'No se pudo conectar con la API local. Revisa que el backend esté corriendo.';
  }

  return error.message || fallback;
}

export default function AdminAccessGate({ children }) {
  const [accessGranted, setAccessGranted] = useState(
    sessionStorage.getItem('voxing-admin-gate') === 'true'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  async function validateAccess(event) {
    event.preventDefault();
    setStatus('Validando acceso...');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas.');
      }

      sessionStorage.setItem('voxing-admin-gate', 'true');
      setAccessGranted(true);
      setStatus('');
      setPassword('');
    } catch (error) {
      setStatus(formatApiError(error));
    }
  }

  if (!accessGranted) {
    return (
      <main className="admin-shell">
        <section className="login-panel">
          <img src="/brand/voxing-logo-color.png" alt="Voxing Academy" />

          <h1>Acceso restringido</h1>

          <p>
            Confirma tus credenciales antes de entrar al panel administrativo.
          </p>

          <form onSubmit={validateAccess}>
            <label>
              Usuario o correo
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>

            <button className="primary-button large" type="submit">
              Continuar
              <Lock size={18} />
            </button>
          </form>

          <p className="admin-status">{status}</p>
        </section>
      </main>
    );
  }

  return children;
}