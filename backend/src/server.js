import cors from 'cors';
import express from 'express';
import { config } from './config.js';
import { connectDatabase } from './db.js';
import { authRouter } from './routes/auth.js';
import { coursesRouter } from './routes/courses.js';

await connectDatabase();

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || config.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true
  })
);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'voxing-academy-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/courses', coursesRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Error interno' });
});

const host = config.nodeEnv === 'production' ? undefined : '127.0.0.1';

app.listen(config.port, host, () => {
  console.log(`Voxing Academy API running on http://localhost:${config.port}/api`);
});