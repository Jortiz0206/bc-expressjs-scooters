import { Station } from '../models/station.model';
import { AppError } from '../errors/AppError';

function handleMongoError(error: unknown): never {
  if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
    throw new AppError(409, 'Ya existe una estación con ese código único');
  }
  if (error instanceof Error && error.name === 'CastError') {
    throw new AppError(400, 'ID o formato de dato inválido');
  }
  if (error instanceof AppError) throw error;
  throw new AppError(500, error instanceof Error ? error.message : 'Error interno de base de datos');
}

export class StationRepository {
  async findAll() {
    try {
      return await Station.find();
    } catch (err) {
      handleMongoError(err);
    }
  }

  async findById(id: string) {
    try {
      const item = await Station.findById(id);
      if (!item) throw new AppError(404, 'Estación no encontrada');
      return item;
    } catch (err) {
      handleMongoError(err);
    }
  }

  async create(data: Record<string, unknown>) {
    try {
      return await Station.create(data);
    } catch (err) {
      handleMongoError(err);
    }
  }
}