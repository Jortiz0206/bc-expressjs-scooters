// ============================================
// TIPOS — Adaptado al dominio de Patinetas Eléctricas
// ============================================

export interface Scooter {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
}

// Resumen que el procesador debe calcular
export interface ScooterSummary {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  mostExpensive: Scooter;
  cheapest: Scooter;
  categories: string[];
}

// Reporte final que se escribirá en output/report.json
export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: ScooterSummary;
  items: Scooter[];
}