git commit -m "fix(week-06): correcciones de arquitectura Mongoose, esquemas Zod y compilacion"# Semana 09: Testing (Jest + Supertest + MongoDB In-Memory)

## Resumen Tecnico
Implementacion de pruebas unitarias y de integracion para la API.
Se utilizaron Jest para la ejecucion de pruebas, Supertest para peticiones HTTP simuladas, y mongodb-memory-server para aislar las pruebas de integracion en una base de datos volatil en memoria.

## Estructura de Pruebas
- \	ests/unit\: Pruebas aisladas (ej. mockeando MongoDB para testear la logica de autenticacion).
- \	ests/integration\: Pruebas End-to-End probando endpoints como \/api/v1/auth/register\ conectandose a una base de datos real (en memoria).

## Instalacion y Ejecucion
pnpm install

# Ejecutar pruebas
pnpm test

# Ejecutar pruebas con reporte de cobertura
pnpm test -- --coverage
