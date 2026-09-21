import 'dotenv/config';
import { connectDB } from './lib/mongoose';
import { Station } from './models/station.model';
import { Scooter } from './models/scooter.model';

async function seed(): Promise<void> {
  await connectDB();

  // Siempre limpiar primero en orden inverso/seguro
  await Scooter.deleteMany({});
  await Station.deleteMany({});

  const [station1, station2] = await Station.insertMany([
    { code: 'ST-01', name: 'Estación Norte', address: 'Calle 100 #15-20', capacity: 30 },
    { code: 'ST-02', name: 'Estación Centro', address: 'Carrera 7 #24-10', capacity: 25 },
  ]);

  await Scooter.insertMany([
    { serialNumber: 'SN-001', status: 'DISPONIBLE', batteryLevel: 95, hourlyRate: 2.5, station: station1._id },
    { serialNumber: 'SN-002', status: 'DISPONIBLE', batteryLevel: 80, hourlyRate: 2.5, station: station1._id },
    { serialNumber: 'SN-003', status: 'EN_USO', batteryLevel: 40, hourlyRate: 3.0, station: station2._id },
  ]);

  console.log('✅ Seed de MongoDB ejecutado correctamente');
  process.exit(0);
}

seed().catch((err: unknown) => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});