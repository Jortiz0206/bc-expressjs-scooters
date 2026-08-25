// ============================================
// REPOSITORY — capa de acceso a datos (en memoria)
// ============================================
import { Scooter } from '../types';

export type CreateScooterRepoDto = Omit<Scooter, 'id' | 'createdAt'>;
export type UpdateScooterRepoDto = Partial<CreateScooterRepoDto>;

// Seed inicial con 3 scooters de ejemplo
let scooters: Scooter[] = [
  { 
    id: 1, 
    model: 'Xiaomi Mi Electric Scooter Pro 2', 
    battery: 45, 
    maxSpeed: 25, 
    price: 1850000, 
    stock: 5, 
    createdAt: new Date() 
  },
  { 
    id: 2, 
    model: 'Segway Ninebot Max G30', 
    battery: 65, 
    maxSpeed: 30, 
    price: 3200000, 
    stock: 3, 
    createdAt: new Date() 
  },
  { 
    id: 3, 
    model: 'Aima CityCoco Electric', 
    battery: 50, 
    maxSpeed: 40, 
    price: 4500000, 
    stock: 2, 
    createdAt: new Date() 
  },
];

let nextId = 4;

// Listar todos los scooters (con copia defensiva)
export async function findAll(): Promise<Scooter[]> {
  return scooters.map((scooter) => ({ ...scooter }));
}

// Buscar por ID (con copia defensiva si existe)
export async function findById(id: number): Promise<Scooter | undefined> {
  const scooter = scooters.find((s) => s.id === id);
  return scooter ? { ...scooter } : undefined;
}

// Crear nuevo scooter
export async function create(dto: CreateScooterRepoDto): Promise<Scooter> {
  const newScooter: Scooter = { 
    id: nextId++, 
    ...dto, 
    createdAt: new Date() 
  };
  scooters.push(newScooter);
  return { ...newScooter };
}

// Actualizar scooter existente
export async function update(id: number, dto: UpdateScooterRepoDto): Promise<Scooter | undefined> {
  const index = scooters.findIndex((s) => s.id === id);
  if (index === -1) return undefined;

  scooters[index] = { 
    ...scooters[index]!, 
    ...dto 
  };
  return { ...scooters[index]! };
}

// Eliminar scooter por ID
export async function remove(id: number): Promise<boolean> {
  const index = scooters.findIndex((s) => s.id === id);
  if (index === -1) return false;
  
  scooters.splice(index, 1);
  return true;
}