// ============================================
// READER — Lee el archivo de datos JSON
// ============================================

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Scooter } from './types.js';

/**
 * Lee el archivo de datos de patinetas y retorna el array de elementos.
 */
export async function readItems(): Promise<Scooter[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'items.json');
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as Scooter[];
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    throw new Error(`Error al leer el archivo de datos de patinetas: ${errorMessage}`);
  }
}