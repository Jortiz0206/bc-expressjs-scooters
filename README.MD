# 🚀 API Express.js — Tienda de Scooters Eléctricos (Semana 4)

Entregable correspondiente a la **Semana 4: Validación, Errores y Logging** del programa de Análisis y Desarrollo de Software (ADSO).

## 📋 Dominio Asignado y Recurso Principal
* **Dominio:** Tienda de Scooters Eléctricos (`scooters`)
* **Recurso Principal:** `Scooter`
* **Campos del Recurso:**
  * `id`: Identificador único (autoincremental).
  * `model`: Nombre o modelo del scooter (Texto, obligatorio).
  * `battery`: Capacidad o autonomía de la batería en porcentaje/Wh (Número entero positivo).
  * `maxSpeed`: Velocidad máxima en km/h (Número positivo).
  * `price`: Precio del scooter (Número positivo).
  * `stock`: Cantidad disponible en inventario (Entero no negativo, por defecto `0`).
  * `createdAt`: Fecha de registro.

---

## 🛠️ Características Principales Implementadas

1. **Validación de Datos con Zod:**
   * Esquemas estrictos (`createItemSchema` y `updateItemSchema` usando `.partial()`) para el cuerpo de las peticiones.
   * Validación del parámetro `:id` con `z.coerce.number().int().positive()`.
   * Manejo de errores de validación devolviendo un código `400 Bad Request` con un arreglo detallado de `issues`.

2. **Manejo Estructurado de Errores (`AppError`):**
   * Clase personalizada `AppError` que extiende de `Error` incluyendo `statusCode` e `isOperational`.
   * Middleware `notFound` para capturar rutas inexistentes y retornar respuestas limpias en formato JSON.
   * Middleware `errorHandler` de 4 parámetros que distingue entre `ZodError` (400), `AppError` (código personalizado) y errores genéricos del servidor (500), controlando la traza (`stack`) según el entorno.

3. **Logging Profesional con Winston y Morgan:**
   * Configuración de Winston en `src/config/logger.ts` con nivel `http` para desarrollo y `warn` para producción.
   * Formato colorizado en desarrollo y JSON estructurado en producción.
   * Integración de Morgan con una stream personalizada hacia Winston para registrar todas las peticiones HTTP.

4. **Arquitectura en Capas:**
   * Estructura limpia separada en Rutas (`routes`), Controladores (`controllers`), Servicios (`services`) y Repositorios en memoria (`repositories`).
   * Lógica de negocio encapsulada en el servicio y paginación implementada en el listado (`page` y `limit` como query params).

---

## 📊 Endpoints de la API

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/v1/scooters` | Listar todos los scooters (soporta paginación con `?page=1&limit=10`) |
| **GET** | `/api/v1/scooters/:id` | Obtener un scooter específico por su ID |
| **POST** | `/api/v1/scooters` | Crear un nuevo scooter (validado con Zod) |
| **PUT** | `/api/v1/scooters/:id` | Actualizar parcialmente un scooter existente |
| **DELETE** | `/api/v1/scooters/:id` | Eliminar un scooter por su ID |

---

## 📁 Evidencias y Pruebas (Carpeta `docs`)

A continuación se presentan las capturas de pantalla de las pruebas realizadas sobre los diferentes escenarios requeridos en la rúbrica:

### 1. Prueba de Validación Exitosa (POST 201 Created)
![Prueba 1](docs/1%20Prueba%20de%20Validaci%C3%B3n%20Exitosa%20(POST%20201%20Created).png)

### 2. Prueba de Error de Validación con Zod (POST 400 Bad Request)
![Prueba 2](docs/2%20Prueba%20de%20Error%20de%20Validaci%C3%B3n%20con%20Zod%20(POST%20400%20Bad%20Request).png)

### 3. Prueba de Búsqueda por ID Válido (GET 200 OK)
![Prueba 3](docs/3%20Prueba%20de%20B%C3%BAsqueda%20por%20ID%20V%C3%A1lido%20(GET%20200%20OK).png)

### 4. Prueba de ID No Numérico o Inexistente (GET 400 - 404)
![Prueba 4](docs/4%20Prueba%20de%20ID%20No%20Num%C3%A9rico%20o%20Inexistente%20(GET%20400%20-%20404).png)

### 5. Prueba de Ruta No Encontrada (404 Not Found en JSON)
![Prueba 5](docs/5%20Prueba%20de%20Ruta%20No%20Encontrada%20(404%20Not%20Found%20en%20JSON).png)

### 6. Prueba de Paginación (GET 200 OK)
![Prueba 6](docs/6%20Prueba%20de%20Paginaci%C3%B3n%20(GET%20200%20OK).png)

## ⚙️ Cómo Ejecutar el Proyecto

1. **Instalar dependencias:**
   ```bash
   pnpm install
