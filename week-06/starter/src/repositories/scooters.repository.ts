import { Scooter } from '../models/scooter.model';
import { AppError } from '../errors/AppError';

function handleMongoError(error: unknown): never {
  if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
    throw new AppError(409, 'Ya existe un registro con ese valor único');
  }
  if (error instanceof Error && error.name === 'CastError') {
    throw new AppError(400, 'ID o formato de dato inválido');
  }
  if (error instanceof AppError) throw error;
  throw new AppError(500, error instanceof Error ? error.message : 'Error interno de base de datos');
}

export class ScooterRepository {
  async findPaginated(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        Scooter.find().populate('station').skip(skip).limit(limit),
        Scooter.countDocuments(),
      ]);
      const totalPages = Math.ceil(total / limit) || 1;
      return { data, total, page, totalPages };
    } catch (err) {
      handleMongoError(err);
    }
  }

  async findById(id: string) {
    try {
      const item = await Scooter.findById(id).populate('station');
      if (!item) throw new AppError(404, 'Recurso no encontrado');
      return item;
    } catch (err) {
      handleMongoError(err);
    }
  }

  async create(data: Record<string, unknown>) {
    try {
      return await Scooter.create(data);
    } catch (err) {
      handleMongoError(err);
    }
  }
}