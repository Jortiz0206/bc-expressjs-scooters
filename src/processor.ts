// ============================================
// PROCESSOR — Filtra y calcula estadísticas
// ============================================

import type { Scooter, ScooterSummary } from './types.js';

/**
 * Filtra las patinetas por categoría (case-insensitive).
 * Si la categoría no existe o no tiene elementos, lanza un error con las disponibles.
 */
export function filterByCategory(items: Scooter[], categoryFilter: string | null): Scooter[] {
  // 1. Si es null, retornar todos
  if (!categoryFilter) {
    return items;
  }

  const normalizedFilter = categoryFilter.toLowerCase();
  const filtered = items.filter(
    (item) => item.category.toLowerCase() === normalizedFilter
  );

  // 3. Si no hay items en esa categoría, listar las categorías disponibles
  if (filtered.length === 0) {
    const availableCategories = Array.from(
      new Set(items.map((item) => item.category))
    );
    throw new Error(
      `No se encontraron elementos para la categoría "${categoryFilter}". Categorías disponibles: ${availableCategories.join(', ')}`
    );
  }

  return filtered;
}

/**
 * Calcula las estadísticas y resumen de la lista de patinetas.
 */
export function calculateSummary(items: Scooter[]): ScooterSummary {
  const total = items.length;

  // Manejo de caso borde si la lista está vacía
  if (total === 0) {
    throw new Error('No se puede calcular el resumen de una lista vacía.');
  }

  const activeItems = items.filter((item) => item.active);
  const inactiveItems = items.filter((item) => !item.active);

  // Sumar precios para el promedio
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  const averagePrice = Number((totalPrice / total).toFixed(2));

  // Encontrar el más caro y el más barato usando sort o reduce
  const sortedByPrice = [...items].sort((a, b) => b.price - a.price);
  const mostExpensive = sortedByPrice[0];
  const cheapest = sortedByPrice[sortedByPrice.length - 1];

  // Obtener categorías únicas
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return {
    total,
    active: activeItems.length,
    inactive: inactiveItems.length,
    averagePrice,
    mostExpensive,
    cheapest,
    categories,
  };
}