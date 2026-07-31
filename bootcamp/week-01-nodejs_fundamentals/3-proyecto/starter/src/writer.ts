// ============================================
// WRITER — Escribe el reporte en output/report.json
// ============================================

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import type { Report } from './types.js';

/**
 * Escribe el reporte generado en el archivo output/report.json
 */
export async function writeReport(report: Report): Promise<void> {
  const outputDir = join(import.meta.dirname, '..', 'output');
  const filePath = join(outputDir, 'report.json');

  try {
    // 1 y 2. Asegurar que el directorio output/ exista
    await mkdir(outputDir, { recursive: true });

    // 3. Serializar el reporte con formato legible
    const jsonContent = JSON.stringify(report, null, 2);

    // 4. Escribir el archivo
    await writeFile(filePath, jsonContent, 'utf-8');

    // 5. Loggear en consola la ruta donde se guardó
    console.log(`Reporte guardado exitosamente en: ${filePath}`);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    throw new Error(`Error al escribir el reporte de patinetas: ${errorMessage}`);
  }
}