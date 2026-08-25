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

A continuación se presentan las capturas de pantalla de las pruebas realizadas sobre los diferentes escenarios requeridos en la rúbrica (Validez de Zod, códigos de estado HTTP, manejo de excepciones y paginación):

<p align="center">
  <img src="docs/evidencias.png" alt="Evidencias de Pruebas de la API" width="100%">
</p>

* **1. Validación Exitosa (`POST 201 Created`):** Creación correcta cumpliendo con las reglas del esquema.
* **2. Error de Validación Zod (`POST 400 Bad Request`):** Respuesta estructurada con el arreglo de `issues[]`.
* **3. Búsqueda por ID Válido (`GET 200 OK`):** Recuperación exitosa del recurso específico.
* **4. ID No Numérico o Inexistente (`GET 400 / 404`):** Control operacional con la clase `AppError` y coerción de tipos.
* **5. Ruta No Encontrada (`404 Not Found en JSON`):** Middleware `notFound` interceptando rutas inválidas.
* **6. Prueba de Paginación (`GET 200 OK`):** Listado fraccionado mediante parámetros de consulta (`page` y `limit`).

## ⚙️ Cómo Ejecutar el Proyecto

1. **Instalar dependencias:**
   ```bash
   pnpm install