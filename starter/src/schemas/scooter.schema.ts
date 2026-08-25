// ============================================
// SCHEMAS — adaptación al dominio de Scooters
// ============================================
import { z } from 'zod';

export const createScooterSchema = z.object({
  model: z.string({ message: 'El modelo es obligatorio' }).min(1, 'El modelo no puede estar vacío').trim(),
  battery: z.number({ message: 'La batería es obligatoria' }).int('La batería debe ser un número entero').positive('La batería debe ser mayor a 0'),
  maxSpeed: z.number({ message: 'La velocidad máxima es obligatoria' }).positive('La velocidad máxima debe ser mayor a 0'),
  price: z.number({ message: 'El precio es obligatorio' }).positive('El precio debe ser mayor a 0'),
  stock: z.number().int('El stock debe ser entero').nonnegative('El stock no puede ser negativo').default(0),
});

export const updateScooterSchema = createScooterSchema.partial();

export type CreateScooterDto = z.infer<typeof createScooterSchema>;
export type UpdateScooterDto = z.infer<typeof updateScooterSchema>;