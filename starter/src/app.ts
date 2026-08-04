import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import { itemsRouter } from './routes/items.routes.js';

export function createApp(): Application {
  const app = express();

  // 1. express.json() — parseo de body (requerido para POST/PUT)
  app.use(express.json());

  // 2. Logger personalizado — loggear todas las peticiones de la tienda de patinetas
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`[Scooter Store API] ${new Date().toISOString()} -> ${req.method} ${req.url}`);
    next();
  });

  // 3. Health check (no requiere middleware especial)
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'Scooters API' });
  });

  // 4. Rutas del recurso principal (Patinetas / Scooters)
  app.use('/api/v1/items', itemsRouter);

  // 5. Handler para rutas no encontradas (404)
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Ruta no encontrada en el sistema de patinetas' });
  });

  // 6. Error handler global — SIEMPRE el último app.use()
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error crítico en la API de Scooters:', err.message);
    res.status(500).json({ error: err.message || 'Error interno del servidor de patinetas' });
  });

  return app;
}