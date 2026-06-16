# Voxing Academy

Sitio principal de Voxing Academy, una academia de inglés práctica, humana y moderna. Incluye página pública, panel administrativo básico, API, datos iniciales del ecosistema de productos y estructura lista para crecer con cursos, membresías, talleres, landings, testimonios y campañas.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: MongoDB Atlas cuando `MONGODB_URI` está configurado
- Fallback local: archivo JSON para validar el flujo sin credenciales de Atlas

## Arranque local

1. Instalar dependencias:

```bash
npm install
```

2. Crear o revisar `.env` en la raíz. Para desarrollo ya queda con valores locales. Para MongoDB Atlas, agrega:

```bash
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/voxing-academy
```

3. Sembrar cursos iniciales:

```bash
npm run seed
```

4. Validar MongoDB Atlas cuando `MONGODB_URI` ya esté configurado:

```bash
npm run check:mongo
```

5. Correr frontend y backend:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:4000/api`

## Acceso administrador

Usuario principal configurado en `.env`: `ADMIN_EMAIL`  
Alias opcional configurado en `.env`: `ADMIN_EMAIL_ALIAS`

La contraseña está en `.env` para desarrollo. Antes de producción debe cambiarse junto con `JWT_SECRET`.

Panel: `http://localhost:5173/admin`

## Scripts

- `npm run dev`: inicia frontend y backend.
- `npm run build`: compila el frontend.
- `npm run start`: inicia el backend en modo producción.
- `npm run seed`: carga los 12 cursos base del ecosistema Voxing.
- `npm run lint`: revisa el frontend.

## Deploy

### Backend en Railway

1. Crear proyecto en Railway.
2. Configurar variables:
   - `NODE_ENV=production`
   - `PORT`
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_EMAIL_ALIAS`
   - `ADMIN_PASSWORD`
   - `FRONTEND_URL`
3. Comando de inicio: `npm run start --workspace backend`

### Frontend en Vercel

1. Importar el repositorio.
2. Root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Variable:
   - `VITE_API_URL=https://tu-backend.up.railway.app/api`

## Próximos módulos preparados

- Landings específicas por curso.
- Membresías y talleres conversacionales.
- Testimonios reales.
- Videos y fotografías reales.
- Integración con WhatsApp y CRM.
- Pagos o checkout.
- Gestión avanzada de contenidos.
