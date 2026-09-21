# Semana 08: Autorizacion (RBAC) y Capas de Seguridad HTTP

## Resumen Tecnico
Implementacion del middleware de control de acceso basado en roles (RBAC).
Se protegieron los endpoints con politicas de acceso segun el rol del usuario (CLIENTE, TECNICO, ADMIN).
Se anadieron capas de seguridad HTTP usando helmet, cors restrictivo, express-rate-limit contra fuerza bruta y ataques DoS.
Tambien se anadio sanitizacion contra inyeccion NoSQL y XSS.

## Endpoints Protegidos
- GET /api/v1/scooters (CLIENTE, TECNICO, ADMIN)
- POST /api/v1/scooters (Solo ADMIN)
- PUT /api/v1/scooters/:id (ADMIN, TECNICO)
- DELETE /api/v1/scooters/:id (Solo ADMIN)

## Instalacion y Ejecucion
pnpm install
pnpm dev
