# Railway Backend Setup - Voxing Academy

## What Railway should run

Deploy only the Express API in `backend`. The public frontend stays on the current Vercel deployment.

## Railway service

- Service type: Node.js / Express
- Root Directory: `backend`
- Install command: `npm install`
- Build command: not required
- Start command: `npm run start`

The Express server already listens on `process.env.PORT`, which Railway injects at runtime.

## Healthcheck

- Path: `/api/health`
- Expected response: JSON with `ok: true` and `service: "voxing-academy-api"`

## Required environment variables

Configure these manually in Railway. Do not commit real values.

- `NODE_ENV=production`
- `PORT` (Railway normally injects this automatically)
- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_EMAIL_ALIAS`
- `ADMIN_EMAIL_ALIASES`
- `ADMIN_PASSWORD`
- `FRONTEND_URL`

## Vercel frontend

Keep the existing Vercel domain as the public site. Configure this Vercel environment variable after Railway provides the API URL:

- `VITE_API_URL=https://YOUR-RAILWAY-SERVICE.up.railway.app/api`

The frontend now reads `import.meta.env.VITE_API_URL` and falls back to `/api` for local proxy-based development.