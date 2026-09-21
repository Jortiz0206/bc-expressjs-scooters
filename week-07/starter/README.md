# Semana 07: Autenticacion con JWT y Cookies HttpOnly

## Resumen Tecnico
Implementacion del modulo de autenticacion de usuarios utilizando JSON Web Tokens (JWT).
Se configuro el flujo de tokens (Access y Refresh Tokens) almacenados de forma segura utilizando Cookies HttpOnly.
Se anadio el middleware de autenticacion para proteger endpoints privados.

## Endpoints
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- POST /api/v1/auth/refresh
- POST /api/v1/auth/logout
- GET /api/v1/auth/me

## Instalacion y Ejecucion
pnpm install
pnpm seed
pnpm dev
