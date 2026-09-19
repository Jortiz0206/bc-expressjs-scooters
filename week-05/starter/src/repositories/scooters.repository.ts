// ============================================
// REPOSITORY — capa de acceso a datos (Prisma)
// ============================================
import { Scooter, Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

export type CreateScooterRepoDto = Prisma.ScooterCreateInput;
export type UpdateScooterRepoDto = Prisma.ScooterUpdateInput;

// Listar scooters con paginación y relación station
export async function findAll(skip: number, take: number): Promise<Scooter[]> {
  return prisma.scooter.findMany({
    skip,
    take,
    include: { station: true },
    orderBy: { createdAt: 'desc' },
  });
}

// Contar total de scooters
export async function count(): Promise<number> {
  return prisma.scooter.count();
}

// Buscar por ID (con station incluida)
export async function findById(id: string): Promise<Scooter | null> {
  return prisma.scooter.findUnique({
    where: { id },
    include: { station: true },
  });
}

// Crear nuevo scooter
export async function create(data: CreateScooterRepoDto): Promise<Scooter> {
  return prisma.scooter.create({
    data,
    include: { station: true },
  });
}

// Actualizar scooter existente
export async function update(id: string, data: UpdateScooterRepoDto): Promise<Scooter> {
  return prisma.scooter.update({
    where: { id },
    data,
    include: { station: true },
  });
}

// Eliminar scooter por ID
export async function remove(id: string): Promise<Scooter> {
  return prisma.scooter.delete({
    where: { id },
  });
}