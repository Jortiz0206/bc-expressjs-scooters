import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
const xss = require('xss-clean');
import { morganMiddleware } from './config/logger';
import authRoutes from './routes/auth.routes';
import stationRoutes from './routes/station.routes';
import scooterRoutes from './routes/scooter.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

app.use(morganMiddleware);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/stations', stationRoutes);
app.use('/api/v1/scooters', scooterRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
