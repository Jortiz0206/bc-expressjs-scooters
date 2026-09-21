import { Scooter } from '../models/scooter.model';
import { AppError } from '../errors/AppError';

function handleMongoError(error: unknown): never {
  if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: number }).code === 11000) {
    throw new AppError(409, 'Ya existe una patineta con ese serial');
  }
  if (error instanceof Error && error.name === 'CastError') {
    throw new AppError(400, 'ID o formato de dato inválido');
  }
  if (error instanceof AppError) throw error;
  throw new AppError(500, error instanceof Error ? error.message : 'Error interno de base de datos');
}

export async function getAll(page = 1, limit = 10, search?: string) {
  try {
    const query = search ? { serialNumber: { $regex: search, $options: 'i' } } : {};
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Scooter.find(query).populate('station').skip(skip).limit(limit),
      Scooter.countDocuments(query),
    ]);
    const totalPages = Math.ceil(total / limit) || 1;
    return { data, total, page, totalPages };
  } catch (err) {
    handleMongoError(err);
  }
}

export async function getById(id: string) {
  try {
    const item = await Scooter.findById(id).populate('station');
    if (!item) throw new AppError(404, 'Patineta no encontrada');
    return item;
  } catch (err) {
    handleMongoError(err);
  }
}

export async function create(data: Record<string, unknown>) {
  try {
    const item = await Scooter.create(data);
    return await item.populate('station');
  } catch (err) {
    handleMongoError(err);
  }
}

export async function update(id: string, data: Record<string, unknown>) {
  try {
    const item = await Scooter.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('station');
    if (!item) throw new AppError(404, 'Patineta no encontrada');
    return item;
  } catch (err) {
    handleMongoError(err);
  }
}

export async function remove(id: string) {
  try {
    const item = await Scooter.findByIdAndDelete(id);
    if (!item) throw new AppError(404, 'Patineta no encontrada');
    return item;
  } catch (err) {
    handleMongoError(err);
  }
}