// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'datos/:id', // Tu ruta dinámica
    renderMode: RenderMode.Server // Se renderiza en cada petición
  },
  {
    path: '**', // Todas las demás rutas
    renderMode: RenderMode.Server // También en servidor
  }
];