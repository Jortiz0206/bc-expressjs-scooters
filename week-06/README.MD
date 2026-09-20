# 🛴 Sistema de Gestión de Patinetas Eléctricas - Semana 06 (MongoDB & Mongoose)

Este repositorio contiene la adaptación de la API REST de gestión de estaciones y patinetas eléctricas, migrada desde una arquitectura relacional (Prisma/PostgreSQL) hacia una base de datos NoSQL basada en **MongoDB** y **Mongoose ODM**, desarrollada con **TypeScript** y **Express**.

---

## 🚀 Tecnologías y Herramientas

- **Node.js** (v22+)
- **Express.js** (Framework HTTP)
- **TypeScript** (Tipado estático)
- **MongoDB** & **Mongoose 9.4+** (ODM y Base de datos NoSQL)
- **Zod** (Validación de esquemas y DTOs)
- **Morgan** (Logger HTTP)
- **TSX** (Ejecución y servidor de desarrollo en tiempo real)

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas limpia (*Layered Architecture*):

src/
├── config/         # Configuración global (Logger, constantes)
├── controllers/    # Orquestación de peticiones HTTP y respuestas
├── lib/            # Conexión a la base de datos (Mongoose)
├── middlewares/    # Manejo global de errores y rutas no encontradas (404)
├── models/         # Definición de Schemas y Modelos de Mongoose
├── routes/         # Definición de verbos y endpoints de Express
├── schemas/        # Validaciones de entrada con Zod (DTOs y ObjectIds)
├── services/       # Lógica de negocio y consultas a la base de datos
├── app.ts          # Configuración principal de Express
├── seed.ts         # Script de preparación e inserción de datos iniciales
└── server.ts       # Punto de entrada del servidor

---

## 📊 Modelos de Datos

### 1. Estación (`Station`)
- **`code`**: Código único de la estación (`String`, requerido, único).
- **`name`**: Nombre identificador (`String`, requerido).
- **`address`**: Dirección física (`String`, requerida).
- **`capacity`**: Capacidad máxima de patinetas (`Number`, por defecto 20).

### 2. Patineta (`Scooter`)
- **`serialNumber`**: Número de serie único (`String`, requerido, único).
- **`status`**: Estado operacional (`DISPONIBLE`, `EN_USO`, `MANTENIMIENTO`, `BLOQUEADA`).
- **`batteryLevel`**: Nivel de batería de 0 a 100 (`Number`, por defecto 100).
- **`hourlyRate`**: Tarifa de alquiler por hora (`Number`).
- **`latitude` / `longitude`**: Coordenadas geográficas opcionales.
- **`station`**: Referencia `ObjectId` hacia el modelo `Station` (Relación populada).

---

## 🔌 Endpoints de la API

### 🏥 Salud
- `GET /health` - Estado de ejecución del servicio.

### 🏢 Estaciones (`/api/v1/stations`)
- `GET /` - Listar todas las estaciones.
- `GET /:id` - Obtener estación por `ObjectId`.
- `POST /` - Crear una nueva estación.
- `PUT /:id` - Actualizar información de una estación.
- `DELETE /:id` - Eliminar una estación.

### 🛴 Patinetas (`/api/v1/scooters`)
- `GET /` - Listar patinetas (Soporta paginación `?page=1&limit=10` y búsqueda `?search=SCTR`). Incluye datos de la estación populada (`.populate('station')`).
- `GET /:id` - Obtener patineta por `ObjectId`.
- `POST /` - Crear una nueva patineta asociada a una estación.
- `PUT /:id` - Actualizar estado, batería o asignación de estación.
- `DELETE /:id` - Eliminar patineta.

---

## 🛠️ Instalación y Ejecución

1. **Instalar dependencias**:
   ```bash
   pnpm install
Configurar variables de entorno:
Crea un archivo .env en la raíz del proyecto con la URI de MongoDB:

Fragmento de código


PORT=3000
MONGODB_URI=mongodb://localhost:27017/scooters_db
Poblar la base de datos (Seed):

Bash


pnpm seed
Iniciar en modo desarrollo:

Bash


pnpm dev
Verificar compilación de TypeScript:

Bash


npx tsc --noEmitcls