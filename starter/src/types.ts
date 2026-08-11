export interface Scooter {
  id: number;
  brand: string;
  model: string;
  batteryLevel: number;
  status: 'disponible' | 'en_uso' | 'mantenimiento';
  createdAt: string;
}

export type CreateScooterDto = Omit<Scooter, 'id' | 'createdAt'>;
export type UpdateScooterDto = Partial<CreateScooterDto>;

export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}