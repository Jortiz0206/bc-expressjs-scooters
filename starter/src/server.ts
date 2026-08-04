import { createApp } from './app.js';

const PORT = process.env.PORT ?? '3000';
const app = createApp();

// Guardamos la referencia del servidor HTTP
const server = app.listen(Number(PORT), () => {
  console.log(`[Scooter Store API] Servidor corriendo en http://localhost:${PORT}`);
});

// Implementación de Graceful Shutdown ante señales del sistema operativo
const gracefulShutdown = (signal: string) => {
  console.log(`\n[Scooter Store API] Señal ${signal} recibida. Cerrando servidor HTTP ordenadamente...`);
  
  server.close(() => {
    console.log('[Scooter Store API] Conexiones cerradas. Servidor detenido correctamente.');
    process.exit(0);
  });

  // Forzar cierre si las conexiones no se cierran en 10 segundos
  setTimeout(() => {
    console.error('[Scooter Store API] Cierre forzado por tiempo de espera agotado.');
    process.exit(1);
  }, 10000);
};

// Escuchar señales de terminación (Ctrl+C o cierre de procesos en contenedores)
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));