import { Scooter, CreateScooterDto, UpdateScooterDto } from '../types';

// Store en memoria inicializado con 5 datos reales del mercado
const store: Scooter[] = [
  {
    id: 1,
    brand: 'Xiaomi',
    model: 'Electric Scooter 4 Pro',
    batteryLevel: 92,
    status: 'disponible',
    createdAt: new Date('2026-08-01T08:30:00Z').toISOString()
  },
  {
    id: 2,
    brand: 'Segway',
    model: 'Ninebot KickScooter MAX G2',
    batteryLevel: 45,
    status: 'en_uso',
    createdAt: new Date('2026-08-02T09:15:00Z').toISOString()
  },
  {
    id: 3,
    brand: 'NIU',
    model: 'KQi3 Max Premium',
    batteryLevel: 10,
    status: 'mantenimiento',
    createdAt: new Date('2026-08-03T11:00:00Z').toISOString()
  },
  {
    id: 4,
    brand: 'Cecotec',
    model: 'Bongo Serie Z Advance',
    batteryLevel: 80,
    status: 'disponible',
    createdAt: new Date('2026-08-04T14:20:00Z').toISOString()
  },
  {
    id: 5,
    brand: 'Dualtron',
    model: 'Mini Special Long Body',
    batteryLevel: 60,
    status: 'en_uso',
    createdAt: new Date('2026-08-05T16:45:00Z').toISOString()
  }
];

// El siguiente ID autoincremental iniciará en 6
let nextId = 6;

export async function findAll(): Promise<Scooter[]> {
  return [...store];
}

export async function findById(id: number): Promise<Scooter | undefined> {
  const scooter = store.find((item) => item.id === id);
  if (!scooter) return undefined;
  return { ...scooter };
}

export async function create(dto: CreateScooterDto): Promise<Scooter> {
  const scooter: Scooter = {
    id: nextId++,
    ...dto,
    createdAt: new Date().toISOString()
  };
  store.push(scooter);
  return { ...scooter };
}

export async function update(id: number, dto: UpdateScooterDto): Promise<Scooter | undefined> {
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return undefined;

  store[index] = {
    ...store[index]!,
    ...dto
  };

  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((item) => item.id === id);
  if (index === -1) return false;

  store.splice(index, 1);
  return true;
}