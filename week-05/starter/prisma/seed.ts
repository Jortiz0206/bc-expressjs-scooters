// prisma/seed.ts — Datos iniciales del dominio
// Ejecutar con: pnpm dlx prisma db seed

import { PrismaClient, ScooterStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  // 1. Limpiar datos existentes en orden inverso de dependencia (idempotencia)
  await prisma.maintenanceLog.deleteMany();
  await prisma.scooter.deleteMany();
  await prisma.station.deleteMany();

  // 2. Crear registros independientes o padres primero (Stations)
  const stationCentral = await prisma.station.create({
    data: {
      code: 'STN-001',
      name: 'Estación Central',
      address: 'Calle 72 # 10-34',
      capacity: 25,
      active: true,
    },
  });

  const stationNorth = await prisma.station.create({
    data: {
      code: 'STN-002',
      name: 'Estación Norte',
      address: 'Calle 116 # 15-20',
      capacity: 15,
      active: true,
    },
  });

  // 3. Crear mínimo 5 registros del recurso principal (Scooters)
  const createdScooters = await prisma.scooter.createMany({
    data: [
      {
        serialNumber: 'SN-SCOOT-001',
        status: ScooterStatus.DISPONIBLE,
        batteryLevel: 95,
        hourlyRate: 2.5,
        latitude: 4.6560,
        longitude: -74.0595,
        stationId: stationCentral.id,
      },
      {
        serialNumber: 'SN-SCOOT-002',
        status: ScooterStatus.EN_USO,
        batteryLevel: 80,
        hourlyRate: 2.5,
        latitude: 4.6600,
        longitude: -74.0550,
        stationId: stationCentral.id,
      },
      {
        serialNumber: 'SN-SCOOT-003',
        status: ScooterStatus.DISPONIBLE,
        batteryLevel: 100,
        hourlyRate: 3.0,
        latitude: 4.6900,
        longitude: -74.0500,
        stationId: stationNorth.id,
      },
      {
        serialNumber: 'SN-SCOOT-004',
        status: ScooterStatus.MANTENIMIENTO,
        batteryLevel: 20,
        hourlyRate: 2.5,
        latitude: 4.6930,
        longitude: -74.0480,
        stationId: stationNorth.id,
      },
      {
        serialNumber: 'SN-SCOOT-005',
        status: ScooterStatus.DISPONIBLE,
        batteryLevel: 90,
        hourlyRate: 2.5,
        latitude: 4.6570,
        longitude: -74.0600,
        stationId: stationCentral.id,
      },
    ],
  });

  // Consultar una patineta para asociar un recurso secundario (MaintenanceLog)
  const firstScooter = await prisma.scooter.findFirst({
    where: { serialNumber: 'SN-SCOOT-004' },
  });

  if (firstScooter) {
    const logsResult = await prisma.maintenanceLog.createMany({
      data: [
        {
          description: 'Revisión de frenos hidráulicos y cambio de pastillas',
          cost: 45.0,
          scooterId: firstScooter.id,
        },
        {
          description: 'Calibración de sensor IoT y actualización de firmware',
          cost: 15.0,
          scooterId: firstScooter.id,
        },
      ],
    });
    console.log(`✅ ${logsResult.count} logs de mantenimiento creados`);
  }

  // 4. console.log para confirmar la cantidad creada
  console.log(`✅ 2 estaciones creadas`);
  console.log(`✅ ${createdScooters.count} patinetas creadas`);
  console.log('🌱 Seed finalizado con éxito.');
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });