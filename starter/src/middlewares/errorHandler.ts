// ============================================
// MIDDLEWARES — errorHandler (4 parámetros)
// ============================================
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const isProduction = process.env['NODE_ENV'] === 'production';

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Error de validación en los datos enviados',
      issues: err.issues.map((e: import('zod').ZodIssue) => ({
        field: e.path.join('.') || 'body',
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    logger.warn(`AppError [${err.statusCode}]: ${err.message}`);
    res.status(err.statusCode).json({
      error: 'Application Error',
      message: err.message,
    });
    return;
  }

  const genericError = err instanceof Error ? err : new Error(String(err));
  logger.error(`Error no controlado: ${genericError.stack || genericError.message}`);

  res.status(500).json({
    error: 'Internal Server Error',
    message: genericError.message,
    ...(!isProduction && { stack: genericError.stack }),
  });
}