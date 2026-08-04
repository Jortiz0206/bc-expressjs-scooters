import type { Item, CreateItemDto, UpdateItemDto } from './types.js';

// Store en memoria — simula una base de datos sin persistencia
// Los datos se pierden al reiniciar el servidor (se usará BD a partir de week-05)
const items: Item[] = [
  {
  id: 1,
  name: "xiaomi Mi Electric Scooter Pro 2",
  category: "Scooters",
  price: 599.99,
  active: true,
  stock: 10
},{
  id: 2,
  name: "Segway Ninebot MAX G30LP",
  category: "Scooters",
  price: 799.99,
  active: true,
  stock: 5
}

];
let nextId = 3;

// Retornar todos los ítems (patinetas) del array
export function getAll(): Item[] {
  return items;
}

// Retornar la patineta con el id dado, o undefined si no existe
export function getById(id: number): Item | undefined {
  return items.find((item) => item.id === id);
}

// Crear una nueva patineta con un id autoincremental, guardarla y retornarla
export function create(data: CreateItemDto): Item {
  const newItem: Item = { id: nextId++, ...data };
  items.push(newItem);
  return newItem;
}

// Actualizar la patineta con el id dado y retornarla, o undefined si no existe
export function update(id: number, data: UpdateItemDto): Item | undefined {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return undefined;
  }

  // Actualizamos los campos manteniendo los existentes
  items[index] = {
    ...items[index],
    ...data,
  };

  return items[index];
}

// Eliminar la patineta con el id dado y retornar true, o false si no existe
export function remove(id: number): boolean {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }

  items.splice(index, 1);
  return true;
}