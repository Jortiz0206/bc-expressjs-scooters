# 🛵 API REST - Dominio Patinetas Eléctricas (Semana 03)

API REST desarrollada con Express, TypeScript y almacenamiento en memoria bajo una arquitectura en 4 capas.

## 📋 Modelo de Datos (`Scooter`)
- `id` (number): Identificador único autoincremental.
- `brand` (string): Marca de la patineta (ej. Xiaomi, Segway).
- `model` (string): Modelo específico.
- `batteryLevel` (number): Porcentaje de batería (0 - 100).
- `status` ('disponible' | 'en_uso' | 'mantenimiento'): Estado operativo.
- `createdAt` (string): Fecha de registro en formato ISO.

## 🚀 Endpoints

| Método | Ruta | Status | Descripción |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/scooters` | 200 | Lista paginada (`?page=1&limit=5`) |
| **GET** | `/api/v1/scooters/:id` | 200 | Obtener patineta por ID |
| **POST** | `/api/v1/scooters` | 201 | Registrar nueva patineta |
| **PUT** | `/api/v1/scooters/:id` | 200 | Actualizar patineta existente |
| **DELETE**| `/api/v1/scooters/:id` | 204 | Eliminar patineta |

## 🛠️ Ejecución
```bash
pnpm install
pnpm dev

## 📸 Evidencias de Funcionamiento

### Compilación exitosa (`pnpm build`)
![Build Exitoso](./docs/Screenshot_1.png)

### Pruebas de Endpoints
- **GET All (Paginación):** ![GET Scooters](./docs/Screenshot_1.png)
- **GET por ID:** ![GET por ID](./docs/Screenshot_2.png)
- **POST (Crear):** ![POST Scooter](./docs/Screenshot_3.png)
- **PUT (Actualizar):** ![PUT Scooter](./docs/Screenshot_4.png)
- **DELETE (Eliminar):** ![DELETE Scooter](./docs/Screenshot_5.png)
