import { Schema, model, Document, Types, models } from 'mongoose';

export interface IScooter extends Document {
  serialNumber: string;
  status: 'DISPONIBLE' | 'EN_USO' | 'MANTENIMIENTO';
  batteryLevel: number;
  hourlyRate: number;
  station: Types.ObjectId;
}

const scooterSchema = new Schema<IScooter>({
  serialNumber: { type: String, required: true, unique: true, trim: true },
  status: { type: String, enum: ['DISPONIBLE', 'EN_USO', 'MANTENIMIENTO'], default: 'DISPONIBLE' },
  batteryLevel: { type: Number, required: true, min: 0, max: 100 },
  hourlyRate: { type: Number, required: true },
  station: { type: Schema.Types.ObjectId, ref: 'Station', required: true },
}, { timestamps: true });

export const Scooter = models['Scooter'] || model<IScooter>('Scooter', scooterSchema);