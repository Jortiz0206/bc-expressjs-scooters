// ============================================
// SERVICE — lógica de negocio
// ============================================
import { Scooter, PaginatedResponse } from '../types';
import * as repo from '../repositories/scooters.repository';
import { AppError } from '../errors/AppError';

interface FindAllOptions {
  page: number;
  limit: number;
}

// Listar scooters con paginación offset
export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Scooter>> {
  const { page, limit } = opts;
  const all = await repo.findAll();
  
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  
  return { data, total: all.length, page, limit };
}

// Buscar scooter por ID (lanza AppError 404 si no existe)
export async function findById(id: number): Promise<Scooter> {
  const scooter = await repo.findById(id);
  if (!scooter) {
    throw new AppError(404, `Scooter con ID ${id} no encontrado`);
  }
  return scooter;
}

// Crear nuevo scooter
export async function create(dto: repo.CreateScooterRepoDto): Promise<Scooter> {
  return repo.create(dto);
}

// Actualizar scooter (lanza AppError 404 si no existe)
export async function update(id: number, dto: repo.UpdateScooterRepoDto): Promise<Scooter> {
  const exists = await repo.findById(id);
  if (!exists) {
    throw new AppError(404, `Scooter con ID ${id} no encontrado para actualizar`);
  }
  const updated = await repo.update(id, dto);
  return updated!;
}

// Eliminar scooter (lanza AppError 404 si no existe)
export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) {
    throw new AppError(404, `Scooter con ID ${id} no encontrado para eliminar`);
  }
  await repo.remove(id);
}