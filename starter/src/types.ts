// ============================================
// TYPES: Interfaz del recurso principal (Patinetas Eléctricas)
// ============================================

export interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
  active: boolean;
  stock: number;
}

// DTO usado para crear un nuevo item (sin id, se genera automáticamente)
export type CreateItemDto = Omit<Item, 'id'>;

// DTO para actualización (todos los campos editables de forma parcial)
export type UpdateItemDto = Partial<CreateItemDto>;