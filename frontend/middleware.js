export const config = {
  matcher: ['/admin', '/admin/:path*']
};

export default function middleware(request) {
  const gateUser = process.env.ADMIN_GATE_USER || process.env.ADMIN_EMAIL || 'alfredo31410_db_user';
  const gatePassword = process.env.ADMIN_GATE_PASSWORD || process.env.ADMIN_PASSWORD || '';

  if (!gatePassword) {
    return;
  }

  const authHeader = request.headers.get('authorization') || '';
  const expected = `Basic ${btoa(`${gateUser}:${gatePassword}`)}`;

  if (authHeader === expected) {
    return;
  }

  return new Response('Voxing Academy admin access required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Voxing Academy Admin"'
    }
  });
}
