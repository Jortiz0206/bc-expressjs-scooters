// ============================================
// ENTRY POINT — Orquesta todo el flujo
// ============================================

import { readItems } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2);
    const categoryIndex = args.indexOf('--category');
    const categoryFilter: string | null = categoryIndex !== -1 ? args[categoryIndex + 1] : null;

    console.log('Iniciando procesamiento de patinetas...');
    if (categoryFilter) {
      console.log(`Filtro aplicado por categoría: "${categoryFilter}"`);
    }

    const allItems = await readItems();
    const filteredItems = filterByCategory(allItems, categoryFilter);
    const summary = calculateSummary(filteredItems);

    const report: Report = {
      generatedAt: new Date().toISOString(),
      appliedFilter: categoryFilter,
      summary,
      items: filteredItems,
    };

    console.log('\n--- RESUMEN DE PATINETAS ---');
    console.log(`Total elementos: ${summary.total}`);
    console.log(`Activos: ${summary.active}`);
    console.log(`Inactivos: ${summary.inactive}`);
    console.log(`Precio Promedio: $${summary.averagePrice}`);
    console.log(`Categorías incluidas: ${summary.categories.join(', ')}`);
    console.log('----------------------------\n');

    await writeReport(report);
    console.log('¡Proceso completado exitosamente!');
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`Error en la ejecución: ${errorMessage}`);
    process.exit(1);
  }
}

main();