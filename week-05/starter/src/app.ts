// ============================================
// APP — configuración de Express
// Registra middlewares, rutas y manejo de errores
// en el ORDEN CORRECTO.
// ============================================
import express from 'express';
import { morganMiddleware } from './config/logger';
import { scootersRouter } from './routes/scooters.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// 1. Registrar middlewares generales
app.use(express.json());
app.use(morganMiddleware);

// Health check — no requiere cambios
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// 2. Registrar rutas del dominio
app.use('/api/v1/scooters', scootersRouter);

// 3. Registrar notFound DESPUÉS de todas las rutas
app.use(notFound);

// 4. Registrar errorHandler como ÚLTIMO middleware (4 params)
app.use(errorHandler);

export default app;