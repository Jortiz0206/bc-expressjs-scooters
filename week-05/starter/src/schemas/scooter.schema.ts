// ============================================
// SCHEMAS — validación Zod para Scooters (Prisma)
// ============================================
import { z } from 'zod';

const scooterStatusEnum = z.enum([
  'DISPONIBLE',
  'EN_USO',
  'MANTENIMIENTO',
  'BLOQUEADA',
]);

export const createScooterSchema = z.object({
  serialNumber: z
    .string({ message: 'El número de serie es obligatorio' })
    .min(1, 'El número de serie no puede estar vacío')
    .trim(),
  status: scooterStatusEnum.default('DISPONIBLE'),
  batteryLevel: z
    .number({ message: 'El nivel de batería es obligatorio' })
    .int('El nivel de batería debe ser un número entero')
    .min(0, 'El nivel de batería no puede ser negativo')
    .max(100, 'El nivel de batería no puede superar 100')
    .default(100),
  hourlyRate: z
    .number({ message: 'La tarifa por hora es obligatoria' })
    .positive('La tarifa por hora debe ser mayor a 0')
    .default(2.5),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  stationId: z.string().uuid('El stationId debe ser un UUID válido').optional().nullable(),
});

export const updateScooterSchema = createScooterSchema.partial();

export type CreateScooterDto = z.infer<typeof createScooterSchema>;
export type UpdateScooterDto = z.infer<typeof updateScooterSchema>;