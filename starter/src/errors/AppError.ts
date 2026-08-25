// ============================================
// ERRORS — AppError (clase de errores operacionales)
// ============================================

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Ajuste del prototipo para correcta herencia en TypeScript/Babel
    Object.setPrototypeOf(this, new.target.prototype);
    
    // Captura el stack trace excluyendo el constructor de la traza
    Error.captureStackTrace(this, this.constructor);
  }
}

// Helper para validar si un error desconocido es una instancia de AppError
export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}