import { z } from 'zod';

export const createStationSchema = z.object({
  code: z.string().min(1, 'El código es obligatorio').trim(),
  name: z.string().min(1, 'El nombre es obligatorio').trim(),
  address: z.string().min(1, 'La dirección es obligatoria'),
  capacity: z.number().int().min(1).default(20),
});

export const updateStationSchema = createStationSchema.partial();

export type CreateStationDto = z.infer<typeof createStationSchema>;
export type UpdateStationDto = z.infer<typeof updateStationSchema>;