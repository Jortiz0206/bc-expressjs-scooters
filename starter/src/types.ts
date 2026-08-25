// ============================================
// TYPES — adaptación al dominio de Scooters
// ============================================

export interface Scooter {
  id: number;
  model: string;       // Modelo del scooter
  battery: number;     // Capacidad o autonomía de la batería
  maxSpeed: number;    // Velocidad máxima (km/h)
  price: number;
  stock: number;
  createdAt: Date;
}

// Tipos de respuesta genéricos — no necesitan cambio
export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ValidationErrorResponse {
  error: string;
  message: string;
  issues: Array<{ field: string; message: string }>;
}

export interface ErrorResponse {
  error: string;
  message: string;
  stack?: string;
}