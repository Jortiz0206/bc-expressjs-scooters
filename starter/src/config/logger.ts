// ============================================
// CONFIG — logger de Winston + stream para Morgan
// ============================================
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

const isDev = process.env['NODE_ENV'] !== 'production';

// 1. Winston Logger configurado según el entorno
export const logger = createLogger({
  level: isDev ? 'http' : 'warn',
  format: format.combine(
    format.timestamp(),
    isDev
      ? format.combine(
          format.colorize(),
          format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
        )
      : format.json()
  ),
  transports: [
    new transports.Console(),
    ...(isDev ? [] : [new transports.File({ filename: 'logs/error.log', level: 'error' })]),
  ],
});

// Stream de Morgan que redirige a logger.http()
export const morganStream = {
  write: (message: string) => logger.http(message.trim()),
};

// Middleware de Morgan integrado con la stream de Winston
const morganFormat = isDev ? 'dev' : 'combined';
export const morganMiddleware = morgan(morganFormat, { stream: morganStream });