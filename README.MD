# Proyecto Semana 02 — Servidor Express con CRUD completo: Tienda de Patinetas Eléctricas

## 🎯 Objetivo
Aplicar los conceptos de la semana 02 construyendo una API REST profesional con **Express 5** y **TypeScript**, implementando una gestión completa de recursos mediante operaciones CRUD, middlewares personalizados, manejo de códigos de estado HTTP y cierre ordenado (*graceful shutdown*).

---

## 📋 Dominio Asignado
* **Dominio:** Tienda de Patinetas Eléctricas
* **Recurso Principal:** `scooters` (o `/api/v1/items`)
* **Campos del Recurso:**
  * `id`: Identificador único numérico (Autoincremental)
  * `name`: Nombre o modelo de la patineta (string)
  * `category`: Categoría (ej. Urbana, todoterreno, plegable) (string)
  * `price`: Precio de venta (number)
  * `stock`: Cantidad disponible en inventario (number)
  * `active`: Estado de disponibilidad en tienda (boolean)

---

## 🗂️ Estructura del Proyecto

```text
starter/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── app.ts           # Configuración de Express (Middlewares + Rutas)
    ├── server.ts        # Entry point + Graceful Shutdown (SIGTERM/SIGINT)
    ├── types.ts         # Interfaz y DTOs del recurso principal (Scooter)
    ├── store.ts         # Store en memoria con las 5 operaciones CRUD
    └── routes/
        └── items.routes.ts  # Endpoints REST (GET, POST, PUT, DELETE)

        
## Requisitos funcionales implementados        

| Método | Ruta                | Descripción                          | Status Code  |
| ------ | ------------------- | ------------------------------------ | ------------ |
| GET    | `/api/v1/items`     | Listar todas las patinetas           | `200`        |
| GET    | `/api/v1/items/:id` | Obtener una patineta por ID          | `200`, `404` |
| POST   | `/api/v1/items`     | Registrar una nueva patineta         | `201`        |
| PUT    | `/api/v1/items/:id` | Actualizar una patineta existente    | `200`, `404` |
| DELETE | `/api/v1/items/:id` | Eliminar una patineta del inventario | `204`, `404` |

## 2. Middlewares Integrados

* **`express.json()`**: Realiza el parseo automático de solicitudes con cuerpo en formato JSON para los métodos **POST** y **PUT**.
* **Logger personalizado**: Registra en la consola la fecha, el método HTTP y la ruta de cada solicitud recibida.
* **Health Check**: Endpoint **`/health`** para verificar que el servidor se encuentra operativo.
* **Manejador 404**: Middleware encargado de responder de forma estructurada cuando una ruta no existe.
* **Error Handler Global**: Middleware de cuatro parámetros ubicado al final del flujo para capturar y manejar excepciones internas de manera segura.

## 3. Store en Memoria

La aplicación administra temporalmente los datos mediante un **array tipado** definido en `store.ts`. Este módulo implementa las operaciones básicas para la gestión de patinetas:

* **`getAll()`**: Obtiene todos los registros.
* **`getById()`**: Busca un registro por su identificador.
* **`create()`**: Registra una nueva patineta.
* **`update()`**: Actualiza la información de una patineta existente.
* **`remove()`**: Elimina una patineta del almacenamiento en memoria.

---

# 🚀 Instrucciones de Ejecución

## Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de contar con:

* **Node.js** (versión **18** o superior recomendada).
* **npm** (Node Package Manager).

## Pasos para iniciar el proyecto localmente

1. Instala las dependencias:

```bash
npm install
```

2. Inicia el servidor en modo desarrollo (con recarga automática):

```bash
npm run dev
```

> El servidor se ejecutará por defecto en **http://localhost:3000**.

---

# 🧪 Pruebas con `curl`

Puedes verificar el funcionamiento de los endpoints ejecutando los siguientes comandos en tu terminal.

### 1. Listar todas las patinetas

```bash
curl http://localhost:3000/api/v1/items
```

### 2. Crear una nueva patineta

```bash
curl -X POST http://localhost:3000/api/v1/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Xiaomi Pro 4",
    "category": "Urbana",
    "price": 550,
    "stock": 12,
    "active": true
  }'
```

### 3. Obtener una patineta por ID

```bash
curl http://localhost:3000/api/v1/items/1
```

### 4. Actualizar una patineta completa

```bash
curl -X PUT http://localhost:3000/api/v1/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Xiaomi Pro 4 Ultra",
    "category": "Urbana Pro",
    "price": 620,
    "stock": 8,
    "active": true
  }'
```

### 5. Eliminar una patineta

```bash
curl -X DELETE http://localhost:3000/api/v1/items/1
```

> **Respuesta esperada:** `HTTP 204 No Content` si la eliminación se realiza correctamente.

---

# 📦 Autoría

* **Autora:** Faloon Johanna Ortiz
* **Bootcamp:** Análisis y Desarrollo de Software
