// ============================================
// SERVICE — lógica de negocio (Prisma)
// ============================================
import { Scooter } from '@prisma/client';
import { PaginatedResponse } from '../types';
import * as repo from '../repositories/scooters.repository';
import { AppError } from '../errors/AppError';
import { CreateScooterDto, UpdateScooterDto } from '../schemas/scooter.schema';

interface FindAllOptions {
  page: number;
  limit: number;
}

// Listar scooters con paginación offset
export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Scooter>> {
  const { page, limit } = opts;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    repo.findAll(skip, limit),
    repo.count(),
  ]);

  return { data, total, page, limit };
}

// Buscar scooter por ID (lanza AppError 404 si no existe)
export async function findById(id: string): Promise<Scooter> {
  const scooter = await repo.findById(id);
  if (!scooter) {
    throw new AppError(404, `Scooter con ID ${id} no encontrado`);
  }
  return scooter;
}

// Crear nuevo scooter
export async function create(dto: CreateScooterDto): Promise<Scooter> {
  return repo.create(dto);
}

// Actualizar scooter (lanza AppError 404 si no existe)
export async function update(id: string, dto: UpdateScooterDto): Promise<Scooter> {
  const exists = await repo.findById(id);
  if (!exists) {
    throw new AppError(404, `Scooter con ID ${id} no encontrado para actualizar`);
  }
  return repo.update(id, dto);
}

// Eliminar scooter (lanza AppError 404 si no existe)
export async function remove(id: string): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) {
    throw new AppError(404, `Scooter con ID ${id} no encontrado para eliminar`);
  }
  await repo.remove(id);
}