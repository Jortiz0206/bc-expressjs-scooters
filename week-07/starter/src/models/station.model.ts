import { Schema, model, Document, models } from 'mongoose';

export interface IStation extends Document {
  code: string;
  name: string;
  address: string;
  capacity: number;
}

const stationSchema = new Schema<IStation>({
  code: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  capacity: { type: Number, required: true, default: 20 },
}, { timestamps: true });

export const Station = models['Station'] || model<IStation>('Station', stationSchema);