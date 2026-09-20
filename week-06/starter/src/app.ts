import express from 'express';
import { morganMiddleware } from './config/logger';
import stationRoutes from './routes/station.routes';
import scooterRoutes from './routes/scooter.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(morganMiddleware);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/stations', stationRoutes);
app.use('/api/v1/scooters', scooterRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;